import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";
import { TESTIMONIALS } from "../../data/testimonials";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const go = useCallback((next) => {
    setDirection(next > index || (index === TESTIMONIALS.length - 1 && next === 0) ? 1 : -1);
    setIndex(next);
  }, [index]);

  const next = useCallback(() => go((index + 1) % TESTIMONIALS.length), [go, index]);
  const prev = useCallback(() => go((index - 1 + TESTIMONIALS.length) % TESTIMONIALS.length), [go, index]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 5500);
    return () => clearInterval(id);
  }, [next, paused]);

  const testimonial = TESTIMONIALS[index];

  return (
    <section id="testimonials" className="section-pad bg-white">
      <div className="container-clinic flex flex-col gap-12">
        <SectionHeading
          eyebrow="Testimonials"
          title="What our patients say"
          description="Real feedback from the people we care for every day. Replace with verified reviews as they come in."
        />

        <div
          className="relative mx-auto w-full max-w-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-primary-50/50 p-8 ring-1 ring-primary-100 sm:p-12">
              <FaQuoteLeft className="absolute right-8 top-8 text-4xl text-primary-100" />
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={testimonial.name}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -40 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex flex-col items-center gap-5 text-center"
                >
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="h-16 w-16 rounded-full ring-4 ring-white shadow-soft"
                  />
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar key={i} size={14} className={i < testimonial.rating ? "" : "text-ink-300/40"} />
                    ))}
                  </div>
                  <p className="max-w-xl text-base leading-relaxed text-ink-700 sm:text-lg">
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <p className="font-bold text-ink-900">{testimonial.name}</p>
                    <p className="text-sm text-ink-500">{testimonial.role}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>

          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonial"
            className="absolute left-0 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary-600 shadow-soft-lg ring-1 ring-primary-50 transition-transform hover:scale-105 max-sm:static max-sm:mt-6 max-sm:translate-x-0 max-sm:translate-y-0"
          >
            <FaChevronLeft size={14} />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            className="absolute right-0 top-1/2 flex h-11 w-11 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-white text-primary-600 shadow-soft-lg ring-1 ring-primary-50 transition-transform hover:scale-105 max-sm:static max-sm:mt-6 max-sm:translate-x-0 max-sm:translate-y-0"
          >
            <FaChevronRight size={14} />
          </button>

          <div className="mt-8 flex items-center justify-center gap-2">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.name}
                type="button"
                onClick={() => go(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index ? "w-7 bg-primary-600" : "w-2 bg-primary-100 hover:bg-primary-200"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
