import moment from "moment";
import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6">{moment().year()} © IN Realtors.</div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
