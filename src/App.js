import "./App.css";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";
import Login from "./views/pages/login/Login";
import ForgotPassword from "./views/pages/forgotpassword/ForgotPassword";
import PrivateAuthRoute from "./PrivateAuthRoute";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <>
      <Toaster
        position="bottom-right"
        // top-left
        toastOptions={{
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route>
            <Route element={<PrivateAuthRoute />}>
              <Route path="/" element={<Login />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="*" name="Home" element={<DefaultLayout />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
