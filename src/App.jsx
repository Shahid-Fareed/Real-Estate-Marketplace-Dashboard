import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";

import Layout from "./Layouts/Layout/Layout";

import Dashboard from "./Pages/Dashboard/Dashboard";
import Properties from "./Pages/Properties/Properties";
import PropertiesAdmin from "./Pages/Properties/PropertiesAdmin";
import PropertiesAgency from "./Pages/Properties/PropertiesAgency";
import VerifyProperties from "./Pages/Properties/VerifyProperties";
import AddProperties from "./Pages/Properties/AddProperties";
import UserProfile from "./Pages/Profile/UserProfile";
import EditProfile from "./Pages/Profile/EditProfile";
import AgencyProfile from "./Pages/Profile/AgencyProfile";
import EditAgencyProfile from "./Pages/Profile/EditAgencyProfile";
import Roles from "./Pages/UserManagement/Roles";
import AddUserRole from "./Pages/UserManagement/AddUserRole";
import EditRole from "./Pages/UserManagement/EditRole";
import ManageMembers from "./Pages/UserManagement/ManageMembers";
import AddMember from "./Pages/UserManagement/AddMember";
import EditMember from "./Pages/UserManagement/EditMember";
import CreatePackage from "./Pages/Package/CreatePackage";
import AllPackages from "./Pages/Package/AllPackages";
import EditPackage from "./Pages/Package/EditPackage";
import Advertisements from "./Pages/Advertisment/Advertisments";
import SelectPayment from "./Pages/Advertisment/SelectPayment";
import UserOrders from "./Pages/Orders/UserOrders";
import OrderHistory from "./Pages/Orders/OrderHistory";
import ManageAgency from "./Pages/Agencies/ManageAgency";
import Login from "./Pages/Auth/Login";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Inbox from "./Pages/Inbox/inbox.jsx";
import ListSociety from "./Pages/Society/ListSociety";
import AddSociety from "./Pages/Society/AddSociety";
import ListBlog from "./Pages/Blog/ListBlog";
import BlogCreate from "./Pages/Blog/BlogCreate";
import CheckAgencyDetails from "./Pages/Agencies/CheckAgencyDetails";
import EditProperty from "./Pages/Properties/EditProperty";
import EditBlog from "./Pages/Blog/EditBlog";
import EditSociety from "./Pages/Society/EditSociety";

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_CLIENT_KEY}`);
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/*" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="inbox" element={<Inbox />} />
          <Route path="properties/user" element={<Properties />} />
          <Route path="properties/admin" element={<PropertiesAdmin />} />
          <Route path="properties/agency" element={<PropertiesAgency />} />
          <Route path="properties/verify" element={<VerifyProperties />} />
          <Route path="properties/add" element={<AddProperties />} />
          <Route path="properties/:id" element={<EditProperty />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="profile/edit" element={<EditProfile />} />
          <Route path="agency-profile" element={<AgencyProfile />} />
          <Route path="agency-profile/edit" element={<EditAgencyProfile />} />
          <Route path="roles" element={<Roles />} />
          <Route path="add-user-role" element={<AddUserRole />} />
          <Route path="roles/:id" element={<EditRole />} />
          <Route path="manage-members" element={<ManageMembers />} />
          <Route path="add-members" element={<AddMember />} />
          <Route path="manage-members/:id" element={<EditMember />} />
          <Route path="add-package" element={<CreatePackage />} />
          <Route path="packages" element={<AllPackages />} />
          <Route path="packages/:id" element={<EditPackage />} />
          <Route path="advertisments" element={<Advertisements />} />
          <Route
            path="advertisments/payment/:id"
            element={
              <Elements stripe={stripePromise}>
                <SelectPayment />
              </Elements>
            }
          />
          <Route path="user-orders" element={<UserOrders />} />
          <Route path="order-history" element={<OrderHistory />} />
          <Route path="manage-agency" element={<ManageAgency />} />
          <Route path="manage-agency/:id" element={<CheckAgencyDetails />} />
          <Route path="society" element={<ListSociety />} />
          <Route path="society/add" element={<AddSociety />} />
          <Route path="society/:id" element={<EditSociety />} />

          <Route path="blog" element={<ListBlog />} />
          <Route path="blog/create" element={<BlogCreate />} />
          <Route path="blog/:id" element={<EditBlog />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
