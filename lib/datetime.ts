// Turn a registry date (YYYY-MM-DD) into full ISO 8601 at 09:00 US Central time,
// with the correct offset (-05:00 during daylight time, -06:00 in standard time).
// US Central DST runs from the 2nd Sunday of March to the 1st Sunday of November.

function nthSundayOfMonth(year: number, month: number, n: number): number {
  // month is 1-12; returns the day-of-month of the nth Sunday.
  const firstDow = new Date(Date.UTC(year, month - 1, 1)).getUTCDay(); // 0 = Sunday
  const firstSunday = 1 + ((7 - firstDow) % 7);
  return firstSunday + (n - 1) * 7;
}

function isCentralDst(y: number, m: number, d: number): boolean {
  const startDay = nthSundayOfMonth(y, 3, 2); // 2nd Sunday of March
  const endDay = nthSundayOfMonth(y, 11, 1); // 1st Sunday of November
  const date = y * 10000 + m * 100 + d;
  const start = y * 10000 + 3 * 100 + startDay;
  const end = y * 10000 + 11 * 100 + endDay;
  return date >= start && date < end; // 09:00 is after the 2am transition on boundary days
}

export function isoCentral(date: string): string {
  const [y, m, d] = date.split('-').map(Number);
  const offset = isCentralDst(y, m, d) ? '-05:00' : '-06:00';
  return `${date}T09:00:00${offset}`;
}
