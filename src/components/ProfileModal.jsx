import React from "react";
import { Modal } from "antd";

const ProfileModal = ({ isModalOpen, handleOk, handleCancel }) => {
  return (
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
  );
};

export default ProfileModal;
