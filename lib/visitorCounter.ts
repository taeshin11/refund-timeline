export async function getVisitorCounts(): Promise<{ today: number; total: number }> {
  try {
    const res = await fetch('/api/visitor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) return { today: 0, total: 0 };
    return await res.json();
  } catch {
    return { today: 0, total: 0 };
  }
}
