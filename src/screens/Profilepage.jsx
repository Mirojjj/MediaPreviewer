import React, { useState } from "react";
import { Modal, Input, Space, Form } from "antd";

const Profilepage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isChangePasswordModelOpen, setIsChangePasswordMOdelOpen] =
    useState(false);

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

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div className=" h-screen w-full bg-dimblue-white flex justify-center items-center">
        <div className=" border w-[94%] h-[94%] rounded-xl flex justify-center items-center relative">
          <div className="absolute top-3 left-4 font-semibold text-2xl leading-tight">
            My Profile
          </div>
          <div className=" w-[68%] h-[84%] border rounded-xl bg-white">
            <div className=" w-full border-b h-1/2 flex justify-center items-start pt-10 relative">
              {/* edit profile button */}
              <div
                onClick={() => {
                  console.log("edit profile");
                }}
                className=" text-light-blue border border-light-blue px-6 py-2 absolute top-10 right-6 rounded-md cursor-pointer font-light text-sm"
              >
                Edit Profile
              </div>
              {/* profile section  */}
              <div className=" flex flex-col justify-center items-center gap-3">
                {/* profile photo */}
                <div
                  onClick={showModal}
                  className=" border border-dark-purple h-40 w-40 rounded-xl bg-light-purple flex justify-center items-center relative"
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
                {/* change and remaining */}
                <div
                  onClick={showChangePasswordModal}
                  className=" text-primary-blue font-medium text-lg"
                >
                  Change Password
                </div>
                <div className=" mt-2 text-2xl font-semibold">
                  Subham Phuyal
                </div>
              </div>
            </div>
            <div className=" px-24 pt-6">
              <p className=" font-bold text-xl">Personal Information</p>
              <ul>
                <li className=" w-full flex justify-between mt-6">
                  <div className="">Email address</div>
                  <div className="">test</div>
                </li>
                <li className=" w-full flex justify-between mt-4">
                  <div className="">Country</div>
                  <div className="">test</div>
                </li>
                <li className=" w-full flex justify-between mt-4">
                  <div className="">Phone</div>
                  <div className="">test</div>
                </li>
                <li className=" w-full flex justify-between mt-4">
                  <div className="">Title</div>
                  <div className="">test</div>
                </li>
                <li className=" w-full flex justify-between mt-4">
                  <div className="">Gender</div>
                  <div className="">test</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Modal
        className="profile-model"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
        style={{
          top: 240,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 className=" text-6xl">SP</h1>
      </Modal>
      <Modal
        open={isChangePasswordModelOpen}
        onOk={handleChangePasswordOk}
        onCancel={handleChangePasswordCancel}
        className="password-modal"
        footer={[]}
        style={{
          top: "250px",
        }}
      >
        <Form
          requiredMark={false}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <div className=" w-full">
            <p className="text-center font-bold text-xl ">Change Password</p>
          </div>
          <br />
          <hr className=" w-full" />
          <br />
          <Space direction="vertical" className=" w-full px-12 ">
            <Form.Item
              label="Old Password"
              name="oldpassword"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password className="h-12 mt-2" />
            </Form.Item>

            <Form.Item
              label="New Password"
              name="newpassword"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
                {
                  len: 8,
                  message: "password must be at least 8 characters long.",
                },
              ]}
            >
              <Input.Password className=" h-12 mt-2" />
            </Form.Item>
          </Space>
          <hr className=" mt-8" />
          <Space
            direction="horizontal"
            className=" w-full px-12 mt-6 justify-between"
          >
            <div className=" border flex justify-center items-center py-3 px-12 w-48 rounded-lg cursor-pointer">
              Cancel
            </div>

            <button
              type="submit"
              className=" border flex justify-center items-center py-3 px-12 w-48 rounded-lg cursor-pointer bg-primary-blue text-white"
            >
              Save
            </button>
          </Space>
        </Form>
      </Modal>
    </>
  );
};

// import React, { useState } from 'react';
// import { Button, Modal } from 'antd';
// const App = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const showModal = () => {
//     setIsModalOpen(true);
//   };
//   const handleOk = () => {
//     setIsModalOpen(false);
//   };
//   const handleCancel = () => {
//     setIsModalOpen(false);
//   };
//   return (
//     <>
//       <Button type="primary" onClick={showModal}>
//         Open Modal
//       </Button>
//   <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
//     <p>Some contents...</p>
//     <p>Some contents...</p>
//     <p>Some contents...</p>
//   </Modal>
//     </>
//   );
// };
// export default App;

export default Profilepage;
