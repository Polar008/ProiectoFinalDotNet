const URL = "http://26.147.198.13:5058/api/provinces";

export const getProvinces = (token) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(URL, options)
    .then((x) => x.json())
    .catch((e) => console.log(e));
};
