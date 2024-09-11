import axios from "axios";

/**
 * LOGIN
 */
export async function userLogin({ body: body }) {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_LOCAL_URL}/admin/signIn`,
      body
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * REGISTER
 */
export async function userRegister({ body: body }) {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_LOCAL_URL}/admin/signIn`,
      body
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * FORGOTPASSWORD
 */
export async function userForgotPassword({ body: body }) {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_LOCAL_URL}/user/forgot-password`,
      body
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
