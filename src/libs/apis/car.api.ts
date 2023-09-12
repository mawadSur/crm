export const uploadCarImage = async (carId: string, file: any, apiURI: string) => {
  const formData = new FormData();
  formData.append('image', file);
  const response = await fetch(`${apiURI}/cars/${carId}/image/upload`, {
    method: 'POST',
    body: formData,
  });
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error('Upload image failed, please try again later!');
  }
};

export const deleteCarImage = async (carId: string, imageUrl: string, apiURI: string) => {
  const response = await fetch(`${apiURI}/cars/${carId}/${imageUrl}/image/delete`);
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error('Image could not be deleted, please try again later!');
  }
};
