/**
 * ============================================================================
 * A11YPORTAL INTERACTIVE ACCESSIBILITY CONTROLLER
 * Week 3 Deliverable: Enhancing User Experience with Accessibility
 * 
 * Features:
 *  1. Font Size Scaling Controller (WCAG 1.4.4 Resize Text)
 *  2. High Contrast (AAA) Mode Switcher (WCAG 1.4.6 Contrast Enhanced)
 *  3. Visual Landmark Inspector Toggle (Educational WCAG 1.3.1)
 *  4. Live Debounced Search with ARIA Live Region Voiceover Announcements (WCAG 4.1.3)
 *  5. Category Chip Filter State Synchronization
 *  6. Accessible Audio Narration Player with WAI-ARIA Slider Controls
 *  7. Accessible Form Validation with Error Identification & Focus Management
 *  8. Back to Top Smooth Navigation with Focus Restoration
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. ANNOUNCER UTILITY (FOR SCREEN READER LIVE FEEDBACK)
  // --------------------------------------------------------------------------
  const announcer = document.getElementById('a11y-announcer');

  function announce(message) {
    if (announcer) {
      announcer.textContent = '';
      setTimeout(() => {
        announcer.textContent = message;
      }, 50);
    }
  }

  // --------------------------------------------------------------------------
  // 2. FONT SIZE SCALING CONTROLLER (WCAG 1.4.4)
  // --------------------------------------------------------------------------
  const btnFontDecrease = document.getElementById('btn-font-decrease');
  const btnFontReset = document.getElementById('btn-font-reset');
  const btnFontIncrease = document.getElementById('btn-font-increase');
  const htmlRoot = document.documentElement;

  const fontButtons = [btnFontDecrease, btnFontReset, btnFontIncrease];

  function setFontSize(scale) {
    htmlRoot.classList.remove('font-scale-sm', 'font-scale-md', 'font-scale-lg');
    fontButtons.forEach((b) => b.setAttribute('aria-pressed', 'false'));
    fontButtons.forEach((b) => b.classList.remove('active'));

    if (scale === 'sm') {
      htmlRoot.classList.add('font-scale-sm');
      btnFontDecrease.classList.add('active');
      btnFontDecrease.setAttribute('aria-pressed', 'true');
      announce('Text size decreased to small.');
    } else if (scale === 'lg') {
      htmlRoot.classList.add('font-scale-lg');
      btnFontIncrease.classList.add('active');
      btnFontIncrease.setAttribute('aria-pressed', 'true');
      announce('Text size increased to large (125%).');
    } else {
      htmlRoot.classList.add('font-scale-md');
      btnFontReset.classList.add('active');
      btnFontReset.setAttribute('aria-pressed', 'true');
      announce('Text size reset to default (100%).');
    }

    try {
      localStorage.setItem('a11y-font-scale', scale);
    } catch (e) {}
  }

  if (btnFontDecrease && btnFontReset && btnFontIncrease) {
    btnFontDecrease.addEventListener('click', () => setFontSize('sm'));
    btnFontReset.addEventListener('click', () => setFontSize('md'));
    btnFontIncrease.addEventListener('click', () => setFontSize('lg'));

    // Restore saved preference
    try {
      const savedScale = localStorage.getItem('a11y-font-scale');
      if (savedScale) setFontSize(savedScale);
    } catch (e) {}
  }

  // --------------------------------------------------------------------------
  // 3. HIGH CONTRAST MODE (WCAG 1.4.6 LEVEL AAA)
  // --------------------------------------------------------------------------
  const btnToggleContrast = document.getElementById('btn-toggle-contrast');

  function setHighContrast(enable) {
    if (enable) {
      document.body.classList.add('theme-high-contrast');
      btnToggleContrast.setAttribute('aria-pressed', 'true');
      btnToggleContrast.classList.add('active');
      announce('High Contrast Level AAA mode activated.');
    } else {
      document.body.classList.remove('theme-high-contrast');
      btnToggleContrast.setAttribute('aria-pressed', 'false');
      btnToggleContrast.classList.remove('active');
      announce('High Contrast mode deactivated.');
    }

    try {
      localStorage.setItem('a11y-high-contrast', enable ? 'true' : 'false');
    } catch (e) {}
  }

  if (btnToggleContrast) {
    btnToggleContrast.addEventListener('click', () => {
      const isEnabled = document.body.classList.contains('theme-high-contrast');
      setHighContrast(!isEnabled);
    });

    try {
      const savedContrast = localStorage.getItem('a11y-high-contrast');
      if (savedContrast === 'true') setHighContrast(true);
    } catch (e) {}
  }

  // --------------------------------------------------------------------------
  // 4. VISUAL LANDMARK INSPECTOR (EDUCATIONAL WCAG 1.3.1 TOOL)
  // --------------------------------------------------------------------------
  const btnToggleLandmarks = document.getElementById('btn-toggle-landmarks');

  if (btnToggleLandmarks) {
    btnToggleLandmarks.addEventListener('click', () => {
      const isActive = document.body.classList.contains('landmarks-highlighted');
      if (isActive) {
        document.body.classList.remove('landmarks-highlighted');
        btnToggleLandmarks.setAttribute('aria-pressed', 'false');
        btnToggleLandmarks.classList.remove('active');
        announce('Semantic Landmark Inspector disabled.');
      } else {
        document.body.classList.add('landmarks-highlighted');
        btnToggleLandmarks.setAttribute('aria-pressed', 'true');
        btnToggleLandmarks.classList.add('active');
        announce('Semantic Landmark Inspector enabled. Showing colored borders and tags around HTML5 landmarks.');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 5. ACCESSIBLE LIVE SEARCH & CATEGORY FILTERING (WCAG 4.1.3)
  // --------------------------------------------------------------------------
  const searchInput = document.getElementById('article-search');
  const btnClearSearch = document.getElementById('btn-clear-search');
  const searchStatus = document.getElementById('search-status');
  const resultsCountBadge = document.getElementById('results-count-badge');
  const articlesContainer = document.getElementById('articles-grid-container');
  const articleCards = Array.from(document.querySelectorAll('.card-item'));
  const categoryChips = Array.from(document.querySelectorAll('.filter-chip'));
  const noResultsBox = document.getElementById('no-results-message');
  const btnResetFilters = document.getElementById('btn-reset-filters');

  let activeCategory = 'all';
  let searchDebounceTimer = null;

  function filterArticles() {
    const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
    let visibleCount = 0;

    articleCards.forEach((card) => {
      const cardText = card.textContent.toLowerCase();
      const cardCategory = card.getAttribute('data-category');

      const matchesQuery = query === '' || cardText.includes(query);
      const matchesCategory = activeCategory === 'all' || cardCategory === activeCategory;

      if (matchesQuery && matchesCategory) {
        card.removeAttribute('hidden');
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.setAttribute('hidden', '');
        card.style.display = 'none';
      }
    });

    // Update Clear Button Visibility
    if (btnClearSearch) {
      btnClearSearch.hidden = query.length === 0;
    }

    // Update Results Badge
    if (resultsCountBadge) {
      resultsCountBadge.textContent = `${visibleCount} ${visibleCount === 1 ? 'Guide' : 'Guides'} Available`;
    }

    // Show/Hide No Results Fallback
    if (noResultsBox) {
      noResultsBox.hidden = visibleCount > 0;
    }

    // Dynamic ARIA Live Region Voice Announcement (WCAG 4.1.3)
    if (searchStatus) {
      let statusMessage = '';
      if (visibleCount === 0) {
        statusMessage = `No articles found for "${query}". Try resetting your filters.`;
      } else if (query) {
        statusMessage = `${visibleCount} ${visibleCount === 1 ? 'article' : 'articles'} found matching "${query}".`;
      } else if (activeCategory !== 'all') {
        statusMessage = `${visibleCount} ${visibleCount === 1 ? 'article' : 'articles'} in selected category.`;
      } else {
        statusMessage = `Showing all ${visibleCount} articles.`;
      }
      searchStatus.textContent = statusMessage;
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      clearTimeout(searchDebounceTimer);
      searchDebounceTimer = setTimeout(filterArticles, 150);
    });

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && searchInput.value) {
        searchInput.value = '';
        filterArticles();
      }
    });
  }

  if (btnClearSearch) {
    btnClearSearch.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        searchInput.focus();
      }
      filterArticles();
    });
  }

  categoryChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      categoryChips.forEach((c) => {
        c.classList.remove('active');
        c.setAttribute('aria-pressed', 'false');
      });
      chip.classList.add('active');
      chip.setAttribute('aria-pressed', 'true');

      activeCategory = chip.getAttribute('data-category') || 'all';
      filterArticles();
    });
  });

  if (btnResetFilters) {
    btnResetFilters.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      activeCategory = 'all';
      categoryChips.forEach((c) => {
        const isAll = c.getAttribute('data-category') === 'all';
        c.classList.toggle('active', isAll);
        c.setAttribute('aria-pressed', String(isAll));
      });
      filterArticles();
      if (searchInput) searchInput.focus();
    });
  }

  // --------------------------------------------------------------------------
  // 6. ACCESSIBLE AUDIO PLAYER NARRATION WIDGET (WCAG 1.2)
  // --------------------------------------------------------------------------
  const audioPlayBtn = document.getElementById('audio-play-btn');
  const audioSpeedBtn = document.getElementById('audio-speed-btn');
  const audioSlider = document.getElementById('audio-slider');
  const audioTimeDisplay = document.getElementById('audio-time-display');

  let isPlaying = false;
  let currentProgress = 0;
  let playInterval = null;
  const totalSeconds = 255; // 4:15 total
  let playbackRate = 1.0;

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  function updateAudioState() {
    if (audioSlider) {
      audioSlider.value = currentProgress;
      audioSlider.setAttribute('aria-valuenow', String(currentProgress));
      const elapsedSecs = (currentProgress / 100) * totalSeconds;
      const elapsedFormatted = formatTime(elapsedSecs);
      audioSlider.setAttribute('aria-valuetext', `${elapsedFormatted} of 4:15`);

      if (audioTimeDisplay) {
        audioTimeDisplay.textContent = `${elapsedFormatted} / 4:15`;
      }
    }
  }

  function togglePlayPause() {
    isPlaying = !isPlaying;

    if (isPlaying) {
      audioPlayBtn.innerHTML = '<span class="play-icon" aria-hidden="true">⏸</span><span class="play-text">Pause Audio</span>';
      audioPlayBtn.setAttribute('aria-label', 'Pause audio narration');
      announce('Audio narration playback started.');

      playInterval = setInterval(() => {
        if (currentProgress < 100) {
          currentProgress += 1 * playbackRate;
          if (currentProgress > 100) currentProgress = 100;
          updateAudioState();
        } else {
          togglePlayPause();
          currentProgress = 0;
          updateAudioState();
        }
      }, 1000);
    } else {
      clearInterval(playInterval);
      audioPlayBtn.innerHTML = '<span class="play-icon" aria-hidden="true">▶</span><span class="play-text">Play Audio</span>';
      audioPlayBtn.setAttribute('aria-label', 'Play audio narration');
      announce('Audio narration paused.');
    }
  }

  if (audioPlayBtn) {
    audioPlayBtn.addEventListener('click', togglePlayPause);
  }

  if (audioSlider) {
    audioSlider.addEventListener('input', (e) => {
      currentProgress = Number(e.target.value);
      updateAudioState();
    });
  }

  if (audioSpeedBtn) {
    const speeds = [1.0, 1.25, 1.5, 2.0];
    let speedIdx = 0;

    audioSpeedBtn.addEventListener('click', () => {
      speedIdx = (speedIdx + 1) % speeds.length;
      playbackRate = speeds[speedIdx];
      audioSpeedBtn.textContent = `${playbackRate.toFixed(1)}x`;
      audioSpeedBtn.setAttribute('aria-label', `Playback speed ${playbackRate.toFixed(1)}x. Click to change.`);
      announce(`Playback speed changed to ${playbackRate.toFixed(1)}x.`);
    });
  }

  // --------------------------------------------------------------------------
  // 7. ACCESSIBLE FORM VALIDATION & ERROR IDENTIFICATION (WCAG 3.3.1)
  // --------------------------------------------------------------------------
  const newsletterForm = document.getElementById('newsletter-form');
  const nameInput = document.getElementById('subscriber-name');
  const emailInput = document.getElementById('subscriber-email');
  const formStatus = document.getElementById('newsletter-status');

  if (newsletterForm && nameInput && emailInput && formStatus) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameVal = nameInput.value.trim();
      const emailVal = emailInput.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // Reset previous error classes
      nameInput.removeAttribute('aria-invalid');
      emailInput.removeAttribute('aria-invalid');
      formStatus.className = 'form-status-area';

      if (!nameVal) {
        formStatus.className = 'form-status-area status-error';
        formStatus.textContent = 'Error: Please enter your full name.';
        nameInput.setAttribute('aria-invalid', 'true');
        nameInput.focus();
        return;
      }

      if (!emailVal || !emailRegex.test(emailVal)) {
        formStatus.className = 'form-status-area status-error';
        formStatus.textContent = 'Error: Please enter a valid work email address (e.g. name@domain.com).';
        emailInput.setAttribute('aria-invalid', 'true');
        emailInput.focus();
        return;
      }

      // Success State
      formStatus.className = 'form-status-area status-success';
      formStatus.textContent = `✔ Success! Welcome aboard, ${nameVal}. You are subscribed to the accessibility digest.`;
      newsletterForm.reset();

      setTimeout(() => {
        formStatus.textContent = '';
      }, 7000);
    });
  }

  // --------------------------------------------------------------------------
  // 8. BACK TO TOP SMOOTH NAVIGATION WITH FOCUS RESTORATION (WCAG 2.4.3)
  // --------------------------------------------------------------------------
  const btnBackToTop = document.getElementById('btn-back-to-top');
  const mainLandmark = document.getElementById('main-content');

  if (btnBackToTop) {
    btnBackToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (mainLandmark) {
        mainLandmark.focus();
      }
    });
  }
});
