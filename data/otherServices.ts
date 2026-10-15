export interface OtherService {
  slug: string;
  title: string;
  body: string[];
}

/** Wording kept verbatim from content.md “Other Services”. */
export const otherServices: OtherService[] = [
  {
    slug: "artiste-management-development",
    title: "Artiste Management & Development",
    body: [
      "Abrhythm Music provides artiste management and development support, helping artistes with branding, professional development, structured agreements, responsibilities and other aspects of their career development.",
    ],
  },
  {
    slug: "mentorship-programme",
    title: "Mentorship Programme",
    body: [
      "Our mentorship programme provides closer guidance and development for students who require more personalized attention beyond conventional training.",
      "The programme is designed to provide deeper mentorship, practical guidance, accountability and continuous development for selected students.",
    ],
  },
];
