import { useMemo } from "react";
import {
  FaGraduationCap,
  FaRegClock,
  FaLanguage,
  FaCheck,
  FaArrowRight,
  FaHeadset,
  FaPhoneAlt,
} from "react-icons/fa";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";
import Button from "../ui/Button";
import Tabs from "../ui/Tabs";
import Monogram from "../ui/Monogram";
import { DEPARTMENTS } from "../../data/departments";
import { DOCTORS } from "../../data/doctors";
import { SERVICES } from "../../data/services";
import { PRIMARY_PHONE } from "../../data/clinic";

/**
 * Replaces three consecutive sections — Departments, Doctors and Services —
 * that were the same card grid rendered with different data.
 *
 * Picking a department now filters the doctors beneath it and seeds the
 * booking form. That link previously existed only inside the form's select
 * elements, and the old department cards said "View Details" while linking
 * straight to the booking form, which was simply untrue.
 */

/**
 * "Dr. S. Vignesh" -> "Dr. Vignesh".
 *
 * The button used to take the first two words, which produced "Book with
 * Dr. S." — it dropped the surname for every doctor written with an initial,
 * and here that is most of them.
 */
function shortName(fullName) {
  const withoutTitle = fullName.replace(/^(Dr|Prof|Mr|Mrs|Ms)\.?\s+/i, "");
  const title = fullName.slice(0, fullName.length - withoutTitle.length).trim();
  const surname = withoutTitle.split(/\s+/).filter(Boolean).pop();
  return [title, surname].filter(Boolean).join(" ");
}

