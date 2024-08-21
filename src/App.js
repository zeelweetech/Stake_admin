import "./App.css";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";
import VerifyTerm from "./views/pages/register/VerifyTerm";
import Login from "./views/pages/login/Login";

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
            <Route path="/" element={<Login />} />
            <Route path="*" name="Home" element={<DefaultLayout />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
