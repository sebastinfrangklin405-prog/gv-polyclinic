import { useState } from "react";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import Care from "./components/sections/Care";
import Booking from "./components/sections/Booking";
import About from "./components/sections/About";
import Facilities from "./components/sections/Facilities";
import Visit from "./components/sections/Visit";
import SkipLink from "./components/ui/SkipLink";
import BackToTop from "./components/ui/BackToTop";
import MobileActionBar from "./components/ui/MobileActionBar";
import { DEPARTMENTS } from "./data/departments";

export default function App() {
  // Shared between Care and Booking: choosing a department or a doctor in the
  // Care section carries that choice into the form, so nobody re-picks what
  // they just clicked. Previously the two only met inside the form's selects.
  const [activeDepartment, setActiveDepartment] = useState(DEPARTMENTS[0].id);
  const [bookingSeed, setBookingSeed] = useState({ department: "", doctor: "" });

  const handleDepartmentChange = (id) => {
    setActiveDepartment(id);
    setBookingSeed({ department: id, doctor: "" });
  };

  const handleBookDoctor = (doctor) => {
    const department = DEPARTMENTS.find((item) => item.name === doctor.specialization);
    setBookingSeed({ department: department?.id ?? "", doctor: doctor.id });
  };

  return (
    <>
      {/* The old build showed a blank white screen for a hardcoded 700ms before
          rendering anything. There is no loader here — the page is the loader. */}
      <SkipLink />
      <Header />

      <main id="main">
        <Hero />
        <Care
          activeDepartment={activeDepartment}
          onDepartmentChange={handleDepartmentChange}
          onBookDoctor={handleBookDoctor}
        />
        <Booking seed={bookingSeed} />
        <About />
        <Facilities />
        <Visit />
      </main>

      <Footer />

      {/* Keeps the fixed mobile action bar from covering the footer's last row. */}
      <div aria-hidden="true" className="h-16 lg:hidden" />

      <MobileActionBar />
      <BackToTop />
    </>
  );
}
