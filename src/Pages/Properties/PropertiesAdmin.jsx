import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import MyHelmet from "../../Reuseable/Helmet";
import PageTitle from "../../Reuseable/PageTitle";
import Table from "../../Reuseable/Table";
import propertiesDashService from "../../Services/propertiesDashService";
import useUserPermissions from "../../hooks/useUserPermissions";
import { notifySuccess } from "../../utils/toast";

const PropertiesAdmin = () => {
  const navigate = useNavigate();
  const userPermission = useUserPermissions();
  const [dataLoading, setDataLoading] = useState(false);
  const [rejectReason, setRejectionReason] = useState("");
  const [eid, setEid] = useState("");
  const [is_submitted, setIsSubmtted] = useState(false);
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

  let userId = null;
  const authUser = localStorage.getItem("authUser");
  if (authUser) {
    const parsedAuthUser = JSON.parse(authUser);
    userId = parsedAuthUser?.id;
  }

  const handelPropertyStatus = (e, ids) => {
    const status = e.target.value;
    setEid(ids);
    if (status !== "rejected") {
      let body = {
        status: status,
      };
      propertiesDashService
        .updatePropertyStatus(body, ids)
        .then((res) => {
          notifySuccess("Property Status Changed Successfully!");
          getProperties();
        })
        .catch((err) => {
          console.log("err on the property status update");
        });
    } else {
      document.querySelector("#oderCanvelModel").click();
    }
  };

  const postPropertyStatus = (ids) => {
    let body = {
      status: "rejected",
      reason: rejectReason,
    };
    propertiesDashService
      .updatePropertyStatus(body, ids)
      .then((res) => {
        setEid("");
        console.log("ress: ", res);
        document.querySelector("#closepopup").click();
        setIsSubmitting(false);
        getProperties();
      })
      .catch((err) => {
        console.log("err on the property status update");
      });
  };

  const getProperties = () => {
    setDataLoading(true);
    let body = null;
    propertiesDashService
      .allProperties(body)
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
            Status: (
              <>
                <select
                  style={{ borderRadius: 20 }}
                  className="form-select"
                  value={element.status}
                  onChange={(e) => handelPropertyStatus(e, element.id)}
                >
                  <option value="pending">Pending</option>
                  <option value="active">Active</option>
                  <option value="rejected">Rejected</option>
                  <option value="removed">Removed</option>
                  <option value="draft">Draft</option>
                  <option value="sold">Sold</option>
                  <option value="expired">Expired</option>
                </select>
              </>
            ),
          };
          newData.push(obj);
        }
        setData(newData);
        setDataLoading(false);
      })
      .catch((err) => {
        console.log("error is on the all prorperties");
        setDataLoading(false);
      });
  };

  useEffect(() => {
    console.log("userPermission: ", userPermission);
    getProperties();
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
  ];

  const handleDelete = (id) => {
    setDataLoading(true);
    propertiesDashService
      .deleteProperty(id)
      .then((res) => {
        getProperties();
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
                      isEdit={userPermission?.includes("Edit Property")}
                      isDelete={userPermission?.includes("Delete Property")}
                      data={data}
                      dataLoading={dataLoading}
                      itemsPerPage={itemsPerPage}
                      onDelete={handleDelete}
                      onEdit={handleEdit}
                      isAction={true}
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
      <button
        style={{ visibility: "hidden" }}
        type="button"
        id="oderCanvelModel"
        className="btn btn-success waves-effect waves-light invisble"
        data-bs-toggle="modal"
        data-bs-target=".bs-example-modal-sm"
      >
        Large modal
      </button>
      <div
        className="modal fade bs-example-modal-sm"
        tabIndex={-1}
        aria-labelledby="mySmallModalLabel"
        style={{ display: "none" }}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-sm">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="mySmallModalLabel">
                Enter Rejection Reason
              </h5>
              <button
                type="button"
                className="btn-close invisible"
                id="closepopup"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <textarea
                className="form-control"
                onChange={(e) => setRejectionReason(e.target.value)}
                value={rejectReason}
              />
              <div className="col-md-12 mt-4">
                <button
                  className="btn btn-primary"
                  onClick={() => postPropertyStatus(eid)}
                  // type="submit"
                  style={{ width: "100%" }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
          {/* /.modal-content */}
        </div>
        {/* /.modal-dialog */}
      </div>
    </>
  );
};

export default PropertiesAdmin;
