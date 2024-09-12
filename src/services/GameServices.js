import axios from "axios";

/**
 * getall game data
 */
export async function getAllGame() {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_LOCAL_URL}/game/get`,
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
 * Game History
 */
export async function getGameHistory({
  id: id,
  page: page,
  pageSize: pageSize,
}) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_LOCAL_URL}/game/history/${id}?page=${page}&limit=${pageSize}`,
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
