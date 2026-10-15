const DEFAULT_MESSAGE =
  "Hello Abrhythm Music, I'd like to enquire about training.";

/** Convert a Nigerian 0-prefixed number to a wa.me link with prefilled text. */
export function waLink(nationalNumber: string, message: string = DEFAULT_MESSAGE): string {
  const digits = nationalNumber.replace(/\D/g, "").replace(/^0/, "234");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_PRIMARY = waLink("0909 899 5532");
export const WHATSAPP_ALT = waLink("0905 537 3659");
export const WHATSAPP_MESSAGE = DEFAULT_MESSAGE;

/** Prefilled WhatsApp enquiry naming a specific training service. */
export function waEnquire(serviceTitle: string): string {
  return waLink(
    "0909 899 5532",
    `Hello Abrhythm Music, I'd like to enquire about ${serviceTitle}.`,
  );
}
