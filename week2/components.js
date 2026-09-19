/**
 * ============================================================================
 * INTERACTIVE UI COMPONENT SUITE (VANILLA JAVASCRIPT ES6+)
 * Week 2 Deliverable: Reusable, Accessible, Production-Ready UI Components
 * 
 * Components included:
 *  1. ModalComponent      - Focus-trapping accessible modal dialog
 *  2. TabsComponent       - WAI-ARIA compliant keyboard-navigable tab system
 *  3. AccordionComponent  - Single & multi-expandable accordion with arrow navigation
 *  4. ToastComponent      - ARIA live-region toast notification engine
 * 
 * Features:
 *  - Zero external library dependencies
 *  - Strict WAI-ARIA authoring practices & keyboard traps
 *  - Defensive programming, error boundaries & fallback support
 *  - Declarative data-attribute API + Programmatic JavaScript API
 *  - Custom DOM events dispatching (modal:open, tabs:change, etc.)
 * ============================================================================
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.UIComponents = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // --------------------------------------------------------------------------
  // UTILITY HELPERS & DEFENSIVE GUARDS
  // --------------------------------------------------------------------------
  const Utils = {
    /**
     * Query focusable elements within a given container
     * @param {HTMLElement} container
     * @returns {HTMLElement[]}
     */
    getFocusableElements(container) {
      if (!container || !container.querySelectorAll) return [];
      const focusableSelectors = [
        'a[href]',
        'area[href]',
        'input:not([disabled]):not([type="hidden"])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        'button:not([disabled])',
        'iframe',
        '[tabindex]:not([tabindex="-1"])',
        '[contenteditable="true"]'
      ];
      return Array.from(container.querySelectorAll(focusableSelectors.join(',')))
        .filter((el) => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true' && el.offsetParent !== null);
    },

    /**
     * Generate unique identifier fallback
     */
    uniqueId(prefix = 'ui') {
      return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
    },

    /**
     * Safe custom event dispatcher
     */
    dispatchEvent(element, eventName, detail = {}) {
      if (!element || !element.dispatchEvent) return;
      const event = new CustomEvent(eventName, {
        bubbles: true,
        cancelable: true,
        detail
      });
      element.dispatchEvent(event);
    }
  };

  // ==========================================================================
  // 1. ACCESSIBLE MODAL DIALOG COMPONENT
  // ==========================================================================
  class ModalComponent {
    /**
     * @param {HTMLElement|string} element - Modal element or selector
     * @param {Object} options - Configuration options
     */
    constructor(element, options = {}) {
      this.modal = typeof element === 'string' ? document.querySelector(element) : element;

      if (!this.modal) {
        console.warn(`[ModalComponent] Target modal element not found for selector: "${element}"`);
        return;
      }

      this.options = Object.assign({
        closeOnBackdrop: true,
        closeOnEsc: true,
        trapFocus: true,
        autoFocusFirst: true,
        bodyLockClass: 'ui-body-locked'
      }, options);

      this.isOpen = false;
      this.lastFocusedElement = null;
      this._handleKeydown = this._handleKeydown.bind(this);
      this._handleBackdropClick = this._handleBackdropClick.bind(this);

      this.init();
    }

    init() {
      // Ensure required ARIA semantics
      if (!this.modal.getAttribute('role')) {
        this.modal.setAttribute('role', 'dialog');
      }
      this.modal.setAttribute('aria-modal', 'true');

      if (!this.modal.id) {
        this.modal.id = Utils.uniqueId('modal');
      }

      // Hide by default if not open
      if (!this.modal.classList.contains('active')) {
        this.modal.setAttribute('aria-hidden', 'true');
        this.modal.style.display = 'none';
      } else {
        this.isOpen = true;
        this.modal.setAttribute('aria-hidden', 'false');
      }

      // Attach close button listeners within modal
      const closeButtons = this.modal.querySelectorAll('[data-modal-close], .ui-modal-close');
      closeButtons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.close();
        });
      });

      // Backdrop dismissal listener
      if (this.options.closeOnBackdrop) {
        this.modal.addEventListener('click', this._handleBackdropClick);
      }
    }

    _handleBackdropClick(e) {
      // If clicking directly on the modal backdrop container (not the modal dialog box content)
      if (e.target === this.modal || e.target.classList.contains('ui-modal-backdrop')) {
        this.close();
      }
    }

    _handleKeydown(e) {
      if (!this.isOpen) return;

      // Handle Escape key
      if (this.options.closeOnEsc && e.key === 'Escape') {
        e.preventDefault();
        this.close();
        return;
      }

      // Handle Tab key focus trapping
      if (this.options.trapFocus && e.key === 'Tab') {
        const focusable = Utils.getFocusableElements(this.modal);
        if (focusable.length === 0) {
          e.preventDefault();
          return;
        }

        const firstEl = focusable[0];
        const lastEl = focusable[focusable.length - 1];

        if (e.shiftKey) {
          // Shift + Tab: moving backwards
          if (document.activeElement === firstEl || !this.modal.contains(document.activeElement)) {
            e.preventDefault();
            lastEl.focus();
          }
        } else {
          // Tab: moving forwards
          if (document.activeElement === lastEl || !this.modal.contains(document.activeElement)) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      }
    }

    open() {
      if (this.isOpen) return;

      // Save previously focused element to return to upon close
      this.lastFocusedElement = document.activeElement;

      // Dispatch cancelable opening event
      Utils.dispatchEvent(this.modal, 'modal:open', { modal: this });

      // Update state
      this.isOpen = true;
      this.modal.style.display = 'flex';
      this.modal.setAttribute('aria-hidden', 'false');

      // Trigger animation frame for transition
      requestAnimationFrame(() => {
        this.modal.classList.add('active');
        document.body.classList.add(this.options.bodyLockClass);
      });

      // Attach keyboard listeners
      document.addEventListener('keydown', this._handleKeydown);

      // Focus management: move focus inside modal
      if (this.options.autoFocusFirst) {
        setTimeout(() => {
          const focusable = Utils.getFocusableElements(this.modal);
          if (focusable.length > 0) {
            focusable[0].focus();
          } else {
            this.modal.focus();
          }
        }, 50);
      }
    }

    close() {
      if (!this.isOpen) return;

      Utils.dispatchEvent(this.modal, 'modal:close', { modal: this });

      this.isOpen = false;
      this.modal.classList.remove('active');
      this.modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove(this.options.bodyLockClass);

      // Remove keyboard listener
      document.removeEventListener('keydown', this._handleKeydown);

      // Transition cleanup
      setTimeout(() => {
        if (!this.isOpen) {
          this.modal.style.display = 'none';
        }
      }, 250);

      // Restore focus to original trigger element
      if (this.lastFocusedElement && typeof this.lastFocusedElement.focus === 'function') {
        this.lastFocusedElement.focus();
      }
    }

    destroy() {
      this.close();
      this.modal.removeEventListener('click', this._handleBackdropClick);
      document.removeEventListener('keydown', this._handleKeydown);
    }
  }

  // ==========================================================================
  // 2. ACCESSIBLE TAB SYSTEM (WAI-ARIA TAB PATTERN)
  // ==========================================================================
  class TabsComponent {
    /**
     * @param {HTMLElement|string} element - Tab container element or selector
     * @param {Object} options - Configuration options
     */
    constructor(element, options = {}) {
      this.container = typeof element === 'string' ? document.querySelector(element) : element;

      if (!this.container) {
        console.warn(`[TabsComponent] Target tab container not found: "${element}"`);
        return;
      }

      this.options = Object.assign({
        defaultIndex: 0,
        orientation: 'horizontal',
        autoActivateOnArrow: true
      }, options);

      this.tablist = this.container.querySelector('[role="tablist"]');
      this.tabs = Array.from(this.container.querySelectorAll('[role="tab"]'));
      this.panels = Array.from(this.container.querySelectorAll('[role="tabpanel"]'));
      this.currentIndex = this.options.defaultIndex;

      this._handleTabClick = this._handleTabClick.bind(this);
      this._handleKeydown = this._handleKeydown.bind(this);

      this.init();
    }

    init() {
      if (!this.tablist || this.tabs.length === 0) {
        console.warn('[TabsComponent] Tablist or tab elements missing within container', this.container);
        return;
      }

      this.tablist.setAttribute('aria-orientation', this.options.orientation);

      // Setup tabs and panels
      this.tabs.forEach((tab, index) => {
        const targetPanelId = tab.getAttribute('aria-controls') || tab.getAttribute('data-tab-target');
        let panel = this.panels.find((p) => p.id === targetPanelId) || this.panels[index];

        if (!tab.id) {
          tab.id = Utils.uniqueId('tab');
        }

        if (panel) {
          tab.setAttribute('aria-controls', panel.id);
          panel.setAttribute('aria-labelledby', tab.id);
          panel.setAttribute('role', 'tabpanel');
          panel.setAttribute('tabindex', '0'); // Scrollable panel accessible
        }

        tab.addEventListener('click', (e) => this._handleTabClick(e, index));
        tab.addEventListener('keydown', (e) => this._handleKeydown(e, index));
      });

      // Activate initial tab
      this.activateTab(this.currentIndex, false);
    }

    _handleTabClick(e, index) {
      e.preventDefault();
      this.activateTab(index, true);
    }

    _handleKeydown(e, index) {
      const isHorizontal = this.options.orientation === 'horizontal';
      const prevKey = isHorizontal ? 'ArrowLeft' : 'ArrowUp';
      const nextKey = isHorizontal ? 'ArrowRight' : 'ArrowDown';

      let newIndex = index;

      switch (e.key) {
        case nextKey:
          e.preventDefault();
          newIndex = (index + 1) % this.tabs.length;
          break;
        case prevKey:
          e.preventDefault();
          newIndex = (index - 1 + this.tabs.length) % this.tabs.length;
          break;
        case 'Home':
          e.preventDefault();
          newIndex = 0;
          break;
        case 'End':
          e.preventDefault();
          newIndex = this.tabs.length - 1;
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          this.activateTab(index, true);
          return;
        default:
          return;
      }

      this.tabs[newIndex].focus();

      if (this.options.autoActivateOnArrow) {
        this.activateTab(newIndex, true);
      }
    }

    activateTab(index, shouldFocus = false) {
      if (index < 0 || index >= this.tabs.length) return;

      this.currentIndex = index;

      // Update Tab Buttons (Roving tabindex pattern)
      this.tabs.forEach((tab, i) => {
        const isSelected = i === index;
        tab.setAttribute('aria-selected', isSelected ? 'true' : 'false');
        tab.setAttribute('tabindex', isSelected ? '0' : '-1');
        tab.classList.toggle('active', isSelected);
      });

      // Update Panels
      this.panels.forEach((panel, i) => {
        const isActive = i === index;
        if (isActive) {
          panel.removeAttribute('hidden');
          panel.classList.add('active');
        } else {
          panel.setAttribute('hidden', '');
          panel.classList.remove('active');
        }
      });

      if (shouldFocus && this.tabs[index]) {
        this.tabs[index].focus();
      }

      Utils.dispatchEvent(this.container, 'tabs:change', {
        index,
        tab: this.tabs[index],
        panel: this.panels[index]
      });
    }

    destroy() {
      this.tabs.forEach((tab) => {
        tab.removeEventListener('click', this._handleTabClick);
        tab.removeEventListener('keydown', this._handleKeydown);
      });
    }
  }

  // ==========================================================================
  // 3. MULTI-STATE ACCORDION COMPONENT
  // ==========================================================================
  class AccordionComponent {
    /**
     * @param {HTMLElement|string} element - Accordion container or selector
     * @param {Object} options - Configuration options
     */
    constructor(element, options = {}) {
      this.container = typeof element === 'string' ? document.querySelector(element) : element;

      if (!this.container) {
        console.warn(`[AccordionComponent] Container not found: "${element}"`);
        return;
      }

      // Check data-attribute config or options
      const multiAttr = this.container.getAttribute('data-multi-expand');
      this.options = Object.assign({
        multiExpand: multiAttr === 'true' || options.multiExpand === true,
        allowAllClosed: true
      }, options);

      this.items = [];
      this.init();
    }

    init() {
      const triggers = Array.from(this.container.querySelectorAll('[data-accordion-trigger], .ui-accordion-trigger'));

      triggers.forEach((trigger, index) => {
        const panelId = trigger.getAttribute('aria-controls') || trigger.getAttribute('data-target');
        const panel = panelId ? document.getElementById(panelId) : trigger.nextElementSibling;

        if (!panel) {
          console.warn('[AccordionComponent] Panel element not found for trigger', trigger);
          return;
        }

        if (!trigger.id) trigger.id = Utils.uniqueId('acc-btn');
        if (!panel.id) panel.id = Utils.uniqueId('acc-panel');

        trigger.setAttribute('aria-controls', panel.id);
        panel.setAttribute('aria-labelledby', trigger.id);
        panel.setAttribute('role', 'region');

        const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
        if (!isExpanded) {
          panel.setAttribute('hidden', '');
        }

        const itemObj = { trigger, panel, index };
        this.items.push(itemObj);

        // Click event
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          this.toggle(index);
        });

        // Keyboard arrow navigation between accordion headers
        trigger.addEventListener('keydown', (e) => this._handleKeydown(e, index));
      });
    }

    _handleKeydown(e, index) {
      let targetIndex = null;
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          targetIndex = (index + 1) % this.items.length;
          break;
        case 'ArrowUp':
          e.preventDefault();
          targetIndex = (index - 1 + this.items.length) % this.items.length;
          break;
        case 'Home':
          e.preventDefault();
          targetIndex = 0;
          break;
        case 'End':
          e.preventDefault();
          targetIndex = this.items.length - 1;
          break;
        default:
          return;
      }

      if (targetIndex !== null && this.items[targetIndex]) {
        this.items[targetIndex].trigger.focus();
      }
    }

    toggle(index) {
      const item = this.items[index];
      if (!item) return;

      const isExpanded = item.trigger.getAttribute('aria-expanded') === 'true';

      if (isExpanded) {
        this.close(index);
      } else {
        this.open(index);
      }
    }

    open(index) {
      const item = this.items[index];
      if (!item) return;

      // If single-expand mode, close other items first
      if (!this.options.multiExpand) {
        this.items.forEach((other, i) => {
          if (i !== index) {
            this.close(i);
          }
        });
      }

      item.trigger.setAttribute('aria-expanded', 'true');
      item.trigger.classList.add('active');
      item.panel.removeAttribute('hidden');
      item.panel.classList.add('active');

      Utils.dispatchEvent(this.container, 'accordion:change', {
        action: 'open',
        index,
        trigger: item.trigger,
        panel: item.panel
      });
    }

    close(index) {
      const item = this.items[index];
      if (!item) return;

      item.trigger.setAttribute('aria-expanded', 'false');
      item.trigger.classList.remove('active');
      item.panel.classList.remove('active');
      item.panel.setAttribute('hidden', '');

      Utils.dispatchEvent(this.container, 'accordion:change', {
        action: 'close',
        index,
        trigger: item.trigger,
        panel: item.panel
      });
    }

    setMultiExpand(enable) {
      this.options.multiExpand = !!enable;
      this.container.setAttribute('data-multi-expand', String(enable));
    }
  }

  // ==========================================================================
  // 4. LIVE TOAST NOTIFICATION ENGINE
  // ==========================================================================
  class ToastComponent {
    static container = null;

    static getContainer() {
      if (!ToastComponent.container) {
        let el = document.getElementById('ui-toast-container');
        if (!el) {
          el = document.createElement('div');
          el.id = 'ui-toast-container';
          el.className = 'ui-toast-container';
          el.setAttribute('role', 'region');
          el.setAttribute('aria-label', 'Notifications');
          document.body.appendChild(el);
        }
        ToastComponent.container = el;
      }
      return ToastComponent.container;
    }

    /**
     * Show an accessible toast notification
     * @param {Object} options - { title, message, type, duration }
     */
    static show(options = {}) {
      const {
        title = 'Notification',
        message = '',
        type = 'info', // 'success' | 'info' | 'warning' | 'error'
        duration = 4000
      } = options;

      const container = ToastComponent.getContainer();

      const toast = document.createElement('div');
      toast.className = `ui-toast ui-toast-${type}`;
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');

      const icons = {
        success: '✔',
        info: 'ℹ',
        warning: '⚠',
        error: '✖'
      };

      toast.innerHTML = `
        <div class="ui-toast-icon">${icons[type] || 'ℹ'}</div>
        <div class="ui-toast-content">
          ${title ? `<div class="ui-toast-title">${title}</div>` : ''}
          ${message ? `<div class="ui-toast-message">${message}</div>` : ''}
        </div>
        <button type="button" class="ui-toast-close" aria-label="Dismiss notification">&times;</button>
      `;

      container.appendChild(toast);

      // Animate entry
      requestAnimationFrame(() => {
        toast.classList.add('show');
      });

      const closeToast = () => {
        toast.classList.remove('show');
        setTimeout(() => {
          if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
          }
        }, 250);
      };

      // Close button handler
      const closeBtn = toast.querySelector('.ui-toast-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', closeToast);
      }

      // Auto dismiss timer with hover pause
      let timer = null;
      if (duration > 0) {
        timer = setTimeout(closeToast, duration);
        toast.addEventListener('mouseenter', () => clearTimeout(timer));
        toast.addEventListener('mouseleave', () => {
          timer = setTimeout(closeToast, 1500);
        });
      }

      return { element: toast, dismiss: closeToast };
    }
  }

  // ==========================================================================
  // 5. GLOBAL AUTO-DISCOVERY & DECLARATIVE BINDING
  // ==========================================================================
  function autoInit() {
    // 1. Declarative Modal Triggers [data-modal-target]
    document.querySelectorAll('[data-modal-target]').forEach((trigger) => {
      const targetSelector = trigger.getAttribute('data-modal-target');
      const targetModal = document.querySelector(targetSelector);
      if (targetModal) {
        if (!targetModal._modalInstance) {
          targetModal._modalInstance = new ModalComponent(targetModal);
        }
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          targetModal._modalInstance.open();
        });
      }
    });

    // 2. Declarative Modals [data-component="modal"]
    document.querySelectorAll('[data-component="modal"]').forEach((modalEl) => {
      if (!modalEl._modalInstance) {
        modalEl._modalInstance = new ModalComponent(modalEl);
      }
    });

    // 3. Declarative Tabs [data-component="tabs"]
    document.querySelectorAll('[data-component="tabs"]').forEach((tabsEl) => {
      if (!tabsEl._tabsInstance) {
        tabsEl._tabsInstance = new TabsComponent(tabsEl);
      }
    });

    // 4. Declarative Accordions [data-component="accordion"]
    document.querySelectorAll('[data-component="accordion"]').forEach((accEl) => {
      if (!accEl._accordionInstance) {
        accEl._accordionInstance = new AccordionComponent(accEl);
      }
    });
  }

  // Auto initialize on DOMContentLoaded if running in browser
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', autoInit);
    } else {
      autoInit();
    }
  }

  return {
    Modal: ModalComponent,
    Tabs: TabsComponent,
    Accordion: AccordionComponent,
    Toast: ToastComponent,
    autoInit
  };
});
