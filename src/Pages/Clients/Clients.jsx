import React from "react";
import MyHelmet from "../../Reuseable/Helmet";
import PageTitle from "../../Reuseable/PageTitle";

const Clients = () => {
  return (
    <>
      <MyHelmet title="Clients" body="" />
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            {/* start page title  */}
            <div className="row">
              <PageTitle pagename="Clients" />

              <div className="col-12"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Clients;
