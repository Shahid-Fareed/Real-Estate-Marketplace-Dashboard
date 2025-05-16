import React, { useEffect, useState } from "react";
import Table from "../../Reuseable/Table";
import PageTitle from "../../Reuseable/PageTitle";
import MyHelmet from "../../Reuseable/Helmet";
import UsersApi from "../../Services/users";
import { useParams } from "react-router-dom";
import moment from "moment";

const CheckAgencyDetails = () => {
  const { id } = useParams();
  const [dataLoading, setDataLoading] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [dataStaff, setDataStaff] = useState([]);

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [ceoMessage, setCeoMessage] = useState("");
  const [aboutAgency, setAboutAgency] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [linkdinLink, setLinkdinLink] = useState("");

  const getData = (id) => {
    setDataLoading(true);
    let body = null;
    UsersApi.getUserProfileDetail(body, id)
      .then((res) => {
        console.log("Res: ", res);
        setName(res.agency_name);
        setCity(res.city);
        setCountry(res.country);
        setAddress(res.address);
        setCeoMessage(res.ceo_message);
        setAboutAgency(res.about_agency);
        setFacebookLink(res.facebook_url);
        setInstagramLink(res.instagram_url);
        setLinkdinLink(res.linkedin_url);
        setTwitterLink(res.twitter_url);
      })
      .catch((err) => {
        console.log("error on the getDetails of user api");
      });

    UsersApi.getAgencyStaff(id, body)
      .then((res) => {
        let newData = [];
        const resData = res?.data;
        for (let i = 0; i < resData?.length; i++) {
          const element = resData[i];

          let obj = {
            "#": element.id,
            "Full Name": element?.full_name,
            "Mobile Number": element?.mobile_number,
            id: element?.id,
          };
          newData.push(obj);
        }
        setDataStaff(newData);
      })
      .catch((err) => {
        console.log("error on the getDetails of user api");
      });

    UsersApi.getAgencyProperty(id, body)
      .then((res) => {
        const data = res.data;
        let newData = [];
        const resData = res?.data;
        for (let i = 0; i < resData?.length; i++) {
          const element = resData[i];

          let obj = {
            "#": element.id,
            "Full Name": element?.name,
            "Mobile Number": element?.seller_mobile_no,
            City: element?.city,
            id: element?.id,
            Price: element?.price,
            "Posted Date": moment(element?.createdAt).format("DD MMM,YYYY"),
            Status: element?.status,
          };
          newData.push(obj);
        }
        setData(newData);
        setDataLoading(false);
      })
      .catch((err) => {
        setDataLoading(false);
        console.log("error on the getDetails of user api");
      });
  };

  const columnsStaff = ["#", "Full Name", "Mobile Number"];

  const columnsProperty = [
    "#",
    "Full Name",
    "Mobile Number",
    "City",
    "Price",
    "Posted Date",
    "Status",
  ];

  useEffect(() => {
    getData(id);
  }, []);

  return (
    <>
      <MyHelmet title="Check Agency Details" body="" />
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            {/* start page title  */}
            <div className="row">
              <PageTitle pagename="Check Agency Detail" />

              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="mb-3">
                        <label
                          className="form-label"
                          htmlFor="formrow-email-input"
                        >
                          Agency Name
                        </label>
                        <input
                          disabled
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          type="text"
                          className="form-control"
                          id="formrow-email-input"
                          placeholder="Enter your Agency Name"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label
                            className="form-label"
                            htmlFor="formrow-email-input"
                          >
                            City
                          </label>
                          <input
                            disabled
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            type="text"
                            className="form-control"
                            id="formrow-email-input"
                            placeholder="Enter your city"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label
                            className="form-label"
                            htmlFor="formrow-password-input"
                          >
                            Country
                          </label>
                          <input
                            disabled
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            type="text"
                            className="form-control"
                            id="formrow-password-input"
                            placeholder="Enter the country"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="mb-3">
                        <label
                          className="form-label"
                          htmlFor="formrow-email-input"
                        >
                          Address
                        </label>
                        <input
                          disabled
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          type="text"
                          className="form-control"
                          id="formrow-email-input"
                          placeholder="Enter your agency address"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="mb-3">
                        <label
                          className="form-label"
                          htmlFor="formrow-email-input"
                        >
                          About Agency
                        </label>
                        <textarea
                          disabled
                          value={aboutAgency}
                          onChange={(e) => setAboutAgency(e.target.value)}
                          rows={5}
                          cols={40}
                          className="form-control"
                          id="formrow-email-input"
                          placeholder="Enter your agency details"
                          defaultValue={""}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="mb-3">
                        <label
                          className="form-label"
                          htmlFor="formrow-email-input"
                        >
                          CEO Message
                        </label>
                        <textarea
                          disabled
                          value={ceoMessage}
                          onChange={(e) => setCeoMessage(e.target.value)}
                          rows={5}
                          cols={40}
                          className="form-control"
                          id="formrow-email-input"
                          placeholder="Enter the CEO Message"
                          defaultValue={""}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="mb-3">
                        <label
                          className="form-label"
                          htmlFor="formrow-email-input"
                        >
                          Social Links
                        </label>
                        <div>
                          <div className="col-md-12 mb-3">
                            <input
                              disabled
                              value={facebookLink}
                              onChange={(e) => setFacebookLink(e.target.value)}
                              type="url"
                              className="form-control"
                              id="formrow-password-input"
                              placeholder="Enter the facebook link"
                            />
                          </div>
                          <div className="col-md-12 mb-3">
                            <input
                              disabled
                              value={instagramLink}
                              onChange={(e) => setInstagramLink(e.target.value)}
                              type="url"
                              className="form-control"
                              id="formrow-password-input"
                              placeholder="Enter the instagram link"
                            />
                          </div>
                          <div className="col-md-12 mb-3">
                            <input
                              disabled
                              value={twitterLink}
                              onChange={(e) => setTwitterLink(e.target.value)}
                              type="url"
                              className="form-control"
                              id="formrow-password-input"
                              placeholder="Enter the twitter link"
                            />
                          </div>
                          <div className="col-md-12 mb-3">
                            <input
                              disabled
                              value={linkdinLink}
                              onChange={(e) => setLinkdinLink(e.target.value)}
                              type="url"
                              className="form-control"
                              id="formrow-password-input"
                              placeholder="Enter the linkdin link"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="row">
                  <div className="col-5">
                    <button disabled={isSubmitting} onClick={(e) => onSubmit(e)} className="btn btn-primary btn-sm waves-effect waves-light">Submit</button>
                  </div>

                </div> */}
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <h5>Agency Properties</h5>
                    <Table
                    dataLoading={dataLoading}
                      columns={columnsProperty}
                      data={data}
                      itemsPerPage={itemsPerPage}
                      onDelete={() => {}}
                      onEdit={() => {}}
                      setItemsPerPage={setItemsPerPage}
                      isAction={false}
                      isEdit={false}
                    />
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <h5>Agency Staff Members</h5>
                    <Table
                      columns={columnsStaff}
                      dataLoading={dataLoading}
                      data={dataStaff}
                      itemsPerPage={itemsPerPage}
                      onDelete={() => {}}
                      onEdit={() => {}}
                      setItemsPerPage={setItemsPerPage}
                      isAction={false}
                      isEdit={false}
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

export default CheckAgencyDetails;
