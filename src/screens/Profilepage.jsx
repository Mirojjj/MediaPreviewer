import React, { useState, useRef, useCallback } from "react";
import PersonalInformation from "../components/PersonalInformation";
import ProfileModal from "../components/ProfileModal";
import ChangePasswordModal from "../components/ChangePasswordModal";
import EditProfile from "../components/EditProfile";
import { Popover, Image, Modal, Button, Slider } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  MinusOutlined,
} from "@ant-design/icons";
import Cropper from "react-easy-crop";
import getCroppedImg from "../helpers/helpers";

import { useSelector } from "react-redux";
import EditProfileBtn from "../miscellaneous/EditProfileBtn";

const Profilepage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChangePasswordModelOpen, setIsChangePasswordMOdelOpen] =
    useState(false);

  // const [isPhotoUploaded, setIsPhotoUploaded] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [popOverVisible, setPopOverVisible] = useState(false);

  const [isEditProfile, setIsEditProfile] = useState(false);

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
    setIsEditProfile(true);
  };

  const handleCancelEditProfile = () => {
    setIsEditProfile(false);
  };

  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    setPopOverVisible(false);
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const src = files.map((file) => URL.createObjectURL(file));
    setImageSrc(src);
  };

  const handleDeletePhoto = () => {
    setPopOverVisible(false);
    setImageSrc("");
  };

  const handleZoomOut = () => {
    if (zoom <= 1) {
      return;
    }
    setZoom(zoom - 0.1);
    console.log(zoom);
  };

  const handleZoomIn = () => {
    if (zoom >= 3.1) {
      return;
    }
    setZoom(zoom + 0.1);
    console.log(zoom);
  };

  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);

  // const onPreview = async (file) => {
  //   let src = file.url;
  //   if (!src) {
  //     src = await new Promise((resolve) => {
  //       const reader = new FileReader();
  //       reader.readAsDataURL(file.originFileObj);
  //       reader.onload = () => resolve(reader.result);
  //     });
  //   }
  //   const image = new Image();
  //   image.src = src;
  //   const imgWindow = window.open(src);
  //   imgWindow?.document.write(image.outerHTML);
  // };
  // const onChange = ({ fileList: newFileList }) => {
  //   setFileList(newFileList);
  // };

  // crop functionality
  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleEditClick = () => {
    setPopOverVisible(false);
    setIsModalVisible(true);
  };

  const handleCropOk = async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      setImageSrc(croppedImage);
      // Perform further actions with croppedImage
    } catch (err) {
      console.error("Failed to crop image", err);
    }
    setIsModalVisible(false);
  };

  const handleCropCancel = () => {
    setIsModalVisible(false);
  };

  const content = (
    <div>
      <EditProfileBtn onClick={handleUploadClick}>
        <PlusOutlined className=" mr-1" /> Upload Photo
        <input
          ref={fileInputRef}
          name="file"
          id="file"
          onChange={handleFileChange}
          accept="image/png"
          type="file"
          className="sr-only"
        />
      </EditProfileBtn>
      <EditProfileBtn onClick={handleEditClick}>
        <EditOutlined className=" mr-1" /> Edit Photo
        {/* <ImgCrop rotationSlider>
          <Upload
            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
          >
            {fileList.length < 5 && "+ Upload"}
          </Upload>
        </ImgCrop> */}
      </EditProfileBtn>
      <EditProfileBtn onClick={handleDeletePhoto}>
        <DeleteOutlined className=" mr-1" /> Delete Photo
      </EditProfileBtn>
    </div>
  );

  return (
    <>
      <div className=" w-full bg-dimblue-white flex justify-center items-center py-12">
        <div className=" border w-[94%] h-[94%]  rounded-xl flex justify-center items-center relative py-12">
          <div className="absolute top-3 left-4 font-semibold text-2xl leading-tight">
            My Profile
          </div>
          <div className=" w-[68%] h-full  border rounded-xl bg-white">
            <div className=" w-full border-b h-1/2 flex justify-center items-start py-8 relative">
              <div
                onClick={handleEditProfile}
                className=" text-light-blue border border-light-blue px-6 py-2 absolute top-10 right-6 rounded-md cursor-pointer font-light text-sm"
              >
                Edit Profile
              </div>
              <div className=" flex flex-col justify-center items-center gap-2">
                <div className="relative">
                  {imageSrc ? (
                    <Image
                      src={imageSrc}
                      alt="Selected image preview"
                      layout="fill" // Makes the image fill the div
                      objectFit="cover" // Adjust this to "contain" if you prefer the image to fit without cropping
                      // className="rounded-xl border-2 border-dark-purple"
                    />
                  ) : (
                    <div
                      onClick={showModal}
                      className={`border-2 border-dark-purple
                        h-[150px] w-[150px] rounded-xl bg-light-purple flex justify-center items-center  cursor-pointer`}
                    >
                      <p className="text-dark-purple text-4xl">SP</p>
                    </div>
                  )}

                  <Popover
                    visible={popOverVisible}
                    onVisibleChange={(popOverVisible) =>
                      setPopOverVisible(popOverVisible)
                    }
                    arrow={false}
                    content={content}
                    trigger="click"
                    placement="bottomLeft"
                    className=" absolute bottom-2 right-2 rounded-full bg-white  text-blue-600 shadow-md cursor-pointer"
                  >
                    <div className=" p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="currentColor"
                        fontWeight="800"
                        className="bi bi-camera"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4z" />
                        <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5m0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0" />
                      </svg>
                    </div>
                  </Popover>
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
              <EditProfile isEdit={handleCancelEditProfile} />
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
      {/* padding top: 16px. padding left and right: 20px, padding bottom: 24px */}
      <div className="edit-modal">
        <Modal
          className=" pt-4 px-5 pb-6"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCropCancel}
          width={600}
          footer={[
            <div className=" pr-8">
              <Button
                key="cancel"
                onClick={handleCropCancel}
                style={{ width: "110px" }}
              >
                Cancel
              </Button>

              <Button
                className=" ml-4"
                key="crop"
                type="primary"
                onClick={handleCropOk}
                style={{ width: "110px" }}
              >
                Save
              </Button>
            </div>,
          ]}
        >
          {/* modal title: font-size:16px, weight: 500, font style: roboto, color" #333 */}
          <h1 className=" text-base font-medium font-roboto text-[#333] mb-3">
            Crop Image
          </h1>
          <hr />
          <div className=" flex flex-col justify-center items-center mt-8">
            <div
              style={{
                position: "relative",
                width: 330,
                height: 330,
                overflow: "hidden", // Ensures no overflow outside the div
              }}
            >
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                cropSize={{ width: 200, height: 200 }}
                aspect={1} // Keeps a square aspect ratio
                objectFit="horizontal-cover" // Ensures the image fully covers the div
                cropShape="rect" // Makes the crop area rectangular
                // showGrid={false} // Hides the grid for a clean look
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
          </div>
          <div className="slider-container">
            <MinusOutlined
              className=" text-xl font-extrabold"
              onClick={handleZoomOut}
            />
            <Slider
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(value) => setZoom(value)}
              tooltip={{ open: false }}
            />
            <PlusOutlined
              className=" text-xl font-extrabold"
              onClick={handleZoomIn}
            />
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Profilepage;
