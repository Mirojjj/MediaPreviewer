import React from "react";
import ReactPlayer from "react-player";
import { Document, Page } from "react-pdf";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const Filerenderer = ({ file }) => {
  switch (file.type) {
    case "image":
      return (
        <img
          src={file.src}
          alt="File"
          className="h-[80vh] w-1/2 object-contain absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
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
        <div className="h-[80vh] w-full flex justify-center ">
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
