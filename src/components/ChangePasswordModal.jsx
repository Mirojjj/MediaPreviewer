import React from "react";
import { Modal, Input, Space, Form } from "antd";
import { TEST_OLD_PASSWORD } from "../constants/constant";
import CustomFormSaveBtn from "../miscellaneous/CustomFormSaveBtn";
import CustomFormCancelBtn from "../miscellaneous/CustomFormCancelBtn";

const ChangePasswordModal = ({
  isChangePasswordModelOpen,
  handleChangePasswordOk,
  handleChangePasswordCancel,
}) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    form.resetFields();
    console.log("Form submitted successfully", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Modal
      open={isChangePasswordModelOpen}
      onOk={handleChangePasswordOk}
      onCancel={handleChangePasswordCancel}
      className="password-modal"
      footer={[]}
      style={{
        top: "200px",
      }}
    >
      <Form
        form={form}
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
            validateTrigger="onSubmit"
            rules={[
              {
                required: true,
                message: "Please enter your old password!",
              },
              {
                validator: (_, value) => {
                  if (value && value !== TEST_OLD_PASSWORD) {
                    return Promise.reject("Old password does not match.");
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input.Password className="h-12" />
          </Form.Item>

          <Form.Item
            label="New Password"
            name="newpassword"
            // validateTrigger="onSubmit"
            rules={[
              {
                required: true,
                message: "Please enter your new password!",
              },
              {
                min: 8,
                message: "Password must be at least 8 characters long.",
              },
            ]}
          >
            <Input.Password className=" h-12" />
          </Form.Item>
        </Space>
        <hr className=" mt-1" />
        <Space
          direction="horizontal"
          className=" w-full px-12 mt-6 justify-between"
        >
          <Form.Item className=" w-48">
            <CustomFormCancelBtn handleCancel={handleChangePasswordCancel} />
          </Form.Item>

          <Form.Item className=" w-48">
            <CustomFormSaveBtn />
          </Form.Item>
        </Space>
      </Form>
    </Modal>
  );
};

export default ChangePasswordModal;
