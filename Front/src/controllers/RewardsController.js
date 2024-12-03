import { BaseUrl } from "../config";

const URL = BaseUrl + "rewards";

export const getUserRewards = (id, token) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(URL + "/user/" + id, options)
    .then((x) => x.json())
    .catch((e) => console.log(e));
};


export const createRewardApi = (reward, token) => {
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reward),
    };

    return fetch(URL, options)
      .then((x) => x.json())
      .catch((e) => console.log(e));
  } catch (e) {
    console.error("Error: ", e);
    return 0;
  }
};


export const getRewardApi = (id, token) => {
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

export const updateRewardApi = (id, updatedReward, token) => {
  try {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedReward),
    };

    return fetch(URL + "/" + id, options);
  } catch (e) {
    console.error("Error: ", e);
    return 0;
  }
};