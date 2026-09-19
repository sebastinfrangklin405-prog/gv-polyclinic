import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaWhatsapp,
  FaRegClock,
  FaChevronDown,
  FaDirections,
  FaWheelchair,
  FaCar,
  FaLanguage,
  FaEnvelope,
} from "react-icons/fa";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";
import Button from "../ui/Button";
import MapEmbed from "../ui/MapEmbed";
import { FAQS } from "../../data/faq";
import {
  CLINIC,
  FULL_ADDRESS,
  PRIMARY_PHONE,
  WHATSAPP_URL,
  DIRECTIONS_URL,
} from "../../data/clinic";
import { useOpenNow } from "../../hooks/useOpenNow";

/**
 * Contact and FAQ merged into one "how do I actually get seen" section.
 *
 * The old Contact section carried a message form that, like the booking form,
 * went nowhere — it set a "Message Sent!" state and discarded the message.
 * Rather than replace one dead form with another, this offers the channels the
 * clinic genuinely monitors: phone, WhatsApp, and walking in.
 */

function FaqItem({ faq, index, isOpen, onToggle }) {
  const prefersReducedMotion = useReducedMotion();
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <div
      className={`rounded-xl border transition-colors duration-[--dur-base] ${
        isOpen ? "border-brand-200 bg-brand-50/50" : "border-ink-100 bg-white"
      }`}
    >
      <h4>
        <button
          id={buttonId}
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
        >
          <span className="text-base font-semibold text-ink-900">{faq.question}</span>
          <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-[--dur-base] ${
              isOpen ? "rotate-180 bg-brand-600 text-white" : "bg-surface-100 text-ink-600"
            }`}
          >
            <FaChevronDown size={12} />
          </span>
        </button>
      </h4>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-4 text-sm text-ink-600">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Visit() {
  const [openIndex, setOpenIndex] = useState(0);
  const status = useOpenNow();

  // Parking and step-free access are both stated in the clinic's own existing
  // content (whyChooseUs.js and facilities.js). Languages are not recorded
  // anywhere, so that row simply does not render until someone fills it in.
  const practicalities = [
    { icon: FaCar, label: "On-site parking" },
    { icon: FaWheelchair, label: "Step-free access" },
    CLINIC.languages.length > 0 && {
      icon: FaLanguage,
      label: CLINIC.languages.join(", "),
    },
  ].filter(Boolean);

  return (
    <section id="visit" aria-labelledby="visit-heading" className="section-pad bg-surface-50">
      <div className="container-page flex flex-col gap-10">
        <SectionHeading
          id="visit-heading"
          eyebrow="Visit Us"
          title="Everything you need to get here"
          description="Walk in any time, or call ahead and we'll have your file ready. No referral is needed for a general consultation."
        />

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <Reveal className="flex flex-col gap-6">
            <h3 className="sr-only">Getting here</h3>

            {/* Hours as a real, structured statement rather than one line of
                prose buried in a card. */}
            <div className="card flex flex-col gap-4 p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h4 className="flex items-center gap-2.5 text-base font-bold text-ink-900">
                  <FaRegClock className="text-brand-600" size={16} />
                  Opening hours
                </h4>
                <span
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${
                    status.open
                      ? "bg-accent-50 text-accent-700"
                      : "bg-surface-100 text-ink-600"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      status.open ? "bg-accent-600" : "bg-ink-300"
                    }`}
                  />
                  {status.label}
                </span>
              </div>

              <table className="w-full text-sm">
                <caption className="sr-only">
                  Opening hours for each day of the week
                </caption>
                <tbody>
                  {CLINIC.hours.days.map((entry) => (
                    <tr key={entry.day} className="border-t border-ink-100 first:border-t-0">
                      <th scope="row" className="py-2 pr-4 text-left font-semibold text-ink-700">
                        {entry.day}
                      </th>
                      <td className="py-2 text-right font-semibold text-accent-700">
                        {CLINIC.hours.alwaysOpen ? "Open 24 hours" : `${entry.opens} – ${entry.closes}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="card flex flex-col gap-4 p-5 sm:p-6">
              <h4 className="flex items-center gap-2.5 text-base font-bold text-ink-900">
                <FaMapMarkerAlt className="text-brand-600" size={16} />
                Address
              </h4>
              <address className="not-italic text-sm text-ink-700">{FULL_ADDRESS}</address>

              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {practicalities.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-2 text-sm text-ink-600">
                    <Icon className="shrink-0 text-accent-600" size={14} />
                    {label}
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-2">
                {CLINIC.phones.map((phone) => (
                  <a
                    key={phone.href}
                    href={phone.href}
                    className="tap flex items-center gap-2.5 text-sm font-semibold text-ink-900 hover:text-brand-700"
                  >
                    <FaPhoneAlt className="shrink-0 text-brand-600" size={13} />
                    {phone.display}
                    <span className="font-normal text-ink-500">({phone.label})</span>
                  </a>
                ))}

                <a
                  href={`mailto:${CLINIC.email}`}
                  className="tap flex items-center gap-2.5 break-all text-sm font-semibold text-ink-900 hover:text-brand-700"
                >
                  <FaEnvelope className="shrink-0 text-brand-600" size={13} />
                  {CLINIC.email}
                </a>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button as="a" href={PRIMARY_PHONE.href} size="sm">
                  <FaPhoneAlt size={12} /> Call now
                </Button>
                <Button
                  as="a"
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="accent"
                  size="sm"
                >
                  <FaWhatsapp size={15} /> WhatsApp
                </Button>
                <Button
                  as="a"
                  href={DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  size="sm"
                >
                  <FaDirections size={13} /> Directions
                </Button>
              </div>
            </div>

            <MapEmbed />
          </Reveal>

          <Reveal className="flex flex-col gap-4">
            <h3 className="text-xl font-bold text-ink-900">Common questions</h3>

            <div className="flex flex-col gap-3">
              {FAQS.map((faq, index) => (
                <FaqItem
                  key={faq.question}
                  faq={faq}
                  index={index}
                  isOpen={openIndex === index}
                  onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
                />
              ))}
            </div>

            {/* The old copy promised "reach out to our front desk" without
                giving any way to do so. */}
            <div className="mt-2 flex flex-col gap-3 rounded-xl border border-ink-100 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-ink-700">
                <strong className="font-bold text-ink-900">Still unsure?</strong> Our
                front desk answers round the clock.
              </p>
              <Button as="a" href={PRIMARY_PHONE.href} size="sm" className="shrink-0">
                <FaPhoneAlt size={12} /> {PRIMARY_PHONE.display}
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
