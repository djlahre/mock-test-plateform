import tokenService from "./token";

const setFetchAPIOptions = (method, data = {}) => {
  const options = {
    method, // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": tokenService.get(),
    },
    body: JSON.stringify(data),
  };
  if (method === "GET") delete options.body;
  return options;
};

const get = async (url) => {
  const options = setFetchAPIOptions("GET");
  return await fetch(url, options);
};

const post = async (url, data) => {
  const options = setFetchAPIOptions("POST", data);
  return await fetch(url, options);
};

const http = {
  get,
  post,
};

export const baseUrl = process.env.REACT_APP_API_BASE_URL;
export default http;
