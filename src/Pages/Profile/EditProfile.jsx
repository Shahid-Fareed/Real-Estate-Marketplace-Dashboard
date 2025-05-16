import React, { useState, useEffect } from "react";
import MyHelmet from "../../Reuseable/Helmet";
import PageTitle from "../../Reuseable/PageTitle";
import UsersApi from "../../Services/users";
import { useNavigate } from "react-router-dom";
import { notifySuccess } from "../../utils/toast";

const EditProfile = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmiting] = useState(false);

  let userId = null;
  const authUser = localStorage.getItem("authUser");
  if (authUser) {
    const parsedAuthUser = JSON.parse(authUser);
    userId = parsedAuthUser?.id;
  }
  const authUsersss = localStorage.getItem("authUser");

  let roleId = null;
  if (authUsersss) {
    const parsedAuthUser = JSON.parse(authUsersss);
    roleId = parsedAuthUser?.role_id;
  }

  let parentId = null;
  if (authUsersss) {
    const parsedAuthUser = JSON.parse(authUsersss);
    parentId = parsedAuthUser?.parent_id;
  }

  let userType = null;
  if (authUsersss) {
    const parsedAuthUser = JSON.parse(authUsersss);
    userType = parsedAuthUser?.user_type;
  }

  let isAdmin = null;
  if (authUsersss) {
    const parsedAuthUser = JSON.parse(authUsersss);
    isAdmin = parsedAuthUser?.is_admin;
  }

  const getData = () => {
    let body = null;
    UsersApi.getUserProfileDetail(body, userId)
      .then((res) => {
        setEmail(res.email);
        setPhone(res.mobile_number);
        setFullname(res.full_name);
      })
      .catch((err) => {
        console.log("error on the getDetails of user api");
      });
  };

  const handelUpdate = (e) => {
    e.preventDefault();
    setIsSubmiting(true);
    var formdata = new FormData();
    formdata.append("full_name", fullname);
    formdata.append("email", email);
    formdata.append("user_image", image);
    formdata.append("mobile_number", phone);
    formdata.append("password", password);
    formdata.append("role_id", roleId);
    formdata.append("parent_id", parentId);
    formdata.append("user_type", userType);
    formdata.append("is_admin", isAdmin);

    UsersApi.updateUserProfileDetail(formdata, userId)
      .then((res) => {
        console.log("Res: ", res);
        setIsSubmiting(false);
        notifySuccess("Profile Updated Successfully!");
        navigate("/profile");
      })
      .catch((err) => {
        console.log("error on the api updates");
      });
  };

  const handlePhoneNumberChange = (event) => {
    const newValue = event.target.value.replace(/\D/g, "").slice(0, 11);
    setPhone(newValue);
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
                >
                  {/* <i className="mdi mdi-plus" style={{ marginRight: 5 }} /> */}
                  Edit Profile
                </button>
              </div>
            </div>

            <form onSubmit={(e)=>handelUpdate(e)}>
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
                            required
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                            type="text"
                            className="form-control"
                            id="formrow-fullname-input"
                            placeholder="Full Name"
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
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            className="form-control"
                            id="formrow-eil-input"
                            placeholder="Email"
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
                            required
                            value={phone}
                            onChange={handlePhoneNumberChange}
                            type="number"
                            className="form-control"
                            id="formrow-phone-input"
                            placeholder="Phone Number"
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
                          />
                        </div>
                      </div>
                      <div className="col-md-6 mb-5">
                        <div className="form-group">
                          <label
                            htmlFor="example-text-input"
                            className="col-form-label"
                          >
                            Image
                          </label>
                          <br />

                          <br />
                          <div className="fileUpload btn btn-sm btn-primary">
                            <input
                              onChange={(e) => setImage(e.target.files[0])}
                              id="uploadBtn"
                              name="avatar"
                              className="upload"
                              type="file"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex flex-wrap gap-3">
                      <button
                        disabled={isSubmitting}
                        type="submit"
                        className="btn btn-primary waves-effect waves-light w-md"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
