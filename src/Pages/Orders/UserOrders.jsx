import React, { useState, useEffect } from "react"
import MyHelmet from "../../Reuseable/Helmet"
import PageTitle from "../../Reuseable/PageTitle"
import OrderServices from "../../Services/orderServices"
import moment from "moment"
import { notifySuccess } from "../../utils/toast"

const UserOrders = () => {
  const [orders, setOrders] = useState([])

  let userType = ""
  const authData = localStorage.getItem("authUser")
  if (authData) {
    const parsedUser = JSON.parse(authData)
    userType = parsedUser?.user_type || null
  }

  const getOrders = () => {
    OrderServices.allOrders(null)
      .then(res => {
        console.log("res: ", res)
        const data = res.data
        setOrders(data)
      })
      .catch(err => {
        console.log("error on api getting the orders")
      })
  }

  const updateOrderStatus = (value, id) => {
    OrderServices.updateOrderStatus({ status: value }, id)
      .then(res => {
        notifySuccess(`Order Status Changed to ${value} Successfully!`);
        getOrders()
      })
      .catch(err => {
        console.log("Error on the update status")
      })
  }

  const handelStatusChange = (e, id) => {
    updateOrderStatus(e.target.value, id)
  }

  useEffect(() => {
    getOrders()
  }, [])

  return (
    <>
      <MyHelmet title="User Order" />
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            {/* start page title  */}
            <div className="row">
              <PageTitle pagename="User Order" />
            </div>

            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
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
                                        src=""
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
                                <th>User</th>
                                <th>Pacakge</th>
                                <th>Price</th>
                                <th>Order Date</th>
                                <th style={{ width: "12%" }}>Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {orders.map(order => (
                                <tr key={order.id}>
                                  <td>{order.id}</td>
                                  <td>{order.user[0]?.full_name}</td>
                                  <td>{order.package[0]?.name}</td>
                                  <td>{order.package_price}</td>
                                  <td>
                                    {moment(order?.createdAt).format(
                                      "DD MMM,YYYY"
                                    )}
                                  </td>
                                  <td>
                                    <select
                                      disabled={order.status === "approved"}
                                      style={{ borderRadius: 20 }}
                                      className="form-select"
                                      value={order.status}
                                      onChange={e =>
                                        handelStatusChange(e, order.id)
                                      }
                                    >
                                      <option value="pending">Pending</option>
                                      <option value="approved">Approved</option>
                                      <option value="rejected">Rejected</option>
                                    </select>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
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
  )
}

export default UserOrders
