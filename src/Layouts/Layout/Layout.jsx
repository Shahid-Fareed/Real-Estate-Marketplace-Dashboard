import React, { Suspense } from "react";
import Sidebar from "../Sidebar";
import Footer from "../Footer";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../../Reuseable/Loader";

const Layout = () => {
  const auth = true;

  return auth ? (
    <>
      <Suspense fallback={<Loader />}>
        <Sidebar />
        <Outlet />
        <Footer />
      </Suspense>
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default Layout;
