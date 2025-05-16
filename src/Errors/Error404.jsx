import React from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";

const Error404 = () => {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>404 Not Found</title>
      </Helmet>
      <div className="my-5 pt-sm-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="text-center">
                <div>
                  <div className="row justify-content-center">
                    <div className="col-sm-4">
                      <div className="error-img">
                        <img
                          src="/assets/images/404-error.png"
                          alt=""
                          className="img-fluid mx-auto d-block"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <h4 className="text-uppercase mt-4">Sorry, page not found</h4>
                <p className="text-muted">
                  It will be as simple as Occidental in fact, it will be
                  Occidental
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Error404;
