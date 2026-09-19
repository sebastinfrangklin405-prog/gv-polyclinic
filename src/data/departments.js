import { FaStethoscope, FaVenus, FaDeaf, FaUserMd } from "react-icons/fa";

// Keep this list in sync with the doctors on staff (see doctors.js) — the
// Appointment form filters doctors by department, so listing a specialty
// with no matching doctor leaves patients with an empty doctor dropdown.
export const DEPARTMENTS = [
  {
    id: "general-medicine",
    icon: FaStethoscope,
    name: "General Medicine",
    description:
      "Comprehensive diagnosis and treatment for everyday illnesses, chronic conditions, and preventive care.",
  },
  {
    id: "gynecology",
    icon: FaVenus,
    name: "Gynecology",
    description:
      "Compassionate women's health services covering prenatal care, wellness exams, and consultations.",
  },
  {
    id: "ent",
    icon: FaDeaf,
    name: "ENT",
    description:
      "Specialized care for ear, nose, and throat conditions with modern diagnostic equipment.",
  },
  {
    id: "urology",
    icon: FaUserMd,
    name: "Urology",
    description:
      "Specialized diagnosis and treatment for kidney, bladder, and urinary tract conditions.",
  },
];
