# GV Polyclinic

A modern, responsive marketing site for GV Polyclinic — built with React 19, Vite, Tailwind CSS v4, and Framer Motion.

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build to dist/
npm run preview  # preview the production build
npm run lint      # oxlint
```

## Project structure

```
src/
  components/
    layout/       Header, Footer
    sections/      Hero, About, Departments, Doctors, AppointmentForm,
                    Services, Packages, Facilities, WhyChooseUs,
                    Testimonials, FAQ, Contact
    ui/            Reusable primitives: Button, Logo, Reveal, SectionHeading,
                    BackToTop, Loader
  data/            Static content (departments, doctors, services, packages,
                    facilities, testimonials, FAQ, nav links) — edit these
                    files to update site content without touching components
  hooks/           useCountUp (animated stat counters)
```

## Content editing

Nearly all clinic-specific content (doctor names/photos, department list,
prices, testimonials, FAQ copy, contact details) lives in `src/data/*.js`.
Update those files rather than the component markup.

Doctor and testimonial photos currently use generated placeholder avatars
(`ui-avatars.com`) — swap the `image`/`avatar` fields in `src/data/doctors.js`
and `src/data/testimonials.js` for real photo URLs when available.

## Backend integration

`AppointmentForm.jsx` and `Contact.jsx` currently validate and log form data
client-side only. To wire up a real backend, replace the `console.info` calls
in each `handleSubmit` with an API request (e.g. `POST /api/appointments`,
`POST /api/contact`), keeping the existing validation and success-state UI.
