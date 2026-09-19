import { forwardRef } from "react";

const VARIANTS = {
  primary:
    "bg-primary-600 text-white shadow-soft hover:bg-primary-700 hover:shadow-soft-lg hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-primary-400",
  secondary:
    "bg-white text-primary-600 ring-1 ring-primary-100 hover:ring-primary-300 hover:-translate-y-0.5 hover:shadow-soft",
  outline:
    "bg-transparent text-white ring-1 ring-white/50 hover:bg-white/10 hover:-translate-y-0.5",
  teal:
    "bg-teal-500 text-white shadow-soft hover:bg-teal-600 hover:shadow-soft-lg hover:-translate-y-0.5",
  ghost:
    "bg-transparent text-primary-600 hover:bg-primary-50",
};

const Button = forwardRef(
  ({ as: Component = "button", variant = "primary", className = "", children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-300 ease-out whitespace-nowrap ${VARIANTS[variant]} ${className}`}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Button.displayName = "Button";

export default Button;
