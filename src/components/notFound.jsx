import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <React.Fragment>
      <img alt="" src="images/404-back.jpg" height="500px" width="100%"></img>
      <Link to="/" className="btn btn-primary">
        Go Home
      </Link>
    </React.Fragment>
  );
};

export default NotFound;
