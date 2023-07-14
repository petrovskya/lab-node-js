import { SKIP_STEP } from 'config/constants';

export const getSkipValue = (currentPage: number, limit: number): number =>
  (currentPage - SKIP_STEP) * limit;
