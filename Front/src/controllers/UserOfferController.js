import { BaseUrl } from "../config";

const URL = BaseUrl + "userOffer";

export const joinOffer = (token, offerId) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ offerId: offerId }),
  };

  return fetch(URL, options)
    .then((x) => x.json())
    .catch((e) => console.log(e));
};

export const leaveOffer = (token, offerId) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(URL + "/unsubscribe/" + offerId, options)
    .then((x) => x.json())
    .catch((e) => console.log(e));
};
