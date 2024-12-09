//export const BaseUrl = "http://26.79.82.36:5058/api/";
//export const URL = "http://26.79.82.36:5058";

import { jwtDecode } from "jwt-decode";

export const BaseUrl = "http://26.147.198.13:5058/api/";
export const URL = "http://26.147.198.13:5058";

export const decodeJwt = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};
