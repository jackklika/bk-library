export function getUTCDateHoursFromNow(hoursFromNow: number): Date {
  const now = new Date();
  return new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    now.getUTCHours() + hoursFromNow,
    now.getUTCMinutes(),
    now.getUTCSeconds()
  ));
}