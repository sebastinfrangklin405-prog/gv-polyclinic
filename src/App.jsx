import { useEffect, useState } from "react";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import QuickInfo from "./components/sections/QuickInfo";
import About from "./components/sections/About";
import Departments from "./components/sections/Departments";
import Doctors from "./components/sections/Doctors";
import AppointmentForm from "./components/sections/AppointmentForm";
import Services from "./components/sections/Services";
import Facilities from "./components/sections/Facilities";
import WhyChooseUs from "./components/sections/WhyChooseUs";
import Testimonials from "./components/sections/Testimonials";
import FAQ from "./components/sections/FAQ";
import Contact from "./components/sections/Contact";
import BackToTop from "./components/ui/BackToTop";
import Loader from "./components/ui/Loader";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Loader show={loading} />
      <Header />
      <main>
        <Hero />
        <QuickInfo />
        <About />
        <Departments />
        <Doctors />
        <AppointmentForm />
        <Services />
        <Facilities />
        <WhyChooseUs />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
