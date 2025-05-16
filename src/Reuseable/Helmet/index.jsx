import React from "react";
import { Helmet } from "react-helmet";

const MyHelmet = (props) => {
  const { title, body } = props;

  return (
    <>
      <Helmet>
        <title>{title}</title>

        <body className={body} />
      </Helmet>
    </>
  );
};

export default MyHelmet;
