const avatar = (name, bg) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${bg}&color=fff&size=160&bold=true&length=2`;

export const TESTIMONIALS = [
  {
    name: "Meera Iyer",
    role: "Patient since 2021",
    rating: 5,
    avatar: avatar("Meera Iyer", "0d5c9e"),
    quote:
      "GV Polyclinic has been our family's go-to for everything from routine checkups to my son's vaccinations. The doctors genuinely listen.",
  },
  {
    name: "Arvind Menon",
    role: "Cardiology Patient",
    rating: 5,
    avatar: avatar("Arvind Menon", "0fb3a0"),
    quote:
      "Booking was effortless and Dr. Nair took the time to explain every step of my treatment. It's rare to find this level of care.",
  },
  {
    name: "Fathima Sheikh",
    role: "Senior Health Package",
    rating: 5,
    avatar: avatar("Fathima Sheikh", "2fae63"),
    quote:
      "The senior citizen package caught an issue early that we might have missed otherwise. Truly grateful for the thorough screening.",
  },
  {
    name: "Vikram Desai",
    role: "Orthopedics Patient",
    rating: 4,
    avatar: avatar("Vikram Desai", "14609e"),
    quote:
      "From physiotherapy to follow-ups, the team coordinated my entire recovery plan seamlessly. Highly recommend this clinic.",
  },
  {
    name: "Sneha Pillai",
    role: "Patient since 2019",
    rating: 5,
    avatar: avatar("Sneha Pillai", "0c9587"),
    quote:
      "Clean, modern, and welcoming. The staff always make me feel comfortable, and the pharmacy on-site saves so much time.",
  },
];
