import axios from "axios";

/**
 * UserTable data
 */
export async function getAllUser({ page: page, pageSize: pageSize }) {
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

/**
 * add User Notes
 */
export async function getUserNote({ body: body, userId }) {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_LOCAL_URL}/user/${userId}/notes`,
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

/**
 * user History
 */

export async function getUserHistory({userId }) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_LOCAL_URL}/user/history/${userId}`,
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
