import React, { useState, useEffect } from "react";
import MyHelmet from "../../Reuseable/Helmet";
import PageTitle from "../../Reuseable/PageTitle";
import UsersApi from "../../Services/users";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");

  let userId = null;
  const authUser = localStorage.getItem("authUser");
  if (authUser) {
    const parsedAuthUser = JSON.parse(authUser);
    userId = parsedAuthUser?.id;
  }

  
  const getData = () => {
    let body = null;
    UsersApi.getUserProfileDetail(body, userId)
      .then((res) => {
        setEmail(res.email);
        setPhone(res.mobile_number);
        setPassword(res.password);
        setFullname(res.full_name);
      })
      .catch((err) => {
        console.log("error on the getDetails of user api");
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <MyHelmet title="Personal Profile" body="" />

      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            {/* <!-- start page title --> */}
            <div className="row">
              <PageTitle pagename="Personal Profile" />
              <div
                className="col-6"
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <button
                  type="button"
                  className="btn btn-primary btn-sm waves-effect waves-light"
                  style={{ height: 30 }}
                  onClick={() => navigate("/profile/edit")}
                >
                  {/* <i className="mdi mdi-plus" style={{ marginRight: 5 }} /> */}
                  Edit Profile
                </button>
              </div>
            </div>

            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          className="form-label"
                          htmlFor="formrow-fullname-input"
                        >
                          Full Name
                        </label>
                        <input
                          value={fullname}
                          onChange={(e) => setFullname(e.target.value)}
                          type="text"
                          className="form-control"
                          id="formrow-fullname-input"
                          placeholder="Full Name"
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          className="form-label"
                          htmlFor="formrow-email-input"
                        >
                          Email
                        </label>
                        <input
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          type="email"
                          className="form-control"
                          id="formrow-eil-input"
                          placeholder="Email"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          className="form-label"
                          htmlFor="formrow-phone-input"
                        >
                          Phone Number
                        </label>
                        <input
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          type="phone"
                          className="form-control"
                          id="formrow-phone-input"
                          placeholder="Phone Number"
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          className="form-label"
                          htmlFor="formrow-pass-input"
                        >
                          Password
                        </label>
                        <input
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          type="password"
                          className="form-control"
                          id="formrow-pass-input"
                          placeholder="Password"
                          disabled
                        />
                      </div>
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

export default UserProfile;
