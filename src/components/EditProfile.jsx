import React, { useEffect, useState } from "react";
import { Form, Row, Col, Input, Space, Select } from "antd";
import CustomFormCancelBtn from "../miscellaneous/CustomFormCancelBtn";
import { updateUserData } from "../features/userSlice";

import { useSelector, useDispatch } from "react-redux";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";

const EditProfile = ({ isEdit }) => {
  const userData = useSelector((state) => state.user);

  const initailInput = {
    name: userData.name,
    email_address: userData.email_address,
    phone_number: userData.phone_number,
    title: userData.title,
    gender: userData.gender,
    country: userData.country,
  };

  const [formData, setFormData] = useState(initailInput);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target.value);
    setFormData({ ...formData, [name]: value });
  };

  const dispatch = useDispatch();

  const [allCountries, setAllCountries] = useState([]);

  const [form] = Form.useForm();

  const onFinish = (values) => {
    dispatch(updateUserData(values));
    // setFormData(values);
    console.log("Form submitted successfully", values);
    isEdit(false);
  };

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        const countryOptions = response.data.map((country) => ({
          value: country.name.common,
          label: country.name.common,
        }));

        setAllCountries(countryOptions);
      })
      .catch((error) =>
        console.log("Error fetching all countries list:", error)
      );
  }, []);

  // const handleEditFormSave = () =>{

  // }

  const genderOptions = [
    {
      value: "male",
      label: "Male",
    },
    {
      value: "female",
      label: "Female",
    },
  ];

  return (
    <div className=" px-32 py-5  text-black-shade">
      <p className=" font-bold text-xl">Change Personal Information</p>
      <Form
        form={form}
        onFinish={onFinish}
        requiredMark={false}
        autoComplete="off"
        layout="vertical"
        className=" mt-8"
      >
        <Row gutter={32}>
          <Col className="gutter-row" span={12}>
            <Form.Item
              label={
                <label className="font-medium text-black-shade">Name</label>
              }
              name="name"
              initialValue={formData.name}
              rules={[
                {
                  required: true,
                  message: "This field is required.",
                },
              ]}
            >
              {/* <label className=" font-medium text-black-shade">Name</label> */}
              <Input type="text" className=" h-12" onChange={handleChange} />
            </Form.Item>

            <Form.Item
              label={
                <label className=" font-medium text-black-shade">
                  Phone Number
                </label>
              }
              name="phone_number"
              initialValue={formData.phone_number}
              rules={[
                {
                  required: true,
                  message: "This field is required.",
                },
              ]}
            >
              <PhoneInput
                inputProps={{
                  required: true,
                  autoFocus: true,
                }}
                country={"np"}
                value=""
                inputStyle={{
                  width: "100%",
                  height: "3rem",
                }}
                containerStyle={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item
              label={
                <label className="font-medium text-black-shade">Gender</label>
              }
              name="gender"
              initialValue={formData.gender}
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
            >
              <Select className=" h-12 w-full" options={genderOptions} />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
            <Form.Item
              label={
                <label className="font-medium text-black-shade">
                  Email Address
                </label>
              }
              name="email_address"
              initialValue={formData.email_address}
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
                {
                  type: "email",
                  message: "Please enter a valid email address",
                },
              ]}
            >
              <Input className="h-12 mt-1" onChange={handleChange} />
            </Form.Item>

            <Form.Item
              label={
                <label className="font-medium text-black-shade">Title</label>
              }
              name="title"
              initialValue={formData.title}
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
            >
              <Input className=" h-12" onChange={handleChange} />
            </Form.Item>
            <Form.Item
              label={
                <label className="font-medium text-black-shade">Country</label>
              }
              name="country"
              initialValue={formData.country}
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
            >
              <Select
                className=" h-12 w-full"
                // value={formData.country}
                // onChange={handleGenderChange}
                options={allCountries}
              />
            </Form.Item>
          </Col>
        </Row>
        <Space direction="horizontal" className=" space-x-2 float-right pb-6">
          <Form.Item>
            <CustomFormCancelBtn handleCancel={isEdit} />
          </Form.Item>
          <Form.Item>
            <button
              type="submit"
              className=" border flex justify-center items-center py-3 px-12 w-full rounded-lg cursor-pointer bg-light-blue text-white"
            >
              Save
            </button>
          </Form.Item>
        </Space>
      </Form>
    </div>
  );
};

export default EditProfile;
