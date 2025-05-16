import React, { useState } from "react";
import MyHelmet from "../../Reuseable/Helmet";
import PageTitle from "../../Reuseable/PageTitle";
import { useNavigate } from "react-router-dom";
import SocietyService from "../../Services/societyService";
import { notifySuccess } from "../../utils/toast";

const AddSociety = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handelSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    var formdata = new FormData();
    formdata.append("name", name);
    formdata.append("description", description);
    formdata.append("file", image);
    formdata.append("location", location);

    SocietyService.createSociety(formdata)
      .then((res) => {
        setIsSubmitting(false);
        notifySuccess("Society Added Successfully!");
        navigate("/society");
      })
      .catch((err) => {
        setIsSubmitting(false);
      });
  };

  return (
    <>
      <MyHelmet title="Add Society" body="" />

      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <PageTitle pagename="Add Society" />
            </div>

            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          className="form-label"
                          htmlFor="formrow-fullname-input"
                        >
                          Society Name
                        </label>
                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          type="text"
                          className="form-control"
                          id="formrow-fullname-input"
                          placeholder="Enter Package Name"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          className="form-label"
                          htmlFor="formrow-email-input"
                        >
                          Location
                        </label>
                        <input
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          type="text"
                          className="form-control"
                          id="formrow-eil-input"
                          placeholder="Enter the location"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          className="form-label"
                          htmlFor="formrow-fullname-input"
                        >
                          Description
                        </label>
                        <textarea
                          maxlength="150"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          type="text"
                          className="form-control"
                          id="formrow-fullname-input"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label
                          htmlFor="example-text-input"
                          className="col-form-label"
                        >
                          Society Image
                        </label>
                        <br />

                        <br />
                        <div className="fileUpload btn btn-sm btn-primary">
                          <input
                            onChange={(e) => setImage(e.target.files[0])}
                            id="uploadBtn"
                            name="avatar"
                            className="upload"
                            type="file"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 d-flex flex-sm-row flex-column justify-content-end">
                    <button
                      disabled={isSubmitting}
                      onClick={(e) => handelSubmit(e)}
                      className="btn btn-primary glow "
                    >
                      {isSubmitting ? (
                        <>
                          <i
                            className="fa fa-spinner fa-spin"
                            style={{ fontSize: 24 }}
                          />
                        </>
                      ) : (
                        "Save changes"
                      )}
                    </button>
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

export default AddSociety;
