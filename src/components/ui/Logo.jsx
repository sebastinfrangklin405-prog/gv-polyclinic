export default function Logo({ className = "" }) {
  return (
    <a
      href="#home"
      className={`group flex items-center shrink-0 ${className}`}
      aria-label="GV Polyclinic — Home"
    >
      <span className="inline-flex items-center justify-center rounded-2xl bg-white p-1.5 shadow-soft ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-105">
        <img src="/logo.png" alt="GV Polyclinic" className="h-9 w-9 object-contain sm:h-11 sm:w-11" />
      </span>
    </a>
  );
}
