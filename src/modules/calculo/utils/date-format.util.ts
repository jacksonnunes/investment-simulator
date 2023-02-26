import { format } from 'date-fns';

export const dateFormatUtil = (date: Date) => {
  return format(date, 'dd/MM/yyyy');
};
