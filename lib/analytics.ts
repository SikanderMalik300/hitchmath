// Lightweight analytics dispatch. No-ops until GA4 is configured. Events: A9.
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export type AnalyticsEvent =
  | 'tool_used'
  | 'tool_result_shown'
  | 'copy_result'
  | 'share_link'
  | 'config_selected'
  | 'outbound_click';

export function track(event: AnalyticsEvent, params: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag === 'function') {
    window.gtag('event', event, params);
  }
}
