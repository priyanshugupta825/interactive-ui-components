# A11yPortal - Accessible Knowledge & Information Base
**Week 3 Internship Task: Enhancing User Experience with Accessibility**

---

## 🌟 Project Overview
A11yPortal is a fully accessible, WCAG 2.1 & 2.2 compliant knowledge base and blog interface designed to demonstrate how an inaccessible web application is transformed into an inclusive, keyboard-operable, screen-reader friendly digital product.

### Core Accessibility Features
- **WCAG 2.1 & 2.2 AA / AAA Conformance**: Validated against all success criteria.
- **Top-Level Keyboard Bypass**: Dual skip-links for jumping straight to main content or search.
- **Visual Landmark Inspector Mode**: Click **"Inspect Semantic Landmarks"** in the top toolbar to reveal colored bounding boxes and tags for `<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, and `<footer>`.
- **Text Size Adjuster**: Interactive `A-`, `Default`, and `A+` controls scaling root font size without layout clipping.
- **High-Contrast AAA Theme**: Toggle for a 21:1 black-and-white high-contrast theme.
- **Live Search with ARIA Live Regions**: Instant filtering with debounced `aria-live="polite"` result count announcements.
- **Accessible Audio Narrator Widget**: Simulated audio player with WAI-ARIA slider scrubber and keyboard controls.
- **No `outline: none` Traps**: High-visibility cyan `:focus-visible` focus rings.

---

## 🚀 Quick Start & Testing Instructions

1. **Launch Directly in Browser**:
   Open `week3/index.html` in any browser:
   ```powershell
   Start-Process "c:\Users\bhola\Downloads\yuvaintern\week3\index.html"
   ```

2. **Test Keyboard Navigation (No Mouse)**:
   - Reload the page and press <kbd>Tab</kbd>: observe the **"Skip to main content"** link appear at the top.
   - Continue pressing <kbd>Tab</kbd> to traverse through the Accessibility Toolbar, Search box, Audio Player, Article Cards, and Sidebar form.
   - Notice the bold, high-contrast cyan focus indicators on every interactive control.

3. **Test Accessibility Settings Toolbar**:
   - Click **"A+"** to enlarge text to 125%; test how layout fluidly reflows.
   - Click **"High Contrast (AAA)"** to view the ultra-high contrast dark theme.
   - Click **"Inspect Semantic Landmarks"** to view visual outlines and tags proving HTML5 semantic structure.

4. **Test Live Search Voiceover**:
   - Type `wcag` into the search box: notice the matching cards filter live, and screen reader announcements update automatically.
   - Press <kbd>Esc</kbd> inside the search input to instantly clear the query.

5. **Read the Full Audit Report**:
   Open [`audit-report.md`](file:///c:/Users/bhola/Downloads/yuvaintern/week3/audit-report.md) for detailed Before & After audit scores, Lighthouse metrics, and WCAG criteria justifications.

---

## 📦 Deliverables in this Folder
- `index.html` — Accessible web portal with accessibility settings toolbar.
- `styles.css` — Accessible design tokens, high contrast mode, and landmark overlay.
- `app.js` — Client controller with live search announcements, font scaling, and audio widget.
- `audit-report.md` — Formal accessibility audit report in Markdown format.
- `Week_3_Accessibility_Enhancements_Report.docx` — Formal Word report for portal submission.
- `week3-accessibility-enhancements.zip` — Compressed archive for portal submission.
