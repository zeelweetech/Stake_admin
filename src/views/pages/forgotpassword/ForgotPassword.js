import React, { useState } from "react";
import { DialogContent } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import ErrorIcon from "@mui/icons-material/Error";
import { userForgotPassword } from "../../../services/LoginServices";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [values, setValues] = useState({});
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setError({ ...error, [name]: "" });
  };

  const Validation = () => {
    let errors = {};
    const EmailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!values?.Forgotemail) {
      errors.Forgotemail = "This field is required";
    } else if (!EmailRegEx?.test(values?.Forgotemail)) {
      errors.Forgotemail = "Invalid email format";
    }

    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Validation()) {
      const body = {
        email: values?.Forgotemail,
      };
      await userForgotPassword({ body: body })
        .then((response) => {
          console.log("response", response);
          toast.success(response?.message);
        })
        .catch((error) => {
          console.log("error ", error);
          toast.error(error?.response?.data);
        });
    } else {
      console.log("validation fails, Error", error);
    }
  };

  return (
    <div className="bg-[#1a2c38] flex justify-center item-center h-screen">
      <div className="h-screen flex flex-col justify-center item-center">
        <div>
          <div className="flex justify-between text-white">
            <DialogContent className="flex items-center space-x-2">
              <SettingsIcon className="text-[#b1bad3]" />
              <p>Forgot Password</p>
            </DialogContent>
          </div>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="flex text-[#b1bad3] text-sm mb-1"
                  htmlFor="username"
                >
                  Email<p className="text-red-700 ml-1">*</p>
                </label>
                <input
                  className={`border rounded w-[28rem] py-2 px-3 bg-[#0f212e] text-[#b1bad3] focus:outline-[#b1bad3] ${
                    error.Forgotemail ? "border-[#ed4163]" : "border-gray-600"
                  }`}
                  name="Forgotemail"
                  value={values?.Forgotemail}
                  onChange={handleOnChange}
                  type="email"
                />
                {error?.Forgotemail && (
                  <div className="flex items-center space-x-1 mt-2 text-[#f2708a]">
                    <ErrorIcon fontSize="10" />
                    <p className="text-xs">{error?.Forgotemail}</p>
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="bg-[#1fff20] py-3 rounded-md font-semibold w-full"
              >
                Recover Password
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
                navigate("/");
              }}
              className="flex justify-center text-sm font-semibold my-3 text-white"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
