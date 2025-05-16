import React, { useState } from "react";
import MyHelmet from "../../Reuseable/Helmet";
import PageTitle from "../../Reuseable/PageTitle";
import { useNavigate } from "react-router-dom";
import Blog from "../../Services/blogService";
import { notifySuccess } from "../../utils/toast";
import CkEditor from "../../Reuseable/CkEditor";

const BlogCreate = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [image, setImage] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handelSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    var formdata = new FormData();
    formdata.append("title", name);
    formdata.append("description", longDescription);
    formdata.append("image", image);
    formdata.append("short_description", description);

    Blog.create(formdata)
      .then((res) => {
        setIsSubmitting(false);
        notifySuccess("Blog Created Successfully!");
        navigate("/blog");
      })
      .catch((err) => {
        setIsSubmitting(false);
      });
  };

  return (
    <>
      <MyHelmet title="Create News & Update" body="" />

      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <PageTitle pagename="Create News & Update" />
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
                          Title
                        </label>
                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          type="text"
                          className="form-control"
                          id="formrow-fullname-input"
                          placeholder="Enter Title"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          className="form-label"
                          htmlFor="formrow-email-input"
                        >
                          Short Description
                        </label>
                        <textarea
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          type="text"
                          className="form-control"
                          id="formrow-eil-input"
                          placeholder="Enter the short description"
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
                          Long Description
                        </label>
                        <CkEditor
                          editorContent={longDescription}
                          setEditorContent={setLongDescription}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label
                          htmlFor="example-text-input"
                          className="col-form-label"
                        >
                          Image
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

export default BlogCreate;
