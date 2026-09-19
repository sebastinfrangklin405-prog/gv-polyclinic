import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaUser, FaPhoneAlt, FaEnvelope, FaRegCalendarAlt, FaRegClock } from "react-icons/fa";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";
import Button from "../ui/Button";
import { DEPARTMENTS } from "../../data/departments";
import { DOCTORS } from "../../data/doctors";

const INITIAL_STATE = {
  name: "",
  phone: "",
  email: "",
  department: "",
  doctor: "",
  date: "",
  time: "",
  reason: "",
};

const TODAY = new Date().toISOString().split("T")[0];

function validate(values) {
  const errors = {};

  if (!values.name.trim() || values.name.trim().length < 2) {
    errors.name = "Please enter your full name.";
  }
  if (!/^[0-9]{10}$/.test(values.phone.trim())) {
    errors.phone = "Enter a valid 10-digit mobile number.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (!values.department) {
    errors.department = "Please select a department.";
  }
  if (!values.doctor) {
    errors.doctor = "Please select a doctor.";
  }
  if (!values.date) {
    errors.date = "Please choose a preferred date.";
  } else if (values.date < TODAY) {
    errors.date = "Date cannot be in the past.";
  }
  if (!values.time) {
    errors.time = "Please choose a preferred time.";
  }
  if (!values.reason.trim() || values.reason.trim().length < 5) {
    errors.reason = "Briefly describe the reason for your visit.";
  }

  return errors;
}

function Field({ label, error, children, icon: Icon }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-semibold text-ink-700">{label}</span>
      <span className="relative">
        {Icon && <Icon className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-300" size={15} />}
        {children}
      </span>
      {error && <span className="text-xs font-medium text-rose-500">{error}</span>}
    </label>
  );
}

const inputClass = (hasIcon, hasError) =>
  `w-full rounded-xl border bg-white py-3 ${hasIcon ? "pl-11" : "pl-4"} pr-4 text-sm text-ink-900 placeholder:text-ink-300 transition-colors focus:outline-none focus:ring-2 ${
    hasError ? "border-rose-300 focus:ring-rose-200" : "border-primary-100 focus:border-primary-400 focus:ring-primary-100"
  }`;

export default function AppointmentForm() {
  const [values, setValues] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const availableDoctors = useMemo(() => {
    if (!values.department) return DOCTORS;
    const dept = DEPARTMENTS.find((d) => d.id === values.department);
    return DOCTORS.filter((doc) => doc.specialization === dept?.name);
  }, [values.department]);

  const update = (field) => (e) => {
    const value = e.target.value;
    setValues((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "department" ? { doctor: "" } : {}),
    }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      // Frontend-only demo: no backend wired up yet.
      // Replace this block with an API call (e.g. POST /api/appointments) when a backend is available.
      console.info("Appointment request ready to submit:", values);
      setSubmitted(true);
      setValues(INITIAL_STATE);
    }
  };

  if (submitted) {
    return (
      <section id="appointment" className="section-pad bg-white">
        <div className="container-clinic">
          <Reveal className="mx-auto flex max-w-lg flex-col items-center gap-5 rounded-3xl bg-primary-50/60 p-10 text-center ring-1 ring-primary-100">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-mint-500 text-white">
              <FaCheckCircle size={28} />
            </span>
            <h3 className="text-2xl font-bold text-ink-900">Appointment Request Received!</h3>
            <p className="text-ink-500">
              Thank you for choosing GV Polyclinic. Our front desk will call you shortly to
              confirm your appointment details.
            </p>
            <Button variant="primary" onClick={() => setSubmitted(false)}>
              Book Another Appointment
            </Button>
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <section id="appointment" className="section-pad bg-white">
      <div className="container-clinic grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="flex flex-col gap-6">
          <SectionHeading
            align="left"
            eyebrow="Book an Appointment"
            title="Schedule your visit in minutes"
            description="Fill in your details and our team will confirm your appointment by phone or email. For urgent concerns, please call the clinic directly."
          />
          <div className="flex flex-col gap-4 rounded-2xl bg-primary-50/60 p-6 ring-1 ring-primary-100">
            {[
              "Confirmation within 2 working hours",
              "Reschedule anytime before your visit",
              "Choose your preferred doctor and time slot",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <FaCheckCircle className="mt-0.5 shrink-0 text-teal-500" />
                <span className="text-sm text-ink-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-5 rounded-3xl bg-white p-6 shadow-soft-lg ring-1 ring-primary-50 sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Patient Name" error={errors.name} icon={FaUser}>
              <input
                type="text"
                value={values.name}
                onChange={update("name")}
                placeholder="Full name"
                className={inputClass(true, errors.name)}
                aria-invalid={Boolean(errors.name)}
              />
            </Field>
            <Field label="Mobile Number" error={errors.phone} icon={FaPhoneAlt}>
              <input
                type="tel"
                inputMode="numeric"
                value={values.phone}
                onChange={update("phone")}
                placeholder="10-digit mobile number"
                className={inputClass(true, errors.phone)}
                aria-invalid={Boolean(errors.phone)}
              />
            </Field>
          </div>

          <Field label="Email Address" error={errors.email} icon={FaEnvelope}>
            <input
              type="email"
              value={values.email}
              onChange={update("email")}
              placeholder="you@example.com"
              className={inputClass(true, errors.email)}
              aria-invalid={Boolean(errors.email)}
            />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Select Department" error={errors.department}>
              <select
                value={values.department}
                onChange={update("department")}
                className={inputClass(false, errors.department)}
                aria-invalid={Boolean(errors.department)}
              >
                <option value="">Choose department</option>
                {DEPARTMENTS.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Select Doctor" error={errors.doctor}>
              <select
                value={values.doctor}
                onChange={update("doctor")}
                className={inputClass(false, errors.doctor)}
                aria-invalid={Boolean(errors.doctor)}
              >
                <option value="">Choose doctor</option>
                {availableDoctors.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {doc.name}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Preferred Date" error={errors.date} icon={FaRegCalendarAlt}>
              <input
                type="date"
                min={TODAY}
                value={values.date}
                onChange={update("date")}
                className={inputClass(true, errors.date)}
                aria-invalid={Boolean(errors.date)}
              />
            </Field>
            <Field label="Preferred Time" error={errors.time} icon={FaRegClock}>
              <input
                type="time"
                value={values.time}
                onChange={update("time")}
                className={inputClass(true, errors.time)}
                aria-invalid={Boolean(errors.time)}
              />
            </Field>
          </div>

          <Field label="Reason for Visit" error={errors.reason}>
            <textarea
              rows={4}
              value={values.reason}
              onChange={update("reason")}
              placeholder="Briefly describe your symptoms or reason for the visit"
              className={`${inputClass(false, errors.reason)} resize-none`}
              aria-invalid={Boolean(errors.reason)}
            />
          </Field>

          <Button type="submit" variant="primary" className="w-full text-base">
            Book Appointment
          </Button>
        </motion.form>
      </div>
    </section>
  );
}
