import axios from "axios";
import { config } from "../config/Config";
import { postCall } from "../helper/ApiHelper";

const API_URL = config.baseUrl + "token";

const register = (username, email, password) => {
  return postCall(API_URL, {
    username,
    email,
    password,
  });
};

export const login = (username, password) => {
  return new Promise((resolve, reject) => {
    axios
      .post(API_URL, {
        Email: username,
        Password: password,
      })
      .then((response) => {
        if (response) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        resolve(response.data);
      })
      .catch((reason) => {
        reject(reason);
      });
  });
};

export const logout = (onRemove) => {
  localStorage.removeItem("user");
  onRemove()
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
