import React, { useState } from "react";
import { DialogContent, DialogTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ErrorIcon from "@mui/icons-material/Error";
import { userLogin } from "../../../services/LoginServices";
import { useDispatch } from "react-redux";
// import { loginFailure, loginSuccess } from "../../../features/auth/authSlice";
import { setCookie } from "../../../resources/utility";
import toast from "react-hot-toast";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState({});
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setError({ ...error, [name]: "" });
  };

  const Validation = () => {
    let errors = {};
    const EmailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!values?.email && !values?.password) {
      toast.error("Both email and password are required");
      errors.email = "Email required";
      errors.password = "Password required";
    } else {
      if (!values?.email) {
        errors.email = "Email required";
        toast.error("Email required");
      } else if (!EmailRegEx?.test(values?.email)) {
        errors.email = "Invalid email format";
        toast.error("Invalid email format");
      }

      if (!values?.password) {
        errors.password = "Please enter your password";
        toast.error("Please enter your password");
      }
    }
    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Validation()) {
      const body = {
        email: values?.email,
        password: values?.password,
      };
      await userLogin({ body: body })
        .then((response) => {

          setCookie("token", response?.token, 24);
          localStorage.setItem("token", response?.token);
          toast.success(response?.message);
          navigate("/dashboard");
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error || "Invalid credentials! Please try again.");
        });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-[#1a2c38] flex justify-center item-center h-screen">
      <div className="h-screen flex flex-col justify-center item-center">
        <div>
          <div className="relative">
            <DialogTitle
              id="alert-dialog-title"
              className="text-center w-full text-white"
            >
              Sign In
            </DialogTitle>
          </div>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <div className="mb-4 -mt-6">
                <label
                  className="flex text-[#b1bad3] text-sm mb-1"
                  htmlFor="username"
                >
                  Email<p className="text-red-700 ml-1">*</p>
                </label>
                <input
                  className={`border rounded w-[28rem] py-2 px-3 bg-[#0f212e] text-[#b1bad3] hover:border-[#7f8798] focus:outline-[#b1bad3] ${error?.email ? "border-[#ed4163]" : "border-gray-600"
                    }`}
                  name="email"
                  value={values?.email}
                  onChange={(e) => handleOnChange(e)}
                  type="text"
                />
                {error?.email && (
                  <div className="flex items-center space-x-1 mt-2 text-[#f2708a]">
                    <ErrorIcon fontSize="10" />
                    <p className="text-xs">{error.email}</p>
                  </div>
                )}
              </div>
              <div className="mb-4 relative">
                <label
                  className="flex text-[#b1bad3] text-sm mb-1"
                  htmlFor="password"
                >
                  Password<p className="text-red-700 ml-1">*</p>
                </label>
                <input
                  className={`border rounded w-full py-2 px-3 bg-[#0f212e] text-[#b1bad3] hover:border-[#7f8798] focus:outline-[#b1bad3] ${error?.password ? "border-[#ed4163]" : "border-gray-600"
                    }`}
                  name="password"
                  value={values?.password}
                  onChange={(e) => handleOnChange(e)}
                  type={showPassword ? "text" : "password"}
                />
                <div
                  className="absolute inset-y-0 right-0 mt-7 pr-3 flex items-center cursor-pointer text-[#b1bad3]"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </div>
              </div>
              {error?.password && (
                <div className="flex items-center space-x-1 -mt-2.5 text-[#f2708a]">
                  <ErrorIcon fontSize="10" />
                  <p className="text-xs">{error.password}</p>
                </div>
              )}
              <button
                type="submit"
                className={`bg-[#1fff20] hover:bg-[#42ed45] py-3 rounded-md font-semibold w-full ${error?.password ? "mt-5" : ""
                  }`}
              >
                Sign In
              </button>
            </form>
          </DialogContent>
          <div className="ml-28">
            <hr className="w-8/12 mt-1 border-[0.1px] border-[#7c85a3]"></hr>
            <p className="bg-[#1a2c38] text-[#b1bad3] text-sm w-10 text-center -mt-3 mb-3 ml-28">
              OR
            </p>
          </div>
          <div className="flex flex-col justify-center item-center">
            <button
              onClick={() => {
                navigate("/forgotpassword");
              }}
              className="flex justify-center text-sm font-semibold my-3 text-white"
            >
              Forgot Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

