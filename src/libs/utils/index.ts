import dayjs from 'dayjs';

export const dateFormat = (data: string, hasHour?: boolean) => {
  if (!data) return '';
  return dayjs(data).format(hasHour ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD');
};
