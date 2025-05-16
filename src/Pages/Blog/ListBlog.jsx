import React, { useState, useEffect } from "react";
import MyHelmet from "../../Reuseable/Helmet/index";
import PageTitle from "../../Reuseable/PageTitle/index";
import Table from "../../Reuseable/Table/index";

import SocietyService from "../../Services/societyService";
import { useNavigate } from "react-router-dom";
import Blog from "../../Services/blogService";

const ListBlog = () => {
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

  const getBlogs = () => {
    let body = null;
    setDataLoading(true);
    Blog.List(body)
      .then((res) => {
        const data = res.data;
        let newData = [];
        for (let i = 0; i < data?.length; i++) {
          const element = data[i];
          let obj = {
            "#": i + 1,
            Title: element?.title,
            Description: element?.short_description,
            id: element?.id,
          };
          newData.push(obj);
        }
        setData(newData);
        setDataLoading(false);
      })
      .catch((err) => {
        setDataLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    getBlogs();
  }, []);

  const handleDelete = (id) => {
    Blog.delete(id)
      .then((res) => {
        getBlogs();
      })
      .catch((err) => {});
  };
  const handleEdit = (id) => {
    navigate(`/blog/${id}`);
  };

  const columns = ["#", "Title", "Description"];

  return (
    <>
      <MyHelmet title="News & Update" />

      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            {/* start page title  */}
            <div className="row">
              <PageTitle pagename="News & Update" />
              <div
                className="col-6"
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <button
                  type="button"
                  className="btn btn-primary btn-sm waves-effect waves-light"
                  style={{ height: "30px" }}
                  onClick={() => navigate("/blog/create")}
                >
                  <i className="mdi mdi-plus" style={{ marginRight: "5px" }} />
                  Add News & Update
                </button>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <Table
                      columns={columns}
                      data={data}
                      dataLoading={dataLoading}
                      itemsPerPage={itemsPerPage}
                      onDelete={handleDelete}
                      onEdit={handleEdit}
                      setItemsPerPage={setItemsPerPage}
                      isAction={true}
                      isEdit={true}
                      isDelete={true}
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

export default ListBlog;
