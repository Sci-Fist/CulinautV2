/**
 * Command Center HUD Module
 * Handles Operational Overlays, Telemetry, and 'X-Ray' Audit Logic
 * Vetted by Supervisor Gemini Pro (Phase 18)
 */

export class CommandCenter {
    constructor() {
        this.overlay = document.getElementById('command-center');
        this.closeBtn = document.getElementById('close-command');
        this.auditToggle = document.getElementById('audit-mode-toggle');
        this.tickerAudits = document.getElementById('ticker-audits');
        
        this.init();
    }

    init() {
        if (!this.overlay) return;

        // HUD Toggle logic
        this.closeBtn?.addEventListener('click', () => this.toggle());
        
        // Ctrl + K Shortcut
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.toggle();
            }
        });

        // Navigation within HUD
        this.overlay.querySelectorAll('.nav-cmd').forEach(link => {
            link.addEventListener('click', () => this.close());
        });

        // Audit Mode Toggle
        this.auditToggle?.addEventListener('change', () => {
            document.body.classList.toggle('audit-mode', this.auditToggle.checked);
        });

        // Live Ticker Animation
        this.startTickers();
    }

        // Live Ticker Animation
        this.startTickers();
        
        // Phase 18: Telemetry (Directive #2)
        this.initTelemetry();
    }

    toggle() {
        this.overlay.classList.toggle('active');
        document.body.style.overflow = this.overlay.classList.contains('active') ? 'hidden' : 'auto';
        if (this.overlay.classList.contains('active')) this.updateTelemetry();
    }

    close() {
        this.overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    initTelemetry() {
        this.latencyEl = document.getElementById('telemetry-latency');
        this.ttiEl = document.getElementById('telemetry-tti');
        
        // TTI / Performance Observer
        try {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                if (this.ttiEl) this.ttiEl.textContent = (lastEntry.startTime / 1000).toFixed(2) + 's';
            });
            observer.observe({ entryTypes: ['paint', 'navigation', 'resource'] });
        } catch (e) {
            console.warn('[Telemetry] PerformanceObserver restricted or unsupported.');
        }

        this.updateTelemetry();
    }

    updateTelemetry() {
        // Network Latency check
        if (window.performance && window.performance.timing) {
            const t = window.performance.timing;
            const latency = t.responseEnd - t.fetchStart;
            if (this.latencyEl) this.latencyEl.textContent = latency + 'ms';
        }
    }

    startTickers() {
        let auditCount = 14;
        setInterval(() => {
            if (this.tickerAudits) {
                auditCount += Math.random() > 0.7 ? 1 : 0;
                this.tickerAudits.textContent = auditCount;
                this.tickerAudits.classList.add('pulse-anim');
                setTimeout(() => this.tickerAudits.classList.remove('pulse-anim'), 1000);
            }
        }, 5000);
    }
}
