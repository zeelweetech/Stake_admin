import axios from "axios";

/**
 * GETMEDALS
 */
export async function getMedals() {
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
export async function EditModel({ body: body, id: id }) {
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

