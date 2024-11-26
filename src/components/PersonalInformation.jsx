import React from "react";
import { useSelector } from "react-redux";

const PersonalInformation = () => {
  const userData = useSelector((state) => state.user);
  return (
    <div className=" px-24 py-8">
      <p className=" font-medium text-base text-[#333] font-roboto">
        Personal Information
      </p>
      <ul>
        <li className=" w-full flex justify-between mt-6">
          <p className=" font-medium text-[13px] text-[#333] font-roboto">
            Email address
          </p>
          <p className=" font-normal text-[14px] text-[#666] font-roboto">
            {userData.email_address}
          </p>
        </li>
        <li className=" w-full flex justify-between mt-4">
          <p className=" font-medium text-[13px] text-[#333] font-roboto">
            Country
          </p>
          <p className=" font-normal text-[14px] text-[#666] font-roboto">
            {userData.country}
          </p>
        </li>
        <li className=" w-full flex justify-between mt-4">
          <p className=" font-medium text-[13px] text-[#333] font-roboto">
            Phone
          </p>
          <p className="font-normal text-[14px] text-[#666] font-roboto">
            {userData.phone_number}
          </p>
        </li>
        <li className=" w-full flex justify-between mt-4">
          <p className=" font-medium text-[13px] text-[#333] font-roboto">
            Title
          </p>
          <p className="font-normal text-[14px] text-[#666] font-roboto">
            {userData.title}
          </p>
        </li>
        <li className=" w-full flex justify-between mt-4">
          <p className=" font-medium text-[13px] text-[#333] font-roboto">
            Gender
          </p>
          <p className="font-normal text-[14px] text-[#666] font-roboto">
            {userData.gender}
          </p>
        </li>
      </ul>
    </div>
  );
};

export default PersonalInformation;
