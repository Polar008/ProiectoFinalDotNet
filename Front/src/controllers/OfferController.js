const URL = "http://26.147.198.13:5058/api/offers";

export const getOffers = (token) => {
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

export const createOfferApi = (offer, token) => {
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(offer),
    };

    return fetch(URL, options)
      .then((x) => x.json())
      .catch((e) => console.log(e));
  } catch (e) {
    console.error("Error: ", e);
    return 0;
  }
};

export const getOffer = (id, token) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(URL + "/" + id, options)
    .then((x) => x.json())
    .catch((e) => console.log(e));
};

export const getOfferByIdApi = (id, token) => {
  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    return fetch(URL + "/" + id, options)
      .then((x) => x.json())
      .catch((e) => console.log(e));
  } catch (e) {
    console.error("Error: ", e);
    return 0;
  }
};

export const updateOfferApi = (id, updatedOffer, token) => {
  try {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedOffer),
    };

    return fetch(URL + "/" + id, options);
  } catch (e) {
    console.error("Error: ", e);
    return 0;
  }
};

export const getOfferSearch = (token) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(URL + "/search", options)
    .then((x) => x.json())
    .catch((e) => console.log(e));
};
