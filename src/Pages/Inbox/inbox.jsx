import React, { useState, useEffect } from "react";
import MyHelmet from "../../Reuseable/Helmet/index";
import PageTitle from "../../Reuseable/PageTitle/index";
import Table from "../../Reuseable/Table/index";

import InquriesServices from "../../Services/InquriesServices";
import useUserPermissions from "../../hooks/useUserPermissions";

const Inbox = () => {
  const userPermission = useUserPermissions();
  const [dataLoading, setDataLoading] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [data, setData] = useState([]);

  let userType = "";
  const authData = localStorage.getItem("authUser");
  if (authData) {
    const parsedUser = JSON.parse(authData);
    userType = parsedUser?.user_type || null;
  }

  const getAdminInquries = () => {
    let body = null;
    setDataLoading(true);
    InquriesServices.adminInquries(body)
      .then((res) => {
        const data = res.data;
        let newData = [];
        for (let i = 0; i < data?.length; i++) {
          const element = data[i];
          let obj = {
            "#": i + 1,
            Name: element?.name,
            Phone: element?.contact_number,
            Email: element?.email,
            Message: element?.message,
            id: element?.id,
          };
          newData.push(obj);
        }
        setData(newData);
        // console.log("res inqueries admin: ", data);
        setTimeout(() => {
          setDataLoading(false);
        }, 2000);
      })
      .catch((err) => {
        setDataLoading(false);
        console.log("err: ", err);
      });
  };
  const agencyOrUserInquries = () => {
    setDataLoading(true);
    let body = null;
    let userId = null;
    const authUser = localStorage.getItem("authUser");
    if (authUser) {
      const parsedAuthUser = JSON.parse(authUser);
      userId = parsedAuthUser?.id;
    }
    InquriesServices.agencyOrUserInquries(body, userId)
      .then((res) => {
        const data = res.data;
        let newData = [];
        for (let i = 0; i < data?.length; i++) {
          const element = data[i];
          let obj = {
            "#": i + 1,
            Name: element?.name,
            Phone: element?.contact_number,
            Email: element?.email,
            Message: element?.message,
            id: element?.id,
          };
          newData.push(obj);
        }
        setData(newData);
        setTimeout(() => {
          setDataLoading(false);
        }, 2000);
        // console.log("res inqueries admin: ", data);
      })
      .catch((err) => {
        setDataLoading(false);
        console.log("err: ", err);
      });
  };

  useEffect(() => {
    if (userType === "admin") {
      getAdminInquries();
    }
    if (userType === "agency") {
      agencyOrUserInquries();
    }
    if (userType === "user") {
      agencyOrUserInquries();
    }
  }, []);

  const columns = ["#", "Name", "Phone", "Email", "Message"];

  const handleDelete = (id) => {
    console.log("Delete");
  };
  const handleEdit = (id) => {
    console.log("Edit");
  };

  return (
    <>
      <MyHelmet title="Inbox" />

      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            {/* start page title  */}
            <div className="row">
              <PageTitle pagename="Inbox" />
            </div>

            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <Table
                      columns={columns}
                      dataLoading={dataLoading}
                      data={data}
                      itemsPerPage={itemsPerPage}
                      onDelete={() => {}}
                      onEdit={() => {}}
                      setItemsPerPage={setItemsPerPage}
                      isAction={false}
                      isEdit={userPermission?.includes("Edit Inquiries")}
                      isDelete={userPermission?.includes("Delete Inquiries")}
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

export default Inbox;
