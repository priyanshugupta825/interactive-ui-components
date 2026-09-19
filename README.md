# NovaCloud - Responsive Landing Page

A responsive, accessible landing page designed and engineered from a wireframe prototype into production-ready HTML5, modern CSS3, and vanilla JavaScript (ES6+).

---

## 🌟 Project Overview
This project was built to demonstrate how a wireframe concept is translated into a live, interactive web experience that adapts smoothly across screen sizes—from high-resolution desktop monitors down to mobile smartphones.

- **Product Theme**: **NovaCloud** — Next-Generation Intelligent Cloud Workflow Automation.
- **Deliverables**:
  - `index.html`: Fully semantic HTML5 layout with landmark regions, accessible form inputs, and inline SVG iconography.
  - `styles.css`: Modern CSS architecture with CSS Custom Properties, fluid typography via `clamp()`, CSS Grid, Flexbox, glassmorphism, and media queries.
  - `script.js`: Modular vanilla JavaScript powering an accessible mobile navigation drawer, sticky blur header, scroll-spy, monthly/annual pricing recalculator, product showcase tabs, and live validation.
  - `wireframe.html`: Blueprint specification and side-by-side wireframe comparison (Desktop vs Mobile) explaining layout transformations.
  - `landing-page.zip`: Compressed archive of all deliverable files.

---

## 📐 Wireframe Architecture & Layout Strategy

### Wireframe Sections
1. **Header & Navigation**: Sticky brand bar with logo, menu links, action buttons, and mobile hamburger toggle.
2. **Hero Section**: Eyebrow badge pill, high-impact headline with gradient accent, descriptive value proposition, dual call-to-actions, social proof stat counters, and an interactive dashboard preview card.
3. **Social Proof Ticker**: Logo banner acknowledging client adoption.
4. **Feature Highlights**: Responsive multi-column grid with 6 capability cards featuring custom SVG icons and hover states.
5. **Interactive Product Tour**: Tabbed interface switching between Workflow Automation, Observability Telemetry, and Security Governance.
6. **Customer Testimonials**: 3-tier review grid with star ratings, feedback quotes, and author badges.
7. **Pricing Plans**: Interactive billing switch (Monthly vs Annual with 20% discount) adjusting starter, professional, and enterprise tiers.
8. **FAQ Accordion**: Semantic `<details>` and `<summary>` components with animated disclosure icons.
9. **CTA Banner**: High-contrast lead capture form with instant email validation.
10. **Footer**: 4-column link matrix, social profiles, copyright bar, and smooth back-to-top button.

---

## 🛠️ Technical Implementation & Modern Standards

### 1. Semantic HTML5 & Accessibility (WAI-ARIA)
- **Landmarks**: Proper usage of `<header role="banner">`, `<nav aria-label="Main Navigation">`, `<main id="main-content">`, `<section>`, `<article>`, and `<footer role="contentinfo">`.
- **Keyboard Navigation & Focus Management**:
  - `Skip to main content` link for screen reader and keyboard accessibility.
  - Visible focus outlines (`:focus-visible`) for all interactive elements.
  - `aria-expanded`, `aria-controls`, and `aria-hidden` attributes synchronized dynamically via JavaScript.
  - Escape key dismisses the mobile navigation drawer and returns focus to the toggle button.
- **Zero Heavy Dependencies**: Inline SVGs for crisp rendering on retina displays without blocking network requests.

### 2. Modern CSS3 Architecture
- **CSS Custom Properties (Design Tokens)**: Centralized tokens for primary/accent colors, surface shades, border radii, shadows, and transitions.
- **Fluid Typography**: Calculated with CSS `clamp(min, preferred, max)` to ensure headings and body text scale smoothly between viewports without sudden breakpoint jumps.
- **Layout Engines**:
  - **CSS Grid**: Used for complex multi-card sections (`features-grid`, `pricing-grid`, `testimonials-grid`, `footer-top`) using `grid-template-columns: repeat(auto-fit, minmax(...))`.
  - **Flexbox**: Used for micro-layouts, navigation alignment, hero CTA groups, and badge indicators.
- **Glassmorphism**: `backdrop-filter: blur(14px)` for the sticky header and card surfaces.
- **Accessibility Media Query**: `@media (prefers-reduced-motion: reduce)` disables animations and smooth scrolling for users with vestibular sensitivities.

### 3. Vanilla JavaScript (ES6+)
- **Mobile Menu Drawer**: Toggles state classes, synchronizes ARIA attributes, and locks body scrolling (`body.menu-open`) to prevent background scrolling.
- **Scroll-Spy**: Employs `IntersectionObserver` to automatically track which section is currently active and highlight the corresponding navigation link.
- **Pricing Switcher**: Toggles `aria-checked` and animates price updates between monthly and discounted annual rates.
- **Tab Controller**: Accessible WAI-ARIA tab navigation for switching showcase cards.
- **Form Validation**: Validates work email inputs on the client side with instant ARIA live-region feedback.

---

## 📱 Responsive Breakpoint Guide

| Breakpoint Range | Target Devices | Layout Behavior |
| :--- | :--- | :--- |
| **> 1024px** | Desktops & Large Laptops | Full multi-column grid, horizontal navigation, side-by-side hero |
| **768px - 1024px** | Tablets & Small Laptops | Hero stacks vertically, features shift to 2 columns, footer adjusts to 2x2 grid |
| **< 768px** | Mobile Devices (Portrait/Landscape) | Hamburger button activates off-canvas sliding drawer, single-column vertical stacking, full-width touch targets |

---

## 🚀 How to Run and Test

1. **Direct Browser Launch**:
   Open `index.html` in any modern web browser (Chrome, Firefox, Safari, Edge):
   ```bash
   # Windows PowerShell
   Start-Process index.html
   ```
2. **Wireframe Prototype View**:
   Open `wireframe.html` to review the wireframe blueprints and design specifications:
   ```bash
   Start-Process wireframe.html
   ```
3. **Local HTTP Server (Optional)**:
   ```bash
   npx serve .
   # or
   python -m http.server 8080
   ```

---

## 📦 Deliverable Package
The repository includes `landing-page.zip` containing:
- `index.html`
- `styles.css`
- `script.js`
- `wireframe.html`
- `README.md`
