import dayjs from 'dayjs';

export const ageRange: number[] = Array.from({ length: 83 }, (_, index) => index + 18);

export const objectToQueryParams = (obj: Record<string, any>): string => {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(obj)) {
    if (value) {
      params.append(key, value);
    }
  }

  return params.toString();
};

export const convertPropertyNameToDisplayName = (propertyName: string): string => {
  const words = propertyName.split(/(?=[A-Z])|\s|_/);
  const displayName = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  return displayName;
};

export const isDateFormat = (value: string) => {
  const date = new Date(value);
  return !isNaN(date.getTime());
};

export const dateFormat = (data: string, hasHour?: boolean) => {
  if (!data) return '';
  return dayjs(data).format(hasHour ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD');
};

export const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return 'N/A';

  const cleaned = phoneNumber.replace(/\D/g, '');

  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }

  return phoneNumber;
};

export const formatPrice = (price: string) => {
  if (!price) return 'N/A';

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(Number(price));
};

export const convertSnakeToCamel = (obj: Record<string, any>) => {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(convertSnakeToCamel);
  }

  return Object.keys(obj).reduce((acc, key) => {
    const camelKey = key.replace(/_([a-z])/g, (match, p1) => p1.toUpperCase());
    acc[camelKey] = convertSnakeToCamel(obj[key]);
    return acc;
  }, {});
};
