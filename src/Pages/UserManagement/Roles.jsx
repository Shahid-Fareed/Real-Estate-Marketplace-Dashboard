import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import MyHelmet from "../../Reuseable/Helmet";
import PageTitle from "../../Reuseable/PageTitle";
import Table from "../../Reuseable/Table";
import PermissionService from "../../Services/permissionSerice";
import useUserPermissions from "../../hooks/useUserPermissions";

const Roles = () => {
  const navigate = useNavigate();
  const userPermission = useUserPermissions();
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [dataLoading, setDataLoading] = useState(false);
  const [data, setData] = useState([]);

  const columns = ["#", "Title", "Date Created"];

  let userType = "";
  const authUser = localStorage.getItem("authUser");
  if (authUser) {
    const parsedAuthUser = JSON.parse(authUser);
    userType = parsedAuthUser?.user_type;
  }

  let userId = null;
  if (authUser) {
    const parsedAuthUser = JSON.parse(authUser);
    userId = parsedAuthUser.id;
  }

  const getRoles = useCallback(() => {
    let body = null;
    if (userType !== "agency") {
      setDataLoading(true);
      PermissionService.getRole(body, userType)
        .then((res) => {
          console.log("roles", res);
          let newData = [];
          const resData = res?.data;
          for (let i = 0; i < resData?.length; i++) {
            const element = resData[i];

            let obj = {
              "#": i + 1,
              Title: element?.title,
              id: element?.id,
              "Date Created": moment(element?.createdAt).format("DD MMM,YYYY"),
            };
            newData.push(obj);
          }
          setData(newData);
          setDataLoading(false);
        })
        .catch((err) => {
          setDataLoading(false);
          console.log("error on get roles");
        });
    }
    if (userType === "agency") {
      setDataLoading(true);
      PermissionService.getRoleAgency(body, userType, userId || 0)
        .then((res) => {
          console.log("roles", res);
          let newData = [];
          const resData = res?.data;
          for (let i = 0; i < resData?.length; i++) {
            const element = resData[i];

            let obj = {
              "#": i + 1,
              Title: element?.title,
              id: element?.id,
              "Date Created": moment(element?.createdAt).format("DD MMM,YYYY"),
            };
            newData.push(obj);
          }
          setData(newData);
          setDataLoading(false);
        })
        .catch((err) => {
          setDataLoading(false);
          console.log("error on get roles");
        });
    }
  }, []);

  useEffect(() => {
    getRoles();
  }, []);

  const handleDelete = (id) => {
    let body = null;
    PermissionService.deleteRole(body, id)
      .then((res) => {
        getRoles();
      })
      .catch((err) => {
        console.log("Error on deleteing roles");
      });
  };
  const handleEdit = (id) => {
    navigate(`/roles/${id}`);
  };
  return (
    <>
      <MyHelmet title="Roles" body="" />
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            {/* start page title  */}
            <div className="row">
              <PageTitle pagename="Roles" />
              {userPermission?.includes("Add Role") ? (
                <div
                  className="col-6"
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <button
                    type="button"
                    className="btn btn-primary btn-sm waves-effect waves-light"
                    style={{ height: "30px" }}
                    onClick={() => navigate("/add-user-role")}
                  >
                    <i
                      className="mdi mdi-plus"
                      style={{ marginRight: "5px" }}
                    />
                    Add Roles
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
                      isEdit={userPermission?.includes("Edit Role")}
                      isDelete={userPermission?.includes("Delete Role")}
                      onEdit={handleEdit}
                      setItemsPerPage={setItemsPerPage}
                      isAction={true}
                      permEdit={"Edit Role"}
                      permDel={"Delete Role"}
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

export default Roles;
