import axios from "axios";

/**
 * UserTable data
 */
export async function getAllUser(page, pageSize) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_LOCAL_URL}/user/get?page=${page}&limit=${pageSize}`,
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

/**
 * User Active/Inactive
 */
export async function getUserStatus({ body: body, userId }) {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_LOCAL_URL}/user/${userId}/status`,
      body,
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
