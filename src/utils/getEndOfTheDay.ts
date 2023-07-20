import {
  END_HOURS,
  END_MILLISECONDS,
  END_MINUTES,
  END_SECONDS,
} from 'config/constants';

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
