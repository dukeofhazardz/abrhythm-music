export interface TrainingService {
  /** Measure number, e.g. "01". */
  index: string;
  slug: string;
  title: string;
  /** Verbatim body copy from content.md (may contain multiple paragraphs joined). */
  body: string[];
  bullets?: string[];
  outro?: string;
}

/**
 * All 10 training services. Wording kept from content.md —
 * only restructured for web scannability. No facts invented.
 */
export const trainingServices: TrainingService[] = [
  {
    index: "01",
    slug: "drumming-percussion",
    title: "Drumming & Percussion Training",
    body: [
      "Abrhythm Music provides structured training in drumming and percussion, taking learners from foundational rudiments to more advanced playing techniques. Training covers rhythm development, coordination, timing, practical performance and percussion skills.",
    ],
  },
  {
    index: "02",
    slug: "piano-keyboard",
    title: "Piano & Keyboard Training",
    body: [
      "Our piano and keyboard training covers the fundamentals of playing, including understanding the black and white keys, basic music concepts, chords, scales, accompaniment and progressive techniques from beginner to advanced levels.",
    ],
  },
  {
    index: "03",
    slug: "wind-instruments",
    title: "Wind Instrument Training",
    body: [
      "We provide training for learners interested in wind instruments, including:",
    ],
    bullets: [
      "Saxophone",
      "Flute",
      "Trumpet",
      "Clarinet",
      "Trombone",
      "And other wind instruments",
    ],
    outro:
      "Training focuses on proper sound production, technique, breath control, musical expression and practical performance.",
  },
  {
    index: "04",
    slug: "guitar-strings",
    title: "Guitar & Strings Training",
    body: [
      "Our guitar and strings training introduces learners to the fundamentals of string instruments and progressively develops their technique, rhythm, coordination, musical understanding and performance ability.",
    ],
  },
  {
    index: "05",
    slug: "voice-vocal-development",
    title: "Voice Training & Vocal Development",
    body: [
      "We provide structured vocal training for individuals, schools, churches, choirs and groups.",
      "Training includes vocal development, breathing, pitch, vocal patterns, voice control, harmony and performance across different musical styles and genres.",
    ],
  },
  {
    index: "06",
    slug: "kids-music-early-development",
    title: "Kids Music Training & Early Music Development",
    body: [
      "Kids Music Training is one of Abrhythm Music’s key areas of specialization.",
      "Our children’s music programme is designed to introduce young learners to music in an engaging, practical and age-appropriate environment.",
      "Training may include:",
    ],
    bullets: [
      "Musical awareness and listening",
      "Rhythm and coordination",
      "Singing and vocal development",
      "Introduction to musical instruments",
      "Basic keyboard, guitar and drumming",
      "Ear training",
      "Age-appropriate music theory",
      "Music games and creative activities",
      "Group music activities",
      "Performance confidence and stage exposure",
    ],
    outro:
      "The programme is designed to help children discover their musical interests early, build confidence and develop a strong foundation for further musical training.",
  },
  {
    index: "07",
    slug: "live-band-stage-performance",
    title: "Live Band & Stage Performance Training",
    body: [
      "This training focuses on the practical skills required for live musical performance.",
      "Learners develop stage confidence, ensemble coordination, audience awareness, communication, performance discipline and the ability to respond effectively to different audiences and performance environments.",
    ],
  },
  {
    index: "08",
    slug: "marching-band",
    title: "Marching Band Training",
    body: [
      "Our marching band training develops musical performance, discipline, coordination, movement and teamwork.",
      "The programme includes marching techniques, parade performance and percussion, with applications for schools, churches, organizations and other institutions.",
    ],
  },
  {
    index: "09",
    slug: "songwriting-composition",
    title: "Songwriting & Composition Training",
    body: [
      "We help aspiring songwriters develop their ability to create meaningful and original songs.",
      "Training covers lyric writing, songwriting structure, creative expression, storytelling and the development of rich lyrical content across themes such as love, passion, inspiration, motivation, healing and salvation.",
    ],
  },
  {
    index: "10",
    slug: "oratory-public-speaking",
    title: "Oratory & Public Speaking Training",
    body: [
      "This programme develops effective communication and public presentation skills.",
      "Training includes public speaking, Master of Ceremonies (MC) skills, language and communication style, phonetic pronunciation, Queen’s English and Nigerian Standard English, paralinguistics, eye movement, body language and confident presentation.",
    ],
  },
];
