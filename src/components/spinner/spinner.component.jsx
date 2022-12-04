import React from "react";
import { CircleLoader } from "react-spinners";

const Spinner = (props) => {
  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  return (
    <div style={style}>
      <CircleLoader color={"#000000"} loading={props.loading} size={100} />
    </div>
  );
};

export default Spinner;
