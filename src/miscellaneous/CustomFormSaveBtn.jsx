import React from "react";

const CustomFormSaveBtn = () => {
  return (
    <button
      onClick={() => console.log("clicked")}
      type="submit"
      className=" border flex justify-center items-center py-3 px-12 w-full rounded-lg cursor-pointer bg-light-blue text-white"
    >
      Save
    </button>
  );
};

export default CustomFormSaveBtn;
