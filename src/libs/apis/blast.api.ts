export const getBlastById = async (apiURI: string, id: string) => {
  if (!apiURI) return;
  const response = await fetch(`${apiURI}/blasts/${id}`, {
    method: 'GET',
  });
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error('Get blast failed, please try again later!');
  }
};
