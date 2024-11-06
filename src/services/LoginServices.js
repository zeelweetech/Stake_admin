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

    console.log("data===", response)
    return response.data;
  } catch (error) {
    // throw error;
    throw error.response ? error.response.data : new Error("Network Error");
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

/**
 * GETALLLOGS
 */
export async function getAllLogs({ page: page, pageSize: pageSize, search: search }) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_LOCAL_URL}/admin/logs?searchQuery=${search}&page=${page}&limit=${pageSize}`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}