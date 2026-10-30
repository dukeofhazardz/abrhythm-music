/**
 * Primary navigation — single source of truth for link order and targets.
 *
 * Order (desktop and mobile): Training, Kids, Approach, About, Gallery, Contact.
 *
 * Section links (Training … Contact) are home-page anchors. On "/" they render
 * as bare hashes; from any other route they resolve to "/#hash" so the visitor
 * navigates home and scrolls to the section (Lenis header offset applied by
 * the click handler). Gallery is a separate route ("/gallery") and always uses
 * next/link.
 */
export type NavLink = {
  label: string;
  /** Home-page section anchor, e.g. "#training". */
  hash: string;
  /** Separate route, e.g. "/gallery". Undefined for section links. */
  href?: string;
};

export const NAV_LINKS: readonly NavLink[] = [
  { label: "Training", hash: "#training" },
  { label: "Kids", hash: "#kids" },
  { label: "Approach", hash: "#approach" },
  { label: "About", hash: "#about" },
  { label: "Gallery", hash: "#gallery", href: "/gallery" },
  { label: "Contact", hash: "#contact" },
] as const;

/**
 * Resolve a nav link to an href for the current route.
 * Gallery always links to /gallery. Section anchors point at the current
 * page on "/"; elsewhere they resolve to the home page with the section hash.
 */
export function resolveNavHref(link: NavLink, pathname: string): string {
  if (link.href) return link.href;
  return pathname === "/" ? link.hash : `/${link.hash}`;
}

/** Returns true when the link represents the currently active route. */
export function isNavLinkActive(link: NavLink, pathname: string): boolean {
  if (link.href) return pathname === link.href;
  return false;
}
