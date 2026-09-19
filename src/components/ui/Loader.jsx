import { AnimatePresence, motion } from "framer-motion";

export default function Loader({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-white"
        >
          <div className="relative flex h-16 w-16 items-center justify-center">
            <span className="absolute inset-0 rounded-full border-4 border-primary-100" />
            <span className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-primary-600" />
            <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" aria-hidden="true">
              <path d="M12 3v18M3 12h18" stroke="#0d5c9e" strokeWidth="3.2" strokeLinecap="round" />
            </svg>
          </div>
          <p className="text-sm font-semibold tracking-wide text-primary-600">GV Polyclinic</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
