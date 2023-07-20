const HOURS = 24;
const MINUTES = 60;
const SECONDS = 60;
const MILLISECONDS = 1000;

export const getCookieMaxAge = (days: number): number => {
  const cookieMaxAge = days * HOURS * MINUTES * SECONDS * MILLISECONDS;
  return cookieMaxAge;
};
