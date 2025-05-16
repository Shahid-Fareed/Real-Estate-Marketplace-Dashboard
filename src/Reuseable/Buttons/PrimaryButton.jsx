import React from "react";

const PrimaryButton = (props) => {
  const { isLoading, name, onSubmit } = props;

  console.log("onSubmit", onSubmit);

  return (
    <>
      {isLoading ? (
        <>
          <div className="spinner-border text-primary m-1" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </>
      ) : (
        <button
          onClick={onSubmit}
          className="btn btn-primary w-sm waves-effect waves-light"
          type={onSubmit === null ? "submit" : "button"}
        >
          {name}
        </button>
      )}
    </>
  );
};

export default PrimaryButton;
