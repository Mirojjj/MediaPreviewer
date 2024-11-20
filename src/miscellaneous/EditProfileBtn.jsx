import React from "react";

const EditProfileBtn = ({ children, onClick }) => {
  return (
    <div
      onClick={onClick}
      className=" hover:bg-[#EFEFEF] hover:text-primary-blue font-semibold py-2 px-6 cursor-pointer"
    >
      {children}
    </div>
  );
};

export default EditProfileBtn;
