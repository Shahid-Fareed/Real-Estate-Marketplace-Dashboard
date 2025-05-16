import React from "react";

const PageTitle = ({ pagename }) => {
  return (
    <div className="col-6">
      <div className="page-title-box d-flex align-items-center justify-content-between">
        <h4 className="mb-0">{pagename}</h4>
      </div>
    </div>
  );
};

export default PageTitle;
