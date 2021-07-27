export function getGeckoTimestamp(d: Date) {
  try {
    return d.getTime();
  } catch {
    return 0;
  }
}
