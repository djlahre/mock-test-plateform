const set = (token) => {
  localStorage.setItem("x-auth-token", token);
};
const get = () => {
  return localStorage.getItem("x-auth-token");
};
const del = () => {
  localStorage.removeItem("x-auth-token");
};

const token = {
  get,
  set,
  del,
};

export default token;
