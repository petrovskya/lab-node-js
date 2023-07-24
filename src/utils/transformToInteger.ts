import { TransformFnParams } from 'class-transformer';

import { NUMBER_BASE } from 'config/constants';

export const transformToInteger = ({ value }: TransformFnParams) =>
  parseInt(value, NUMBER_BASE);
