export const getBlastGroups = async (
  apiURI: string,
  limit: number,
  offset: number,
  unlimited: boolean,
) => {
  if (!apiURI) return;
  let url = `${apiURI}/blast-groups?limit=${limit}&offset=${offset}`;
  if (unlimited) {
    url += '&unlimited=true';
  }

  const response = await fetch(url);
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error('Get blast failed, please try again later!');
  }
};
