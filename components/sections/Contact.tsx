"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  AlertCircle,
  ArrowUpRight,
  Check,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { useState, type FormEvent } from "react";
import { Container } from "@/components/layout/Container";
import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { contact } from "@/data/contact";
import { otherServices } from "@/data/otherServices";
import { trainingServices } from "@/data/services";
import { cn } from "@/lib/cn";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";
import { waLink } from "@/lib/whatsapp";

const INTERESTS = [
  ...trainingServices.map((service) => service.title),
  ...otherServices.map((service) => service.title),
];

const WHO_FOR = [
  { value: "my-child", label: "My child" },
  { value: "myself", label: "Myself" },
  { value: "a-school", label: "A school" },
  { value: "a-church", label: "A church" },
  { value: "an-organization", label: "An organization" },
] as const;

type WhoForValue = (typeof WHO_FOR)[number]["value"];

/* TODO: replace "#" hrefs with the real Facebook / Instagram / TikTok
   profile URLs for Abrhythm Music. */
const SOCIALS = [
  { label: "Facebook", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "TikTok", href: "#" },
] as const;

const MAPS_QUERY = "69A Aba-Owerri Road, Umungasi, Aba";
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAPS_QUERY)}`;

function toTel(display: string): string {
  return `tel:+234${display.replace(/\D/g, "").slice(1)}`;
}

interface FormState {
  name: string;
  phone: string;
  interest: string;
  whoFor: WhoForValue | "";
  message: string;
}

const EMPTY_FORM: FormState = {
  name: "",
  phone: "",
  interest: "",
  whoFor: "",
  message: "",
};

type Errors = Partial<Record<"name" | "phone" | "interest" | "whoFor", string>>;

function validate(form: FormState): Errors {
  const errors: Errors = {};
  if (form.name.trim().length < 2) {
    errors.name = "Please tell us your name.";
  }
  if (form.phone.replace(/\D/g, "").length < 7) {
    errors.phone = "Please enter a valid phone or WhatsApp number.";
  }
  if (!form.interest) {
    errors.interest = "Please choose what you are interested in.";
  }
  if (!form.whoFor) {
    errors.whoFor = "Please tell us who this is for.";
  }
  return errors;
}

const inputClass =
  "min-h-[52px] w-full border border-ink/25 bg-paper px-4 py-3 text-ink placeholder:text-ink-soft/60 focus:border-accent-deep";

export function Contact() {
  const reduce = useReducedMotionSafe();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [handOffUrl, setHandOffUrl] = useState("");

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key as keyof Errors]) return prev;
      const next = { ...prev };
      delete next[key as keyof Errors];
      return next;
    });
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    const failed = Object.keys(nextErrors) as (keyof Errors)[];
    if (failed.length > 0) {
      // Move keyboard and screen-reader focus to the first invalid field.
      const targets: Record<keyof Errors, string> = {
        name: "enquiry-name",
        phone: "enquiry-phone",
        interest: "enquiry-interest",
        whoFor: "enquiry-whofor-group",
      };
      const first = document.getElementById(targets[failed[0]]);
      // Native focus scroll only — Lenis syncs to it without fighting.
      first?.focus({ preventScroll: false });
      return;
    }

    const whoLabel = WHO_FOR.find((option) => option.value === form.whoFor)?.label ?? form.whoFor;
    const lines = [
      "Hello Abrhythm Music, I'd like to make an enquiry.",
      `Name: ${form.name.trim()}`,
      `Phone/WhatsApp: ${form.phone.trim()}`,
      `Interested in: ${form.interest}`,
      `This is for: ${whoLabel}`,
    ];
    if (form.message.trim()) {
      lines.push(`Message: ${form.message.trim()}`);
    }
    const url = waLink("0909 899 5532", lines.join("\n"));
    setHandOffUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
    setSent(true);
  }

  function reset() {
    setForm(EMPTY_FORM);
    setErrors({});
    setSent(false);
    setHandOffUrl("");
  }

  return (
    <section id="contact" aria-label="Contact and enrolment" className="scroll-mt-20 border-t border-ink/10 bg-paper py-24 text-ink md:py-32">
      <Container>
        <Reveal>
          <p className="mono-label text-accent-deep">07 / Enrol & Contact</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="type-display-xl mt-6 max-w-[14ch] text-accent-deep">
            <SplitText text="Contact Abrhythm Music" stagger={0.05} />
          </h2>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mt-6 max-w-[65ch] leading-relaxed text-ink-soft">
            {contact.enquiryNote}
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Details */}
          <Reveal className="lg:col-span-5">
            <div className="space-y-8">
              <div>
                <p className="mono-label flex items-center gap-2 text-accent-deep">
                  <MapPin size={14} strokeWidth={2} aria-hidden="true" />
                  Visit
                </p>
                <address className="mt-3 leading-relaxed not-italic">
                  {contact.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </div>

              <div>
                <p className="mono-label flex items-center gap-2 text-accent-deep">
                  <Phone size={14} strokeWidth={2} aria-hidden="true" />
                  Call or chat
                </p>
                <ul className="mt-3 space-y-3">
                  {contact.phones.map((phone) => (
                    <li key={phone} className="flex flex-wrap items-center gap-x-4 gap-y-2">
                      <a
                        href={toTel(phone)}
                        className="pressable link-underline inline-flex min-h-[44px] items-center font-medium whitespace-nowrap tabular-nums hover:text-accent-deep"
                      >
                        {phone}
                      </a>
                      <a
                        href={waLink(phone)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Chat with Abrhythm Music on ${phone} via WhatsApp`}
                        className="pressable link-underline inline-flex min-h-[44px] items-center gap-1.5 text-sm text-ink-soft hover:text-accent-deep"
                      >
                        <MessageCircle size={15} strokeWidth={2} aria-hidden="true" />
                        WhatsApp
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="mono-label text-accent-deep">Follow</p>
                <ul className="mt-3 space-y-2">
                  {SOCIALS.map((social) => (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        aria-label={`${social.label} Abrhythm Music (link coming soon)`}
                        className="pressable group inline-flex min-h-[44px] items-center gap-2"
                      >
                        <span className="mono-label w-24 text-ink-soft transition-colors duration-200 ease-out group-hover:text-ink">
                          {social.label}
                        </span>{" "}
                        <span className="link-underline">Abrhythm Music</span>
                        <ArrowUpRight
                          size={15}
                          strokeWidth={2}
                          aria-hidden="true"
                          className="text-accent-deep"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Map placeholder */}
              <div
                data-map-slot="abrhythm-studio"
                className="relative overflow-hidden border border-ink/15 bg-paper-2"
              >
                <div aria-hidden="true" className="beat-grid absolute inset-0 text-ink opacity-15" />
                <div className="relative p-6 md:p-7">
                  <p className="mono-label flex items-center gap-2 text-accent-deep">
                    <MapPin size={14} strokeWidth={2} aria-hidden="true" />
                    Find us
                  </p>
                  <p className="mt-3 font-medium">{MAPS_QUERY}</p>
                  <p className="mono-label mt-1 text-ink-soft">Map preview coming soon</p>
                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pressable mt-5 inline-flex min-h-[48px] items-center gap-2 border border-ink/30 px-5 py-2.5 text-sm font-medium transition-colors duration-200 ease-out hover:border-ink"
                  >
                    Get directions
                    <ArrowUpRight size={15} strokeWidth={2} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Enquiry form */}
          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="border border-ink/15 p-6 md:p-9">
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 12 }}
                    animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="flex min-h-[420px] flex-col items-start justify-center"
                    role="status"
                  >
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-accent-deep text-paper">
                      <Check size={26} strokeWidth={2.5} aria-hidden="true" />
                    </span>
                    <h3 className="type-display-lg mt-6 text-accent-deep">Enquiry ready.</h3>
                    <p className="mt-4 max-w-[52ch] leading-relaxed text-ink-soft">
                      Your details have been composed into a WhatsApp message. If
                      WhatsApp did not open, use the button below.
                    </p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                      <Magnetic>
                        <a
                          href={handOffUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="pressable inline-flex min-h-[52px] items-center justify-center gap-2 bg-accent-deep px-7 py-3.5 font-medium whitespace-nowrap text-paper"
                        >
                          <MessageCircle size={16} strokeWidth={2} aria-hidden="true" />
                          Open WhatsApp again
                        </a>
                      </Magnetic>
                      <button
                        type="button"
                        onClick={reset}
                        className="pressable inline-flex min-h-[52px] items-center justify-center border border-ink/30 px-7 py-3.5 font-medium whitespace-nowrap transition-colors duration-200 ease-out hover:border-ink"
                      >
                        Send another enquiry
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    noValidate
                    onSubmit={onSubmit}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
                    animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    aria-label="Training enquiry form"
                  >
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="enquiry-name" className="mb-2 block font-medium">
                          Name <span aria-hidden="true" className="text-accent-deep">*</span>
                          <span className="sr-only">(required)</span>
                        </label>
                        <input
                          id="enquiry-name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          value={form.name}
                          onChange={(event) => set("name", event.target.value)}
                          aria-invalid={Boolean(errors.name) || undefined}
                          aria-describedby={errors.name ? "enquiry-name-error" : undefined}
                          placeholder="Your full name"
                          className={cn(
                            inputClass,
                            errors.name && "border-ink",
                          )}
                        />
                        {errors.name ? (
                          <p id="enquiry-name-error" role="alert" className="mt-2 flex items-start gap-1.5 text-sm font-medium text-ink">
                            <AlertCircle size={16} strokeWidth={2} aria-hidden="true" className="mt-0.5 shrink-0" />
                            {errors.name}
                          </p>
                        ) : null}
                      </div>

                      <div>
                        <label htmlFor="enquiry-phone" className="mb-2 block font-medium">
                          Phone / WhatsApp <span aria-hidden="true" className="text-accent-deep">*</span>
                          <span className="sr-only">(required)</span>
                        </label>
                        <input
                          id="enquiry-phone"
                          name="phone"
                          type="tel"
                          autoComplete="tel"
                          value={form.phone}
                          onChange={(event) => set("phone", event.target.value)}
                          aria-invalid={Boolean(errors.phone) || undefined}
                          aria-describedby={errors.phone ? "enquiry-phone-error" : undefined}
                          placeholder="0800 000 0000"
                          className={cn(
                            inputClass,
                            errors.phone && "border-ink",
                          )}
                        />
                        {errors.phone ? (
                          <p id="enquiry-phone-error" role="alert" className="mt-2 flex items-start gap-1.5 text-sm font-medium text-ink">
                            <AlertCircle size={16} strokeWidth={2} aria-hidden="true" className="mt-0.5 shrink-0" />
                            {errors.phone}
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <div className="mt-6">
                      <label htmlFor="enquiry-interest" className="mb-2 block font-medium">
                        I&apos;m interested in <span aria-hidden="true" className="text-accent-deep">*</span>
                        <span className="sr-only">(required)</span>
                      </label>
                      <select
                        id="enquiry-interest"
                        name="interest"
                        value={form.interest}
                        onChange={(event) => set("interest", event.target.value)}
                        aria-invalid={Boolean(errors.interest) || undefined}
                        aria-describedby={errors.interest ? "enquiry-interest-error" : undefined}
                        className={cn(
                          inputClass,
                          !form.interest && "text-ink-soft/60",
                          errors.interest && "border-ink",
                        )}
                      >
                        <option value="" disabled>
                          Choose a programme
                        </option>
                        {INTERESTS.map((interest) => (
                          <option key={interest} value={interest}>
                            {interest}
                          </option>
                        ))}
                      </select>
                      {errors.interest ? (
                        <p id="enquiry-interest-error" role="alert" className="mt-2 flex items-start gap-1.5 text-sm font-medium text-ink">
                          <AlertCircle size={16} strokeWidth={2} aria-hidden="true" className="mt-0.5 shrink-0" />
                          {errors.interest}
                        </p>
                      ) : null}
                    </div>

                    <fieldset className="mt-6">
                      <legend className="mb-2 font-medium">
                        Who is this for? <span aria-hidden="true" className="text-accent-deep">*</span>
                        <span className="sr-only">(required)</span>
                      </legend>
                      <div className="flex flex-wrap gap-2" role="group" id="enquiry-whofor-group" tabIndex={-1} aria-describedby={errors.whoFor ? "enquiry-whofor-error" : undefined}>
                        {WHO_FOR.map((option) => {
                          const selected = form.whoFor === option.value;
                          return (
                            <label
                              key={option.value}
                              className={cn(
                                "pressable inline-flex min-h-[48px] cursor-pointer items-center border px-5 py-2.5 text-sm font-medium transition-colors duration-200 ease-out",
                                selected
                                  ? "border-ink bg-ink text-paper"
                                  : "border-ink/25 hover:border-ink",
                              )}
                            >
                              <input
                                type="radio"
                                name="whoFor"
                                value={option.value}
                                checked={selected}
                                onChange={() => set("whoFor", option.value)}
                                className="sr-only"
                              />
                              {option.label}
                            </label>
                          );
                        })}
                      </div>
                      {errors.whoFor ? (
                        <p id="enquiry-whofor-error" role="alert" className="mt-2 flex items-start gap-1.5 text-sm font-medium text-ink">
                          <AlertCircle size={16} strokeWidth={2} aria-hidden="true" className="mt-0.5 shrink-0" />
                          {errors.whoFor}
                        </p>
                      ) : null}
                    </fieldset>

                    <div className="mt-6">
                      <label htmlFor="enquiry-message" className="mb-2 block font-medium">
                        Message <span className="font-normal text-ink-soft">(optional)</span>
                      </label>
                      <textarea
                        id="enquiry-message"
                        name="message"
                        rows={4}
                        value={form.message}
                        onChange={(event) => set("message", event.target.value)}
                        placeholder="Tell us about your goals, schedule, or questions"
                        className={cn(inputClass, "resize-y")}
                      />
                    </div>

                    <Magnetic className="mt-8">
                      <button
                        type="submit"
                        className="pressable inline-flex min-h-[52px] items-center justify-center gap-2 bg-accent-deep px-8 py-3.5 font-medium whitespace-nowrap text-paper"
                      >
                        <Send size={16} strokeWidth={2} aria-hidden="true" />
                        Send via WhatsApp
                      </button>
                    </Magnetic>
                    <p className="mono-label mt-4 text-ink-soft">
                      Opens WhatsApp with your enquiry pre-filled
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
