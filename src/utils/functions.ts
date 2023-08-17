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
