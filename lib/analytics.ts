export type EventType =
  | 'page_view'
  | 'filing_date_select'
  | 'irs_check_click'
  | 'state_check_click'
  | 'calculator_submit'
  | 'faq_expand'
  | 'state_page_view'
  | 'language_switch';

export async function trackEvent(
  eventType: EventType,
  detail?: string,
  locale?: string
): Promise<void> {
  const webhookUrl = process.env.NEXT_PUBLIC_GS_WEBHOOK_URL;
  if (!webhookUrl) return;

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_type: eventType,
        page: typeof window !== 'undefined' ? window.location.pathname : '',
        locale: locale || 'en',
        detail: detail || '',
        referrer: typeof document !== 'undefined' ? document.referrer : '',
        user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      }),
    });
  } catch {
    // Silently fail
  }
}
