import http, { baseUrl } from "./http";

const handleSignIn = async (values) => {
  try {
    const response = await http.post(`${baseUrl}/users/auth`, values);
    const data = await response.json();
    if (response.ok) {
      const token = response.headers.get("x-auth-token");
      return { status: true, token, data };
    }
    if (response.status === 400) {
      if (data.msg.includes("Email")) {
        return { status: false, field: "email", msg: data.msg };
      }
      if (data.msg.includes("Password")) {
        return { status: false, field: "password", msg: data.msg };
      }
    } else throw response;
  } catch (error) {}
};

const handleSignUp = async (values) => {
  try {
    const response = await http.post(`${baseUrl}/users/register`, values);
    const data = await response.json();
    if (response.ok) return { status: true, data };

    if (response.status === 400) {
      const msg = data.msg ? data.msg : data[0];
      if (msg.includes("Email already")) {
        return { status: false, field: "email", msg: data.msg };
      }
      if (msg.includes('"email" must')) {
        return {
          status: false,
          field: "email",
          msg: "Email must be valid email.",
        };
      }
    } else throw response;
  } catch (error) {}
};

const getProfile = async () => {
  try {
    const response = await http.get(`${baseUrl}/users/profile`);
    const data = await response.json();
    if (response.ok) {
      return { status: true, data };
    }
    if (response.status === 400) {
      return { status: false, msg: data.msg };
    } else throw response;
  } catch (error) {}
};

const passwordResetOtp = async (values) => {
  try {
    const response = await http.post(
      `${baseUrl}/users/password-reset-otp`,
      values
    );
    const data = await response.json();
    if (response.ok) {
      return data;
    }
    if (response.status === 404) {
      if (data.msg.includes("Account")) {
        return { field: "email", msg: data.msg };
      }
    } else throw response;
  } catch (error) {}
};

const passwordReset = async (values) => {
  try {
    const response = await http.post(`${baseUrl}/users/password-reset`, values);
    const data = await response.json();
    if (response.ok) {
      return data;
    }
    if (response.status === 400) {
      if (data.msg.includes("Email")) {
        return { field: "email", msg: data.msg };
      }
      if (data.msg.includes("Password")) {
        return { field: "password", msg: data.msg };
      }
    }
    if (response.status === 404) {
      if (data.msg.includes("Account")) {
        return { field: "email", msg: data.msg };
      }
    } else throw response;
  } catch (error) {}
};

const user = {
  handleSignIn,
  handleSignUp,
  getProfile,
  passwordResetOtp,
  passwordReset,
};

export default user;
