import { BaseUrl } from "../config";

const URL = BaseUrl + "shopOffers";

export const createPointOfferApi = (pointOffer, token) => {
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(pointOffer),
    };

    return fetch(URL, options)
      .then((x) => x.json())
      .catch((e) => console.log(e));
  } catch (e) {
    console.error("Error: ", e);
    return 0;
  }
};

export const getShopOffers = (token) => {
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

export const getShopOffer = (id, token) => {
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

export const getShopOffersSearch = (token) => {
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

export const updateShopOfferApi = (id, updatedShopOffer, token) => {
  try {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedShopOffer),
    };

    return fetch(URL + "/" + id, options);
  } catch (e) {
    console.error("Error: ", e);
    return 0;
  }
};
