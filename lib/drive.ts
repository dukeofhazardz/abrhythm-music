/**
 * Google Drive image loading for the /gallery page.
 *
 * Two modes:
 *  MODE A (automatic, preferred): folderId + GOOGLE_DRIVE_API_KEY → fetch the
 *      folder's images server-side via the Drive API v3. The API key never
 *      leaves the server. Results are cached with ISR (revalidate: 3600).
 *  MODE B (manual fallback): use the file IDs listed in data/gallery.ts.
 *
 * Image URLs: https://drive.google.com/thumbnail?id=FILE_ID&sz=w600 (grid
 * thumbnails) and &sz=w1600 (full view), with
 * https://lh3.googleusercontent.com/d/FILE_ID=w1600 as fallback.
 */

const DRIVE_API = "https://www.googleapis.com/drive/v3/files";

/** One Drive image as resolved for the gallery. */
export type DriveImage = {
  id: string;
  /** Width/height when known (Drive API imageMediaMetadata) — holds aspect ratio. */
  width?: number;
  height?: number;
  alt?: string;
};

/**
 * Extract a Drive file or folder ID from any common Drive URL format:
 *  …/folders/FOLDER_ID
 *  …/file/d/FILE_ID/view …
 *  …open?id=FILE_ID …
 *  …uc?id=FILE_ID …
 * Returns null when nothing can be extracted.
 */
export function extractDriveId(url: string): string | null {
  const input = String(url).trim();
  if (!input) return null;

  try {
    const u = new URL(input);

    // …open?id=ID  /  …uc?id=ID  /  any ?id= or &id=
    if (u.searchParams.has("id")) {
      return u.searchParams.get("id") ?? null;
    }

    // …/folders/ID   …/file/d/ID/…   …/d/ID/…
    const parts = u.pathname.split("/").filter(Boolean);
    for (let i = 0; i < parts.length; i++) {
      const segment = parts[i];
      if (!/^[a-zA-Z0-9_-]{10,}$/.test(segment)) continue;
      const prev = parts[i - 1];
      const prevPrev = parts[i - 2];
      if (
        prev === "folders" ||
        prev === "d" ||
        (prev === "file" && prevPrev === "d")
      ) {
        return segment;
      }
    }
  } catch {
    // Not a URL — fall through to the regex below.
  }

  const m = input.match(/(?:[?&]id=|(?:\/file\/|\/d\/|\/folders\/))([a-zA-Z0-9_-]{10,})/);
  return m ? m[1] : null;
}

/** Grid thumbnail URL (w600) for a Drive file ID. */
export function driveThumbnailUrl(fileId: string, size: 600 | 1600 = 600): string {
  return `https://drive.google.com/thumbnail?id=${encodeURIComponent(fileId)}&sz=w${size}`;
}

/** Direct media URL (lh3.googleusercontent.com) used as thumbnail fallback. */
export function driveDirectUrl(fileId: string, size: 600 | 1600 = 1600): string {
  return `https://lh3.googleusercontent.com/d/${encodeURIComponent(fileId)}=w${size}`;
}

/**
 * MODE A: list the images in a Drive folder via the Drive API v3.
 * Server-only: GOOGLE_DRIVE_API_KEY is read from process.env and never sent
 * to the client. Results are cached with ISR (revalidate: 3600) so the page
 * stays fast and repeated folder reads stay within quota.
 *
 * Throws on network failure, quota exhaustion, or inaccessible/private folders.
 * The caller is responsible for catching and rendering a friendly fallback.
 */
export async function listFolderImages(folderId: string): Promise<DriveImage[]> {
  const apiKey = process.env.GOOGLE_DRIVE_API_KEY;
  if (!apiKey) {
    throw new Error("GOOGLE_DRIVE_API_KEY is not set");
  }

  const images: DriveImage[] = [];
  let pageToken: string | undefined;

  do {
    const params = new URLSearchParams({
      key: apiKey,
      q: `"${folderId}" in parents and mimeType contains "image/" and trashed = false`,
      fields: "nextPageToken,files(id,name,mimeType,imageMediaMetadata(width,height))",
      pageSize: "1000",
    });
    if (pageToken) params.set("pageToken", pageToken);

    const res = await fetch(`${DRIVE_API}?${params}`, {
      // Next.js server cache with ISR — refetch at most once per hour.
      next: { revalidate: 3600 },
      headers: { "Cache-Control": "public, max-age=3600, stale-while-revalidate=3600" },
    });

    if (!res.ok) {
      let detail = "";
      try {
        const body = await res.json();
        detail = body.error?.message || "";
      } catch {
        /* ignore unreadable error body */
      }
      throw new Error(`Drive API ${res.status}${detail ? ": " + detail : ""}`);
    }

    const data = await res.json();
    for (const file of data.files ?? []) {
      images.push({
        id: file.id,
        width: file.imageMediaMetadata?.width ?? undefined,
        height: file.imageMediaMetadata?.height ?? undefined,
      });
    }
    pageToken = data.nextPageToken ?? undefined;
  } while (pageToken);

  return images;
}
