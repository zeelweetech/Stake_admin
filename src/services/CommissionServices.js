import axios from "axios";

/**
 * getCommissionList data
 */
export async function getCommissionList(page, pageSize) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_LOCAL_URL}/admin/commissions/get?page=${page}&limit=${pageSize}`,
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
 * getCommission by id
 */
export async function getCommissionById(gameId, page, pageSize) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_LOCAL_URL}/admin/commissions/get/${gameId}?page=${page}&limit=${pageSize}`,
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
 * Add commission
 */
export async function AddCommission({ body: body }) {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_LOCAL_URL}/admin/commissions/add`,
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
 * Edit commission
 */
export async function EditCoommission({ body: body, id: id }) {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_LOCAL_URL}/admin/commissions/edit/${id}`,
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
 * Delete commission
 */
export async function DeleteCommission({ id }) {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_LOCAL_URL}/admin/commissions/delete/${id}`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    console.log("Delete response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting commission:", error);
    throw error;
  }
}