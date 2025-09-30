import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import CustomToast from "../Ui-components/Toast";

const Header = () => {
  const navigate = useNavigate();

  const toast = useRef(null);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("token");
      navigate("/signIn");

    //   toast.current.show({
    //     servity: "success",
    //     summary: "Success",
    //     detail: "LogOut successfull!.",
    //   });

    } catch (error) {
      console.error("Logout Error:");
    }
  };

  return (
    <>
      <CustomToast ref={toast} />

      <nav className="navbar navbar-expand-lg navbar-custom">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav align-items-center justify-content-between w-100 pe-4">
              <a className="nav-link active" aria-current="page" href="#">
                Home
              </a>
              <button
                className="bg-transparent p-0 border-0"
                onClick={handleLogout}
              >
                <i className="pi pi-sign-out fs-5"></i>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
