import { React, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Homepage = () => {
  const location = useLocation();
  useEffect(() => {
    localStorage.setItem("previousPage", location.pathname);
  }, [location]);
  return (
    <div className="flex min-h-screen justify-center items-center">
      <Link to="/media" className=" border-2 border-black p-3">
        Click here to go to the media preview page.
      </Link>
    </div>
  );
};

export default Homepage;
