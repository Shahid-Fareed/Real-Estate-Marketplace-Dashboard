import React from "react";
import MyHelmet from "../../Reuseable/Helmet";
import PageTitle from "../../Reuseable/PageTitle";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <>
      <MyHelmet title="Personal Profile" body="" />
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            {/* <!-- start page title --> */}
            <div className="row">
              <PageTitle pagename="Personal Profile" />
            </div>

            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div className="mb-3 row">
                    <label
                      htmlFor="example-text-input"
                      className="col-md-2 col-form-label"
                    >
                      Full Name
                    </label>
                    <div className="col-md-10">
                      <input
                        className="form-control"
                        type="text"
                        defaultValue="Artisanal kale"
                        id="example-text-input"
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label
                      htmlFor="example-text-input"
                      className="col-md-2 col-form-label"
                    >
                      Email
                    </label>
                    <div className="col-md-10">
                      <input
                        className="form-control"
                        type="text"
                        defaultValue="Artisanal kale"
                        id="example-text-input"
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label
                      htmlFor="example-text-input"
                      className="col-md-2 col-form-label"
                    >
                      Password
                    </label>
                    <div className="col-md-10">
                      <input
                        className="form-control"
                        type="text"
                        defaultValue="Artisanal kale"
                        id="example-text-input"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
