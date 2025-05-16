import React, { useState, useEffect } from "react"
import PageTitle from "../../Reuseable/PageTitle"
import MyHelmet from "../../Reuseable/Helmet"

import UsersApi from "../../Services/users"
import { useNavigate } from "react-router-dom"

const AgencyProfile = () => {
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [city, setCity] = useState("")
  const [country, setCountry] = useState("")
  const [address, setAddress] = useState("")
  const [ceoMessage, setCeoMessage] = useState("")
  const [aboutAgency, setAboutAgency] = useState("")
  const [facebookLink, setFacebookLink] = useState("")
  const [instagramLink, setInstagramLink] = useState("")
  const [twitterLink, setTwitterLink] = useState("")
  const [linkdinLink, setLinkdinLink] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = e => {
    e.preventDefault()
  }

  let userId = null
  const authUser = localStorage.getItem("authUser")
  if (authUser) {
    const parsedAuthUser = JSON.parse(authUser)
    userId = parsedAuthUser?.id
  }

  const getData = () => {
    let body = null
    UsersApi.getUserProfileDetail(body, userId)
      .then(res => {
        console.log("Res: ", res)
        setName(res.agency_name)
        setCity(res.city)
        setCountry(res.country)
        setAddress(res.address)
        setCeoMessage(res.ceo_message)
        setAboutAgency(res.about_agency)
        setFacebookLink(res.facebook_url)
        setInstagramLink(res.instagram_url)
        setLinkdinLink(res.linkedin_url)
        setTwitterLink(res.twitter_url)
      })
      .catch(err => {
        console.log("error on the getDetails of user api")
      })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <MyHelmet title="Agency Profile" body="" />
     
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            {/* <!-- start page title --> */}
            <div className="row">
              <PageTitle pagename="Agency Profile" />
              <div
                className="col-6"
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <button
                  type="button"
                  className="btn btn-primary btn-sm waves-effect waves-light"
                  style={{ height: 30 }}
                  onClick={() => navigate("/agency-profile/edit")}
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
                    <div className="mb-3">
                      <label
                        className="form-label"
                        htmlFor="formrow-email-input"
                      >
                        Agency Name
                      </label>
                      <input
                        disabled
                        value={name}
                        onChange={e => setName(e.target.value)}
                        type="text"
                        className="form-control"
                        id="formrow-email-input"
                        placeholder="Enter your Agency Name"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          className="form-label"
                          htmlFor="formrow-email-input"
                        >
                          City
                        </label>
                        <input
                          disabled
                          value={city}
                          onChange={e => setCity(e.target.value)}
                          type="text"
                          className="form-control"
                          id="formrow-email-input"
                          placeholder="Enter your city"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          className="form-label"
                          htmlFor="formrow-password-input"
                        >
                          Country
                        </label>
                        <input
                          disabled
                          value={country}
                          onChange={e => setCountry(e.target.value)}
                          type="text"
                          className="form-control"
                          id="formrow-password-input"
                          placeholder="Enter the country"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3">
                      <label
                        className="form-label"
                        htmlFor="formrow-email-input"
                      >
                        Address
                      </label>
                      <input
                        disabled
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        type="text"
                        className="form-control"
                        id="formrow-email-input"
                        placeholder="Enter your agency address"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3">
                      <label
                        className="form-label"
                        htmlFor="formrow-email-input"
                      >
                        About Agency
                      </label>
                      <textarea
                        disabled
                        value={aboutAgency}
                        onChange={e => setAboutAgency(e.target.value)}
                        rows={5}
                        cols={40}
                        className="form-control"
                        id="formrow-email-input"
                        placeholder="Enter your agency details"
                        defaultValue={""}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3">
                      <label
                        className="form-label"
                        htmlFor="formrow-email-input"
                      >
                        CEO Message
                      </label>
                      <textarea
                        disabled
                        value={ceoMessage}
                        onChange={e => setCeoMessage(e.target.value)}
                        rows={5}
                        cols={40}
                        className="form-control"
                        id="formrow-email-input"
                        placeholder="Enter the CEO Message"
                        defaultValue={""}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3">
                      <label
                        className="form-label"
                        htmlFor="formrow-email-input"
                      >
                        Social Links
                      </label>
                      <div>
                        <div className="col-md-12 mb-3">
                          <input
                            disabled
                            value={facebookLink}
                            onChange={e => setFacebookLink(e.target.value)}
                            type="url"
                            className="form-control"
                            id="formrow-password-input"
                            placeholder="Enter the facebook link"
                          />
                        </div>
                        <div className="col-md-12 mb-3">
                          <input
                            disabled
                            value={instagramLink}
                            onChange={e => setInstagramLink(e.target.value)}
                            type="url"
                            className="form-control"
                            id="formrow-password-input"
                            placeholder="Enter the instagram link"
                          />
                        </div>
                        <div className="col-md-12 mb-3">
                          <input
                            disabled
                            value={twitterLink}
                            onChange={e => setTwitterLink(e.target.value)}
                            type="url"
                            className="form-control"
                            id="formrow-password-input"
                            placeholder="Enter the twitter link"
                          />
                        </div>
                        <div className="col-md-12 mb-3">
                          <input
                            disabled
                            value={linkdinLink}
                            onChange={e => setLinkdinLink(e.target.value)}
                            type="url"
                            className="form-control"
                            id="formrow-password-input"
                            placeholder="Enter the linkdin link"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="row">
                  <div className="col-5">
                    <button disabled={isSubmitting} onClick={(e) => onSubmit(e)} className="btn btn-primary btn-sm waves-effect waves-light">Submit</button>
                  </div>

                </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AgencyProfile
