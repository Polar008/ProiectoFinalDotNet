import { BaseUrl } from "../config";

const URL = BaseUrl + "shopOffers";

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

