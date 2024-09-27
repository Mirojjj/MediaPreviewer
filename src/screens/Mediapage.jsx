import { Carousel } from "antd";
import React, { useRef, useState } from "react";
import {
  EllipsisOutlined,
  CloseOutlined,
  ShareAltOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { Dropdown } from "antd";
import { useNavigate } from "react-router-dom";

import Filerenderer from "../components/Filerenderer";
import ReactPlayer from "react-player";
import "antd/dist/reset.css";
import "../index.css";

const Mediapage = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    const previousPage = localStorage.getItem("previousPage");
    if (previousPage) {
      navigate(previousPage);
    }
  };

  const files = [
    { type: "image", src: "/assets/img1.png" },
    { type: "image", src: "/assets/img2.png" },
    { type: "image", src: "/assets/img3.png" },
    { type: "image", src: "/assets/img4.png" },
    { type: "video", src: "/assets/vid1.mp4" },
    { type: "pdf", src: "/assets/idea.pdf" },
  ];

  const items = [
    {
      label: (
        <div>
          <ShareAltOutlined /> Forward
        </div>
      ),
      key: "0",
    },
    {
      type: "divider",
    },
    {
      label: (
        <div onClick={() => handleDownload(currentSlide)}>
          <DownloadOutlined /> Download
        </div>
      ),
      key: "1",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef();

  const handleThumbnailClick = (index) => {
    setCurrentSlide(index);
    carouselRef.current.goTo(index);
  };

  const handleDownload = (index) => {
    const currentFile = files[index];
    const link = document.createElement("a");

    link.href = currentFile.src;

    if (currentFile.type === "image") {
      link.download = `image-${index + 1}.png`;
    } else if (currentFile.type === "video") {
      link.download = `video-${index + 1}.mp4`;
    } else if (currentFile.type === "pdf") {
      link.download = `document-${index + 1}.pdf`;
    }

    link.click();
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-[#424242]">
      {/* Main Carousel for Previewing the Image */}
      <div className="w-full flex justify-between backdrop-brightness-50 px-12 py-6 text-white">
        <div className="flex gap-3">
          <div className=" w-10 h-10 rounded-lg bg-white"></div>
          <div>
            <p className=" text-base tracking-normal font-light">
              Subham Phuyal
            </p>
            <p className=" text-xs tracking-tight font-extralight">
              17 Sep, 2024 1:25 PM-image.png
            </p>
          </div>
        </div>

        <div className=" text-lg tracking-normal font-light absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {currentSlide + 1} of {files.length}
        </div>

        <div className="flex gap-8">
          <Dropdown menu={{ items }} trigger={["click"]}>
            <EllipsisOutlined
              onClick={(e) => e.preventDefault()}
              className=" text-2xl"
            />
          </Dropdown>
          <CloseOutlined onClick={handleClose} className=" text-xl" />
        </div>
      </div>
      <div className="w-full flex-grow">
        <Carousel
          dots={false}
          arrows
          infinite={false}
          ref={carouselRef}
          afterChange={(current) => setCurrentSlide(current)}
        >
          {files.map((file, index) => (
            <div
              key={index}
              className=" backdrop-brightness-50 h-[78vh] w-full relative"
            >
              <Filerenderer file={file} />
            </div>
          ))}
        </Carousel>
      </div>

      {/* Thumbnail Previewer */}
      <div className="w-full h-full py-3 flex justify-center space-x-4 overflow-x-auto">
        {files.map((file, index) => (
          <div
            key={index}
            className={`cursor-pointer border-2 rounded-lg ${
              currentSlide === index ? "border-blue-500" : "border-transparent"
            }`}
            onClick={() => handleThumbnailClick(index)}
          >
            {file.type === "image" && (
              <img
                src={file.src}
                alt={`Thumbnail ${index + 1}`}
                className="h-20 w-20 object-cover rounded-lg"
              />
            )}
            {file.type === "video" && (
              <div className="h-20 w-20  rounded-lg bg-black">
                <ReactPlayer
                  url={file.src}
                  width="100%"
                  height="80px"
                  light
                  playIcon={<div style={{ color: "#fff" }}>▶</div>}
                />
              </div>
            )}
            {file.type === "pdf" && (
              <div className="h-20 w-20  rounded-lg bg-black">
                <p
                  style={{
                    color: "#fff",
                    textAlign: "center",
                    lineHeight: "80px",
                  }}
                >
                  PDF
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mediapage;
