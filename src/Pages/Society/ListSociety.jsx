import React, { useState, useEffect } from "react";
import MyHelmet from "../../Reuseable/Helmet/index";
import PageTitle from "../../Reuseable/PageTitle/index";
import Table from "../../Reuseable/Table/index";

import SocietyService from "../../Services/societyService";
import { useNavigate } from "react-router-dom";

const ListSociety = () => {
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

  const getSocieties = () => {
    setDataLoading(true);
    let body = null;
    SocietyService.getSociety(body).then((res) => {
      const data = res.data;
      let newData = [];
      for (let i = 0; i < data?.length; i++) {
        const element = data[i];
        let obj = {
          "#": i + 1,
          Name: element?.name,
          Location: element?.location,
          Description: element?.description,
          id: element?.id,
        };
        newData.push(obj);
      }
      setData(newData);
      setDataLoading(false);
    });
  };

  useEffect(() => {
    getSocieties();
  }, []);

  const handleDelete = (id) => {
    SocietyService.deleteSociety(id)
      .then((res) => {
        getSocieties();
      })
      .catch((err) => {});
  };
  const handleEdit = (id) => {
    navigate(`/society/${id}`);
  };

  const columns = ["#", "Name", "Location", "Description"];

  return (
    <>
      <MyHelmet title="Societies" />

      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            {/* start page title  */}
            <div className="row">
              <PageTitle pagename="All Societies" />
              <div
                className="col-6"
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <button
                  type="button"
                  className="btn btn-primary btn-sm waves-effect waves-light"
                  style={{ height: "30px" }}
                  onClick={() => navigate("/society/add")}
                >
                  <i className="mdi mdi-plus" style={{ marginRight: "5px" }} />
                  Add Socities
                </button>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <Table
                      columns={columns}
                      isEdit={true}
                      isDelete={true}
                      dataLoading={dataLoading}
                      data={data}
                      itemsPerPage={itemsPerPage}
                      onDelete={handleDelete}
                      onEdit={handleEdit}
                      setItemsPerPage={setItemsPerPage}
                      isAction={true}
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

export default ListSociety;
