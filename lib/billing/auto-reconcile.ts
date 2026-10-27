// Browser-only orchestration: only authenticated server endpoints can settle an order.
export function startAutoReconciliation({ read, query, onError, onExhausted }: {
  read: () => Promise<boolean>;
  query: (signal: AbortSignal) => Promise<void>;
  onError: (error: unknown) => void;
  onExhausted: () => void;
}) {
  let cancelled = false;
  let nextQueryAt = 0;
  const deadline = Date.now() + 10 * 60_000;
  const controller = new AbortController();
  let timer: ReturnType<typeof setTimeout>;
  async function tick() {
    if (cancelled) return;
    if (Date.now() >= deadline) { onExhausted(); return; }
    try {
      // Read first: IPN may already have settled the order.
      if (await read() || cancelled) return;
      if (Date.now() >= nextQueryAt) {
        nextQueryAt = Date.now() + 65_000;
        try { await query(controller.signal); }
        catch (error) { if (!cancelled) onError(error); }
        if (cancelled || await read()) return;
      }
    } catch (error) {
      // A network error never establishes payment failure.
      if (!cancelled) onError(error);
    }
    if (!cancelled) timer = setTimeout(() => void tick(), 5000);
  }
  timer = setTimeout(() => void tick(), 1000);
  return () => { cancelled = true; clearTimeout(timer); controller.abort(); };
}