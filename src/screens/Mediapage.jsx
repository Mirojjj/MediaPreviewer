import { Carousel } from "antd";
import React, { useEffect, useRef, useState } from "react";
import {
  EllipsisOutlined,
  CloseOutlined,
  ShareAltOutlined,
  DownloadOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";
import { Dropdown } from "antd";
import { useNavigate } from "react-router-dom";

import Filerenderer from "../components/Filerenderer";
import ReactPlayer from "react-player";
import "antd/dist/reset.css";
import "../index.css";

const Mediapage = () => {
  const navigate = useNavigate();
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keydown", handleCloseEsc);

    return () => {
      document.removeEventListener("keydown", handleCloseEsc);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "ArrowRight") {
      carouselRef.current.next();
    } else if (event.key === "ArrowLeft") {
      carouselRef.current.prev();
    }
  };

  const handleCloseEsc = (event) => {
    if (event.key === "Escape") {
      handleClose();
    }
  };

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

  const handleZoomChange = (e) => {
    const newZoomLevel = parseFloat(e.target.value);
    setZoomLevel(newZoomLevel);
    // onZoomChange(newZoomLevel); // Pass the zoom level to parent or Filerenderer
  };

  const handleZoomOut = () => {
    const newZoomLevel = Math.max(zoomLevel - 0.1, 1);
    setZoomLevel(newZoomLevel);
  };

  const handleZoomIn = () => {
    const newZoomLevel = Math.min(zoomLevel + 0.1, 3);
    setZoomLevel(newZoomLevel);
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

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
      <div className="w-full flex justify-between backdrop-brightness-50 px-6 py-6 text-white">
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

        {/* <div className=" text-md tracking-normal font-light absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {currentSlide + 1} of {files.length}
        </div> */}

        {/* <input
          type="range"
          min="1"
          max="3"
          step="0.01"
          value={zoomLevel}
          onChange={handleZoomChange}
          className="zoom-slider"
        /> */}

        <div className="flex items-center bg-[#424242] p-2 rounded-md space-x-2">
          <button
            onClick={handleZoomOut}
            className="text-white text-xl focus:outline-none"
          >
            -
          </button>

          <input
            type="range"
            min="1"
            max="3"
            step="0.01"
            value={zoomLevel}
            onChange={handleZoomChange}
            className="w-32 bg-gray-600 appearance-none h-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleZoomIn}
            className="text-white text-xl focus:outline-none"
          >
            +
          </button>

          <button
            onClick={handleResetZoom}
            className="text-white text-xl focus:outline-none"
          >
            ⟳
          </button>
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
              className=" backdrop-brightness-50 h-[80vh] w-full relative"
            >
              <Filerenderer file={file} zoomLevel={zoomLevel} />
            </div>
          ))}
        </Carousel>
      </div>

      {/* Thumbnail Previewer */}
      <div className="w-full h-full py-2 flex justify-start pl-6 space-x-2 overflow-x-auto">
        {files.map((file, index) => (
          <div
            key={index}
            className={`p-0 !important cursor-pointer border-2 rounded-lg h-[100%] w-20 ${
              currentSlide === index
                ? "border-blue-500  bg-transparent"
                : "border-transparent bg-gray-500 opacity-50"
            }`}
            onClick={() => handleThumbnailClick(index)}
          >
            {file.type === "image" && (
              <img
                src={file.src}
                alt={`Thumbnail ${index + 1}`}
                className="h-full w-full object-cover rounded-lg"
              />
            )}
            {file.type === "video" && (
              <div className="h-full w-full  rounded-lg bg-black">
                <ReactPlayer
                  url={file.src}
                  width="100%"
                  height="100%"
                  light={file.src}
                  playIcon={<div style={{ color: "#fff" }}>▶</div>}
                />
              </div>
            )}
            {file.type === "pdf" && (
              <div className="h-full w-full rounded-lg bg-white flex justify-center items-center">
                <FilePdfOutlined className=" text-5xl text-red-600 " />
                {/* <p
                  style={{
                    color: "#fff",
                    textAlign: "center",
                    lineHeight: "80px",
                  }}
                >
                  PDF
                </p> */}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mediapage;
