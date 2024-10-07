import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const Filerenderer = ({ file, zoomLevel, rotation }) => {
  const imgRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (zoomLevel === 1) {
      setPosition({ x: 0, y: 0 });
    }
  }, [zoomLevel]);

  const handleMouseDown = (e) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setLastPosition({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && zoomLevel > 1) {
      setPosition({
        x: e.clientX - lastPosition.x,
        y: e.clientY - lastPosition.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  switch (file.type) {
    case "image":
      return (
        <div
          className="relative overflow-hidden h-[80vh] w-full flex justify-center items-center"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          <img
            ref={imgRef}
            src={file.src}
            alt="File"
            className={`object-contain ${
              zoomLevel === 1 ? "fixed" : "absolute"
            }`}
            style={{
              transform: `scale(${zoomLevel}) translate(${position.x}px, ${position.y}px) rotate(${rotation}deg`,
              transition: isDragging ? "none" : "transform 0.2s ease",
              cursor:
                zoomLevel > 1 ? (isDragging ? "grabbing" : "grab") : "default",
              maxWidth: "80%",
              maxHeight: "80%",
            }}
          />
        </div>
      );
    case "video":
      return (
        <ReactPlayer
          url={file.src}
          controls
          width="100%"
          height="80vh" // Adjust height for videos
        />
      );
    case "pdf":
      return (
        <div className="h-[80vh] w-full flex justify-center">
          <Worker
            workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
          >
            <Viewer fileUrl={file.src} plugins={[defaultLayoutPlugin()]} />
          </Worker>
        </div>
      );
    default:
      return <p>Unsupported file format</p>;
  }
};

export default Filerenderer;
