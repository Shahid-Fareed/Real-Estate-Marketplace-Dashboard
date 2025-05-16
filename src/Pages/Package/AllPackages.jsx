import React, { useState, useCallback, useEffect } from "react";
import MyHelmet from "../../Reuseable/Helmet";
import PageTitle from "../../Reuseable/PageTitle";
import { useNavigate } from "react-router-dom";
import Table from "../../Reuseable/Table";
import PackageServices from "../../Services/packageServices";
import moment from "moment";
import useUserPermissions from "../../hooks/useUserPermissions";

const AllPackages = () => {
  const navigate = useNavigate();
  const userPermission = useUserPermissions();
  const [dataLoading, setDataLoading] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [data, setData] = useState([]);

  const columns = [
    "#",
    "Package Name",
    "Price",
    "Super Hot Listing",
    "Hot Listing",
    "Type",
    "Verified Listing",
    "Date Created",
  ];

  const getData = useCallback(() => {
    let body = null;
    setDataLoading(true);
    PackageServices.getAllPackage(body)
      .then((res) => {
        let newData = [];
        const resData = res?.data;
        for (let i = 0; i < resData?.length; i++) {
          const element = resData[i];
          let obj = {
            "#": i + 1,
            "Package Name": element?.name,
            Price: element?.price,
            "Super Hot Listing": element?.super_hot_listing,
            "Hot Listing": element?.hot_listing,
            "Verified Listing": element?.verified,
            Type: element?.type,
            id: element?.id,
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

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = (id) => {
    let body = null;
    PackageServices.deletePackage(body, id)
      .then((res) => {
        console.log("res: ", res);
        getData();
      })
      .catch((err) => {
        console.log("error on delete package");
      });
  };
  const handleEdit = (id) => {
    navigate(`/packages/${id}`);
  };

  return (
    <>
      <MyHelmet title="Packages" body="" />

      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <PageTitle pagename="Packages" />
              {userPermission?.includes("Add Packages") ? (
                <div
                  className="col-6"
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <button
                    type="button"
                    className="btn btn-primary btn-sm waves-effect waves-light"
                    style={{ height: "30px" }}
                    onClick={() => navigate("/add-package")}
                  >
                    <i
                      className="mdi mdi-plus"
                      style={{ marginRight: "5px" }}
                    />
                    Add Package
                  </button>
                </div>
              ) : null}

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
                      isEdit={userPermission?.includes("Edit Packages")}
                      isDelete={userPermission?.includes("Delete Packages")}
                      permEdit={"Edit Packages"}
                      permDel={"Delete Packages"}
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

export default AllPackages;
