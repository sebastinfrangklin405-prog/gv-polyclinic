import {
  FaStethoscope,
  FaVenus,
  FaBaby,
  FaTint,
  FaAllergies,
  FaDeaf,
  FaUserMd,
} from "react-icons/fa";

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
    id: "paediatrics",
    icon: FaBaby,
    name: "Paediatrics",
    description:
      "Child health from newborn checks and vaccinations through to growth, nutrition and childhood illnesses.",
  },
  {
    id: "diabetology",
    icon: FaTint,
    name: "Diabetology",
    description:
      "Diagnosis, monitoring and long-term management of diabetes, including diet guidance and follow-up reviews.",
  },
  {
    id: "dermatology",
    icon: FaAllergies,
    name: "Dermatology",
    description:
      "Treatment for skin, hair and nail concerns — from acne, rashes and allergies to infections and pigmentation.",
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
