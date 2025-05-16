import React, { useState, useLayoutEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import Auth from "../../Services/authDashService";
import MyHelmet from "../../Reuseable/Helmet";
import { notifyError } from "../../utils/toast";

const Login = () => {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const authToken = urlParams.get("ase");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSending, setIsSending] = useState(false);

  const loginApi = (e) => {
    setIsSending(true);
    e.preventDefault();
    let body = { email: email, password: password };
    Auth.login(body)
      .then((res) => {
        console.log(res);
        setIsSending(false);

        localStorage.setItem("auth", res.data.token);
        localStorage.setItem("authUser", JSON.stringify(res.data.new_user[0]));

        navigate("/dashboard");
        window.location.reload();
      })
      .catch((err) => {
        notifyError(err.response.data.data);
        console.log(err);
        setIsSending(false);
      });
  };

  useLayoutEffect(() => {
    if (authToken) {
      // Store the authToken in localStorage
      localStorage.setItem("authToken", authToken);
      //window.location.href = `${process.env.REACT_APP_BASE_SUBDOMAIN}/dashboard`;
    }
  }, []);
  return (
    <>
      <MyHelmet title="Dashboard" body="authentication-bg" />
      <div className="account-pages my-2 pt-sm-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <Link to="#" className="mb-5 d-block auth-logo">
                  <img
                    src="/assets/img/logo1.png"
                    alt=""
                    height={50}
                    className="logo"
                  />
                </Link>
              </div>
            </div>
          </div>
          <div className="row align-items-center justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-5">
              <div className="card">
                <div className="card-body p-4">
                  <div className="text-center mt-2">
                    <h5 className="text-primary">Welcome Back !</h5>
                    <p className="text-muted">
                      Sign in to continue to IN Realtors.
                    </p>
                  </div>
                  <div className="p-2 mt-4">
                    <form>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="username">
                          Username
                        </label>
                        <input
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          type="text"
                          className="form-control"
                          id="username"
                          placeholder="Enter username"
                        />
                      </div>
                      <div className="mb-3">
                        <div className="float-end">
                          {/* <Link to="#" className="text-muted">
                            Forgot password?
                          </Link> */}
                        </div>
                        <label className="form-label" htmlFor="userpassword">
                          Password
                        </label>
                        <input
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          type="password"
                          className="form-control"
                          id="userpassword"
                          placeholder="Enter password"
                        />
                      </div>

                      <div className="mt-3 text-end">
                       
                        <button
                          disabled={isSending}
                          onClick={(e) => loginApi(e)}
                          className="btn btn-primary w-sm waves-effect waves-light"
                          type="submit"
                        > {
                          isSending ? <>
                         <i className="fa fa-spinner fa-spin" style={{ fontSize: 24 }} />

                          </>: "Log In"
                        }
                          
                        </button>
                      </div>
                      {/* <div className="mt-4 text-center">
                      <div className="signin-other-title">
                        <h5 className="font-size-14 mb-3 title">
                          Sign in with
                        </h5>
                      </div>
                      <ul className="list-inline">
                        <li className="list-inline-item">
                          <Link
                            to="#"
                            className="social-list-item bg-primary text-white border-primary"
                          >
                            <i className="mdi mdi-facebook" />
                          </Link>
                        </li>
                        <li className="list-inline-item">
                          <Link
                            to="#"
                            className="social-list-item bg-info text-white border-info"
                          >
                            <i className="mdi mdi-twitter" />
                          </Link>
                        </li>
                        <li className="list-inline-item">
                          <Link
                            to="#"
                            className="social-list-item bg-danger text-white border-danger"
                          >
                            <i className="mdi mdi-google" />
                          </Link>
                        </li>
                      </ul>
                    </div> */}
                    </form>
                  </div>
                </div>
              </div>
              <div className="mt-5 text-center">
                <p className="text-white">
                  © {moment().format("YYYY")} IN Realtors
                </p>
              </div>
            </div>
          </div>
          {/* end row */}
        </div>
        {/* end container */}
      </div>
    </>
  );
};

export default Login;
