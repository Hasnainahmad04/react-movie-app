import React from "react";

const Like = (props) => {
  let icon = "fa-solid fa-heart text-danger";
  if (!props.liked) {
    icon = "fa-regular fa-heart";
  }
  return (
    <React.Fragment>
      <i
        className={icon}
        onClick={props.onClick}
        style={{ cursor: "pointer", fontSize: "20px" }}
      ></i>
    </React.Fragment>
  );
};

export default Like;
