const URL = "http://26.147.198.13/api/upload";

export const uploadImage = (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const options = {
    method: "POST",
    body: formData, // Send FormData directly
  };

  return fetch(URL, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => console.error("Error uploading image:", error));
};
