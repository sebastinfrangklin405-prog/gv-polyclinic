import { useMemo, useRef, useState } from "react";
import {
  FaWhatsapp,
  FaEnvelope,
  FaArrowRight,
  FaArrowLeft,
  FaExclamationCircle,
  FaCheckCircle,
  FaPhoneAlt,
} from "react-icons/fa";
import SectionHeading from "../ui/SectionHeading";
import Button from "../ui/Button";
import { DEPARTMENTS } from "../../data/departments";
import { DOCTORS } from "../../data/doctors";
import { PRIMARY_PHONE, CLINIC } from "../../data/clinic";
import {
  buildBookingMessage,
  whatsAppBookingUrl,
  mailtoBookingUrl,
} from "../../lib/booking";

const INITIAL = {
  department: "",
  doctor: "",
  date: "",
  time: "",
  name: "",
  phone: "",
  email: "",
  reason: "",
};

const TODAY = new Date().toISOString().split("T")[0];
const MAX_DATE = new Date(Date.now() + 90 * 86_400_000).toISOString().split("T")[0];

// Only what the clinic genuinely needs to call you back. The old form required
// all eight fields including an email address and a written reason, which is a
// lot of friction for something a phone call resolves in thirty seconds.
const STEPS = [
  { id: 1, title: "Who and when", fields: ["department", "doctor", "date", "time"] },
  { id: 2, title: "Your details", fields: ["name", "phone", "email", "reason"] },
];

const LABELS = {
  department: "Department",
  doctor: "Doctor",
  date: "Preferred date",
  time: "Preferred time",
  name: "Your name",
  phone: "Mobile number",
  email: "Email address",
  reason: "Reason for visit",
};

function validate(values) {
  const errors = {};

  if (!values.department) errors.department = "Choose the department you need.";

  if (!values.date) {
    errors.date = "Choose a preferred date.";
  } else if (values.date < TODAY) {
    errors.date = "That date has already passed.";
  }

  if (!values.time) errors.time = "Choose a preferred time.";

  if (values.name.trim().length < 2) errors.name = "Enter your full name.";

  if (!/^[0-9]{10}$/.test(values.phone.replace(/\s/g, ""))) {
    errors.phone = "Enter a 10-digit mobile number so we can confirm by phone.";
  }

  // Optional — but validated if supplied.
  if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "That email address doesn't look right.";
  }

  return errors;
}

const inputClass = (hasError) =>
  `w-full min-h-11 rounded-xl border bg-white px-4 py-3 text-base text-ink-900 transition-colors
   focus:outline-none focus:ring-2 focus:ring-brand-200 ${
     hasError
       ? "border-danger-border focus:border-danger"
       : "border-ink-200 focus:border-brand-400"
   }`;

function Field({ id, label, error, hint, optional, children }) {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy = [hint && hintId, error && errorId].filter(Boolean).join(" ");

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-ink-700">
        {label}
        {optional && (
          <span className="ml-1.5 font-normal text-ink-500">(optional)</span>
        )}
      </label>

      {hint && (
        <p id={hintId} className="text-xs text-ink-500">
          {hint}
        </p>
      )}

      {children({
        id,
        "aria-describedby": describedBy || undefined,
        "aria-invalid": error ? true : undefined,
      })}

      {/* Icon plus text, never colour alone — the brand is red, so redness
          cannot be what marks an error. */}
      {error && (
        <p id={errorId} className="flex items-start gap-1.5 text-sm font-semibold text-danger">
          <FaExclamationCircle className="mt-0.5 shrink-0" size={13} />
          {error}
        </p>
      )}
    </div>
  );
}

