/**
 * OmniMetrics Cloud Analytics & Telemetry Dashboard
 * Core Application Controller - Vanilla ES6+ JavaScript
 * WCAG 2.1/2.2 AA & AAA Compliant, Zero-Dependency Architecture
 */

(function () {
  'use strict';

  // --- Embedded Fallback Dataset for Offline / Local file:/// Protocol Execution ---
  const FALLBACK_DATA = {
    "summary": {
      "total_spend": "$48,920",
      "total_spend_trend": "+4.2%",
      "avg_latency": "18.4 ms",
      "avg_latency_trend": "-8.1%",
      "uptime": "99.98%",
      "uptime_trend": "+0.02%",
      "active_services": 25,
      "active_services_trend": "+3 new"
    },
    "monthly_metrics": [
      { "month": "Jan", "throughput_mbs": 420, "requests_m": 84, "error_rate": 0.012 },
      { "month": "Feb", "throughput_mbs": 480, "requests_m": 92, "error_rate": 0.011 },
      { "month": "Mar", "throughput_mbs": 550, "requests_m": 105, "error_rate": 0.009 },
      { "month": "Apr", "throughput_mbs": 610, "requests_m": 118, "error_rate": 0.008 },
      { "month": "May", "throughput_mbs": 690, "requests_m": 134, "error_rate": 0.010 },
      { "month": "Jun", "throughput_mbs": 740, "requests_m": 148, "error_rate": 0.007 },
      { "month": "Jul", "throughput_mbs": 810, "requests_m": 162, "error_rate": 0.006 },
      { "month": "Aug", "throughput_mbs": 890, "requests_m": 179, "error_rate": 0.005 },
      { "month": "Sep", "throughput_mbs": 960, "requests_m": 194, "error_rate": 0.006 },
      { "month": "Oct", "throughput_mbs": 1040, "requests_m": 210, "error_rate": 0.004 },
      { "month": "Nov", "throughput_mbs": 1120, "requests_m": 228, "error_rate": 0.005 },
      { "month": "Dec", "throughput_mbs": 1250, "requests_m": 252, "error_rate": 0.003 }
    ],
    "regional_distribution": [
      { "region": "US-East (N. Virginia)", "share_percent": 38, "color": "#0284c7" },
      { "region": "EU-Central (Frankfurt)", "share_percent": 28, "color": "#10b981" },
      { "region": "AP-Southeast (Singapore)", "share_percent": 20, "color": "#f59e0b" },
      { "region": "US-West (Oregon)", "share_percent": 14, "color": "#8b5cf6" }
    ],
    "services": [
      { "id": "SVC-101", "name": "auth-gateway-service", "environment": "Production", "status": "Healthy", "latency_ms": 12, "uptime_percent": 99.99, "cpu_usage": 34, "memory_mb": 512, "region": "US-East", "version": "v2.4.1", "last_deployed": "2 hours ago" },
      { "id": "SVC-102", "name": "billing-payment-engine", "environment": "Production", "status": "Healthy", "latency_ms": 28, "uptime_percent": 99.98, "cpu_usage": 48, "memory_mb": 1024, "region": "US-East", "version": "v3.1.0", "last_deployed": "1 day ago" },
      { "id": "SVC-103", "name": "edge-video-transcoder", "environment": "Production", "status": "Degraded", "latency_ms": 78, "uptime_percent": 98.40, "cpu_usage": 88, "memory_mb": 4096, "region": "EU-Central", "version": "v1.9.8", "last_deployed": "3 hours ago" },
      { "id": "SVC-104", "name": "telemetry-metrics-ingest", "environment": "Production", "status": "Healthy", "latency_ms": 8, "uptime_percent": 100.0, "cpu_usage": 62, "memory_mb": 2048, "region": "US-East", "version": "v4.0.2", "last_deployed": "5 days ago" },
      { "id": "SVC-105", "name": "user-profile-graphql-api", "environment": "Production", "status": "Healthy", "latency_ms": 19, "uptime_percent": 99.95, "cpu_usage": 41, "memory_mb": 768, "region": "EU-Central", "version": "v2.8.0", "last_deployed": "6 hours ago" },
      { "id": "SVC-106", "name": "search-indexer-worker", "environment": "Staging", "status": "Healthy", "latency_ms": 42, "uptime_percent": 99.50, "cpu_usage": 55, "memory_mb": 1536, "region": "US-West", "version": "v3.0.0-rc2", "last_deployed": "30 mins ago" },
      { "id": "SVC-107", "name": "notification-dispatcher", "environment": "Production", "status": "Healthy", "latency_ms": 14, "uptime_percent": 99.97, "cpu_usage": 29, "memory_mb": 384, "region": "AP-Southeast", "version": "v1.4.5", "last_deployed": "2 days ago" },
      { "id": "SVC-108", "name": "recommendation-ml-pod", "environment": "Production", "status": "Degraded", "latency_ms": 94, "uptime_percent": 97.90, "cpu_usage": 91, "memory_mb": 8192, "region": "US-East", "version": "v2.0.1", "last_deployed": "4 hours ago" },
      { "id": "SVC-109", "name": "cdn-cache-invalidator", "environment": "Production", "status": "Healthy", "latency_ms": 6, "uptime_percent": 99.99, "cpu_usage": 18, "memory_mb": 256, "region": "AP-Southeast", "version": "v1.1.0", "last_deployed": "1 week ago" },
      { "id": "SVC-110", "name": "data-warehouse-etl-job", "environment": "Development", "status": "Critical", "latency_ms": 240, "uptime_percent": 92.10, "cpu_usage": 98, "memory_mb": 6144, "region": "US-West", "version": "v0.9.4", "last_deployed": "10 mins ago" },
      { "id": "SVC-111", "name": "identity-oauth-provider", "environment": "Production", "status": "Healthy", "latency_ms": 15, "uptime_percent": 99.99, "cpu_usage": 32, "memory_mb": 512, "region": "EU-Central", "version": "v2.2.0", "last_deployed": "3 days ago" },
      { "id": "SVC-112", "name": "media-storage-sync", "environment": "Production", "status": "Healthy", "latency_ms": 22, "uptime_percent": 99.92, "cpu_usage": 45, "memory_mb": 1024, "region": "US-East", "version": "v1.8.3", "last_deployed": "12 hours ago" },
      { "id": "SVC-113", "name": "audit-compliance-logger", "environment": "Production", "status": "Healthy", "latency_ms": 11, "uptime_percent": 100.0, "cpu_usage": 22, "memory_mb": 512, "region": "EU-Central", "version": "v3.0.1", "last_deployed": "4 days ago" },
      { "id": "SVC-114", "name": "realtime-websocket-hub", "environment": "Production", "status": "Healthy", "latency_ms": 7, "uptime_percent": 99.98, "cpu_usage": 67, "memory_mb": 3072, "region": "US-East", "version": "v2.6.4", "last_deployed": "1 day ago" },
      { "id": "SVC-115", "name": "invoice-pdf-generator", "environment": "Staging", "status": "Healthy", "latency_ms": 65, "uptime_percent": 99.10, "cpu_usage": 38, "memory_mb": 1024, "region": "US-West", "version": "v1.3.0", "last_deployed": "5 hours ago" },
      { "id": "SVC-116", "name": "fraud-detection-rules", "environment": "Production", "status": "Healthy", "latency_ms": 24, "uptime_percent": 99.96, "cpu_usage": 52, "memory_mb": 2048, "region": "US-East", "version": "v2.1.2", "last_deployed": "2 days ago" },
      { "id": "SVC-117", "name": "email-smtp-relay", "environment": "Production", "status": "Healthy", "latency_ms": 31, "uptime_percent": 99.88, "cpu_usage": 25, "memory_mb": 512, "region": "AP-Southeast", "version": "v1.0.8", "last_deployed": "1 week ago" },
      { "id": "SVC-118", "name": "analytics-aggregation-api", "environment": "Production", "status": "Healthy", "latency_ms": 18, "uptime_percent": 99.94, "cpu_usage": 58, "memory_mb": 2048, "region": "EU-Central", "version": "v3.2.0", "last_deployed": "18 hours ago" },
      { "id": "SVC-119", "name": "redis-cluster-cache", "environment": "Production", "status": "Healthy", "latency_ms": 3, "uptime_percent": 100.0, "cpu_usage": 42, "memory_mb": 8192, "region": "US-East", "version": "v7.2.1", "last_deployed": "2 weeks ago" },
      { "id": "SVC-120", "name": "kubernetes-auto-scaler", "environment": "Production", "status": "Healthy", "latency_ms": 16, "uptime_percent": 99.99, "cpu_usage": 28, "memory_mb": 512, "region": "US-West", "version": "v1.5.0", "last_deployed": "3 days ago" },
      { "id": "SVC-121", "name": "webhook-event-receiver", "environment": "Staging", "status": "Degraded", "latency_ms": 86, "uptime_percent": 98.10, "cpu_usage": 79, "memory_mb": 1024, "region": "US-East", "version": "v2.0.0-beta", "last_deployed": "1 hour ago" },
      { "id": "SVC-122", "name": "secrets-vault-manager", "environment": "Production", "status": "Healthy", "latency_ms": 9, "uptime_percent": 100.0, "cpu_usage": 19, "memory_mb": 512, "region": "EU-Central", "version": "v4.1.0", "last_deployed": "6 days ago" },
      { "id": "SVC-123", "name": "content-localization-svc", "environment": "Development", "status": "Healthy", "latency_ms": 35, "uptime_percent": 99.20, "cpu_usage": 31, "memory_mb": 768, "region": "AP-Southeast", "version": "v0.8.2", "last_deployed": "2 hours ago" },
      { "id": "SVC-124", "name": "asset-thumbnail-resizer", "environment": "Production", "status": "Healthy", "latency_ms": 44, "uptime_percent": 99.85, "cpu_usage": 64, "memory_mb": 2048, "region": "US-West", "version": "v2.3.1", "last_deployed": "4 days ago" },
      { "id": "SVC-125", "name": "customer-support-ticket-bot", "environment": "Development", "status": "Critical", "latency_ms": 310, "uptime_percent": 89.40, "cpu_usage": 96, "memory_mb": 1536, "region": "US-East", "version": "v0.5.0", "last_deployed": "15 mins ago" }
    ],
    "activity_logs": [
      { "timestamp": "13:14:22", "level": "INFO", "service": "auth-gateway-service", "message": "SSL certificate renewal verified successfully." },
      { "timestamp": "13:12:05", "level": "WARN", "service": "edge-video-transcoder", "message": "CPU utilization exceeded 85% threshold on node pod-04." },
      { "timestamp": "13:08:41", "level": "ERROR", "service": "data-warehouse-etl-job", "message": "Connection timeout to replica database cluster." },
      { "timestamp": "13:05:19", "level": "INFO", "service": "telemetry-metrics-ingest", "message": "High-cardinality indexing completed for 12.4M metric events." },
      { "timestamp": "12:58:33", "level": "WARN", "service": "recommendation-ml-pod", "message": "Memory utilization reached 91%; trigger auto-scaling horizontal pod." },
      { "timestamp": "12:51:10", "level": "INFO", "service": "redis-cluster-cache", "message": "Cache eviction policy executed; hit ratio stabilized at 98.4%." }
    ]
  };

  // --- Global Application State ---
  const state = {
    data: null,
    services: [],
    filteredServices: [],
    sortColumn: 'name',
    sortDirection: 'asc',
    currentPage: 1,
    pageSize: 6,
    searchQuery: '',
    statusFilter: 'ALL',
    envFilter: 'ALL',
    chartMetric: 'requests_m', // 'requests_m', 'throughput_mbs', 'error_rate'
    selectedService: null,
    lastFocusedElement: null
  };

  // --- DOM Element References ---
  const DOM = {
    // KPI Counters
    kpiSpend: document.getElementById('kpi-spend'),
    kpiSpendTrend: document.getElementById('kpi-spend-trend'),
    kpiLatency: document.getElementById('kpi-latency'),
    kpiLatencyTrend: document.getElementById('kpi-latency-trend'),
    kpiUptime: document.getElementById('kpi-uptime'),
    kpiUptimeTrend: document.getElementById('kpi-uptime-trend'),
    kpiServices: document.getElementById('kpi-services'),
    kpiServicesTrend: document.getElementById('kpi-services-trend'),
    
    // Charts
    barChartContainer: document.getElementById('bar-chart-container'),
    doughnutChartContainer: document.getElementById('doughnut-chart-container'),
    chartMetricButtons: document.querySelectorAll('[data-chart-metric]'),
    
    // Table & Controls
    searchInput: document.getElementById('table-search'),
    statusFilter: document.getElementById('status-filter'),
    envFilter: document.getElementById('env-filter'),
    servicesTableBody: document.getElementById('services-table-body'),
    sortHeaders: document.querySelectorAll('th[data-sort]'),
    paginationContainer: document.getElementById('pagination-container'),
    paginationSummary: document.getElementById('pagination-summary'),
    exportCsvBtn: document.getElementById('export-csv-btn'),
    refreshTelemetryBtn: document.getElementById('refresh-telemetry-btn'),
    
    // Activity Logs
    activityLogsList: document.getElementById('activity-logs-list'),
    
    // Modal
    modalOverlay: document.getElementById('service-modal-overlay'),
    modalDialog: document.getElementById('service-modal'),
    modalCloseBtn: document.getElementById('modal-close-btn'),
    modalTitle: document.getElementById('modal-title'),
    modalBody: document.getElementById('modal-body'),
    
    // Accessibility & Toast
    a11yAnnouncer: document.getElementById('a11y-announcer'),
    toastContainer: document.getElementById('toast-container'),
    contrastToggleBtn: document.getElementById('contrast-toggle'),
    fontScaleButtons: document.querySelectorAll('[data-font-scale]')
  };

  // --- Accessibility Screen Reader Announcer ---
  function announce(message) {
    if (DOM.a11yAnnouncer) {
      DOM.a11yAnnouncer.textContent = '';
      setTimeout(() => {
        DOM.a11yAnnouncer.textContent = message;
      }, 50);
    }
  }

  // --- Toast Notification System ---
  function showToast(message, type = 'info') {
    if (!DOM.toastContainer) return;
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.setAttribute('role', 'status');
    toast.innerHTML = `
      <div class="toast-indicator"></div>
      <div class="toast-content">${escapeHTML(message)}</div>
      <button class="toast-close" aria-label="Dismiss notification">&times;</button>
    `;

    toast.querySelector('.toast-close').addEventListener('click', () => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 250);
    });

    DOM.toastContainer.appendChild(toast);
    announce(message);

    setTimeout(() => {
      if (toast.parentElement) {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 250);
      }
    }, 4500);
  }

  // Helper: Escape HTML to prevent injection
  function escapeHTML(str) {
    if (typeof str !== 'string') return str;
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

  // --- Initialization & Data Fetching ---
  async function init() {
    initAccessibilityPreferences();
    setupEventListeners();
    await loadData();
    registerServiceWorker();
  }

  async function loadData() {
    try {
      const response = await fetch('./data.json', { cache: 'no-cache' });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      state.data = await response.json();
      console.log('[OmniMetrics] Loaded telemetry data from data.json');
    } catch (err) {
      console.warn('[OmniMetrics] Fetch data.json failed or blocked (e.g. file:/// protocol). Utilizing embedded fallback dataset.', err);
      state.data = JSON.parse(JSON.stringify(FALLBACK_DATA));
    }

    state.services = [...state.data.services];
    state.filteredServices = [...state.services];

    renderSummaryKPIs();
    renderBarChart();
    renderDoughnutChart();
    applyFilterAndSort();
    renderActivityLogs();
  }

  // --- Render Summary KPIs ---
  function renderSummaryKPIs() {
    if (!state.data || !state.data.summary) return;
    const s = state.data.summary;
    if (DOM.kpiSpend) DOM.kpiSpend.textContent = s.total_spend;
    if (DOM.kpiSpendTrend) DOM.kpiSpendTrend.textContent = s.total_spend_trend;
    if (DOM.kpiLatency) DOM.kpiLatency.textContent = s.avg_latency;
    if (DOM.kpiLatencyTrend) DOM.kpiLatencyTrend.textContent = s.avg_latency_trend;
    if (DOM.kpiUptime) DOM.kpiUptime.textContent = s.uptime;
    if (DOM.kpiUptimeTrend) DOM.kpiUptimeTrend.textContent = s.uptime_trend;
    if (DOM.kpiServices) DOM.kpiServices.textContent = s.active_services;
    if (DOM.kpiServicesTrend) DOM.kpiServicesTrend.textContent = s.active_services_trend;
  }

  // --- Render Interactive SVG Bar Chart ---
  function renderBarChart() {
    if (!DOM.barChartContainer || !state.data || !state.data.monthly_metrics) return;
    const metrics = state.data.monthly_metrics;
    const metricKey = state.chartMetric;

    let maxValue = 0;
    let unit = '';
    let labelTitle = '';

    if (metricKey === 'requests_m') {
      maxValue = Math.max(...metrics.map(m => m.requests_m)) * 1.15;
      unit = 'M req';
      labelTitle = 'Global API Requests (Millions)';
    } else if (metricKey === 'throughput_mbs') {
      maxValue = Math.max(...metrics.map(m => m.throughput_mbs)) * 1.15;
      unit = 'MB/s';
      labelTitle = 'Network Throughput (MB/s)';
    } else if (metricKey === 'error_rate') {
      maxValue = Math.max(...metrics.map(m => m.error_rate)) * 1.25;
      unit = '%';
      labelTitle = 'Telemetry Error Rate (%)';
    }

    const svgWidth = 720;
    const svgHeight = 280;
    const paddingLeft = 55;
    const paddingBottom = 40;
    const paddingTop = 25;
    const chartHeight = svgHeight - paddingTop - paddingBottom;
    const chartWidth = svgWidth - paddingLeft - 20;

    const barWidth = 32;
    const gap = (chartWidth - (metrics.length * barWidth)) / (metrics.length + 1);

    // Generate grid lines
    let gridLinesHTML = '';
    const steps = 4;
    for (let i = 0; i <= steps; i++) {
      const y = paddingTop + chartHeight - (i * (chartHeight / steps));
      const val = (maxValue * (i / steps));
      const displayVal = metricKey === 'error_rate' ? (val * 100).toFixed(1) + '%' : Math.round(val);
      gridLinesHTML += `
        <line x1="${paddingLeft}" y1="${y}" x2="${svgWidth - 15}" y2="${y}" stroke="var(--border-subtle)" stroke-dasharray="3,3" stroke-width="1" />
        <text x="${paddingLeft - 8}" y="${y + 4}" font-size="11" fill="var(--text-muted)" text-anchor="end" font-family="sans-serif">${displayVal}</text>
      `;
    }

    // Generate Bars
    let barsHTML = '';
    metrics.forEach((m, idx) => {
      const rawVal = m[metricKey];
      const valRatio = rawVal / maxValue;
      const barH = Math.max(valRatio * chartHeight, 4);
      const x = paddingLeft + gap + idx * (barWidth + gap);
      const y = paddingTop + chartHeight - barH;

      const formattedVal = metricKey === 'error_rate' ? (rawVal * 100).toFixed(2) + '%' : `${rawVal} ${unit}`;
      const ariaLabel = `${m.month}: ${formattedVal}`;

      barsHTML += `
        <g class="chart-bar-group" tabindex="0" role="graphics-symbol" aria-label="${ariaLabel}">
          <rect class="chart-bar" x="${x}" y="${y}" width="${barWidth}" height="${barH}" rx="4" fill="url(#barGradient)" />
          <text class="chart-label-x" x="${x + barWidth / 2}" y="${svgHeight - 15}" font-size="12" fill="var(--text-secondary)" text-anchor="middle" font-weight="600">${m.month}</text>
          <text class="chart-bar-val" x="${x + barWidth / 2}" y="${y - 6}" font-size="10" fill="var(--text-primary)" text-anchor="middle" opacity="0">${formattedVal}</text>
        </g>
      `;
    });

    DOM.barChartContainer.innerHTML = `
      <div class="chart-header-row">
        <h3 class="chart-title">${labelTitle}</h3>
        <span class="chart-subtitle">12-Month Telemetry Trends</span>
      </div>
      <svg class="responsive-svg" viewBox="0 0 ${svgWidth} ${svgHeight}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${labelTitle} bar chart">
        <defs>
          <linearGradient id="barGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#38bdf8" />
            <stop offset="100%" stop-color="#0284c7" />
          </linearGradient>
        </defs>
        ${gridLinesHTML}
        ${barsHTML}
      </svg>
    `;

    // Tooltip interaction on hover/focus
    DOM.barChartContainer.querySelectorAll('.chart-bar-group').forEach(group => {
      const valText = group.querySelector('.chart-bar-val');
      const bar = group.querySelector('.chart-bar');
      const showTooltip = () => {
        if (valText) valText.style.opacity = '1';
        if (bar) bar.style.fill = '#f59e0b';
      };
      const hideTooltip = () => {
        if (valText) valText.style.opacity = '0';
        if (bar) bar.style.fill = 'url(#barGradient)';
      };
      group.addEventListener('mouseenter', showTooltip);
      group.addEventListener('mouseleave', hideTooltip);
      group.addEventListener('focus', showTooltip);
      group.addEventListener('blur', hideTooltip);
    });
  }

  // --- Render Interactive SVG Doughnut Chart ---
  function renderDoughnutChart() {
    if (!DOM.doughnutChartContainer || !state.data || !state.data.regional_distribution) return;
    const regions = state.data.regional_distribution;

    const size = 260;
    const center = size / 2;
    const radius = 90;
    const circumference = 2 * Math.PI * radius;

    let accumulatedAngle = 0;
    let circlesHTML = '';
    let legendHTML = '';

    regions.forEach((r) => {
      const dashLength = (r.share_percent / 100) * circumference;
      const strokeDashoffset = -accumulatedAngle;
      accumulatedAngle += dashLength;

      circlesHTML += `
        <circle 
          class="doughnut-segment"
          cx="${center}" cy="${center}" r="${radius}"
          fill="transparent"
          stroke="${r.color}"
          stroke-width="32"
          stroke-dasharray="${dashLength} ${circumference - dashLength}"
          stroke-dashoffset="${strokeDashoffset}"
          tabindex="0"
          role="graphics-symbol"
          aria-label="${r.region}: ${r.share_percent}% of global traffic"
          data-region="${escapeHTML(r.region)}"
          data-percent="${r.share_percent}%"
        />
      `;

      legendHTML += `
        <li class="legend-item" tabindex="0" role="button" aria-label="${r.region}: ${r.share_percent}%">
          <span class="legend-dot" style="background-color: ${r.color}"></span>
          <span class="legend-name">${escapeHTML(r.region)}</span>
          <span class="legend-val font-semibold">${r.share_percent}%</span>
        </li>
      `;
    });

    DOM.doughnutChartContainer.innerHTML = `
      <div class="chart-header-row">
        <h3 class="chart-title">Regional Traffic Distribution</h3>
        <span class="chart-subtitle">Global Multi-Cloud Spread</span>
      </div>
      <div class="doughnut-wrapper">
        <div class="doughnut-svg-container">
          <svg class="responsive-svg doughnut-svg" viewBox="0 0 ${size} ${size}" role="img" aria-label="Regional traffic distribution doughnut chart">
            <g transform="rotate(-90 ${center} ${center})">
              ${circlesHTML}
            </g>
            <text class="doughnut-center-number" x="${center}" y="${center - 2}" text-anchor="middle" font-size="24" font-weight="700" fill="var(--text-primary)">100%</text>
            <text class="doughnut-center-label" x="${center}" y="${center + 18}" text-anchor="middle" font-size="11" fill="var(--text-muted)">Global Traffic</text>
          </svg>
        </div>
        <ul class="doughnut-legend" role="list">
          ${legendHTML}
        </ul>
      </div>
    `;

    // Interactive segment highlights
    const segments = DOM.doughnutChartContainer.querySelectorAll('.doughnut-segment');
    const centerNumber = DOM.doughnutChartContainer.querySelector('.doughnut-center-number');
    const centerLabel = DOM.doughnutChartContainer.querySelector('.doughnut-center-label');

    segments.forEach((seg) => {
      const showHighlight = () => {
        centerNumber.textContent = seg.getAttribute('data-percent');
        centerLabel.textContent = seg.getAttribute('data-region').split(' ')[0];
        seg.style.strokeWidth = '38';
      };
      const resetHighlight = () => {
        centerNumber.textContent = '100%';
        centerLabel.textContent = 'Global Traffic';
        seg.style.strokeWidth = '32';
      };
      seg.addEventListener('mouseenter', showHighlight);
      seg.addEventListener('mouseleave', resetHighlight);
      seg.addEventListener('focus', showHighlight);
      seg.addEventListener('blur', resetHighlight);
    });
  }

  // --- Filtering & Sorting Controller ---
  function applyFilterAndSort() {
    let result = [...state.services];

    // Status Filter
    if (state.statusFilter !== 'ALL') {
      result = result.filter(s => s.status.toUpperCase() === state.statusFilter);
    }

    // Environment Filter
    if (state.envFilter !== 'ALL') {
      result = result.filter(s => s.environment.toUpperCase() === state.envFilter);
    }

    // Search Query (Multi-field)
    if (state.searchQuery.trim() !== '') {
      const q = state.searchQuery.toLowerCase().trim();
      result = result.filter(s => 
        s.name.toLowerCase().includes(q) ||
        s.id.toLowerCase().includes(q) ||
        s.region.toLowerCase().includes(q) ||
        s.version.toLowerCase().includes(q)
      );
    }

    // Sorting
    const col = state.sortColumn;
    const dir = state.sortDirection === 'asc' ? 1 : -1;

    result.sort((a, b) => {
      let valA = a[col];
      let valB = b[col];

      if (typeof valA === 'string') {
        return valA.localeCompare(valB) * dir;
      }
      return (valA - valB) * dir;
    });

    state.filteredServices = result;

    // Boundary check for pagination
    const totalPages = Math.ceil(state.filteredServices.length / state.pageSize) || 1;
    if (state.currentPage > totalPages) {
      state.currentPage = totalPages;
    }

    renderTable();
    renderPagination();
    updateSortHeadersUI();
  }

  // --- Render Services Data Table ---
  function renderTable() {
    if (!DOM.servicesTableBody) return;

    if (state.filteredServices.length === 0) {
      DOM.servicesTableBody.innerHTML = `
        <tr>
          <td colspan="7" class="table-empty-state">
            <div class="empty-state-content">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <p class="empty-title">No matching microservices found</p>
              <p class="empty-subtitle">Try adjusting your search keywords or filter criteria.</p>
              <button class="btn btn-secondary btn-sm" id="reset-filters-btn">Reset All Filters</button>
            </div>
          </td>
        </tr>
      `;
      const resetBtn = document.getElementById('reset-filters-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          state.searchQuery = '';
          state.statusFilter = 'ALL';
          state.envFilter = 'ALL';
          if (DOM.searchInput) DOM.searchInput.value = '';
          if (DOM.statusFilter) DOM.statusFilter.value = 'ALL';
          if (DOM.envFilter) DOM.envFilter.value = 'ALL';
          applyFilterAndSort();
          announce('Filters reset. Displaying all microservices.');
        });
      }
      return;
    }

    const startIndex = (state.currentPage - 1) * state.pageSize;
    const pageItems = state.filteredServices.slice(startIndex, startIndex + state.pageSize);

    let html = '';
    pageItems.forEach((svc) => {
      const statusClass = svc.status.toLowerCase();
      const statusIcon = svc.status === 'Healthy' 
        ? '<span class="status-dot dot-healthy" aria-hidden="true"></span>' 
        : svc.status === 'Degraded' 
          ? '<span class="status-dot dot-degraded" aria-hidden="true"></span>' 
          : '<span class="status-dot dot-critical" aria-hidden="true"></span>';

      html += `
        <tr class="service-row" data-id="${svc.id}">
          <td class="font-mono text-muted">${escapeHTML(svc.id)}</td>
          <td>
            <div class="service-name-cell">
              <span class="service-name font-medium">${escapeHTML(svc.name)}</span>
              <span class="service-version text-xs text-muted">${escapeHTML(svc.version)}</span>
            </div>
          </td>
          <td>
            <span class="badge badge-env">${escapeHTML(svc.environment)}</span>
          </td>
          <td>
            <span class="badge badge-status badge-${statusClass}">
              ${statusIcon}
              ${escapeHTML(svc.status)}
            </span>
          </td>
          <td class="font-mono">${svc.latency_ms} ms</td>
          <td class="font-mono">${svc.uptime_percent.toFixed(2)}%</td>
          <td class="text-right">
            <button class="btn btn-inspect" data-inspect="${svc.id}" aria-label="Inspect service details for ${escapeHTML(svc.name)}">
              Inspect
            </button>
          </td>
        </tr>
      `;
    });

    DOM.servicesTableBody.innerHTML = html;

    // Attach inspect click handlers
    DOM.servicesTableBody.querySelectorAll('.btn-inspect').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = btn.getAttribute('data-inspect');
        openServiceModal(id, btn);
      });
    });
  }

  // --- Render Accessible Pagination Controls ---
  function renderPagination() {
    if (!DOM.paginationContainer) return;

    const totalItems = state.filteredServices.length;
    const totalPages = Math.ceil(totalItems / state.pageSize) || 1;
    const startIndex = totalItems === 0 ? 0 : (state.currentPage - 1) * state.pageSize + 1;
    const endIndex = Math.min(state.currentPage * state.pageSize, totalItems);

    if (DOM.paginationSummary) {
      DOM.paginationSummary.textContent = `Showing ${startIndex}–${endIndex} of ${totalItems} microservices`;
    }

    let buttonsHTML = '';

    // Previous Button
    const prevDisabled = state.currentPage === 1 ? 'disabled aria-disabled="true"' : '';
    buttonsHTML += `
      <button class="btn-page btn-page-nav" data-page="${state.currentPage - 1}" ${prevDisabled} aria-label="Previous page">
        &laquo; Prev
      </button>
    `;

    // Page number buttons
    for (let p = 1; p <= totalPages; p++) {
      if (p === 1 || p === totalPages || (p >= state.currentPage - 1 && p <= state.currentPage + 1)) {
        const isActive = p === state.currentPage;
        const activeAttr = isActive ? 'aria-current="page" class="btn-page active"' : 'class="btn-page"';
        buttonsHTML += `
          <button ${activeAttr} data-page="${p}" aria-label="Page ${p}">
            ${p}
          </button>
        `;
      } else if (p === state.currentPage - 2 || p === state.currentPage + 2) {
        buttonsHTML += `<span class="page-ellipsis" aria-hidden="true">&hellip;</span>`;
      }
    }

    // Next Button
    const nextDisabled = state.currentPage === totalPages || totalItems === 0 ? 'disabled aria-disabled="true"' : '';
    buttonsHTML += `
      <button class="btn-page btn-page-nav" data-page="${state.currentPage + 1}" ${nextDisabled} aria-label="Next page">
        Next &raquo;
      </button>
    `;

    DOM.paginationContainer.innerHTML = buttonsHTML;

    // Attach click events
    DOM.paginationContainer.querySelectorAll('.btn-page:not([disabled])').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetPage = parseInt(btn.getAttribute('data-page'), 10);
        if (targetPage >= 1 && targetPage <= totalPages && targetPage !== state.currentPage) {
          state.currentPage = targetPage;
          renderTable();
          renderPagination();
          announce(`Navigated to page ${state.currentPage} of ${totalPages}`);
          // Focus first inspect button on the new page for screen readers
          const firstInspectBtn = DOM.servicesTableBody.querySelector('.btn-inspect');
          if (firstInspectBtn) firstInspectBtn.focus();
        }
      });
    });
  }

  // --- Update Sort Headers UI (ARIA sort attributes) ---
  function updateSortHeadersUI() {
    DOM.sortHeaders.forEach(th => {
      const col = th.getAttribute('data-sort');
      if (col === state.sortColumn) {
        th.setAttribute('aria-sort', state.sortDirection === 'asc' ? 'ascending' : 'descending');
        th.classList.add('sorted');
      } else {
        th.removeAttribute('aria-sort');
        th.classList.remove('sorted');
      }
    });
  }

  // --- Render System Activity Logs ---
  function renderActivityLogs() {
    if (!DOM.activityLogsList || !state.data || !state.data.activity_logs) return;
    const logs = state.data.activity_logs;

    let html = '';
    logs.forEach(log => {
      const levelClass = log.level.toLowerCase();
      html += `
        <li class="log-item">
          <span class="log-time font-mono">${escapeHTML(log.timestamp)}</span>
          <span class="badge badge-log badge-${levelClass}">${escapeHTML(log.level)}</span>
          <div class="log-body">
            <span class="log-service font-medium">${escapeHTML(log.service)}</span>
            <span class="log-message text-muted">${escapeHTML(log.message)}</span>
          </div>
        </li>
      `;
    });

    DOM.activityLogsList.innerHTML = html;
  }

  // --- Accessible Modal Dialog Controller ---
  function openServiceModal(serviceId, triggerElement) {
    const svc = state.services.find(s => s.id === serviceId);
    if (!svc) return;

    state.selectedService = svc;
    state.lastFocusedElement = triggerElement || document.activeElement;

    if (DOM.modalTitle) {
      DOM.modalTitle.textContent = `${svc.name} (${svc.id})`;
    }

    if (DOM.modalBody) {
      const cpuWidth = Math.min(svc.cpu_usage, 100);
      const memFormatted = svc.memory_mb >= 1024 ? (svc.memory_mb / 1024).toFixed(1) + ' GB' : svc.memory_mb + ' MB';

      DOM.modalBody.innerHTML = `
        <div class="modal-grid">
          <div class="modal-card">
            <span class="modal-label">Status</span>
            <span class="badge badge-status badge-${svc.status.toLowerCase()}">${svc.status}</span>
          </div>
          <div class="modal-card">
            <span class="modal-label">Environment</span>
            <span class="modal-val font-semibold">${escapeHTML(svc.environment)}</span>
          </div>
          <div class="modal-card">
            <span class="modal-label">Primary Region</span>
            <span class="modal-val">${escapeHTML(svc.region)}</span>
          </div>
          <div class="modal-card">
            <span class="modal-label">Release Version</span>
            <span class="modal-val font-mono">${escapeHTML(svc.version)}</span>
          </div>
        </div>

        <div class="modal-section">
          <h4 class="modal-section-title">Telemetry & Health Gauges</h4>
          
          <div class="telemetry-gauge">
            <div class="gauge-header">
              <span>CPU Utilization</span>
              <span class="font-mono font-semibold">${svc.cpu_usage}%</span>
            </div>
            <div class="gauge-bar-track">
              <div class="gauge-bar-fill ${svc.cpu_usage > 85 ? 'fill-danger' : svc.cpu_usage > 65 ? 'fill-warning' : 'fill-primary'}" style="width: ${cpuWidth}%"></div>
            </div>
          </div>

          <div class="telemetry-gauge">
            <div class="gauge-header">
              <span>Allocated Memory</span>
              <span class="font-mono font-semibold">${memFormatted}</span>
            </div>
            <div class="gauge-bar-track">
              <div class="gauge-bar-fill fill-secondary" style="width: ${(svc.memory_mb / 8192 * 100).toFixed(0)}%"></div>
            </div>
          </div>

          <div class="telemetry-gauge">
            <div class="gauge-header">
              <span>Historical SLA Uptime</span>
              <span class="font-mono font-semibold">${svc.uptime_percent.toFixed(2)}%</span>
            </div>
            <div class="gauge-bar-track">
              <div class="gauge-bar-fill fill-success" style="width: ${svc.uptime_percent}%"></div>
            </div>
          </div>
        </div>

        <div class="modal-footer-info">
          <span class="text-xs text-muted">Last deployed ${escapeHTML(svc.last_deployed)} via GitHub Actions CI/CD pipeline</span>
          <div class="modal-action-row">
            <button class="btn btn-secondary btn-sm" id="modal-ping-btn">Ping Healthcheck</button>
            <button class="btn btn-primary btn-sm" id="modal-close-action-btn">Done</button>
          </div>
        </div>
      `;

      document.getElementById('modal-close-action-btn').addEventListener('click', closeServiceModal);
      document.getElementById('modal-ping-btn').addEventListener('click', () => {
        showToast(`Healthcheck ping verified: ${svc.name} responded in ${svc.latency_ms} ms.`, 'success');
      });
    }

    if (DOM.modalOverlay) {
      DOM.modalOverlay.classList.add('active');
      DOM.modalOverlay.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
    }

    // Trap focus inside modal
    setupFocusTrap(DOM.modalDialog);
    if (DOM.modalCloseBtn) DOM.modalCloseBtn.focus();
    announce(`Dialog opened: Details for ${svc.name}`);
  }

  function closeServiceModal() {
    if (!DOM.modalOverlay || !DOM.modalOverlay.classList.contains('active')) return;

    DOM.modalOverlay.classList.remove('active');
    DOM.modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');

    // Restore focus to triggering button
    if (state.lastFocusedElement && typeof state.lastFocusedElement.focus === 'function') {
      state.lastFocusedElement.focus();
    }
    announce('Dialog closed.');
  }

  // Focus Trapping implementation for WCAG modal compliance
  function setupFocusTrap(container) {
    if (!container) return;
    const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    
    container.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeServiceModal();
        return;
      }

      if (e.key === 'Tab') {
        const focusables = Array.from(container.querySelectorAll(focusableSelectors)).filter(el => !el.hasAttribute('disabled'));
        if (focusables.length === 0) return;

        const firstElement = focusables[0];
        const lastElement = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    });
  }

  // --- Export Filtered Data to CSV ---
  function exportToCSV() {
    const items = state.filteredServices;
    if (items.length === 0) {
      showToast('No records to export.', 'warning');
      return;
    }

    const headers = ['ID', 'Service Name', 'Environment', 'Status', 'Latency (ms)', 'Uptime (%)', 'Region', 'CPU (%)', 'Memory (MB)', 'Version'];
    const rows = items.map(s => [
      `"${s.id}"`,
      `"${s.name}"`,
      `"${s.environment}"`,
      `"${s.status}"`,
      s.latency_ms,
      s.uptime_percent,
      `"${s.region}"`,
      s.cpu_usage,
      s.memory_mb,
      `"${s.version}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `omnimetrics_telemetry_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast(`Successfully exported ${items.length} records to CSV.`, 'success');
  }

  // --- Simulate Telemetry Real-time Refresh ---
  function refreshTelemetry() {
    if (!state.services || state.services.length === 0) return;

    // Apply minor live jitter to latencies
    state.services.forEach(s => {
      const delta = Math.floor(Math.random() * 5) - 2;
      s.latency_ms = Math.max(3, s.latency_ms + delta);
    });

    applyFilterAndSort();
    showToast('Telemetry refreshed: live cluster heartbeats updated.', 'info');
  }

  // --- Accessibility Preferences (High Contrast & Font Scaling) ---
  function initAccessibilityPreferences() {
    // High contrast preference
    const savedContrast = localStorage.getItem('omnimetrics_contrast');
    if (savedContrast === 'high') {
      document.body.classList.add('high-contrast');
    }

    // Font scale preference
    const savedFontScale = localStorage.getItem('omnimetrics_fontscale');
    if (savedFontScale) {
      document.documentElement.style.fontSize = savedFontScale;
    }
  }

  function toggleHighContrast() {
    const isHigh = document.body.classList.toggle('high-contrast');
    localStorage.setItem('omnimetrics_contrast', isHigh ? 'high' : 'normal');
    announce(`High contrast mode ${isHigh ? 'enabled' : 'disabled'}`);
    showToast(`High Contrast Mode: ${isHigh ? 'ON (WCAG AAA)' : 'OFF'}`, 'info');
  }

  function setFontScale(scaleRatio) {
    const basePx = 16;
    const targetPx = Math.round(basePx * parseFloat(scaleRatio));
    document.documentElement.style.fontSize = `${targetPx}px`;
    localStorage.setItem('omnimetrics_fontscale', `${targetPx}px`);
    announce(`Font size scaled to ${Math.round(scaleRatio * 100)}%`);
  }

  // --- Event Listeners Setup ---
  function setupEventListeners() {
    // Search input (debounced)
    let searchTimeout;
    if (DOM.searchInput) {
      DOM.searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
          state.searchQuery = e.target.value;
          state.currentPage = 1;
          applyFilterAndSort();
          announce(`Search filtered results: ${state.filteredServices.length} microservices found.`);
        }, 250);
      });
    }

    // Status Filter
    if (DOM.statusFilter) {
      DOM.statusFilter.addEventListener('change', (e) => {
        state.statusFilter = e.target.value;
        state.currentPage = 1;
        applyFilterAndSort();
        announce(`Filtered by status: ${state.statusFilter}. ${state.filteredServices.length} records found.`);
      });
    }

    // Environment Filter
    if (DOM.envFilter) {
      DOM.envFilter.addEventListener('change', (e) => {
        state.envFilter = e.target.value;
        state.currentPage = 1;
        applyFilterAndSort();
        announce(`Filtered by environment: ${state.envFilter}. ${state.filteredServices.length} records found.`);
      });
    }

    // Column Sorting Headers
    DOM.sortHeaders.forEach(th => {
      th.addEventListener('click', () => {
        const col = th.getAttribute('data-sort');
        if (state.sortColumn === col) {
          state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
          state.sortColumn = col;
          state.sortDirection = 'asc';
        }
        applyFilterAndSort();
        announce(`Sorted by ${col} in ${state.sortDirection === 'asc' ? 'ascending' : 'descending'} order.`);
      });

      // Keyboard support for table sorting
      th.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          th.click();
        }
      });
    });

    // Chart Metric Switchers
    DOM.chartMetricButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        DOM.chartMetricButtons.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        state.chartMetric = btn.getAttribute('data-chart-metric');
        renderBarChart();
        announce(`Telemetry chart metric updated to ${btn.textContent.trim()}`);
      });
    });

    // Export CSV
    if (DOM.exportCsvBtn) {
      DOM.exportCsvBtn.addEventListener('click', exportToCSV);
    }

    // Refresh Telemetry
    if (DOM.refreshTelemetryBtn) {
      DOM.refreshTelemetryBtn.addEventListener('click', refreshTelemetry);
    }

    // High Contrast Toggle
    if (DOM.contrastToggleBtn) {
      DOM.contrastToggleBtn.addEventListener('click', toggleHighContrast);
    }

    // Font Scale Buttons
    DOM.fontScaleButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        DOM.fontScaleButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        setFontScale(btn.getAttribute('data-font-scale'));
      });
    });

    // Modal close button and overlay backdrop click
    if (DOM.modalCloseBtn) {
      DOM.modalCloseBtn.addEventListener('click', closeServiceModal);
    }
    if (DOM.modalOverlay) {
      DOM.modalOverlay.addEventListener('click', (e) => {
        if (e.target === DOM.modalOverlay) {
          closeServiceModal();
        }
      });
    }

    // Global Escape Key to close modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && DOM.modalOverlay && DOM.modalOverlay.classList.contains('active')) {
        closeServiceModal();
      }
    });
  }

  // --- Service Worker Registration ---
  function registerServiceWorker() {
    if ('serviceWorker' in navigator && (window.location.protocol === 'http:' || window.location.protocol === 'https:')) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
          .then(reg => console.log('[ServiceWorker] Registered with scope:', reg.scope))
          .catch(err => console.warn('[ServiceWorker] Registration failed:', err));
      });
    }
  }

  // Start application on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
