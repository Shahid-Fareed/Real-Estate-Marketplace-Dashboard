import React, { useEffect, useState } from "react";
import Table from "../../Reuseable/Table";
import PageTitle from "../../Reuseable/PageTitle";
import MyHelmet from "../../Reuseable/Helmet";
import Users from "../../Services/users";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import useUserPermissions from "../../hooks/useUserPermissions";

const ManageAgency = () => {
  const navigate = useNavigate();
  const userPermission = useUserPermissions();
  const columns = ["#", "Full Name", "Agency Name", "Email", "Phone", "Tag"];

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const checkAgencyDetails = (e, id) => {
    e.preventDefault();
    navigate(`/manage-agency/${id}`);
  };

  const getUsers = () => {
    setDataLoading(true);
    Users.allUsers()
      .then((res) => {
        //console.log("res: ", res);
        const data = res.data;
        const filteredData = data.filter(
          (els) => els.user_type === "agency" && els.is_admin === 1
        );
        let newData = [];
        const resData = filteredData;
        for (let i = 0; i < resData?.length; i++) {
          const element = resData[i];

          let obj = {
            "#": (
              <div
                style={{ cursor: "pointer" }}
                onClick={(e) => checkAgencyDetails(e, element?.id)}
              >
                {i + 1}
              </div>
            ),
            "Full Name": element?.full_name,
            "Agency Name": element?.agency_name,
            Phone: element?.mobile_number,
            Email: element?.email,
            id: element?.id,
            Tag: (
              <>
                <select
                  style={{ borderRadius: 20 }}
                  className="form-select"
                  value={element?.user_tag}
                  onChange={(e) => handelAgecnyStatus(e, element?.id)}
                >
                  <option value="sliver">Sliver</option>
                  <option value="platinum">Platinum</option>
                  <option value="gold">Gold</option>
                </select>
              </>
            ),
            "Date Created": moment(element?.createdAt).format("DD MMM,YYYY"),
          };
          newData.push(obj);
        }
        setData(newData);
        setDataLoading(false);
      })
      .catch((err) => {
        setDataLoading(false);
        console.log("error on all users api: ", err);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handelAgecnyStatus = (e, ids) => {
    const status = e.target.value;
    let body = { user_tag: status };
    Users.changeAgencyStatus(body, ids)
      .then((res) => {
        getUsers();
      })
      .catch((err) => {
        console.log("Err on changing the api agency status");
      });
  };

  return (
    <>
      <MyHelmet title="Manage Agency" body="" />
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            {/* start page title  */}
            <div className="row">
              <PageTitle pagename="Manage Agency" />

              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <Table
                      columns={columns}
                      data={data}
                      dataLoading={dataLoading}
                      itemsPerPage={itemsPerPage}
                      onDelete={() => {}}
                      onEdit={() => {}}
                      setItemsPerPage={setItemsPerPage}
                      isAction={false}
                      isEdit={userPermission?.includes("Edit User")}
                      isDelete={userPermission?.includes("Delete User")}
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

export default ManageAgency;
