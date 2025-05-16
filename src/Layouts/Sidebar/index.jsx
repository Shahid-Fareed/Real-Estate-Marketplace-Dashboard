import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import useUserRole from "../../hooks/useUserRole";
import useUserType from "../../hooks/useUserType";
import useUserPermissions from "../../hooks/useUserPermissions";
import useUserCheck from "../../hooks/useUserCheck";
import Header from "../Header";

const Sidebar = () => {
  const userRole = useUserRole();
  const userType = useUserType();
  const userPermission = useUserPermissions();
  const userCheck = useUserCheck();

  let parnetId = 0;
  const authUser = localStorage.getItem("authUser");
  if (authUser) {
    const parsedAuthUser = JSON.parse(authUser);
    parnetId = parsedAuthUser?.parent_id;
  }

  const [sideBarState, setSideBarState] = useState(true);

  const subMenuRef = useRef(null);
  const subMenuRoleRef = useRef(null);
  const subMenuPackageRef = useRef(null);
  const subMenuOrdersRef = useRef(null);
  const subMenuPropertiesRef = useRef(null);

  const toggleSubMenu = () => {
    if (subMenuRef.current !== null) {
      subMenuRef.current.classList.toggle("mm-show");
    }
  };

  const toggleRoleSubMenu = () => {
    if (subMenuRoleRef.current !== null) {
      subMenuRoleRef.current.classList.toggle("mm-show");
    }
  };

  const togglePackageSubMenu = () => {
    if (subMenuPackageRef.current !== null) {
      subMenuPackageRef.current.classList.toggle("mm-show");
    }
  };

  const toggleOrdersSubMenu = () => {
    if (subMenuOrdersRef.current !== null) {
      subMenuOrdersRef.current.classList.toggle("mm-show");
    }
  };
  const togglePropertiesSubMenu = () => {
    if (subMenuPropertiesRef.current !== null) {
      subMenuPropertiesRef.current.classList.toggle("mm-show");
    }
  };

  const handleChange = () => {
    setSideBarState(!sideBarState);
  };
  useEffect(() => {
    const isMobileScreen = () => window.innerWidth < 768;
    const isLargeScreen = () => window.innerWidth > 768;

    if (isMobileScreen()) {
      if (sideBarState === true) {
        document.body.classList.remove("vertical-collpsed");
        document.body.classList.remove("sidebar-enable");
      } else {
        document.body.classList.add("sidebar-enable");
      }
    }

    if (isLargeScreen()) {
      if (sideBarState === true) {
        document.body.classList.add("vertical-collpsed");
      } else {
        document.body.classList.remove("vertical-collpsed");
      }
    }
  }, [sideBarState]);
  const location = useLocation();

  return (
    <>
      <Header handleChange={handleChange} />
      <div className="vertical-menu">
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
        <div data-simplebar="init" className="sidebar-menu-scroll">
          <div className="simplebar-wrapper" style={{ margin: 0 }}>
            <div className="simplebar-height-auto-observer-wrapper">
              <div className="simplebar-height-auto-observer" />
            </div>
            <div className="simplebar-mask">
              <div
                className="simplebar-offset"
                style={{ right: "-17px", bottom: 0 }}
              >
                <div
                  className="simplebar-content-wrapper"
                  style={{ height: "100%", overflow: "hidden scroll" }}
                >
                  <div className="simplebar-content" style={{ padding: 0 }}>
                    {/*- Sidemenu */}
                    <div id="sidebar-menu" className="mm-active">
                      {/* Left Menu Start */}
                      <ul
                        className="metismenu list-unstyled mm-show"
                        id="side-menu"
                      >
                        <li className="menu-title">Menu</li>
                        <li
                          className={
                            location.pathname === "/dashboard"
                              ? "mm-active mt-1"
                              : "mt-1"
                          }
                        >
                          <Link to="/dashboard">
                            <i className="uil-window-section" />
                            <span>Dashboard</span>
                          </Link>
                        </li>
                        {userType === "admin" ? (
                          <li>
                            <Link
                              to="#"
                              className="has-arrow waves-effect"
                              onClick={togglePropertiesSubMenu}
                            >
                              <i className="uil-store" />
                              <span>Manage Properties </span>
                            </Link>
                            <ul
                              ref={subMenuPropertiesRef}
                              className="sub-menu mm-collapse"
                              aria-expanded="false"
                            >
                              <li>
                                <Link to="/properties/admin">
                                  All Properties
                                </Link>
                              </li>
                              {userPermission?.includes("Add Property") ? (
                                <li>
                                  <Link to="/properties/add">Add Property</Link>
                                </li>
                              ) : null}

                              {userPermission?.includes("Property Verify") ? (
                                <li>
                                  <Link to="/properties/verify">
                                    Verify Properties
                                  </Link>
                                </li>
                              ) : null}
                            </ul>
                          </li>
                        ) : null}

                        {userType === "agency" ? (
                          <li
                            className={
                              location.pathname === "/properties/agency"
                                ? "mm-active mt-1"
                                : "mt-1"
                            }
                          >
                            <Link to="/properties/agency">
                              <i className="uil-home-alt" />
                              <span>My Properties</span>
                            </Link>
                          </li>
                        ) : null}
                        {userType === "user" ? (
                          <li
                            className={
                              location.pathname === "/properties/user"
                                ? "mm-active mt-1"
                                : "mt-1"
                            }
                          >
                            <Link to="/properties/user">
                              <i className="uil-home-alt" />
                              <span>Properties</span>
                            </Link>
                          </li>
                        ) : null}

                        {userType !== "admin" ? (
                          <li
                            className={
                              location.pathname === "/properties/add"
                                ? "mm-active mt-1"
                                : "mt-1"
                            }
                          >
                            {userPermission?.includes("Add Property") ? (
                              <Link to="/properties/add">
                                <i className="uil-home-alt" />
                                <span>Add Property</span>
                              </Link>
                            ) : null}
                          </li>
                        ) : null}

                        {userPermission?.includes("List Inquiries") ? (
                          <li
                            className={
                              location.pathname === "/inbox"
                                ? "mm-active mt-1"
                                : "mt-1"
                            }
                          >
                            <Link to="/inbox">
                              <i className="uil-comment-alt-message" />
                              <span>Inbox</span>
                            </Link>
                          </li>
                        ) : null}

                        {userType === "user" ||
                        (userType === "agency" && parnetId === 0) ? (
                          <li
                            className={
                              location.pathname === "/advertisments"
                                ? "mm-active mt-1"
                                : "mt-1"
                            }
                          >
                            <Link to="/advertisments">
                              <i className="uil-home-alt" />
                              <span>Advertisement</span>
                            </Link>
                          </li>
                        ) : null}

                        <li>
                          <Link
                            to="#"
                            className="has-arrow waves-effect"
                            onClick={toggleSubMenu}
                          >
                            <i className="uil-store" />
                            <span>Setup</span>
                          </Link>
                          <ul
                            ref={subMenuRef}
                            className="sub-menu mm-collapse"
                            aria-expanded="false"
                          >
                            {userPermission?.includes("Profile Edit") ? (
                              <li>
                                <Link to="/profile">Personal Profile</Link>
                              </li>
                            ) : null}
                            {userType === "agency" && parnetId === 0 ? (
                              <li>
                                <Link to="/agency-profile">Agency Profile</Link>
                              </li>
                            ) : null}
                            {userPermission?.includes("List User") ? (
                              <>
                                <li>
                                  <Link to="/manage-members">
                                    Manage Members
                                  </Link>
                                </li>

                                {userType === "admin" ? (
                                  <li>
                                    <Link to="/manage-agency">
                                      Manage Agency
                                    </Link>
                                  </li>
                                ) : (
                                  ""
                                )}
                              </>
                            ) : null}
                          </ul>
                        </li>
                        {userPermission?.includes("List Role") ? (
                          <li>
                            <Link
                              to="#"
                              className="has-arrow waves-effect"
                              onClick={toggleRoleSubMenu}
                            >
                              <i className="uil-store" />
                              <span>Role</span>
                            </Link>
                            <ul
                              ref={subMenuRoleRef}
                              className="sub-menu mm-collapse"
                              aria-expanded="false"
                            >
                              <li>
                                <Link to="/roles">All Roles</Link>
                              </li>
                              {userPermission?.includes("Add Role") ? (
                                <li>
                                  <Link to="/add-user-role">Create Roles</Link>
                                </li>
                              ) : null}
                            </ul>
                          </li>
                        ) : null}

                        {userType === "admin" ? (
                          <li>
                            <Link
                              to="#"
                              className="has-arrow waves-effect"
                              onClick={togglePackageSubMenu}
                            >
                              <i className="uil-store" />
                              <span>Advertisments</span>
                            </Link>
                            <ul
                              ref={subMenuPackageRef}
                              className="sub-menu mm-collapse"
                              aria-expanded="false"
                            >
                              {userPermission?.includes("List Packages") ? (
                                <li>
                                  <Link to="/packages">List Advertisments</Link>
                                </li>
                              ) : null}
                              {userPermission?.includes("Add Packages") ? (
                                <li>
                                  <Link to="/add-package">
                                    Add Advertisment
                                  </Link>
                                </li>
                              ) : null}
                            </ul>
                          </li>
                        ) : null}

                        {parnetId === 0 ? (
                          <>
                            <li>
                              <Link
                                to="#"
                                className="has-arrow waves-effect"
                                onClick={toggleOrdersSubMenu}
                              >
                                <i className="uil-store" />
                                <span>Orders</span>
                              </Link>
                              <ul
                                ref={subMenuOrdersRef}
                                className="sub-menu mm-collapse"
                                aria-expanded="false"
                              >
                                {userType === "admin" ? (
                                  <li>
                                    <Link to="/user-orders">User Orders</Link>
                                  </li>
                                ) : null}
                                {userType !== "admin" ? (
                                  <li>
                                    <Link to="/order-history">
                                      Order History
                                    </Link>
                                  </li>
                                ) : null}
                              </ul>
                            </li>
                          </>
                        ) : null}

                        {userType === "admin" ? (
                          <>
                            <li
                              className={
                                location.pathname === "/society"
                                  ? "mm-active mt-1"
                                  : "mt-1"
                              }
                            >
                              <Link to="/society">
                                <i className="uil-comment-alt-message" />
                                <span>Societies</span>
                              </Link>
                            </li>

                            <li
                              className={
                                location.pathname === "/blog"
                                  ? "mm-active mt-1"
                                  : "mt-1"
                              }
                            >
                              <Link to="/blog">
                                <i className="uil-comment-alt-message" />
                                <span>News & Updates</span>
                              </Link>
                            </li>
                          </>
                        ) : null}
                      </ul>
                    </div>
                    {/* Sidebar */}
                  </div>
                </div>
              </div>
            </div>
            <div
              className="simplebar-placeholder"
              style={{ width: "auto", height: 1668 }}
            />
          </div>
          <div
            className="simplebar-track simplebar-horizontal"
            style={{ visibility: "hidden" }}
          >
            <div
              className="simplebar-scrollbar"
              style={{
                transform: "translate3d(0px, 0px, 0px)",
                display: "none",
              }}
            />
          </div>
          <div
            className="simplebar-track simplebar-vertical"
            style={{ visibility: "visible" }}
          >
            <div
              className="simplebar-scrollbar"
              style={{
                height: 41,
                transform: "translate3d(0px, 150px, 0px)",
                display: "block",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
