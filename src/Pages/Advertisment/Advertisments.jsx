import React, { useState, useEffect } from "react"
import { BsWallet, BsPeople, BsBell } from "react-icons/bs"
import MyHelmet from "../../Reuseable/Helmet"
import PageTitle from "../../Reuseable/PageTitle"

import PackageServices from "../../Services/packageServices"
import { useNavigate } from "react-router-dom"
import OrderServices from "../../Services/orderServices"

function addCommasToNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Advertisements = () => {
  const navigate = useNavigate()
  const [packages, setPackages] = useState([])
  const [userQuota, setUserQutoa] = useState({
    verfied_listing: 0,
    hot_listing: 0,
    super_hot_listing: 0
  })

  let userType = ""
  const authUser = localStorage.getItem("authUser")
  if (authUser) {
    const parsedAuthUser = JSON.parse(authUser)
    userType = parsedAuthUser?.user_type
  }

  let userId = null
  if (authUser) {
    const parsedAuthUser = JSON.parse(authUser)
    userId = parsedAuthUser?.id
  }

  const getPackages = () => {
    PackageServices.getPackageByUsertype(null, userType)
      .then(res => {
        const data = res.data
        setPackages(data)
      })
      .catch(err => {
        console.log("api error on get packages")
      })
  }

  const getUsersQotas = () => {
    OrderServices.getUserQuota(null, userId)
      .then(res => {
        const data = res.data[0]
        console.log("res: ", data)
        setUserQutoa(data)
      })
      .catch(err => {
        console.log("error on the user quota api")
      })
  }

  useEffect(() => {
    getPackages()
    getUsersQotas()
  }, [])

  const handelPayment = (e, id) => {
    e.preventDefault()
    navigate(`/advertisments/payment/${id}`)
  }

  return (
    <>
      <MyHelmet title="Advertisement" />
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            {/* start page title  */}
            <div className="row">
              <PageTitle pagename="Available Advertisements Quota " />
              <p>Below figures show the available quota you have to boost your property for better outreach on our platform.</p>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="card smallCard">
                  <div className="card-body">
                    <div className="cardicon float-end mt-2">
                      <BsWallet />
                    </div>
                    <div>
                      <h4 className="tracking-in-expand mb-1 mt-1">
                        <span data-plugin="counterup">
                          {userQuota?.hot_listing}
                        </span>
                      </h4>
                      <p className="tracking-in-expand text-muted mb-0">
                      Total Hot Listing Quota
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card smallCard">
                  <div className="card-body">
                    <div className="cardicon float-end mt-2">
                      <BsPeople />
                    </div>
                    <div>
                      <h4 className="tracking-in-expand mb-1 mt-1">
                        <span data-plugin="counterup">
                          {userQuota?.super_hot_listing}
                        </span>
                      </h4>
                      <p className="tracking-in-expand text-muted mb-0">
                      Total Super Hot Listing Quota
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card smallCard">
                  <div className="card-body">
                    <div className="cardicon float-end mt-2">
                      <BsBell />
                    </div>
                    <div>
                      <h4 className="tracking-in-expand mb-1 mt-1">
                        <span data-plugin="counterup">
                          {userQuota?.verfied_listing}
                        </span>
                      </h4>
                      <p className="tracking-in-expand text-muted mb-0">
                      Total Verified Quota
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <PageTitle pagename="Available Packages" />
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    {packages.length === 0 ? (
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
                                <th>Package Name</th>
                                <th>Price</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {packages.map(pac => (
                                <tr key={pac.id}>
                                  <td>
                                    <h6 className="fw-bold">{pac.name}</h6>{" "}
                                    <div>
                                    Buy this package to enable boost option on your property listing
                                    </div>
                                  </td>
                                  <td>Rs {addCommasToNumber(pac.price)}</td>
                                  <td>
                                    <button
                                      onClick={e => handelPayment(e, pac.id)}
                                      type="button"
                                      className="btn btn-primary btn-sm waves-effect waves-light"
                                      style={{ height: 30 }}
                                    >
                                      Buy Now
                                    </button>
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

export default Advertisements
