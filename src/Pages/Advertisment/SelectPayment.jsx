import React, { useState, useEffect } from "react";
import MyHelmet from "../../Reuseable/Helmet";
import PageTitle from "../../Reuseable/PageTitle";
import { useNavigate, useParams } from "react-router-dom";
import PackageServices from "../../Services/packageServices";
import OrderServices from "../../Services/orderServices";

import {
  CardElement,
  useStripe,
  useElements,
  CardNumberElement,
  stripe,
  CardCvcElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import axios from "axios";

function addCommasToNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const SelectPayment = () => {
  const strip = useStripe();
  const navigate = useNavigate();
  const elements = useElements();
  const params = useParams();
  const paramId = parseInt(params?.id || "");
  const [packageDetails, setPackageDetails] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const authUserData = JSON.parse(localStorage.getItem("authUser"));
  const userName = authUserData && authUserData?.full_name;
  const mobileNumber = authUserData && authUserData?.mobile_number;

  let userId = null;
  const authUser = localStorage.getItem("authUser");
  if (authUser) {
    const parsedAuthUser = JSON.parse(authUser);
    userId = parsedAuthUser?.id;
  }

  const cardStyle = {
    style: {
      base: {
        color: "#414042",
        padding: ".375rem .75rem",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontWeight: "400",
        fontSize: "16px",
        "::placeholder": {
          color: "#757D85",
        },
        ":focus::placeholder": {
          color: "transparent",
        },
      },
      invalid: {
        fontFamily: "Arial, sans-serif",
        color: "#414042",
        iconColor: "#414042",
      },
    },
  };

  const baseStyle = {
    base: {
      color: "#414042",
      padding: ".375rem .75rem",
      fontFamily: "Arial, sans-serif",
      fontSmoothing: "antialiased",
      fontWeight: "400",
      fontSize: "16px",
      "::placeholder": {
        color: "#757D85",
      },
      ":focus::placeholder": {
        color: "transparent",
      },
    },
    invalid: {
      fontFamily: "Arial, sans-serif",
      color: "#414042",
      iconColor: "#414042",
    },
  };

  const getPackageDetail = () => {
    let body = null;
    PackageServices.getPackageDetails(body, paramId)
      .then((res) => {
        const data = res.data[0];
        console.log(data);
        setPackageDetails(data);
      })
      .catch((err) => {
        console.log("error on package details", err);
      });
  };

  useEffect(() => {
    getPackageDetail();
  }, []);

  const handleOrder = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}create-payment-intent-customers`,
        null,
        {
          params: {
            total: packageDetails?.price,
            currency: "PKR",
            name: userName,
            phone: mobileNumber,
          },
        }
      )
      .then(function (response) {
        let clientSecret = response.data.clientSecret;
        const body = {
          user_id: userId,
          package_id: packageDetails?.id,
          package_price: packageDetails?.price,
          payment_method: "Stripe",
        };
        OrderServices.createOrder(body)
          .then((ressss) => {
            strip
              .confirmCardPayment(clientSecret, {
                payment_method: {
                  card: elements.getElement(CardNumberElement),
                },
              })
              .then((res) => {
                if (res.paymentIntent) {
                  if (ressss.orderId) {
                    OrderServices.updateOrderPaidStatus(ressss.orderId)
                      .then((res) => {
                        setIsSubmitting(false);
                        navigate("/order-history");
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }
                }
              })
              .catch((err) => console.warn(err));
          })
          .catch((err) => {
            console.log("Error on creating order:", err);
          });
       
      })
      .catch(function (error) {
        setIsSubmitting(false);
        console.log("error: ", error);
      });
  };

  return (
    <>
      <MyHelmet title="Advertisement" />
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <PageTitle pagename="Advertisement" />
            </div>

            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row g-3">
                      <div className="col-md-6">
                        <span className="fw-bold">Payment Method</span>
                        <div className="card">
                          <div className="accordion" id="accordionExample">
                            <div className="accordion-item">
                              <div className="">
                                <div
                                  className="card-header p-0"
                                  id="headingTwo"
                                >
                                  <h2 className="mb-0">
                                    <button
                                      className="accordion-button btn btn-light btn-block text-left collapsed p-3 rounded-0 border-bottom-custom"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#collapseTwo"
                                      aria-expanded="true"
                                      aria-controls="collapseTwo"
                                    >
                                      <div className="d-flex align-items-center justify-content-between">
                                        <span>Credit card</span>
                                        <div className="icons">
                                          <img
                                            src="https://i.imgur.com/2ISgYja.png"
                                            width={30}
                                            alt=""
                                          />
                                          <img
                                            src="https://i.imgur.com/W1vtnOV.png"
                                            width={30}
                                            alt=""
                                          />
                                          <img
                                            src="https://i.imgur.com/35tC99g.png"
                                            width={30}
                                            alt=""
                                          />
                                          <img
                                            src="https://i.imgur.com/2ISgYja.png"
                                            width={30}
                                            alt=""
                                          />
                                        </div>
                                      </div>
                                    </button>
                                  </h2>
                                </div>
                                <div
                                  id="collapseTwo"
                                  className="accordion-collapse collapse show"
                                  aria-labelledby="headingTwo"
                                  data-bs-parent="#accordionExample"
                                >
                                  <div className="accordion-body">
                                    <div className="card-body payment-card-body">
                                      <span className="font-weight-normal card-text">
                                        Card Number
                                      </span>
                                      <div className="inputi form-control">
                                        <CardNumberElement
                                          id="cardNumber"
                                          style={{}}
                                        />
                                      </div>
                                      <div className="row mt-3 mb-3">
                                        <div className="col-md-6">
                                          <span className="font-weight-normal card-text">
                                            Expiry Date
                                          </span>
                                          <div className="input form-control">
                                            <CardExpiryElement id="expiry" />
                                          </div>
                                        </div>
                                        <div className="col-md-6">
                                          <span className="font-weight-normal card-text">
                                            CVC/CVV
                                          </span>
                                          <div className="input form-control">
                                            <CardCvcElement id="cvc" />
                                          </div>
                                        </div>
                                      </div>
                                      <span className="text-muted certificate-text">
                                        <i className="fa fa-lock" /> Your
                                        transaction is secured with ssl
                                        certificate
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <span className="fw-bold">Order Summary</span>
                        <div className="card">
                          <div className="d-flex justify-content-between p-3">
                            <div className="d-flex flex-column">
                              <span>{packageDetails?.name}</span>
                            </div>
                            <div className="mt-1">
                              <sup className="super-price">
                                {packageDetails ? (
                                  <>
                                    {" "}
                                    Rs {addCommasToNumber(packageDetails.price)}
                                  </>
                                ) : null}
                              </sup>
                              {/* <span className="super-month">/Month</span> */}
                            </div>
                          </div>
                          <hr className="mt-0 line" />
                          <div className="p-3 d-flex justify-content-between">
                            <div className="d-flex flex-column">
                              <span>Today you pay</span>
                              {/* <small>After 30 days $9.59</small> */}
                            </div>
                            <span>
                              {packageDetails ? (
                                <>
                                  {" "}
                                  Rs {addCommasToNumber(packageDetails.price)}
                                </>
                              ) : null}
                            </span>
                          </div>
                          <div className="p-3 text-end">
                            <button
                              disabled={isSubmitting}
                              onClick={(e) => handleOrder(e)}
                              className="btn btn-primary glow"
                            >
                              {isSubmitting ? (
                                <>
                                  <i
                                    className="fa fa-spinner fa-spin"
                                    style={{ fontSize: 24 }}
                                  />
                                </>
                              ) : (
                                "Proceed To Payment"
                              )}
                            </button>
                          </div>
                        </div>
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

export default SelectPayment;
