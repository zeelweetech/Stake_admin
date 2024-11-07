import axios from "axios";

/**
 * GETDASHBOARD
 */
export async function getDashboard() {
    try {
        // const token = localStorage.getItem("token");
        const response = await axios.get(
            `${process.env.REACT_APP_LOCAL_URL}/admin/dashboard`,
            {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Access denied. No token provided.", error?.response?.data || error.message);
        throw error;
    }
}