function DoctorCard({ doctor, department, onBook }) {
  const details = [
    doctor.experienceYears && {
      icon: FaCheck,
      text: `${doctor.experienceYears} years' experience`,
    },
    doctor.timings && { icon: FaRegClock, text: doctor.timings },
    doctor.languages?.length && {
      icon: FaLanguage,
      text: doctor.languages.join(", "),
    },
  ].filter(Boolean);

  return (
    /* One vertical layout at every width. .card-grid caps tracks at 21rem, so
       the card is never wide enough to justify a second arrangement. */
    <article className="card flex h-full flex-col transition-shadow duration-[--dur-base] hover:shadow-e2">
      <div className="flex flex-col gap-4 p-4">
        <div className="mx-auto w-28 shrink-0 overflow-hidden rounded-xl">
          {doctor.image ? (
            <img
              src={doctor.image}
              alt=""
              width={320}
              height={400}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
          ) : (
            <Monogram name={doctor.name} className="aspect-[4/5] w-full" />
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-2 text-center">
          <div>
            <h4 className="text-lg font-bold text-ink-900">{doctor.name}</h4>
            <p className="text-sm font-semibold text-brand-700">{doctor.role}</p>
          </div>

          <p className="flex items-start justify-center gap-2 text-sm text-ink-600">
            <FaGraduationCap className="mt-1 shrink-0 text-ink-500" size={13} />
            <span>{doctor.qualification}</span>
          </p>

          {details.length > 0 && (
            <ul className="flex flex-col gap-1.5 text-sm text-ink-600">
              {details.map(({ icon: Icon, text }) => (
                <li
                  key={text}
                  className="flex items-start justify-center gap-2"
                >
                  <Icon className="mt-1 shrink-0 text-accent-600" size={12} />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="mt-auto border-t border-ink-100 p-4">
        <Button
          as="a"
          href="#booking"
          onClick={() => onBook(doctor, department.id)}
          size="sm"
          className="w-full"
        >
          Book with {shortName(doctor.name)}
        </Button>
      </div>
    </article>
  );
}

function HelpTile({ hasDoctors, department }) {
  return (
    <div className="flex h-full flex-col justify-center gap-3 rounded-lg border border-dashed border-ink-200 bg-surface-50 p-5 text-center">
      <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand-700 shadow-e1">
        <FaHeadset size={18} />
      </span>

      <div>
        <h4 className="text-base font-bold text-ink-900">
          {hasDoctors ? "Not sure who to see?" : "No doctor listed yet"}
        </h4>
        <p className="mt-1 text-sm text-ink-600">
          {hasDoctors
            ? `Our front desk will match you to the right ${department.name} doctor — or book with no preference and we'll assign the next available one.`
            : `Call us and our front desk will arrange the right ${department.name} consultation.`}
        </p>
      </div>

      <div className="mt-1 flex flex-col gap-2">
        <Button as="a" href={PRIMARY_PHONE.href} variant="secondary" size="sm">
          <FaPhoneAlt size={12} /> {PRIMARY_PHONE.display}
        </Button>
        {hasDoctors && (
          <a
            href="#booking"
            className="inline-flex min-h-11 items-center justify-center text-sm font-semibold text-brand-700 underline underline-offset-2"
          >
            Book with no preference
          </a>
        )}
      </div>
    </div>
  );
}

export default function Care({ activeDepartment, onDepartmentChange, onBookDoctor }) {
  const department = useMemo(
    () => DEPARTMENTS.find((dept) => dept.id === activeDepartment) ?? DEPARTMENTS[0],
    [activeDepartment]
  );

  const doctors = useMemo(
    () => DOCTORS.filter((doctor) => doctor.specializations.includes(department.name)),
    [department]
  );

  return (
    <section id="care" aria-labelledby="care-heading" className="section-pad bg-white">
      <div className="container-page flex flex-col gap-10">
        <SectionHeading
          id="care-heading"
          eyebrow="Our Care"
          title="Find the right specialist for you"
          description={`Choose a department to see the doctors who practise there. Every specialty is under one roof, so your records and referrals never leave the building.`}
        />

        <Reveal className="flex flex-col gap-8">
          <Tabs
            idPrefix="care"
            label="Departments"
            items={DEPARTMENTS.map((dept) => ({
              id: dept.id,
              label: dept.name,
              icon: dept.icon,
            }))}
            active={department.id}
            onChange={onDepartmentChange}
          />

          <div
            role="tabpanel"
            id={`care-panel-${department.id}`}
            aria-labelledby={`care-tab-${department.id}`}
            tabIndex={-1}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-3 rounded-xl bg-surface-50 p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-6">
              <div className="measure">
                <h3 className="text-xl font-bold text-ink-900">{department.name}</h3>
                <p className="mt-1 text-sm text-ink-600">{department.description}</p>
              </div>
              <Button
                as="a"
                href="#booking"
                variant="secondary"
                size="sm"
                className="shrink-0 self-start sm:self-auto"
              >
                Book in {department.name}
                <FaArrowRight size={11} />
              </Button>
            </div>

            {/* The helper tile is always the last cell. Most departments here
                have one doctor, and a lone card with an empty row beside it
                reads as a rendering fault; a second, genuinely useful tile
                makes the row look intentional at any number of doctors — and
                covers the patient who does not know who to ask for. */}
            <div className="card-grid">
              {doctors.map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  doctor={doctor}
                  department={department}
                  onBook={onBookDoctor}
                />
              ))}
              <HelpTile hasDoctors={doctors.length > 0} department={department} />
            </div>
          </div>
        </Reveal>

        {/* Services are clinic-wide rather than department-specific, so they
            are presented as such instead of being split up speculatively. */}
        <Reveal className="flex flex-col gap-6 border-t border-ink-100 pt-10">
          <div className="measure">
            <h3 className="text-2xl font-bold text-ink-900">
              Available across every department
            </h3>
            <p className="mt-2 text-base text-ink-600">
              Diagnostics, pharmacy and follow-up care all happen in the same
              building as your consultation.
            </p>
          </div>

          <ul className="auto-grid-sm">
            {SERVICES.map(({ icon: Icon, title, description }) => (
              <li
                key={title}
                className="flex items-start gap-3 rounded-xl border border-ink-100 bg-white p-4 transition-colors hover:border-brand-200 hover:bg-brand-50/40"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-50 text-accent-700">
                  <Icon size={16} />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-bold text-ink-900">{title}</span>
                  <span className="mt-0.5 block text-sm text-ink-600">{description}</span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
