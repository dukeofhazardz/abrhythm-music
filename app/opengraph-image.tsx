import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { contact } from "@/data/contact";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social share card: deep green spread, lime pulse line, motto in serif. */
export default async function OpengraphImage() {
  // Solid-background lockup in a white badge: the dark artwork needs a
  // light ground to read on the green card.
  const logo = await readFile(join(process.cwd(), "public/images/logo.png"), "base64");
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 96px",
          background: "#00602B",
          color: "#ffffff",
          fontFamily: "Georgia, serif",
          position: "relative",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/png;base64,${logo}`}
          alt=""
          width={300}
          height={246}
          style={{ position: "absolute", top: 72, right: 88, width: 300, height: 246, borderRadius: 24 }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontFamily: "monospace",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#A8E817",
          }}
        >
          <div style={{ width: 14, height: 14, background: "#A8E817" }} />
          {site.name} — Aba, Nigeria
        </div>
        <div style={{ fontSize: 118, lineHeight: 1.05, marginTop: 28 }}>
          Rhythm is in you.
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: 8,
            marginTop: 44,
          }}
        >
          {[18, 30, 46, 30, 22, 40, 58, 40, 26, 34, 52, 34, 24, 30, 44, 28, 20].map(
            (h, i) => (
              <div
                key={i}
                style={{
                  width: 10,
                  height: h,
                  background: i >= 5 && i <= 8 ? "#A8E817" : "#F7FAF5",
                }}
              />
            ),
          )}
        </div>
        <div
          style={{
            marginTop: 32,
            fontFamily: "monospace",
            fontSize: 20,
            letterSpacing: 2,
            color: "#F7FAF5",
          }}
        >
          {contact.strapline}
        </div>
      </div>
    ),
    { ...size },
  );
}
