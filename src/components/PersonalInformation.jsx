import React from "react";
import { useSelector } from "react-redux";

const PersonalInformation = () => {
  const userData = useSelector((state) => state.user);
  return (
    <div className=" px-24 py-8">
      <p className=" font-bold text-xl">Personal Information</p>
      <ul>
        <li className=" w-full flex justify-between mt-6">
          <p className="">Email address</p>
          <p className="">{userData.email_address}</p>
        </li>
        <li className=" w-full flex justify-between mt-4">
          <p className="">Country</p>
          <p className="">{userData.country}</p>
        </li>
        <li className=" w-full flex justify-between mt-4">
          <p className="">Phone</p>
          <p className="">{userData.phone_number}</p>
        </li>
        <li className=" w-full flex justify-between mt-4">
          <p className="">Title</p>
          <p className="">{userData.title}</p>
        </li>
        <li className=" w-full flex justify-between mt-4">
          <p className="">Gender</p>
          <p className="">{userData.gender}</p>
        </li>
      </ul>
    </div>
  );
};

export default PersonalInformation;
