import { Carousel } from "antd";
import React, { useRef, useState } from "react";
import Filerenderer from "../components/Filerenderer";
import ReactPlayer from "react-player";

const Mediapage = () => {
  const files = [
    { type: "image", src: "src/assets/img1.png" },
    { type: "image", src: "src/assets/img2.png" },
    { type: "image", src: "src/assets/img3.png" },
    { type: "image", src: "src/assets/img4.png" },
    { type: "video", src: "src/assets/vid1.mp4" },
    { type: "pdf", src: "src/assets/idea.pdf" },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef();

  const handleThumbnailClick = (index) => {
    setCurrentSlide(index);
    carouselRef.current.goTo(index);
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-[#424242]">
      {/* Main Carousel for Previewing the Image */}
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
              className=" backdrop-brightness-50 h-[88vh] w-full relative"
            >
              <Filerenderer file={file} />
            </div>
          ))}
        </Carousel>
      </div>

      {/* Thumbnail Previewer */}
      <div className="w-full pb-6 flex justify-center space-x-4 overflow-x-auto">
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
