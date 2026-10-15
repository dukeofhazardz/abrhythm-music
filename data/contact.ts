export interface SocialHandle {
  label: string;
  handle: string;
}

/** Contact details — verbatim from content.md. No facts invented. */
export const contact = {
  strapline:
    "Training • Creative Arts • Performance • Mentorship • Artiste Development",
  addressLines: [
    "69A Aba-Owerri Road,",
    "Beside Rosevine Hospital,",
    "Umungasi, Aba, Abia State, Nigeria.",
  ],
  phones: ["0909 899 5532", "0905 537 3659"],
  socials: [
    { label: "Facebook", handle: "Abrhythm Music" },
    { label: "Instagram", handle: "Abrhythm Music" },
    { label: "TikTok", handle: "Abrhythm Music" },
  ] as SocialHandle[],
  enquiryNote:
    "For enquiries, registration, training and partnership opportunities: Contact Abrhythm Music",
} as const;
