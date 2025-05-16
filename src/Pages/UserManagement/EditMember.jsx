import React, { useState, useEffect, useCallback } from "react"
import MyHelmet from "../../Reuseable/Helmet"
import PageTitle from "../../Reuseable/PageTitle"
import UsersApi from "../../Services/users"
import { useNavigate, useParams } from "react-router-dom"
import PermissionService from "../../Services/permissionSerice"
const EditMember = () => {
  const navigate = useNavigate()
  const params = useParams()
  const paramId = parseInt(params?.id || "")

  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [fullname, setFullname] = useState("")
  const [selectedRole, setSelectedRole] = useState("")

  const [roles, setRoles] = useState([])

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

  const getRoles = useCallback(() => {
    let body = null
    if (userType !== "agency") {
      PermissionService.getRole(body, userType)
        .then(res => {
          console.log("roles", res)
          const data = res.data
          setRoles(data)
        })
        .catch(err => {
          console.log("error on get roles")
        })
    }
    if (userType === "agency") {
      PermissionService.getRoleAgency(body, userType, userId || 0)
        .then(res => {
          console.log("roles", res)
          const data = res.data
          setRoles(data)
        })
        .catch(err => {
          console.log("error on get roles")
        })
    }
  }, [])

  const getUsersData = () => {
    let body = null
    UsersApi.getUserProfileDetail(body, paramId)
      .then(res => {
        console.log("Res: ", res)
        setEmail(res.email)
        setPhone(res.mobile_number)
        setFullname(res.full_name)
        setSelectedRole(res.role_id)
      })
      .catch(err => {
        console.log("error on the getDetails of user api")
      })
  }

  useEffect(() => {
    getRoles()
    getUsersData()
  }, [])

  const handelSubmit = e => {
    e.preventDefault()
    var formdata = new FormData()
    formdata.append("full_name", fullname)
    formdata.append("email", email)
    formdata.append("password", password)
    formdata.append("mobile_number", phone)
    formdata.append("role_id", selectedRole)
    formdata.append("parent_id", userId)
    UsersApi.updateUserProfileDetail(formdata, paramId)
      .then(res => {
        console.log("res of updating user: ", res)
        navigate("/manage-members")
      })
      .catch(err => {
        console.log("Error on the update member")
      })
  }

  return (
    <>
      <MyHelmet title="Edit Member" body="" />
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            {/* <!-- start page title --> */}
            <div className="row">
              <PageTitle pagename="Edit Member" />
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
                          onChange={e => setFullname(e.target.value)}
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
                          value={email}
                          onChange={e => setEmail(e.target.value)}
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
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                          type="phone"
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
                          onChange={e => setPassword(e.target.value)}
                          type="password"
                          className="form-control"
                          id="formrow-pass-input"
                          placeholder="Password"
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
                          Select Role
                        </label>
                        <select
                          value={selectedRole}
                          onChange={e => setSelectedRole(e.target.value)}
                          className="form-select"
                        >
                          <option value="">Please Select</option>
                          {roles.map(role => (
                            <option value={role.id}>{role.title}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 d-flex flex-sm-row flex-column justify-content-end">
                    <button
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

export default EditMember
