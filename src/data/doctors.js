const avatar = (name, bg) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${bg}&color=fff&size=320&font-size=0.36&bold=true&length=2`;

export const DOCTORS = [
  {
    id: "dr-ananya-rao",
    name: "Dr. Ananya Rao",
    qualification: "MBBS, MD (General Medicine)",
    specialization: "General Medicine",
    experience: "12+ years experience",
    availability: "Mon, Wed, Fri · 9 AM – 4 PM",
    image: avatar("Ananya Rao", "0d5c9e"),
  },
  {
    id: "dr-rohan-mehta",
    name: "Dr. Rohan Mehta",
    qualification: "MBBS, DCH",
    specialization: "Pediatrics",
    experience: "9+ years experience",
    availability: "Mon – Sat · 10 AM – 6 PM",
    image: avatar("Rohan Mehta", "0fb3a0"),
  },
  {
    id: "dr-priya-nair",
    name: "Dr. Priya Nair",
    qualification: "MBBS, DM (Cardiology)",
    specialization: "Cardiology",
    experience: "15+ years experience",
    availability: "Tue, Thu, Sat · 11 AM – 5 PM",
    image: avatar("Priya Nair", "2fae63"),
  },
  {
    id: "dr-karan-singh",
    name: "Dr. Karan Singh",
    qualification: "MBBS, MS (Ortho)",
    specialization: "Orthopedics",
    experience: "10+ years experience",
    availability: "Mon, Tue, Thu · 9 AM – 3 PM",
    image: avatar("Karan Singh", "14609e"),
  },
  {
    id: "dr-neha-kapoor",
    name: "Dr. Neha Kapoor",
    qualification: "MBBS, MD (Dermatology)",
    specialization: "Dermatology",
    experience: "8+ years experience",
    availability: "Wed – Sat · 10 AM – 5 PM",
    image: avatar("Neha Kapoor", "0c9587"),
  },
  {
    id: "dr-sanjay-verma",
    name: "Dr. Sanjay Verma",
    qualification: "MBBS, DNB (Gynecology)",
    specialization: "Gynecology",
    experience: "14+ years experience",
    availability: "Mon – Fri · 9 AM – 2 PM",
    image: avatar("Sanjay Verma", "f5a623"),
  },
];
