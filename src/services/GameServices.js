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

/**
 * Game Status
 */
export async function ChangeGameStatus(gameId, status) {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_LOCAL_URL}game/${gameId}/status`,
      { status },
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
