import axios from "axios";
/**
 * Add Admin 
 */
export async function CreateAdmin({body}) {
    try {
        const token = localStorage.getItem("token");
        const headers = token ? { Authorization: token } : {};

        const response = await axios.post(
            `${process.env.REACT_APP_LOCAL_URL}/admin/create`,
            body,
            { headers }
        );
        return response.data;
    } catch (error) {
        console.error("Error adding medal:", error);
        throw new error("Failed to add medal. please try again");

    }
}

/**
 *Get Admin 
 */

// export async function GetAdmin() {
//     try {
//         const response = await axios.get(
//             `${process.env.REACT_APP_LOCAL_URL}/admin/get`,
//             {
//                 headers: {
//                     Authorization: localStorage.getItem("token"),
//                 },
//             }
//         );
//                 // console.log("response Admin::::::", response);

//         return response.data;
//     } catch (error) {
//         console.error("Access denied. No Token provided.", error?.response?.data || error.message);
//         throw error;
//     }
// }



export async function GetAdmin({ page = 1, pageSize = 10 }) {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_LOCAL_URL}/admin/get`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                params: { page, pageSize }, // Pass query parameters dynamically
            }
        );
        return response.data; // Assuming response structure is correct
    } catch (error) {
        console.error(
            "Failed to fetch admins. Error:",
            error?.response?.data || error.message
        );
        throw error; // Re-throw to handle it in the calling function
    }
}

// Edit Admin
export async function EditAdmin({ body: body, id: id }) {
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