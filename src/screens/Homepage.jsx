import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="flex min-h-screen justify-center items-center">
      <Link to="/media" className=" border-2 border-black p-3">
        Click here to go to the media preview page.
      </Link>
    </div>
  );
};

export default Homepage;
