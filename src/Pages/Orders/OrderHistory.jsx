import React, { useState, useEffect } from "react";
import MyHelmet from "../../Reuseable/Helmet";
import PageTitle from "../../Reuseable/PageTitle";
import DataNotFound from "../../assets/images/404-error.png";
import OrderServices from "../../Services/orderServices";
import moment from "moment";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function addCommasToNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  let userType = "";
  const authData = localStorage.getItem("authUser");
  if (authData) {
    const parsedUser = JSON.parse(authData);
    userType = parsedUser?.user_type || null;
  }

  let userId = null;
  const authUser = localStorage.getItem("authUser");
  if (authUser) {
    const parsedAuthUser = JSON.parse(authUser);
    console.log(parsedAuthUser);
    userId = parsedAuthUser.id;
  }

  const getOrders = () => {
    setDataLoading(true);
    OrderServices.userOrders(null, userId)
      .then((res) => {
        console.log("res: ", res);
        const data = res.data;
        setOrders(data);
        setDataLoading(false);
      })
      .catch((err) => {
        console.log("error on api getting the orders");
        setDataLoading(false);
      });
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <MyHelmet title="Order History" />
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            {/* start page title  */}
            <div className="row">
              <PageTitle pagename="Order History" />
            </div>

            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    {dataLoading ? (
                      <>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="table-responsive">
                              <table className="table  mb-0">
                                <thead className=" ">
                                  <tr>
                                    <th style={{ cursor: "pointer" }}>
                                      <Skeleton width={200} />
                                    </th>
                                    <th style={{ cursor: "pointer" }}>
                                      <Skeleton width={200} />
                                    </th>
                                    <th style={{ cursor: "pointer" }}>
                                      <Skeleton width={200} />
                                    </th>
                                  </tr>
                                  <tr>
                                    <th style={{ cursor: "pointer" }}>
                                      <Skeleton width={200} />
                                    </th>
                                    <th style={{ cursor: "pointer" }}>
                                      <Skeleton width={200} />
                                    </th>
                                    <th style={{ cursor: "pointer" }}>
                                      <Skeleton width={200} />
                                    </th>
                                  </tr>
                                  <tr>
                                    <th style={{ cursor: "pointer" }}>
                                      <Skeleton width={200} />
                                    </th>
                                    <th style={{ cursor: "pointer" }}>
                                      <Skeleton width={200} />
                                    </th>
                                    <th style={{ cursor: "pointer" }}>
                                      <Skeleton width={200} />
                                    </th>
                                  </tr>
                                  <tr>
                                    <th style={{ cursor: "pointer" }}>
                                      <Skeleton width={200} />
                                    </th>
                                    <th style={{ cursor: "pointer" }}>
                                      <Skeleton width={200} />
                                    </th>
                                    <th style={{ cursor: "pointer" }}>
                                      <Skeleton width={200} />
                                    </th>
                                  </tr>
                                </thead>
                              </table>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {orders.length === 0 ? (
                          <>
                            <div className="row">
                              <div className="col-md-12">
                                <div className="text-center">
                                  <div>
                                    <div className="row justify-content-center">
                                      <div className="col-sm-4">
                                        <div className="error-img">
                                          <img
                                            src={DataNotFound}
                                            alt=""
                                            className="img-fluid mx-auto d-block"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <h4 className="text-uppercase mt-4">
                                    Sorry, No Data found
                                  </h4>
                                </div>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="table-responsive">
                              <table className="table table-centered table-nowrap mb-0">
                                <thead className="table-light">
                                  <tr>
                                    <th>Order ID</th>

                                    <th>Pacakge</th>
                                    <th>Price</th>
                                    <th>Order Date</th>
                                    <th>Status</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {orders.map((order) => (
                                    <tr key={order.id}>
                                      <td>{order.id}</td>

                                      <td>{order.package[0]?.name}</td>
                                      <td>
                                        Rs{" "}
                                        {addCommasToNumber(order.package_price)}
                                      </td>
                                      <td>
                                        {moment(order?.createdAt).format(
                                          "DD MMM,YYYY"
                                        )}
                                      </td>
                                      <td>{order.status}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </>
                        )}
                      </>
                    )}
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

export default OrderHistory;
