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

// apiURI: string
// `http://localhost:3434/api/cars/${carId}/image/delete?imageUrl=${imageUrl}`
// ${apiURI}
export const deleteCarImage = async (carId: string, imageUrl: string) => {
  imageUrl = encodeURIComponent(imageUrl);
  const response = await fetch(
    `http://localhost:3434/api/cars/${carId}/image/delete?imageUrl=${imageUrl}`,
    {
      method: 'DELETE',
    },
  );
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error('Image could not be deleted, please try again later!');
  }
};
