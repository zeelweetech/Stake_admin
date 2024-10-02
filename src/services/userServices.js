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
export async function getUserHistory({
  userId: userId,
  page: page,
  pageSize: pageSize,
}) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_LOCAL_URL}/user/history/${userId}?page=${page}&limit=${pageSize}`,
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
 * get user Distribution
 */
export async function getUserDistribution({ page: page, pageSize: pageSize }) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_LOCAL_URL}/admin/amountdistributions/?page=${page}&limit=${pageSize}`,
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
 * add user Distribution
 */
export async function AddDistribution({ body: body }) {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_LOCAL_URL}/admin/amountdistributions`,
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
 * edit user Distribution
 */
export async function EditDistribution({ body: body, id: id }) {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_LOCAL_URL}/admin/amountdistributions/${id}`,
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
 * Delete user Distribution
 */
export async function DeleteDistribution({ id: id }) {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_LOCAL_URL}/admin/amountdistributions/${id}`,
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
