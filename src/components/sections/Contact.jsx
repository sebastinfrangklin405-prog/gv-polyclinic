import { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaPhone, FaMobileAlt, FaEnvelope, FaClock, FaWhatsapp, FaCheckCircle } from "react-icons/fa";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";
import Button from "../ui/Button";

const CLINIC_ADDRESS = "64/58, Kamarajar Salai, Bishop Garden, Raja Annamalaipuram, Chennai, Tamil Nadu 600028";
const MAP_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(CLINIC_ADDRESS)}&output=embed`;

const CONTACT_DETAILS = [
  {
    icon: FaMapMarkerAlt,
    label: "Address",
    value: CLINIC_ADDRESS,
  },
  {
    icon: FaPhoneAlt,
    label: "Phone",
    numbers: [
      { icon: FaMobileAlt, value: "+91 86103 51469", href: "tel:+918610351469" },
      { icon: FaPhone, value: "044 4816 1589", href: "tel:04448161589" },
    ],
  },
  {
    icon: FaEnvelope,
    label: "Email",
    value: "care@gvpolyclinic.example",
    href: "mailto:care@gvpolyclinic.example",
  },
  {
    icon: FaClock,
    label: "Working Hours",
    value: "Open 24 hours",
  },
];

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = "Enter a valid email.";
  if (!values.message.trim() || values.message.trim().length < 8) errors.message = "Please add a short message.";
  return errors;
}

export default function Contact() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const update = (field) => (e) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      // Frontend-only demo: wire this up to a contact API/email service when available.
      setSent(true);
      setValues({ name: "", email: "", message: "" });
    }
  };

  return (
    <section id="contact" className="section-pad bg-white">
      <div className="container-clinic flex flex-col gap-12">
        <SectionHeading
          eyebrow="Contact"
          title="We'd love to hear from you"
          description="Reach out for appointments, questions, or feedback — our team responds quickly."
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <Reveal direction="right" className="flex flex-col gap-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {CONTACT_DETAILS.map(({ icon: Icon, label, value, href, numbers }) => (
                <div key={label} className="flex items-start gap-3 rounded-2xl bg-primary-50/50 p-5 ring-1 ring-primary-100">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-primary-600 shadow-soft">
                    <Icon size={16} />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-ink-300">{label}</p>
                    {numbers ? (
                      <div className="flex flex-col gap-1">
                        {numbers.map((n) => (
                          <a
                            key={n.href}
                            href={n.href}
                            className="flex items-center gap-1.5 text-sm font-semibold text-ink-900 hover:text-primary-600"
                          >
                            <n.icon size={12} className="shrink-0 text-primary-400" />
                            {n.value}
                          </a>
                        ))}
                      </div>
                    ) : href ? (
                      <a href={href} className="text-sm font-semibold text-ink-900 hover:text-primary-600">
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm font-semibold text-ink-900">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Button as="a" href="tel:+918610351469" variant="primary">
                <FaPhoneAlt size={13} /> Call Now
              </Button>
              <Button
                as="a"
                href="https://wa.me/918610351469"
                target="_blank"
                rel="noopener noreferrer"
                variant="teal"
              >
                <FaWhatsapp size={16} /> WhatsApp
              </Button>
              <Button as="a" href="#appointment" variant="secondary">
                Book Appointment
              </Button>
            </div>

            <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-primary-50 ring-1 ring-primary-100">
              <iframe
                title="GV Polyclinic location"
                src={MAP_EMBED_SRC}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>

          <Reveal direction="left">
            {sent ? (
              <div className="flex h-full flex-col items-center justify-center gap-4 rounded-3xl bg-primary-50/60 p-10 text-center ring-1 ring-primary-100">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-mint-500 text-white">
                  <FaCheckCircle size={24} />
                </span>
                <h3 className="text-xl font-bold text-ink-900">Message Sent!</h3>
                <p className="text-ink-500">Thanks for reaching out — we'll get back to you shortly.</p>
                <Button variant="primary" onClick={() => setSent(false)}>
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex h-full flex-col gap-5 rounded-3xl bg-white p-6 shadow-soft-lg ring-1 ring-primary-50 sm:p-8">
                <label className="flex flex-col gap-1.5">
                  <span className="text-sm font-semibold text-ink-700">Your Name</span>
                  <input
                    type="text"
                    value={values.name}
                    onChange={update("name")}
                    placeholder="Full name"
                    className={`w-full rounded-xl border px-4 py-3 text-sm text-ink-900 placeholder:text-ink-300 focus:outline-none focus:ring-2 ${
                      errors.name ? "border-rose-300 focus:ring-rose-200" : "border-primary-100 focus:border-primary-400 focus:ring-primary-100"
                    }`}
                  />
                  {errors.name && <span className="text-xs font-medium text-rose-500">{errors.name}</span>}
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="text-sm font-semibold text-ink-700">Email Address</span>
                  <input
                    type="email"
                    value={values.email}
                    onChange={update("email")}
                    placeholder="you@example.com"
                    className={`w-full rounded-xl border px-4 py-3 text-sm text-ink-900 placeholder:text-ink-300 focus:outline-none focus:ring-2 ${
                      errors.email ? "border-rose-300 focus:ring-rose-200" : "border-primary-100 focus:border-primary-400 focus:ring-primary-100"
                    }`}
                  />
                  {errors.email && <span className="text-xs font-medium text-rose-500">{errors.email}</span>}
                </label>

                <label className="flex flex-1 flex-col gap-1.5">
                  <span className="text-sm font-semibold text-ink-700">Message</span>
                  <textarea
                    rows={6}
                    value={values.message}
                    onChange={update("message")}
                    placeholder="How can we help?"
                    className={`h-full w-full resize-none rounded-xl border px-4 py-3 text-sm text-ink-900 placeholder:text-ink-300 focus:outline-none focus:ring-2 ${
                      errors.message ? "border-rose-300 focus:ring-rose-200" : "border-primary-100 focus:border-primary-400 focus:ring-primary-100"
                    }`}
                  />
                  {errors.message && <span className="text-xs font-medium text-rose-500">{errors.message}</span>}
                </label>

                <Button type="submit" variant="primary" className="w-full text-base">
                  Send Message
                </Button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
