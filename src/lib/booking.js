import { CLINIC, WHATSAPP_URL } from "../data/clinic";
import { DEPARTMENTS } from "../data/departments";
import { DOCTORS } from "../data/doctors";

/**
 * Turns a booking form into a message the clinic actually receives.
 *
 * The previous form called console.info and then told the patient
 * "Appointment Request Received!" — nobody at the clinic was ever notified.
 * On a medical site that is the worst kind of bug, because it fails silently
 * and the patient believes they are booked.
 *
 * WhatsApp is the handoff because the clinic already publishes that number,
 * it needs no backend, and the patient keeps a copy of what they sent.
 */

function formatDate(value) {
  if (!value) return "Not specified";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatTime(value) {
  if (!value) return "Not specified";
  const [hours, minutes] = value.split(":").map(Number);
  if (Number.isNaN(hours)) return value;
  const period = hours >= 12 ? "PM" : "AM";
  const display = hours % 12 === 0 ? 12 : hours % 12;
  return `${display}:${String(minutes).padStart(2, "0")} ${period}`;
}

export function buildBookingMessage(values) {
  const department = DEPARTMENTS.find((item) => item.id === values.department);
  const doctor = DOCTORS.find((item) => item.id === values.doctor);

  return [
    `Appointment request — ${CLINIC.name}`,
    "",
    `Name: ${values.name}`,
    `Phone: ${values.phone}`,
    values.email ? `Email: ${values.email}` : null,
    `Department: ${department?.name ?? "Not specified"}`,
    `Doctor: ${doctor?.name ?? "No preference"}`,
    `Preferred date: ${formatDate(values.date)}`,
    `Preferred time: ${formatTime(values.time)}`,
    values.reason ? `Reason: ${values.reason}` : null,
  ]
    .filter((line) => line !== null)
    .join("\n");
}

export function whatsAppBookingUrl(values) {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(buildBookingMessage(values))}`;
}

export function mailtoBookingUrl(values) {
  const subject = `Appointment request — ${values.name}`;
  const body = buildBookingMessage(values);
  return `mailto:${CLINIC.email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}
