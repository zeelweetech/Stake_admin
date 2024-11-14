import axios from "axios";

/**
 * GETMEDALS
 */
export async function GetMedals() {
    try {

        const response = await axios.get(
            `${process.env.REACT_APP_LOCAL_URL}/medals/get`,
            {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            }

        );
        // console.log("response Medal::::::", response);

        return response.data;
    } catch (error) {
        console.error("Access denied. No token provided.", error?.response?.data || error.message);
        throw error;
    }
}

/**
 * edit Medal
 */
export async function EditMedal({ body: body, id: id }) {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_LOCAL_URL}/medals/edit/${id}`,
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
 * add Medal 
 */


export async function AddMedal({ body }) {
  try {
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: token } : {};

    const response = await axios.post(
      `${process.env.REACT_APP_LOCAL_URL}/medals/add`,
      body,
      { headers }
    );

    return response.data;
  } catch (error) {
    console.error("Error adding medal:", error);
    throw new Error("Failed to add medal. Please try again later.");
  }
}
