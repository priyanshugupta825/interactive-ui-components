# Interactive UI Component Suite (Vanilla JS, HTML5, CSS3)
**Week 2 Internship Task Deliverable: Developing Interactive UI Components**

---

## 🌟 Overview
This project delivers a production-ready, reusable suite of interactive front-end components built entirely with vanilla JavaScript (ES6+), semantic HTML5, and modern CSS3—with zero external runtime dependencies.

The suite focuses on four critical UI patterns:
1. **Accessible Modal Dialog System** (`ModalComponent`): Focus-trapped modal dialogs conforming to W3C WAI-ARIA authoring practices.
2. **Accessible Tab System** (`TabsComponent`): Keyboard-navigable tabbed interfaces implementing the roving `tabindex` pattern.
3. **Multi-State Accordion System** (`AccordionComponent`): Collapsible accordion supporting both single-open and multi-open modes.
4. **Live Toast Notification Engine** (`ToastComponent`): Non-blocking alert notifications utilizing ARIA live regions (`role="status"`, `aria-live="polite"`).
5. **Interactive Developer Playground & Event Logger**: An interactive application that renders live demos and logs custom component events in real-time.

---

## 📐 Architecture & Features

### 1. Reusable, Object-Oriented JavaScript (`components.js`)
- Each component is encapsulated as an ES6 class (`ModalComponent`, `TabsComponent`, `AccordionComponent`, `ToastComponent`).
- **Declarative Initialization**: Elements can be auto-initialized via HTML5 `data-` attributes:
  - `data-modal-target="#modal-id"`
  - `data-component="modal"`
  - `data-component="tabs"`
  - `data-component="accordion"`
- **Programmatic JavaScript API**: Each component exposes clean imperative methods (`open()`, `close()`, `activateTab()`, `toggle()`).
- **Defensive Error Handling**: Elements are checked before attachment; invalid selectors log helpful warnings rather than crashing page execution.
- **Custom DOM Events**: Dispatches native events (`modal:open`, `modal:close`, `tabs:change`, `accordion:change`) for decoupled event-driven architectures.

### 2. Accessibility & WAI-ARIA Standards
- **Focus Management & Trapping**:
  - Inside modals, keyboard focus is trapped so pressing `Tab` or `Shift+Tab` cycles only through interactive elements within the dialog.
  - When a modal closes, focus automatically restores to the button that originally launched it.
- **Keyboard Navigation**:
  - `Escape`: Dismisses open modal dialogs.
  - `ArrowLeft` / `ArrowRight`: Traverses tabs with roving `tabindex` (`0` for active, `-1` for inactive).
  - `ArrowUp` / `ArrowDown`: Navigates between accordion headers.
  - `Home` / `End`: Jumps directly to first / last tab or accordion header.
  - `Enter` / `Space`: Activates tabs, toggles accordion panels, or triggers modal buttons.
- **Screen Reader Support**: Complete ARIA attributes (`aria-modal`, `aria-expanded`, `aria-controls`, `aria-labelledby`, `aria-selected`, `aria-live`).

### 3. Responsive Styling & Micro-Interactions (`styles.css`)
- **CSS Custom Properties**: Design tokens for surfaces, text, brand colors, and focus rings.
- **Responsive Adaptations**:
  - Desktop: Side-by-side showcase cards, horizontal tabs.
  - Mobile (< 640px): Modal transforms into an ergonomic bottom sheet; tabs adapt to vertical or scrollable layout; full-width touch targets (minimum 44px).
- **Reduced Motion**: Respects `@media (prefers-reduced-motion: reduce)`.

---

## 💻 API Reference & Code Examples

### Modal Dialog
```javascript
// Programmatic Usage
const myModal = new UIComponents.Modal('#demo-confirm-modal', {
  closeOnBackdrop: true,
  closeOnEsc: true,
  trapFocus: true
});

myModal.open();
myModal.close();

// Declarative Usage in HTML
// <button data-modal-target="#my-modal">Open</button>
// <div id="my-modal" data-component="modal">...</div>
```

### Tab System
```javascript
// Programmatic Usage
const myTabs = new UIComponents.Tabs('#my-tabs-container', {
  defaultIndex: 0,
  autoActivateOnArrow: true
});

myTabs.activateTab(1); // Switch to second tab
```

### Accordion
```javascript
// Programmatic Usage
const myAccordion = new UIComponents.Accordion('#my-accordion', {
  multiExpand: false // Set to true to allow multiple panels open at once
});

myAccordion.open(0);
myAccordion.close(0);
myAccordion.setMultiExpand(true);
```

### Toast Notifications
```javascript
UIComponents.Toast.show({
  title: 'Success!',
  message: 'Component state updated successfully.',
  type: 'success', // 'success' | 'info' | 'warning' | 'error'
  duration: 4000
});
```

---

## 🧪 Testing & Verification Guide

1. **Direct Browser Launch**:
   Open `week2/index.html` in any browser:
   ```powershell
   Start-Process "c:\Users\bhola\Downloads\yuvaintern\week2\index.html"
   ```
2. **Verify Focus Trapping**:
   - Click **"Open Confirmation Modal"**.
   - Press <kbd>Tab</kbd> multiple times: notice focus stays trapped inside modal buttons.
   - Press <kbd>Esc</kbd>: verify modal closes and focus returns to the opening button.
3. **Verify Tab Arrow Navigation**:
   - Focus on the **"Features"** tab.
   - Press <kbd>&rarr;</kbd> or <kbd>&larr;</kbd>: observe smooth tab switching and roving `tabindex`.
4. **Verify Accordion Single vs Multi Mode**:
   - Click accordion headers to test single collapsing behavior.
   - Click **"Enable Multi-Open Mode"** and observe simultaneous open panels.
5. **Verify Event Log**:
   - Look at the bottom **Live Component Event Log** console to observe real-time captured DOM events.

---

## 📦 Package Contents
- `index.html` — Interactive component showcase application & playground.
- `styles.css` — Responsive component design system and animations.
- `components.js` — Modular vanilla JavaScript component classes.
- `README.md` — Documentation, API references, and testing guide.
- `Week_2_Interactive_UI_Components_Report.docx` — Formal Word report for submission.
- `week2-interactive-components.zip` — Standalone zip archive for submission.
