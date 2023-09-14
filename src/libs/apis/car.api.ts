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

export const deleteCarImage = async (apiURI: string, carId: string, imageUrl: string) => {
  if (!apiURI) return;
  imageUrl = encodeURIComponent(imageUrl);
  const response = await fetch(`${apiURI}/cars/${carId}/image/delete?imageUrl=${imageUrl}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error('Image could not be deleted, please try again later!');
  }
};
