import axios from "axios";
import { API_URL } from "../env/config";

export const baseService = {
  getAll: async (url) => {
    let response = [];
    await axios
      .get(API_URL + url)
      .then((res) => {
        response = res.data;
      })
      .catch((err) => {
        console.log("Error", err);
      });

    return response;
  },
  getById: async (url, id) => {
    let response = {};
    await axios
      .get(API_URL + url + "/" + id)
      .then((res) => {
        response = res.data;
      })
      .catch((err) => {
        console.log("Error", err);
      });

    return response;
  },
  delete: async (url, id) => {
    let response = {};

    await axios
      .delete(API_URL + url + "/" + id)
      .then((res) => {
        response = res.data;
      })
      .catch((err) => {
        console.log("Error", err);
      });

    return response;
  },
  add: async (url, data) => {
    let response = {};

    await axios
      .post(API_URL + url, data)
      .then((res) => {
        response = res.data;
        return response;
      })
      .catch((err) => {
        console.log("Error", err);
      });
  },
  put: async (url, data) => {
    let response = {};

    await axios
      .put(API_URL + url, data)
      .then((res) => {
        response = res.data;
        return response;
      })
      .catch((err) => {
        console.log("Error", err);
      });
  },
};
