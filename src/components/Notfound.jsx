import React from "react";
import { Link } from "react-router-dom";

const Notfound = () => {
  return (
    <React.Fragment>
      <h1 className="text-muted text-center">
        404 Page Not Found <br />
        <Link to="/">Go to Home</Link>
      </h1>
    </React.Fragment>
  );
};

export default Notfound;