export default function Booking({ seed }) {
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const summaryRef = useRef(null);
  const stepHeadingRef = useRef(null);
  const confirmationRef = useRef(null);

  // Seeded by the Care section when a department or doctor is chosen there.
  // Adjusted during render rather than in an effect — React's documented
  // pattern for deriving state from a prop, and it avoids the extra render
  // pass that would briefly show the unseeded form.
  const [lastSeed, setLastSeed] = useState(seed);
  if (seed !== lastSeed) {
    setLastSeed(seed);
    if (seed?.department || seed?.doctor) {
      setValues((prev) => ({
        ...prev,
        department: seed.department || prev.department,
        doctor: seed.doctor || "",
      }));
    }
  }

  const availableDoctors = useMemo(() => {
    if (!values.department) return DOCTORS;
    const department = DEPARTMENTS.find((item) => item.id === values.department);
    return DOCTORS.filter((doctor) => doctor.specialization === department?.name);
  }, [values.department]);

  const update = (field) => (event) => {
    const { value } = event.target;
    setValues((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "department" ? { doctor: "" } : {}),
    }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const currentStep = STEPS.find((item) => item.id === step);

  const goToStep = (next) => {
    setStep(next);
    // Focus the new step's heading so a screen reader announces the change
    // rather than leaving focus on a button that has just disappeared.
    requestAnimationFrame(() => stepHeadingRef.current?.focus());
  };

  const handleNext = () => {
    const all = validate(values);
    const stepErrors = Object.fromEntries(
      Object.entries(all).filter(([field]) => currentStep.fields.includes(field))
    );

    setErrors(stepErrors);

    if (Object.keys(stepErrors).length > 0) {
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    goToStep(2);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      // Send the patient back to the step holding the first problem.
      const firstBadStep = STEPS.find((item) =>
        item.fields.some((field) => nextErrors[field])
      );
      if (firstBadStep && firstBadStep.id !== step) setStep(firstBadStep.id);
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    window.open(whatsAppBookingUrl(values), "_blank", "noopener,noreferrer");
    setSubmitted(true);
    requestAnimationFrame(() => confirmationRef.current?.focus());
  };

  const errorList = Object.entries(errors).filter(([, message]) => Boolean(message));

  if (submitted) {
    return (
      <section id="booking" aria-labelledby="booking-heading" className="section-pad bg-surface-50">
        <div className="container-page">
          <div
            ref={confirmationRef}
            tabIndex={-1}
            role="status"
            className="card mx-auto flex max-w-xl flex-col items-center gap-5 p-8 text-center sm:p-10"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-50 text-accent-600">
              <FaCheckCircle size={26} />
            </span>

            <h2 id="booking-heading" className="text-2xl font-bold text-ink-900">
              Your request is ready to send
            </h2>

            {/* Deliberately not "Appointment confirmed". Nothing is confirmed
                until the clinic calls back, and saying otherwise is how the
                old version misled people. */}
            <p className="text-base text-ink-600">
              WhatsApp should have opened with your details filled in —{" "}
              <strong className="font-semibold text-ink-900">press send</strong> to
              deliver it. Our front desk will call you to confirm the slot.
            </p>

            <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
              <Button
                as="a"
                href={whatsAppBookingUrl(values)}
                target="_blank"
                rel="noopener noreferrer"
                variant="accent"
              >
                <FaWhatsapp size={16} /> Open WhatsApp again
              </Button>
              <Button as="a" href={PRIMARY_PHONE.href} variant="secondary">
                <FaPhoneAlt size={13} /> Call instead
              </Button>
            </div>

            <details className="w-full text-left">
              <summary className="tap inline-flex cursor-pointer items-center text-sm font-semibold text-brand-700">
                View what you sent
              </summary>
              <pre className="mt-3 overflow-x-auto whitespace-pre-wrap rounded-xl bg-surface-100 p-4 text-sm text-ink-700">
                {buildBookingMessage(values)}
              </pre>
            </details>

            <button
              type="button"
              onClick={() => {
                setValues(INITIAL);
                setStep(1);
                setSubmitted(false);
              }}
              className="tap text-sm font-semibold text-ink-600 underline hover:text-brand-700"
            >
              Book another appointment
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" aria-labelledby="booking-heading" className="section-pad bg-surface-50">
      <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <div className="flex flex-col gap-6">
          <SectionHeading
            id="booking-heading"
            align="left"
            eyebrow="Book an Appointment"
            title="Request a visit in under a minute"
            description="Tell us who you need to see and when. Sending opens WhatsApp with your request ready to go, and our front desk calls you back to confirm."
          />

          <ul className="flex flex-col gap-3 rounded-xl bg-white p-5 shadow-e1 ring-1 ring-ink-100 sm:p-6">
            {[
              "No account, no password, no waiting on hold",
              "Choose your department, doctor and time",
              "We confirm by phone — usually the same day",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-ink-700">
                <FaCheckCircle className="mt-0.5 shrink-0 text-accent-600" size={14} />
                {item}
              </li>
            ))}
          </ul>

          <p className="text-sm text-ink-600">
            Urgent concern?{" "}
            <a
              href={PRIMARY_PHONE.href}
              className="font-bold text-brand-700 underline underline-offset-2"
            >
              Call {PRIMARY_PHONE.display}
            </a>{" "}
            — {CLINIC.name} is open 24 hours.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="card flex flex-col gap-6 p-5 shadow-e2 sm:p-8"
        >
          {/* Progress. aria-current marks the live step for assistive tech. */}
          <ol className="flex items-center gap-3" aria-label="Booking progress">
            {STEPS.map((item) => {
              const isCurrent = item.id === step;
              const isDone = item.id < step;
              return (
                <li key={item.id} className="flex flex-1 items-center gap-2.5">
                  <span
                    aria-current={isCurrent ? "step" : undefined}
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                      isCurrent || isDone
                        ? "bg-brand-600 text-white"
                        : "bg-surface-100 text-ink-500"
                    }`}
                  >
                    {isDone ? <FaCheckCircle size={14} /> : item.id}
                  </span>
                  <span
                    className={`truncate text-sm font-semibold ${
                      isCurrent ? "text-ink-900" : "text-ink-500"
                    }`}
                  >
                    {item.title}
                  </span>
                </li>
              );
            })}
          </ol>

          {/* Error summary, focused on failed submit. Each entry links to its
              field, so a keyboard user reaches the problem in one press. */}
          {errorList.length > 0 && (
            <div
              ref={summaryRef}
              tabIndex={-1}
              role="alert"
              className="rounded-xl border border-danger-border bg-danger-bg p-4"
            >
              <p className="flex items-center gap-2 text-sm font-bold text-danger">
                <FaExclamationCircle size={14} />
                {errorList.length === 1
                  ? "There is one problem to fix"
                  : `There are ${errorList.length} problems to fix`}
              </p>
              <ul className="mt-2 flex flex-col gap-1">
                {errorList.map(([field, message]) => (
                  <li key={field}>
                    <a
                      href={`#booking-${field}`}
                      className="text-sm font-semibold text-danger underline underline-offset-2"
                    >
                      {LABELS[field]}: {message}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <h3
            ref={stepHeadingRef}
            tabIndex={-1}
            className="text-lg font-bold text-ink-900 outline-none"
          >
            {currentStep.title}
          </h3>

          {step === 1 ? (
            <div className="flex flex-col gap-5">
              <Field id="booking-department" label={LABELS.department} error={errors.department}>
                {(props) => (
                  <select
                    {...props}
                    value={values.department}
                    onChange={update("department")}
                    className={inputClass(errors.department)}
                  >
                    <option value="">Choose a department</option>
                    {DEPARTMENTS.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                )}
              </Field>

              <Field
                id="booking-doctor"
                label={LABELS.doctor}
                error={errors.doctor}
                optional
                hint="Leave this as 'No preference' and we'll assign the next available doctor."
              >
                {(props) => (
                  <select
                    {...props}
                    value={values.doctor}
                    onChange={update("doctor")}
                    className={inputClass(errors.doctor)}
                  >
                    <option value="">No preference</option>
                    {availableDoctors.map((doctor) => (
                      <option key={doctor.id} value={doctor.id}>
                        {doctor.name} — {doctor.role}
                      </option>
                    ))}
                  </select>
                )}
              </Field>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="booking-date" label={LABELS.date} error={errors.date}>
                  {(props) => (
                    <input
                      {...props}
                      type="date"
                      min={TODAY}
                      max={MAX_DATE}
                      value={values.date}
                      onChange={update("date")}
                      className={inputClass(errors.date)}
                    />
                  )}
                </Field>

                <Field
                  id="booking-time"
                  label={LABELS.time}
                  error={errors.time}
                  hint="We're open 24 hours."
                >
                  {(props) => (
                    <input
                      {...props}
                      type="time"
                      value={values.time}
                      onChange={update("time")}
                      className={inputClass(errors.time)}
                    />
                  )}
                </Field>
              </div>

              <Button type="button" onClick={handleNext} size="lg" className="w-full">
                Continue <FaArrowRight size={13} />
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              <Field id="booking-name" label={LABELS.name} error={errors.name}>
                {(props) => (
                  <input
                    {...props}
                    type="text"
                    autoComplete="name"
                    value={values.name}
                    onChange={update("name")}
                    placeholder="Full name"
                    className={inputClass(errors.name)}
                  />
                )}
              </Field>

              <Field
                id="booking-phone"
                label={LABELS.phone}
                error={errors.phone}
                hint="We call this number to confirm your slot."
              >
                {(props) => (
                  <input
                    {...props}
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    value={values.phone}
                    onChange={update("phone")}
                    placeholder="10-digit mobile number"
                    className={inputClass(errors.phone)}
                  />
                )}
              </Field>

              <Field id="booking-email" label={LABELS.email} error={errors.email} optional>
                {(props) => (
                  <input
                    {...props}
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={update("email")}
                    placeholder="you@example.com"
                    className={inputClass(errors.email)}
                  />
                )}
              </Field>

              <Field
                id="booking-reason"
                label={LABELS.reason}
                error={errors.reason}
                optional
                hint="A sentence is plenty — it helps us allocate enough time."
              >
                {(props) => (
                  <textarea
                    {...props}
                    rows={3}
                    value={values.reason}
                    onChange={update("reason")}
                    placeholder="Briefly describe your symptoms or reason for the visit"
                    className={`${inputClass(errors.reason)} resize-y`}
                  />
                )}
              </Field>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  type="button"
                  onClick={() => goToStep(1)}
                  variant="secondary"
                  size="lg"
                  className="sm:w-auto"
                >
                  <FaArrowLeft size={13} /> Back
                </Button>
                <Button type="submit" variant="accent" size="lg" className="flex-1">
                  <FaWhatsapp size={17} /> Send via WhatsApp
                </Button>
              </div>

              <p className="text-center text-xs text-ink-500">
                Opens WhatsApp with your request prefilled. Prefer email?{" "}
                <a
                  href={mailtoBookingUrl(values)}
                  className="inline-flex items-center gap-1 font-semibold text-brand-700 underline underline-offset-2"
                >
                  <FaEnvelope size={10} /> Send it by email
                </a>
              </p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
