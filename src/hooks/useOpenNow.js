import { useEffect, useState } from "react";
import { CLINIC } from "../data/clinic";

/**
 * Live open/closed status, evaluated in the clinic's timezone rather than the
 * visitor's — a patient checking from another timezone must see whether the
 * clinic is open, not whether it is open where they are.
 */

function clinicLocalTime() {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: CLINIC.hours.timezone,
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
      .formatToParts(new Date())
      .map((part) => [part.type, part.value])
  );

  // Some engines emit "24" for midnight with hour12: false.
  const hour = Number(parts.hour) % 24;

  return {
    weekday: parts.weekday,
    minutes: hour * 60 + Number(parts.minute),
  };
}

function toMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function computeStatus() {
  if (CLINIC.hours.alwaysOpen) {
    return { open: true, label: "Open now", detail: "24 hours, every day" };
  }

  const { weekday, minutes } = clinicLocalTime();
  const today = CLINIC.hours.days.find((entry) => entry.day === weekday);

  if (!today) {
    return { open: false, label: "Closed today", detail: "See full hours" };
  }

  const opens = toMinutes(today.opens);
  const closes = toMinutes(today.closes);
  const open = minutes >= opens && minutes <= closes;

  return {
    open,
    label: open ? "Open now" : "Closed now",
    detail: open ? `Until ${today.closes}` : `Opens ${today.opens}`,
  };
}

export function useOpenNow() {
  const [status, setStatus] = useState(computeStatus);

  useEffect(() => {
    // Nothing to recompute if the clinic never closes.
    if (CLINIC.hours.alwaysOpen) return;

    const id = setInterval(() => setStatus(computeStatus()), 60_000);
    return () => clearInterval(id);
  }, []);

  return status;
}
