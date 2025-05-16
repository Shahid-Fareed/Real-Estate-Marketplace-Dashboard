import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { notifySuccess } from "../../utils/toast";

const Header = (props) => {
  const { handleChange } = props;

  const [adminInfo, setAdminInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const AdminData = JSON.parse(secureLocalStorage.getItem("adminInfo"));
    setAdminInfo(AdminData);
  }, []);

  const authUserData = JSON.parse(localStorage.getItem("authUser"));

  const userName = authUserData && authUserData?.full_name;

  const userImage = authUserData && authUserData?.user_image;

  const Logout = (e) => {
    e.preventDefault();
    const authUserDatas = JSON.parse(localStorage.getItem("authUser"));
    if (authUserDatas.user_type === "admin") {
      navigate("/");
      localStorage.clear();
    } else {
      window.location.href = `https://inrealtors.pk`;
    }

    // notifySuccess("User Loged Out");
  };

  return (
    <>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">
            {/* LOGO */}
            <div className="navbar-brand-box">
              <Link to="/" className="logo logo-dark">
                <span className="logo-sm">
                  <img src="/assets/images/logo1.png" alt="" height={30} />
                </span>
                <span className="logo-lg">
                  <img src="/assets/images/logo1.png" alt="" height={35} />
                </span>
              </Link>
              <Link to="/dashboard" className="logo logo-light">
                <span className="logo-sm">
                  <img src="/assets/images/logo1.png" alt="" height={30} />
                </span>
                <span className="logo-lg">
                  <img src="/assets/images/logo1.png" alt="" height={35} />
                </span>
              </Link>
            </div>
            <button
              type="button"
              className="btn btn-sm px-3 font-size-16 header-item waves-effect vertical-menu-btn"
              onClick={handleChange}
            >
              <i className="fa fa-fw fa-bars" />
            </button>
          </div>
          <div className="d-flex">
            <div className="dropdown d-inline-block">
              <button
                type="button"
                className="btn header-item waves-effect"
                id="page-header-user-dropdown"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {userImage === "" ? (
                  <img
                    className="rounded-circle header-profile-user"
                    src="/assets/images/users/placeholder.png"
                    alt={userName}
                  />
                ) : (
                  <img
                    className="rounded-circle header-profile-user"
                    src={`${
                      process.env.REACT_APP_API_BASE_IMAGE_URL + "/" + userImage
                    }`}
                    alt={userName}
                  />
                )}

                <span className="d-none d-xl-inline-block ms-1 fw-medium font-size-15">
                  {userName}
                </span>
                <i className="uil-angle-down d-none d-xl-inline-block font-size-15" />
              </button>
              <div className="dropdown-menu dropdown-menu-end">
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={(e) => Logout(e)}
                >
                  <i className="uil uil-sign-out-alt font-size-18 align-middle me-1 text-muted" />
                  <span className="align-middle">Sign out</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
