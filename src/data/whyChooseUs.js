import {
  FaUserMd,
  FaLayerGroup,
  FaHeart,
  FaHospital,
  FaFileInvoiceDollar,
  FaCalendarCheck,
  FaMapMarkerAlt,
  FaHandHoldingMedical,
} from "react-icons/fa";
import { DEPARTMENTS } from "./departments";

export const WHY_CHOOSE_US = [
  {
    icon: FaUserMd,
    title: "Qualified Medical Team",
    description: "Skilled doctors dedicated to accurate, patient-first care.",
  },
  {
    icon: FaLayerGroup,
    title: "Multiple Specialties",
    // No "+" — there are exactly this many departments, and "4+" reads as
    // "more than four" on a page where the four are listed by name.
    description: `${DEPARTMENTS.length} departments under one roof, so care is coordinated and convenient.`,
  },
  {
    icon: FaHeart,
    title: "Patient-Centered Care",
    description: "Every treatment plan is built around your comfort and long-term wellbeing.",
  },
  {
    icon: FaHospital,
    title: "Modern Facilities",
    description: "Advanced diagnostic and treatment infrastructure across the clinic.",
  },
  {
    icon: FaFileInvoiceDollar,
    title: "Transparent Services",
    description: "Clear pricing and honest guidance with no hidden costs, ever.",
  },
  {
    icon: FaCalendarCheck,
    title: "Easy Appointment Booking",
    description: "Book online in minutes and get confirmation without the wait.",
  },
  {
    icon: FaMapMarkerAlt,
    title: "Convenient Location",
    description: "Centrally located with easy access and on-site parking.",
  },
  {
    icon: FaHandHoldingMedical,
    title: "Personalized Attention",
    description: "Unhurried consultations that focus on you, not just your symptoms.",
  },
];
