import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import MyHelmet from "../../Reuseable/Helmet";
import PageTitle from "../../Reuseable/PageTitle";
import Table from "../../Reuseable/Table";
import propertiesDashService from "../../Services/propertiesDashService";

const VerifyProperties = () => {
  const navigate = useNavigate();

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [dataLoading, setDataLoading] = useState(false);
  const [data, setData] = useState([]);

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

  const onChangePropertyverify = (e, pid) => {
    setDataLoading(true);
    propertiesDashService
      .updatePropertyVerify(null, pid, e.target.value)
      .then((res) => {
        setDataLoading(false);
        getProperties();
      })
      .catch((err) => {
        console.log("Error on api verifiong");
        setDataLoading(false);
      });
  };

  const getProperties = () => {
    setDataLoading(true);
    let body = null;
    propertiesDashService
      .allPendingVerifiedProperties(body)
      .then((res) => {
        const data = res.data;
        let newData = [];
        const resData = res?.data;
        for (let i = 0; i < resData?.length; i++) {
          const element = resData[i];

          let obj = {
            "#": element.id,
            "Seller Name": element?.seller_name,
            "Seller Mobile Number": element?.seller_mobile_no,
            City: element?.city,
            id: element?.id,
            Price: element?.price,
            "Posted Date": moment(element?.createdAt).format("DD MMM,YYYY"),
            Status: (
              <>
                <select
                  disabled={element?.Status === "verfied"}
                  style={{ borderRadius: 20 }}
                  className="form-select"
                  value={element.status}
                  onChange={(e) => onChangePropertyverify(e, element.id)}
                >
                  <option value="pending">Pending</option>
                  <option value="verfied">verfied</option>
                  <option value="rejected">Rejected</option>
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
        setDataLoading(false);
        console.log("error is on the all prorperties");
      });
  };

  useEffect(() => {
    getProperties();
  }, []);

  const columns = [
    "#",
    "Seller Name",
    "Seller Mobile Number",
    "City",
    "Price",
    "Posted Date",
    "Status",
  ];

  const handleDelete = (id) => {
    console.log("Delete");
  };
  const handleEdit = (id) => {
    console.log("Edit");
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

              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <Table
                      columns={columns}
                      data={data}
                      dataLoading={dataLoading}
                      itemsPerPage={itemsPerPage}
                      isEdit={false}
                      onDelete={handleDelete}
                      onEdit={handleEdit}
                      setItemsPerPage={setItemsPerPage}
                    />
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

export default VerifyProperties;
