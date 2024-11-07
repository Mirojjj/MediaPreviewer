import React from "react";

const CustomFormCancelBtn = ({ handleCancel }) => {
  return (
    <div
      className=" border flex justify-center items-center py-3 px-8 w-full rounded-lg cursor-pointer"
      onClick={handleCancel}
    >
      Cancel
    </div>
  );
};

export default CustomFormCancelBtn;
