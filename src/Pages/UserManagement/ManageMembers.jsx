import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import MyHelmet from "../../Reuseable/Helmet";
import PageTitle from "../../Reuseable/PageTitle";
import Table from "../../Reuseable/Table";
import UsersApi from "../../Services/users";
import useUserPermissions from "../../hooks/useUserPermissions";

const ManageMembers = () => {
  const navigate = useNavigate();
  const userPermission = useUserPermissions();
  const [dataLoading, setDataLoading] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [data, setData] = useState([]);

  const columns = ["#", "Full Name", "Email", "Phone", "Status"];

  const getMemeber = useCallback(() => {
    setDataLoading(true);
    let body = null;
    let authUser = localStorage.getItem("authUser");
    let userID = JSON.parse(localStorage.getItem("authUser") || "");
    let idss = null;
    if (userID.parent_id === 0) {
      idss = userID?.id;
    } else {
      idss = userID?.parent_id;
    }
    UsersApi.subUsers(body, idss)
      .then((res) => {
        console.log("res ", res);
        let newData = [];
        const resData = res?.data;
        for (let i = 0; i < resData?.length; i++) {
          const element = resData[i];

          let obj = {
            "#": i + 1,
            "Full Name": element?.full_name,
            Phone: element?.mobile_number,
            Email: element?.email,
            id: element?.id,
            Status:
              element?.status === 1 ? (
                <button
                  type="button"
                  className="btn btn-rounded waves-effect waves-light"
                  style={{ backgroundColor: "#34c38f", color: "#fff" }}
                  onClick={() => changeStatus(element.id)}
                >
                  Active
                </button>
              ) : (
                <button
                  type="button"
                  className="btn  btn-rounded waves-effect waves-light"
                  style={{ backgroundColor: "#f46a6a", color: "#fff" }}
                  onClick={() => changeStatus(element.id)}
                >
                  In Active
                </button>
              ),
            "Date Created": moment(element?.createdAt).format("DD MMM,YYYY"),
          };
          newData.push(obj);
        }
        setData(newData);
        setDataLoading(false);
      })
      .catch((error) => {
        setDataLoading(false);
        console.log(error.message);
      });
  }, []);

  const changeStatus = (id) => {
    let body = null;
    UsersApi.subUsersStatusChange(body, id)
      .then((res) => {
        getMemeber();
        //notifySuccess(res.message);
      })
      .catch((error) => console.log(error.message));
  };

  useEffect(() => {
    getMemeber();
  }, []);

  const handleDelete = (id) => {
    let body = null;
    UsersApi.deleteUser(body, id)
      .then((res) => {
        console.log("res: ", res);
        getMemeber();
      })
      .catch((err) => {
        console.log("Errpr on the delete user api");
      });
  };
  const handleEdit = (id) => {
    navigate(`/manage-members/${id}`);
  };
  return (
    <>
      <MyHelmet title="Manage Members" body="" />
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            {/* start page title  */}
            <div className="row">
              <PageTitle pagename="Manage Members" />
              {userPermission?.includes("Add User") ? (
                <div
                  className="col-6"
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <button
                    type="button"
                    className="btn btn-primary btn-sm waves-effect waves-light"
                    style={{ height: "30px" }}
                    onClick={() => navigate("/add-members")}
                  >
                    <i
                      className="mdi mdi-plus"
                      style={{ marginRight: "5px" }}
                    />
                    Add Members
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
                      onDelete={handleDelete}
                      dataLoading={dataLoading}
                      onEdit={handleEdit}
                      setItemsPerPage={setItemsPerPage}
                      isAction={true}
                      isEdit={userPermission?.includes("Edit User")}
                      isDelete={userPermission?.includes("Delete User")}
                      permEdit={"Edit User"}
                      permDel={"Delete User"}
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

export default ManageMembers;
