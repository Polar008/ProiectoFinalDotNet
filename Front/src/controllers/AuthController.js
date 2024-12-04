import { BaseUrl } from "../config";

const URL = BaseUrl + "auth/login";
const URLTok = BaseUrl + "auth/token";


export const authLogin = (user) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };

  return fetch(URL, options)
    .then((x) => x.json())
    .catch((e) => console.log(e));
};

export const tokenCheck = (token) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(URLTok, options)
    //.catch((e) => console.log(e));
};