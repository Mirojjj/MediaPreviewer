import React, { useState } from "react";
import PersonalInformation from "../components/PersonalInformation";
import ProfileModal from "../components/ProfileModal";
import ChangePasswordModal from "../components/ChangePasswordModal";
import EditProfile from "../components/EditProfile";

import { useSelector } from "react-redux";

const Profilepage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChangePasswordModelOpen, setIsChangePasswordMOdelOpen] =
    useState(false);

  const [isEditProfile, setIsEditProfile] = useState(true);

  const userData = useSelector((state) => state.user);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const showChangePasswordModal = () => {
    setIsChangePasswordMOdelOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleChangePasswordOk = () => {
    setIsChangePasswordMOdelOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChangePasswordCancel = () => {
    setIsChangePasswordMOdelOpen(false);
  };

  const handleEditProfile = () => {
    setIsEditProfile(!isEditProfile);
  };

  return (
    <>
      <div className=" h-screen w-full bg-dimblue-white flex justify-center items-center">
        <div className=" border w-[94%] h-[94%] rounded-xl flex justify-center items-center relative">
          <div className="absolute top-3 left-4 font-semibold text-2xl leading-tight">
            My Profile
          </div>
          <div className=" w-[68%] max-h-[94%] border rounded-xl bg-white">
            <div className=" w-full border-b h-1/2 flex justify-center items-start py-8 relative">
              <div
                onClick={handleEditProfile}
                className=" text-light-blue border border-light-blue px-6 py-2 absolute top-10 right-6 rounded-md cursor-pointer font-light text-sm"
              >
                Edit Profile
              </div>
              <div className=" flex flex-col justify-center items-center gap-3">
                <div
                  onClick={showModal}
                  className=" border border-dark-purple h-36 w-36 rounded-xl bg-light-purple flex justify-center items-center relative cursor-pointer"
                >
                  <div className="text-dark-purple text-4xl">SP</div>

                  <div className=" absolute bottom-2 right-2 bg-white p-2 rounded-full text-blue-600 shadow-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      fill="currentColor"
                      fontWeight="800"
                      className="bi bi-camera"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4z" />
                      <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5m0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0" />
                    </svg>
                  </div>
                </div>
                <div
                  onClick={showChangePasswordModal}
                  className=" text-primary-blue font-medium text-lg cursor-pointer"
                >
                  Change Password
                </div>
                <p className="text-xl font-semibold text-black-shade">
                  {userData.name}
                </p>
                <p className=" text-base text-black-shade">{userData.title}</p>
              </div>
            </div>
            {isEditProfile ? (
              <EditProfile isEdit={handleEditProfile} />
            ) : (
              <PersonalInformation />
            )}
          </div>
        </div>
      </div>

      <ProfileModal
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />

      <ChangePasswordModal
        isChangePasswordModelOpen={isChangePasswordModelOpen}
        handleChangePasswordCancel={handleChangePasswordCancel}
        handleChangePasswordOk={handleChangePasswordOk}
      />
    </>
  );
};

export default Profilepage;
