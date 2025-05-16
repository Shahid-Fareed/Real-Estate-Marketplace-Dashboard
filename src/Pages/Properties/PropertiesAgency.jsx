import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import MyHelmet from "../../Reuseable/Helmet";
import PageTitle from "../../Reuseable/PageTitle";
import { notifySuccess } from "../../utils/toast";
import Table from "../../Reuseable/Table";
import propertiesDashService from "../../Services/propertiesDashService";
import OrderServices from "../../Services/orderServices";
import useUserPermissions from "../../hooks/useUserPermissions";

const PropertiesAgency = () => {
  const navigate = useNavigate();
  const userPermission = useUserPermissions();
  const [dataLoading, setDataLoading] = useState(false);
  const [userQuota, setUserQutoa] = useState({
    verfied_listing: 0,
    hot_listing: 0,
    super_hot_listing: 0,
  });
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [propertId, setPropertId] = useState(0);

  const [data, setData] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  let userType = "";
  const authData = localStorage.getItem("authUser");
  if (authData) {
    const parsedUser = JSON.parse(authData);
    userType = parsedUser?.user_type || null;
  }

  let parnetId = 0;
  const authUserss = localStorage.getItem("authUser");
  if (authUserss) {
    const parsedAuthUser = JSON.parse(authUserss);
    parnetId = parsedAuthUser?.parent_id;
  }

  let userId = null;
  const authUser = localStorage.getItem("authUser");
  if (authUser) {
    const parsedAuthUser = JSON.parse(authUser);
    userId = parsedAuthUser?.id;
  }

  let userIDsss = JSON.parse(localStorage.getItem("authUser") || "");

  const getUsersQotas = () => {
    OrderServices.getUserQuota(null, userId)
      .then((res) => {
        const data = res.data[0];
        console.log("res: ", data);
        setUserQutoa(data);
      })
      .catch((err) => {
        console.log("error on the user quota api");
      });
  };

  const getAgencyProperties = () => {
    setDataLoading(true);
    let body = null;
    let idss = null;
    if (userIDsss.parent_id === 0) {
      idss = userIDsss?.id;
    } else {
      idss = userIDsss?.parent_id;
    }
    propertiesDashService
      .allAgencyProperties(body, idss)
      .then((res) => {
        const data = res.data;
        let newData = [];
        const resData = res?.data;
        for (let i = 0; i < resData?.length; i++) {
          const element = resData[i];
          let obj = {
            "#": element.id,
            "Property Name": element?.name,
            "Seller Name": element?.seller_name,
            "Seller Mobile Number": element?.seller_mobile_no,
            City: element?.city,
            id: element?.id,
            Price: element?.price,
            "Posted Date": moment(element?.createdAt).format("DD MMM,YYYY"),
            Status: element?.status,
            Actions: (
              <>
                {parnetId === 0 ? (
                  <>
                    {element.is_verified === 0 ? null : (
                      <button
                        type="button"
                        disabled={element?.is_verified_status !== ""}
                        onClick={(e) => {
                          onSubmitPropertyBoost(
                            e,
                            "verify_listing",
                            element?.id
                          );
                        }}
                        className="btn btn-rounded waves-effect waves-light"
                        style={{ backgroundColor: "#34c38f", color: "#fff" }}
                      >
                        Get Verifed
                      </button>
                    )}
                    {element.is_super_hot_listing ||
                    element.is_hot_listing === 0 ? null : (
                      <button
                        disabled={element?.is_boosted !== 0}
                        onClick={() => setPropertId(element?.id)}
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#BoostModal"
                        className="btn  btn-rounded waves-effect waves-light"
                        style={{
                          backgroundColor: "#34c38f",
                          color: "#fff",
                          marginTop: 5,
                        }}
                      >
                        Boost Property
                      </button>
                    )}
                  </>
                ) : null}
              </>
            ),
          };
          newData.push(obj);
        }
        setData(newData);
        setDataLoading(false);
      })
      .catch((err) => {
        setDataLoading(false);
        console.log("error is on the all prorperties");
      });
  };

  useEffect(() => {
    if (userType === "agency") {
      getAgencyProperties();
      getUsersQotas();
    }
  }, []);

  const columns = [
    "#",
    "Property Name",
    "Seller Name",
    "Seller Mobile Number",
    "City",
    "Price",
    "Posted Date",
    "Status",
    "Actions",
  ];

  const onSubmitPropertyBoost = (e, type, propertId) => {
    e.preventDefault();
    setIsSubmitting(true);
    const boostLink = document.getElementById("BoostModalClose");
    const verifyLink = document.getElementById("VerifiesModal");
    propertiesDashService
      .boostProperty(null, userId, propertId, type)
      .then((res) => {
        boostLink?.click();
        verifyLink?.click();
        getUsersQotas();
        notifySuccess("Property Verification Request Submitted");
        setIsSubmitting(false);
      })
      .catch((err) => {
        console.log("Error on the boost propertu call");
      });
  };

  const handleDelete = (id) => {
    setDataLoading(true);
    propertiesDashService
      .deleteProperty(id)
      .then((res) => {
        getAgencyProperties();
        setDataLoading(false);
      })
      .catch((err) => {
        setDataLoading(false);
      });
  };

  const handleEdit = (id) => {
    navigate(`/properties/${id}`);
  };

  return (
    <>
      <MyHelmet title="Properties" />

      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            {/* start page title  */}
            <div className="row">
              <PageTitle pagename="Properties" />
              {userPermission?.includes("Add Property") ? (
                <div
                  className="col-6"
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <button
                    type="button"
                    className="btn btn-primary btn-sm waves-effect waves-light"
                    style={{ height: "30px", marginRight: "10px" }}
                    onClick={() => navigate("/advertisments")}
                  >
                    <i
                      className="mdi mdi-plus"
                      style={{ marginRight: "5px" }}
                    />
                    Buy Advertisement
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm waves-effect waves-light"
                    style={{ height: "30px" }}
                    onClick={() => navigate("/properties/add")}
                  >
                    <i
                      className="mdi mdi-plus"
                      style={{ marginRight: "5px" }}
                    />
                    Add Properties
                  </button>
                </div>
              ) : null}

              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <Table
                      columns={columns}
                      data={data}
                      itemsPerPage={itemsPerPage}
                      dataLoading={dataLoading}
                      onDelete={handleDelete}
                      isEdit={userPermission?.includes("Edit Property")}
                      isDelete={userPermission?.includes("Delete Property")}
                      onEdit={handleEdit}
                      setItemsPerPage={setItemsPerPage}
                      permEdit={"Edit Property"}
                      permDel={"Delete Property"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="BoostModal"
        tabIndex={-1}
        aria-labelledby="BoostModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="BoostModalLabel">
                Boost Your Property
              </h1>
              <button
                type="button"
                className="btn-close"
                id="BoostModalClose"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-12">
                  <div className="">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <p className="tracking-in-expand text-muted mb-0">
                        <button
                          disabled={userQuota?.hot_listing === 0}
                          onClick={(e) => {
                            onSubmitPropertyBoost(e, "hot_listing");
                          }}
                          type="button"
                          className="btn  btn-rounded waves-effect waves-light"
                          style={{
                            backgroundColor: "rgb(52, 195, 143)",
                            marginRight: 40,
                            color: "rgb(255, 255, 255)",
                          }}
                        >
                          Hot Listing
                        </button>

                        <button
                          disabled={userQuota?.super_hot_listing === 0}
                          onClick={(e) => {
                            onSubmitPropertyBoost(e, "super_hot_listing");
                          }}
                          type="button"
                          className="btn  btn-rounded waves-effect waves-light"
                          style={{
                            backgroundColor: "rgb(52, 195, 143)",
                            color: "rgb(255, 255, 255)",
                          }}
                        >
                          Super Hot Listing
                        </button>
                        {/* Total Hot Listing Left : {userQuota?.hot_listing} */}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" className="btn btn-primary">
              Boost Now
            </button>
          </div> */}
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="VerifiesModal"
        tabIndex={-1}
        aria-labelledby="VerifiesModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="VerifiesModalLabel">
                Verify your property
              </h1>
              <button
                type="button"
                className="btn-close"
                id="VerifiesModalClose"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              {" "}
              <div
                className="row"
                onClick={(e) => {
                  onSubmitPropertyBoost(e, "verify_listing");
                }}
              >
                <div className="col-12">
                  <div className="card smallCard">
                    <div className="card-body">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <p className="tracking-in-expand text-muted mb-0">
                          Total Verified Listing Left :{" "}
                          {userQuota?.verfied_listing}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" className="btn btn-primary">
              Save changes
            </button>
          </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertiesAgency;
