import React, { useState, useEffect } from "react"
import MyHelmet from "../../Reuseable/Helmet"
import PageTitle from "../../Reuseable/PageTitle"
import PackageServices from "../../Services/packageServices"
import { useNavigate, useParams } from "react-router-dom"
import { notifySuccess } from "../../utils/toast"

const EditPackage = () => {
  const navigate = useNavigate()
  const params = useParams()
  const paramId = parseInt(params?.id || "")

  const [packageName, setPackageName] = useState("")
  const [price, setPrice] = useState("")
  const [hotLisiting, setHotListing] = useState("")
  const [superHotLisiting, setSuperHostListing] = useState("")
  const [verified, setVerified] = useState("")
  const [selectedUser, setSelectedUser] = useState("")

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handelSubmit = e => {
    e.preventDefault()
    setIsSubmitting(true)
    let body = {
      name: packageName,
      type: selectedUser,
      hot_listing: hotLisiting,
      super_hot_listing: superHotLisiting,
      verified: verified,
      price: price
    }
    PackageServices.updatePackageDetails(body, paramId)
      .then(res => {
        notifySuccess("Advertisment updated Successfully!");
        setIsSubmitting(false)
        navigate("/packages")
      })
      .catch(err => {
        console.log("error on the package creating api")
        setIsSubmitting(false)
      })
  }

  const getPackageDetail = () => {
    let body = null
    PackageServices.getPackageDetails(body, paramId)
      .then(res => {
        const data = res.data[0]
        console.log(data)
        setPackageName(data.name)
        setPrice(data.price)
        setHotListing(data.hot_listing)
        setSuperHostListing(data.super_hot_listing)
        setVerified(data.verified)
        setSelectedUser(data.type)
      })
      .catch(err => {
        console.log("error on paclkage details error")
      })
  }

  useEffect(() => {
    getPackageDetail()
  }, [])

  return (
    <>
      <MyHelmet title="Create Package" body="" />
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            {/* <!-- start page title --> */}
            <div className="row">
              <PageTitle pagename="Create Package" />
            </div>

            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label
                          className="form-label"
                          htmlFor="formrow-fullname-input"
                        >
                          Package Name
                        </label>
                        <input
                          value={packageName}
                          onChange={e => setPackageName(e.target.value)}
                          type="text"
                          className="form-control"
                          id="formrow-fullname-input"
                          placeholder="Enter Package Name"
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label
                          className="form-label"
                          htmlFor="formrow-email-input"
                        >
                          Price
                        </label>
                        <input
                          value={price}
                          onChange={e => setPrice(e.target.value)}
                          type="Number"
                          className="form-control"
                          id="formrow-eil-input"
                          placeholder="Enter the price"
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label
                          className="form-label"
                          htmlFor="formrow-email-input"
                        >
                          Select User
                        </label>
                        <select
                          value={selectedUser}
                          onChange={e => setSelectedUser(e.target.value)}
                          className="form-select"
                        >
                          <option>Please Select</option>
                          <option value="user">User</option>
                          <option value="agency">Agency</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label
                          className="form-label"
                          htmlFor="formrow-fullname-input"
                        >
                          No of Hotlisting
                        </label>
                        <input
                          value={hotLisiting}
                          onChange={e => setHotListing(e.target.value)}
                          type="number"
                          className="form-control"
                          id="formrow-fullname-input"
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label
                          className="form-label"
                          htmlFor="formrow-fullname-input"
                        >
                          No of Super Hotlisting
                        </label>
                        <input
                          value={superHotLisiting}
                          onChange={e => setSuperHostListing(e.target.value)}
                          type="number"
                          className="form-control"
                          id="formrow-fullname-input"
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label
                          className="form-label"
                          htmlFor="formrow-fullname-input"
                        >
                          No of verified listing
                        </label>
                        <input
                          value={verified}
                          onChange={e => setVerified(e.target.value)}
                          type="number"
                          className="form-control"
                          id="formrow-fullname-input"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 d-flex flex-sm-row flex-column justify-content-end">
                    <button
                      disabled={isSubmitting}
                      onClick={e => handelSubmit(e)}
                      className="btn btn-primary glow "
                    >
                      Save changes
                    </button>
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

export default EditPackage
