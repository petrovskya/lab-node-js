const END_HOURS = 23;
const END_MINUTES = 59;
const END_SECONDS = 59;
const END_MILLISECONDS = 999;

export const getEndOfTheDay = (createdAtParam: Date): Date => {
  const date = new Date(createdAtParam);
  const year = date.getFullYear();
  const monthIndex = date.getMonth();
  const day = date.getDate();
  const endOfTheDay = new Date(
    year,
    monthIndex,
    day,
    END_HOURS,
    END_MINUTES,
    END_SECONDS,
    END_MILLISECONDS,
  );
  return endOfTheDay;
};
