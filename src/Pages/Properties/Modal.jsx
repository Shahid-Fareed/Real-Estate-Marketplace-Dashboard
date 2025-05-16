/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { memo, useState } from "react";

const Modal = memo(({ data, handleChange, activeTab }) => {
  const onSubmit = (e) => {
    console.log("here");
    const closeIcon = document.querySelector("#addmentyClose");
    closeIcon.click();
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModalAmenti"
      >
        Add Amenties
      </button>
      <div
        className="modal fade"
        id="exampleModalAmenti"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div
          style={{ maxWidth: "700px" }}
          className="modal-dialog modal-dialog-centered"
        >
          <div style={{ borderRadius: "10px" }} className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-bold" id="exampleModalLabel">
                Features and Amenities
              </h5>
              <button
                type="button"
                id="addmentyClose"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div id="accordionExample">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      Primary Features
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <div className="">
                        <div className="card-header d-flex align-items-center justify-content-between rounded border-0 bg-light mb-2">
                          <h6 className="modal-title fw-bold">Build Year</h6>
                          <p style={{ cursor: "pointer" }} className="mb-0">
                            <div className="btn-group">
                              <button
                                type="button"
                                className="btn btn-light dropdown-toggle dropdown-toggle-split waves-effect"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                { data.PrimaryFeatures.Build_Year ? data.PrimaryFeatures.Build_Year : "Please Select" } 
                              </button>
                              <div
                                className="dropdown-menu"
                                style={{ maxHeight: 200, overflowY: "scroll" }}
                              >
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    handleChange(
                                      "PrimaryFeatures",
                                      "Build_Year",
                                      "2024"
                                    )
                                  }
                                >
                                  2024
                                </a>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    handleChange(
                                      "PrimaryFeatures",
                                      "Build_Year",
                                      "2023"
                                    )
                                  }
                                >
                                  2023
                                </a>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    handleChange(
                                      "PrimaryFeatures",
                                      "Build_Year",
                                      "2022"
                                    )
                                  }
                                >
                                  2022
                                </a>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    handleChange(
                                      "PrimaryFeatures",
                                      "Build_Year",
                                      "2021"
                                    )
                                  }
                                >
                                  2021
                                </a>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    handleChange(
                                      "PrimaryFeatures",
                                      "Build_Year",
                                      "2020"
                                    )
                                  }
                                >
                                  2020
                                </a>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    handleChange(
                                      "PrimaryFeatures",
                                      "Build_Year",
                                      "2019"
                                    )
                                  }
                                >
                                  2019
                                </a>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    handleChange(
                                      "PrimaryFeatures",
                                      "Build_Year",
                                      "2017"
                                    )
                                  }
                                >
                                  2017
                                </a>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    handleChange(
                                      "PrimaryFeatures",
                                      "Build_Year",
                                      "2016"
                                    )
                                  }
                                >
                                  2016
                                </a>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    handleChange(
                                      "PrimaryFeatures",
                                      "Build_Year",
                                      "2015"
                                    )
                                  }
                                >
                                  2015
                                </a>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    handleChange(
                                      "PrimaryFeatures",
                                      "Build_Year",
                                      "2014"
                                    )
                                  }
                                >
                                  2014
                                </a>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    handleChange(
                                      "PrimaryFeatures",
                                      "Build_Year",
                                      "2014"
                                    )
                                  }
                                >
                                  2014
                                </a>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    handleChange(
                                      "PrimaryFeatures",
                                      "Build_Year",
                                      "2013"
                                    )
                                  }
                                >
                                  2013
                                </a>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    handleChange(
                                      "PrimaryFeatures",
                                      "Build_Year",
                                      "2012"
                                    )
                                  }
                                >
                                  2012
                                </a>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    handleChange(
                                      "PrimaryFeatures",
                                      "Build_Year",
                                      "2011"
                                    )
                                  }
                                >
                                  2011
                                </a>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    handleChange(
                                      "PrimaryFeatures",
                                      "Build_Year",
                                      "2010"
                                    )
                                  }
                                >
                                  2010
                                </a>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    handleChange(
                                      "PrimaryFeatures",
                                      "Build_Year",
                                      "2009"
                                    )
                                  }
                                >
                                  2009
                                </a>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    handleChange(
                                      "PrimaryFeatures",
                                      "Build_Year",
                                      "2008"
                                    )
                                  }
                                >
                                  2008
                                </a>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    handleChange(
                                      "PrimaryFeatures",
                                      "Build_Year",
                                      "2007"
                                    )
                                  }
                                >
                                  2007
                                </a>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    handleChange(
                                      "PrimaryFeatures",
                                      "Build_Year",
                                      "2006"
                                    )
                                  }
                                >
                                  2006
                                </a>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    handleChange(
                                      "PrimaryFeatures",
                                      "Build_Year",
                                      "2005"
                                    )
                                  }
                                >
                                  2005
                                </a>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    handleChange(
                                      "PrimaryFeatures",
                                      "Build_Year",
                                      "2004"
                                    )
                                  }
                                >
                                  2004
                                </a>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    handleChange(
                                      "PrimaryFeatures",
                                      "Build_Year",
                                      "2003"
                                    )
                                  }
                                >
                                  2003
                                </a>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    handleChange(
                                      "PrimaryFeatures",
                                      "Build_Year",
                                      "2002"
                                    )
                                  }
                                >
                                  2002
                                </a>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    handleChange(
                                      "PrimaryFeatures",
                                      "Build_Year",
                                      "2001"
                                    )
                                  }
                                >
                                  2001
                                </a>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    handleChange(
                                      "PrimaryFeatures",
                                      "Build_Year",
                                      "2000"
                                    )
                                  }
                                >
                                  2000
                                </a>
                             
                              </div>
                            </div>
                          </p>
                        </div>
                        <div className="card-header d-flex align-items-center justify-content-between rounded border-0 bg-light mb-2">
                          <h6 className="modal-title fw-bold">Tv Lounge</h6>
                          <p style={{ cursor: "pointer" }} className="mb-0">
                            <div className="input-group w-auto justify-content-end align-items-center">
                              <input
                                onClick={() =>
                                  handleChange(
                                    "PrimaryFeatures",
                                    "Tv_Lounge",
                                    Math.max(
                                      0,
                                      data.PrimaryFeatures.Tv_Lounge - 1
                                    )
                                  )
                                }
                                type="button"
                                defaultValue="-"
                                className="button-minus border rounded-circle  icon-shape icon-sm mx-1 "
                                data-field="quantity"
                              />
                              {data.PrimaryFeatures.Tv_Lounge}
                              <input
                                onClick={() =>
                                  handleChange(
                                    "PrimaryFeatures",
                                    "Tv_Lounge",
                                    Math.max(
                                      0,
                                      data.PrimaryFeatures.Tv_Lounge + 1
                                    )
                                  )
                                }
                                type="button"
                                defaultValue="+"
                                className="button-plus border rounded-circle icon-shape icon-sm "
                                data-field="quantity"
                              />
                            </div>
                          </p>
                        </div>
                        <div className="card-header d-flex align-items-center justify-content-between rounded border-0 bg-light mb-2">
                          <h6 className="modal-title fw-bold">Store Room</h6>
                          <p style={{ cursor: "pointer" }} className="mb-0">
                            <div className="input-group w-auto justify-content-end align-items-center">
                              <input
                                onClick={() =>
                                  handleChange(
                                    "PrimaryFeatures",
                                    "Store_Room",
                                    Math.max(
                                      0,
                                      data.PrimaryFeatures.Store_Room - 1
                                    )
                                  )
                                }
                                type="button"
                                defaultValue="-"
                                className="button-minus border rounded-circle  icon-shape icon-sm mx-1 "
                                data-field="quantity"
                              />
                              {data.PrimaryFeatures.Store_Room}
                              <input
                                onClick={() =>
                                  handleChange(
                                    "PrimaryFeatures",
                                    "Store_Room",
                                    Math.max(
                                      0,
                                      data.PrimaryFeatures.Store_Room + 1
                                    )
                                  )
                                }
                                type="button"
                                defaultValue="+"
                                className="button-plus border rounded-circle icon-shape icon-sm "
                                data-field="quantity"
                              />
                            </div>
                          </p>
                        </div>
                        <div className="card-header d-flex align-items-center justify-content-between rounded border-0 bg-light mb-2">
                          <h6 className="modal-title fw-bold">Laundry Room</h6>
                          <p style={{ cursor: "pointer" }} className="mb-0">
                            <div className="input-group w-auto justify-content-end align-items-center">
                              <input
                                onClick={() =>
                                  handleChange(
                                    "PrimaryFeatures",
                                    "Laundry_Room",
                                    Math.max(
                                      0,
                                      data.PrimaryFeatures.Laundry_Room - 1
                                    )
                                  )
                                }
                                type="button"
                                defaultValue="-"
                                className="button-minus border rounded-circle  icon-shape icon-sm mx-1 "
                                data-field="quantity"
                              />
                              {data.PrimaryFeatures.Laundry_Room}
                              <input
                                onClick={() =>
                                  handleChange(
                                    "PrimaryFeatures",
                                    "Laundry_Room",
                                    Math.max(
                                      0,
                                      data.PrimaryFeatures.Laundry_Room + 1
                                    )
                                  )
                                }
                                type="button"
                                defaultValue="+"
                                className="button-plus border rounded-circle icon-shape icon-sm "
                                data-field="quantity"
                              />
                            </div>
                          </p>
                        </div>
                        <div className="card-header d-flex align-items-center justify-content-between rounded border-0 bg-light mb-2">
                          <h6 className="modal-title fw-bold">Kitchen</h6>
                          <p style={{ cursor: "pointer" }} className="mb-0">
                            <div className="input-group w-auto justify-content-end align-items-center">
                              <input
                                onClick={() =>
                                  handleChange(
                                    "PrimaryFeatures",
                                    "Kitchen",
                                    Math.max(
                                      0,
                                      data.PrimaryFeatures.Kitchen - 1
                                    )
                                  )
                                }
                                type="button"
                                defaultValue="-"
                                className="button-minus border rounded-circle  icon-shape icon-sm mx-1 "
                                data-field="quantity"
                              />
                              {data.PrimaryFeatures.Kitchen}
                              <input
                                onClick={() =>
                                  handleChange(
                                    "PrimaryFeatures",
                                    "Kitchen",
                                    Math.max(
                                      0,
                                      data.PrimaryFeatures.Kitchen + 1
                                    )
                                  )
                                }
                                type="button"
                                defaultValue="+"
                                className="button-plus border rounded-circle icon-shape icon-sm "
                                data-field="quantity"
                              />
                            </div>
                          </p>
                        </div>
                        <div className="card-header d-flex align-items-center justify-content-between rounded border-0 bg-light mb-2">
                          <h6 className="modal-title fw-bold">
                            Central heating
                          </h6>
                          <p style={{ cursor: "pointer" }} className="mb-0">
                            <div className="btn-group">
                              <button
                                type="button"
                                className="btn btn-light dropdown-toggle dropdown-toggle-split waves-effect"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                { data.PrimaryFeatures.Central_heating ? data.PrimaryFeatures.Central_heating : "Please Select" }
                              </button>
                              <div className="dropdown-menu" style={{}}>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    handleChange(
                                      "PrimaryFeatures",
                                      "Central_heating",
                                      "Yes"
                                    )
                                  }
                                >
                                  Yes
                                </a>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    handleChange(
                                      "PrimaryFeatures",
                                      "Central_heating",
                                      "No"
                                    )
                                  }
                                >
                                  No
                                </a>
                              </div>
                            </div>
                          </p>
                        </div>
                        <div className="card-header d-flex align-items-center justify-content-between rounded border-0 bg-light mb-2">
                          <h6 className="modal-title fw-bold">
                            Central cooling
                          </h6>
                          <p style={{ cursor: "pointer" }} className="mb-0">
                            <div className="btn-group">
                              <button
                                type="button"
                                className="btn btn-light dropdown-toggle dropdown-toggle-split waves-effect"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                {data.PrimaryFeatures.Central_cooling ? data.PrimaryFeatures.Central_cooling : "Please Select"}
                              </button>
                              <div className="dropdown-menu" style={{}}>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    handleChange(
                                      "PrimaryFeatures",
                                      "Central_cooling",
                                      "Yes"
                                    )
                                  }
                                >
                                  Yes
                                </a>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    handleChange(
                                      "PrimaryFeatures",
                                      "Central_cooling",
                                      "No"
                                    )
                                  }
                                >
                                  No
                                </a>
                              </div>
                            </div>
                          </p>
                        </div>
                        <div className="card-header d-flex align-items-center justify-content-between rounded border-0 bg-light mb-2">
                          <h6 className="modal-title fw-bold">Elevator/Lift</h6>
                          <p style={{ cursor: "pointer" }} className="mb-0">
                            <div className="btn-group">
                              <button
                                type="button"
                                className="btn btn-light dropdown-toggle dropdown-toggle-split waves-effect"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                {data.PrimaryFeatures.Elevator_Lift ? data.PrimaryFeatures.Elevator_Lift : "Please Select"}
                              </button>
                              <div className="dropdown-menu" style={{}}>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    handleChange(
                                      "PrimaryFeatures",
                                      "Elevator_Lift",
                                      "Yes"
                                    )
                                  }
                                >
                                  Yes
                                </a>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    handleChange(
                                      "PrimaryFeatures",
                                      "Elevator_Lift",
                                      "No"
                                    )
                                  }
                                >
                                  No
                                </a>
                              </div>
                            </div>
                          </p>
                        </div>
                        {activeTab !== "tab-1" ? (
                          <div className="card-header d-flex align-items-center justify-content-between rounded border-0 bg-light mb-2">
                            <h6 className="modal-title fw-bold">
                              Public parking
                            </h6>
                            <p style={{ cursor: "pointer" }} className="mb-0">
                              <div className="btn-group">
                                <button
                                  type="button"
                                  className="btn btn-light dropdown-toggle dropdown-toggle-split waves-effect"
                                  data-bs-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                >
                                   { data.PrimaryFeatures.Public_parking ? data.PrimaryFeatures.Public_parking : "Please Select" }
                                  {/* <i className="mdi mdi-chevron-down" /> */}
                                </button>
                                <div className="dropdown-menu" style={{}}>
                                  <a
                                    className="dropdown-item"
                                    href="#"
                                    onClick={() =>
                                      handleChange(
                                        "PrimaryFeatures",
                                        "Public_parking",
                                        "Yes"
                                      )
                                    }
                                  >
                                    Yes
                                  </a>
                                  <a
                                    className="dropdown-item"
                                    href="#"
                                    onClick={() =>
                                      handleChange(
                                        "PrimaryFeatures",
                                        "Public_parking",
                                        "No"
                                      )
                                    }
                                  >
                                    No
                                  </a>
                                </div>
                              </div>
                            </p>
                          </div>
                        ) : null}

                        <div className="card-header d-flex align-items-center justify-content-between rounded border-0 bg-light mb-2">
                          <h6 className="modal-title fw-bold">CCTV camera</h6>
                          <p style={{ cursor: "pointer" }} className="mb-0">
                            <div className="btn-group">
                              <button
                                type="button"
                                className="btn btn-light dropdown-toggle dropdown-toggle-split waves-effect"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                {data.PrimaryFeatures.CCTV_camera ? data.PrimaryFeatures.CCTV_camera : "Please Select"}
                              </button>
                              <div className="dropdown-menu" style={{}}>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    handleChange(
                                      "PrimaryFeatures",
                                      "CCTV_camera",
                                      "Yes"
                                    )
                                  }
                                >
                                  Yes
                                </a>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    handleChange(
                                      "PrimaryFeatures",
                                      "CCTV_camera",
                                      "No"
                                    )
                                  }
                                >
                                  No
                                </a>
                              </div>
                            </div>
                          </p>
                        </div>
                        <div className="card-header d-flex align-items-center justify-content-between rounded border-0 bg-light mb-2">
                          <h6 className="modal-title fw-bold">
                            Accessing boulevard
                          </h6>
                          <p style={{ cursor: "pointer" }} className="mb-0">
                            <div className="btn-group">
                              <button
                                type="button"
                                className="btn btn-light dropdown-toggle dropdown-toggle-split waves-effect"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                {data.PrimaryFeatures.Accessing_boulevard ? data.PrimaryFeatures.Accessing_boulevard : "Please Select"}
                              </button>
                              <div className="dropdown-menu" style={{}}>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    handleChange(
                                      "PrimaryFeatures",
                                      "Accessing_boulevard",
                                      "Yes"
                                    )
                                  }
                                >
                                  Yes
                                </a>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    handleChange(
                                      "PrimaryFeatures",
                                      "Accessing_boulevard",
                                      "No"
                                    )
                                  }
                                >
                                  No
                                </a>
                              </div>
                            </div>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingTwo">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      Utilities
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <div className="">
                        <div className="card-header d-flex align-items-center justify-content-between rounded border-0 bg-light mb-2">
                          <h6 className="modal-title fw-bold">Sewerage</h6>
                          <p style={{ cursor: "pointer" }} className="mb-0">
                            <div className="btn-group">
                              <button
                                type="button"
                                className="btn btn-light dropdown-toggle dropdown-toggle-split waves-effect"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                {data.Utilities.Sewerage ? data.Utilities.Sewerage : "Please Select"}
                              </button>
                              <div className="dropdown-menu" style={{}}>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    handleChange("Utilities", "Sewerage", "Yes")
                                  }
                                >
                                  Yes
                                </a>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    handleChange("Utilities", "Sewerage", "No")
                                  }
                                >
                                  No
                                </a>
                              </div>
                            </div>
                          </p>
                        </div>
                        <div className="card-header d-flex align-items-center justify-content-between rounded border-0 bg-light mb-2">
                          <h6 className="modal-title fw-bold">Electricity</h6>
                          <p style={{ cursor: "pointer" }} className="mb-0">
                            <div className="btn-group">
                              <button
                                type="button"
                                className="btn btn-light dropdown-toggle dropdown-toggle-split waves-effect"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                {data.Utilities.Electricity ? data.Utilities.Electricity : "Please Select"}
                              </button>
                              <div className="dropdown-menu" style={{}}>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    handleChange(
                                      "Utilities",
                                      "Electricity",
                                      "Yes"
                                    )
                                  }
                                >
                                  Yes
                                </a>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    handleChange(
                                      "Utilities",
                                      "Electricity",
                                      "No"
                                    )
                                  }
                                >
                                  No
                                </a>
                              </div>
                            </div>
                          </p>
                        </div>
                        <div className="card-header d-flex align-items-center justify-content-between rounded border-0 bg-light mb-2">
                          <h6 className="modal-title fw-bold">Water Supply</h6>
                          <p style={{ cursor: "pointer" }} className="mb-0">
                            <div className="btn-group">
                              <button
                                type="button"
                                className="btn btn-light dropdown-toggle dropdown-toggle-split waves-effect"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                {data.Utilities.Water_Supply ? data.Utilities.Water_Supply : "Please Select"}
                              </button>
                              <div className="dropdown-menu" style={{}}>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    handleChange(
                                      "Utilities",
                                      "Water_Supply",
                                      "Yes"
                                    )
                                  }
                                >
                                  Yes
                                </a>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    handleChange(
                                      "Utilities",
                                      "Water_Supply",
                                      "No"
                                    )
                                  }
                                >
                                  No
                                </a>
                              </div>
                            </div>
                          </p>
                        </div>
                        <div className="card-header d-flex align-items-center justify-content-between rounded border-0 bg-light mb-2">
                          <h6 className="modal-title fw-bold">Gas</h6>
                          <p style={{ cursor: "pointer" }} className="mb-0">
                            <div className="btn-group">
                              <button
                                type="button"
                                className="btn btn-light dropdown-toggle dropdown-toggle-split waves-effect"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                {data.Utilities.Gas ? data.Utilities.Gas : "Please Select"}
                              </button>
                              <div className="dropdown-menu" style={{}}>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    handleChange("Utilities", "Gas", "Yes")
                                  }
                                >
                                  Yes
                                </a>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    handleChange("Utilities", "Gas", "No")
                                  }
                                >
                                  No
                                </a>
                              </div>
                            </div>
                          </p>
                        </div>
                        <div className="card-header d-flex align-items-center justify-content-between rounded border-0 bg-light mb-2">
                          <h6 className="modal-title fw-bold">Security</h6>
                          <p style={{ cursor: "pointer" }} className="mb-0">
                            <div className="btn-group">
                              <button
                                type="button"
                                className="btn btn-light dropdown-toggle dropdown-toggle-split waves-effect"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                {data.Utilities.Security ? data.Utilities.Security : "Please Select"}
                              </button>
                              <div className="dropdown-menu" style={{}}>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    handleChange("Utilities", "Security", "Yes")
                                  }
                                >
                                  Yes
                                </a>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    handleChange("Utilities", "Security", "No")
                                  }
                                >
                                  No
                                </a>
                              </div>
                            </div>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingThree">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="true"
                      aria-controls="collapseThree"
                    >
                      Communication
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingThree"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <div className="">
                        <div className="card-header d-flex align-items-center justify-content-between rounded border-0 bg-light mb-2">
                          <h6 className="modal-title fw-bold">
                            Internet access
                          </h6>
                          <p style={{ cursor: "pointer" }} className="mb-0">
                            <div className="btn-group">
                              <button
                                type="button"
                                className="btn btn-light dropdown-toggle dropdown-toggle-split waves-effect"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                {data.Communication.Internet_access ? data.Communication.Internet_access : "Please Select"}
                              </button>
                              <div className="dropdown-menu" style={{}}>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    handleChange(
                                      "Communication",
                                      "Internet_access",
                                      "Yes"
                                    )
                                  }
                                >
                                  Yes
                                </a>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    handleChange(
                                      "Communication",
                                      "Internet_access",
                                      "No"
                                    )
                                  }
                                >
                                  No
                                </a>
                              </div>
                            </div>
                          </p>
                        </div>
                        <div className="card-header d-flex align-items-center justify-content-between rounded border-0 bg-light mb-2">
                          <h6 className="modal-title fw-bold">
                            Satellite or cable TV
                          </h6>
                          <p style={{ cursor: "pointer" }} className="mb-0">
                            <div className="btn-group">
                              <button
                                type="button"
                                className="btn btn-light dropdown-toggle dropdown-toggle-split waves-effect"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                {data.Communication.Satellite_or_cable_TV ? data.Communication.Satellite_or_cable_TV : "Please Select"}
                              </button>
                              <div className="dropdown-menu" style={{}}>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    handleChange(
                                      "Communication",
                                      "Satellite_or_cable_TV",
                                      "Yes"
                                    )
                                  }
                                >
                                  Yes
                                </a>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    handleChange(
                                      "Communication",
                                      "Satellite_or_cable_TV",
                                      "No"
                                    )
                                  }
                                >
                                  No
                                </a>
                              </div>
                            </div>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingFour">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFour"
                      aria-expanded="true"
                      aria-controls="collapseFour"
                    >
                      Public Facilities Nearby
                    </button>
                  </h2>
                  <div
                    id="collapseFour"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingFour"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <div className="">
                        <div className="card-header d-flex align-items-center justify-content-between rounded border-0 bg-light mb-2">
                          <h6 className="modal-title fw-bold">Park</h6>
                          <p style={{ cursor: "pointer" }} className="mb-0">
                            <div className="btn-group">
                              <button
                                type="button"
                                className="btn btn-light dropdown-toggle dropdown-toggle-split waves-effect"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                {data.Public_Facilities_Nearby.Park ? data.Public_Facilities_Nearby.Park : "Please Select"}
                              </button>
                              <div className="dropdown-menu" style={{}}>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    handleChange(
                                      "Public_Facilities_Nearby",
                                      "Park",
                                      "Yes"
                                    )
                                  }
                                >
                                  Yes
                                </a>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    handleChange(
                                      "Public_Facilities_Nearby",
                                      "Park",
                                      "No"
                                    )
                                  }
                                >
                                  No
                                </a>
                              </div>
                            </div>
                          </p>
                        </div>
                        <div className="card-header d-flex align-items-center justify-content-between rounded border-0 bg-light mb-2">
                          <h6 className="modal-title fw-bold">Schools</h6>
                          <p style={{ cursor: "pointer" }} className="mb-0">
                            <div className="btn-group">
                              <button
                                type="button"
                                className="btn btn-light dropdown-toggle dropdown-toggle-split waves-effect"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                {data.Public_Facilities_Nearby.Schools ? data.Public_Facilities_Nearby.Schools : "Please Select"}
                              </button>
                              <div className="dropdown-menu" style={{}}>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    handleChange(
                                      "Public_Facilities_Nearby",
                                      "Schools",
                                      "Yes"
                                    )
                                  }
                                >
                                  Yes
                                </a>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    handleChange(
                                      "Public_Facilities_Nearby",
                                      "Schools",
                                      "No"
                                    )
                                  }
                                >
                                  No
                                </a>
                              </div>
                            </div>
                          </p>
                        </div>
                        <div className="card-header d-flex align-items-center justify-content-between rounded border-0 bg-light mb-2">
                          <h6 className="modal-title fw-bold">Hospitals</h6>
                          <p style={{ cursor: "pointer" }} className="mb-0">
                            <div className="btn-group">
                              <button
                                type="button"
                                className="btn btn-light dropdown-toggle dropdown-toggle-split waves-effect"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                {data.Public_Facilities_Nearby.Hospitals ? data.Public_Facilities_Nearby.Hospitals : "Please Select"}
                              </button>
                              <div className="dropdown-menu" style={{}}>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    handleChange(
                                      "Public_Facilities_Nearby",
                                      "Hospitals",
                                      "Yes"
                                    )
                                  }
                                >
                                  Yes
                                </a>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    handleChange(
                                      "Public_Facilities_Nearby",
                                      "Hospitals",
                                      "No"
                                    )
                                  }
                                >
                                  No
                                </a>
                              </div>
                            </div>
                          </p>
                        </div>
                        <div className="card-header d-flex align-items-center justify-content-between rounded border-0 bg-light mb-2">
                          <h6 className="modal-title fw-bold">Mosque</h6>
                          <p style={{ cursor: "pointer" }} className="mb-0">
                            <div className="btn-group">
                              <button
                                type="button"
                                className="btn btn-light dropdown-toggle dropdown-toggle-split waves-effect"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                {data.Public_Facilities_Nearby.Mosque ? data.Public_Facilities_Nearby.Mosque : "Please Select"}
                              </button>
                              <div className="dropdown-menu" style={{}}>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    handleChange(
                                      "Public_Facilities_Nearby",
                                      "Mosque",
                                      "Yes"
                                    )
                                  }
                                >
                                  Yes
                                </a>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    handleChange(
                                      "Public_Facilities_Nearby",
                                      "Mosque",
                                      "No"
                                    )
                                  }
                                >
                                  No
                                </a>
                              </div>
                            </div>
                          </p>
                        </div>
                        <div className="card-header d-flex align-items-center justify-content-between rounded border-0 bg-light mb-2">
                          <h6 className="modal-title fw-bold">Restaurants</h6>
                          <p style={{ cursor: "pointer" }} className="mb-0">
                            <div className="btn-group">
                              <button
                                type="button"
                                className="btn btn-light dropdown-toggle dropdown-toggle-split waves-effect"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                {data.Public_Facilities_Nearby.Restaurants ? data.Public_Facilities_Nearby.Restaurants : "Please Select"}
                              </button>
                              <div className="dropdown-menu" style={{}}>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    handleChange(
                                      "Public_Facilities_Nearby",
                                      "Restaurants",
                                      "Yes"
                                    )
                                  }
                                >
                                  Yes
                                </a>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    handleChange(
                                      "Public_Facilities_Nearby",
                                      "Restaurants",
                                      "No"
                                    )
                                  }
                                >
                                  No
                                </a>
                              </div>
                            </div>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingFive">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFive"
                      aria-expanded="true"
                      aria-controls="collapseFive"
                    >
                      Secondary Features
                    </button>
                  </h2>
                  <div
                    id="collapseFive"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingFive"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <div className="">
                        <div className="card-header d-flex align-items-center justify-content-between rounded border-0 bg-light mb-2">
                          <h6 className="modal-title fw-bold">
                            Backup generator
                          </h6>
                          <p style={{ cursor: "pointer" }} className="mb-0">
                            <div className="btn-group">
                              <button
                                type="button"
                                className="btn btn-light dropdown-toggle dropdown-toggle-split waves-effect"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                {data.Secondary_Features.Backup_generator ? data.Secondary_Features.Backup_generator : "Please Select"}
                              </button>
                              <div className="dropdown-menu" style={{}}>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    handleChange(
                                      "Secondary_Features",
                                      "Backup_generator",
                                      "Yes"
                                    )
                                  }
                                >
                                  Yes
                                </a>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    handleChange(
                                      "Secondary_Features",
                                      "Backup_generator",
                                      "No"
                                    )
                                  }
                                >
                                  No
                                </a>
                              </div>
                            </div>
                          </p>
                        </div>
                        <div className="card-header d-flex align-items-center justify-content-between rounded border-0 bg-light mb-2">
                          <h6 className="modal-title fw-bold">Maintenance</h6>
                          <p style={{ cursor: "pointer" }} className="mb-0">
                            <div className="btn-group">
                              <button
                                type="button"
                                className="btn btn-light dropdown-toggle dropdown-toggle-split waves-effect"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                {data.Secondary_Features.Maintenance ? data.Secondary_Features.Maintenance : "Please Select"}
                              </button>
                              <div className="dropdown-menu" style={{}}>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    handleChange(
                                      "Secondary_Features",
                                      "Maintenance",
                                      "Yes"
                                    )
                                  }
                                >
                                  Yes
                                </a>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    handleChange(
                                      "Secondary_Features",
                                      "Maintenance",
                                      "No"
                                    )
                                  }
                                >
                                  No
                                </a>
                              </div>
                            </div>
                          </p>
                        </div>
                        <div className="card-header d-flex align-items-center justify-content-between rounded border-0 bg-light mb-2">
                          <h6 className="modal-title fw-bold">
                            Number of Floors
                          </h6>
                          <p style={{ cursor: "pointer" }} className="mb-0">
                            <div className="input-group w-auto justify-content-end align-items-center">
                              <input
                                onClick={() =>
                                  handleChange(
                                    "Secondary_Features",
                                    "Number_of_Floors",
                                    Math.max(
                                      0,
                                      data.Secondary_Features.Number_of_Floors -
                                        1
                                    )
                                  )
                                }
                                type="button"
                                defaultValue="-"
                                className="button-minus border rounded-circle  icon-shape icon-sm mx-1 "
                                data-field="quantity"
                              />
                              {data.Secondary_Features.Number_of_Floors}
                              <input
                                onClick={() =>
                                  handleChange(
                                    "Secondary_Features",
                                    "Number_of_Floors",
                                    Math.max(
                                      0,
                                      data.Secondary_Features.Number_of_Floors +
                                        1
                                    )
                                  )
                                }
                                type="button"
                                defaultValue="+"
                                className="button-plus border rounded-circle icon-shape icon-sm "
                                data-field="quantity"
                              />
                            </div>
                          </p>
                        </div>
                        <div className="card-header d-flex align-items-center justify-content-between rounded border-0 bg-light mb-2">
                          <h6 className="modal-title fw-bold">
                            Which Floor is your unit on
                          </h6>
                          <p style={{ cursor: "pointer" }} className="mb-0">
                            <div className="input-group w-auto justify-content-end align-items-center">
                              <button
                                type="button"
                                className="button-minus border rounded-circle icon-shape icon-sm mx-1"
                                onClick={() =>
                                  handleChange(
                                    "Secondary_Features",
                                    "Which_Floor_is_your_unit_on",
                                    Math.max(
                                      0,
                                      data.Secondary_Features
                                        .Which_Floor_is_your_unit_on - 1
                                    )
                                  )
                                }
                              >
                                -
                              </button>
                              {
                                data.Secondary_Features
                                  .Which_Floor_is_your_unit_on
                              }
                              <button
                                type="button"
                                className="button-plus border rounded-circle icon-shape icon-sm"
                                onClick={() =>
                                  handleChange(
                                    "Secondary_Features",
                                    "Which_Floor_is_your_unit_on",
                                    data.Secondary_Features
                                      .Which_Floor_is_your_unit_on + 1
                                  )
                                }
                              >
                                +
                              </button>
                            </div>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div
                  className="col-12 ms-auto text-end"
                  onClick={(e) => onSubmit(e)}
                >
                  <div className="btn btn-secondary px-md-5 px-4">Confirm</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default Modal;
