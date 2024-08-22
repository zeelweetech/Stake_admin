import { jwtDecode } from "jwt-decode";

// Token Decode
export const decodedToken = () => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  return decoded;
};
