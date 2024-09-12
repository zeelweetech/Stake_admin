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
export async function getGameHistory(gameId, page, pageSize) {
  // console.log("gameId 4564585645845641", gameId);

  try {
    const response = await axios.get(
      `${process.env.REACT_APP_LOCAL_URL}/game/history/${gameId}?page=${page}&limit=${pageSize}`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    // console.log("response data ***** (((( ++++" , response.data);
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
