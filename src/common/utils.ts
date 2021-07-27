export function getGeckoTimestamp(d: Date | string): BigInt {
  const date: Date = new Date(d);
  try {
    return BigInt(date.getTime());
  } catch (err) {
    console.log("Timestamp Err: ", err);
    return BigInt(0);
  }
}
