import { useRef } from "react";

/**
 * ARIA tablist with a roving tabindex.
 *
 * Only the selected tab is in the tab order; arrow keys move between them, so
 * a keyboard user reaches the panel with one Tab press instead of stepping
 * through every department. Activation follows focus, which is correct here
 * because switching panels is instant and has no side effects.
 *
 * Scrolls horizontally with snap points below `sm`, where the full set will
 * not fit — nothing is hidden at any width.
 */
export default function Tabs({ items, active, onChange, label, idPrefix }) {
  const refs = useRef([]);

  const onKeyDown = (event) => {
    const index = items.findIndex((item) => item.id === active);
    let next = null;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      next = (index + 1) % items.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      next = (index - 1 + items.length) % items.length;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = items.length - 1;
    }

    if (next === null) return;

    event.preventDefault();
    onChange(items[next].id);
    refs.current[next]?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label={label}
      onKeyDown={onKeyDown}
      className="scroll-row -mx-4 gap-2 px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
    >
      {items.map((item, index) => {
        const isActive = item.id === active;
        const Icon = item.icon;

        return (
          <button
            key={item.id}
            ref={(node) => {
              refs.current[index] = node;
            }}
            type="button"
            role="tab"
            id={`${idPrefix}-tab-${item.id}`}
            aria-selected={isActive}
            aria-controls={`${idPrefix}-panel-${item.id}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(item.id)}
            className={`tap inline-flex items-center gap-2 rounded-full border px-4 text-sm font-bold transition-colors ${
              isActive
                ? "border-brand-600 bg-brand-600 text-white"
                : "border-ink-200 bg-white text-ink-700 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
            }`}
          >
            {Icon && <Icon size={15} className="shrink-0" />}
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
