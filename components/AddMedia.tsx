"use client";

import { PhotoIcon, FilmIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function AddMedia() {
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [image, setImage] = useState(false);
  const [video, setVideo] = useState(false);

  return (
    <div className="my-4">
      <div className="flex gap-2 mb-2">
        <button
          onClick={(e) => {
            e.preventDefault();
            setImage(true);
            setVideo(false);
            setVideoUrl("");
          }}
          className={
            "p-2 hover:bg-sky-500/20 transition-colors rounded-full group " +
            (image && "bg-sky-500/20")
          }
        >
          <PhotoIcon className="w-5 h-5 stroke-neutral-300 group-hover:stroke-sky-500 transition-colors" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            setImage(false);
            setVideo(true);
            setImageUrl("");
          }}
          className={
            "p-2 hover:bg-sky-500/20 transition-colors rounded-full group " +
            (video && "bg-sky-500/20")
          }
        >
          <FilmIcon className="w-5 h-5 stroke-2 stroke-neutral-300 group-hover:stroke-sky-500 transition-colors" />
        </button>
        {(image || video) && (
          <button
            onClick={(e) => {
              e.preventDefault();
              setImage(false);
              setVideo(false);
              setImageUrl("");
              setVideoUrl("");
            }}
            className="p-2 hover:bg-red-500/20 transition-colors rounded-full group"
          >
            <XMarkIcon className="w-5 h-5 stroke-2 stroke-neutral-300 group-hover:stroke-red-500 transition-colors" />
          </button>
        )}
      </div>
      <div className="flex justify-center flex-col gap-3">
        {image && (
          <input
            type="text"
            className="w-full py-2 px-3 form-inp bg-black"
            placeholder="public url"
            name="image"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        )}
        {video && (
          <input
            type="text"
            className="w-full py-2 px-3 form-inp bg-black"
            placeholder="public url"
            name="video"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
        )}
        <div className="border border-neutral-700 rounded-2xl overflow-hidden w-fit">
        {image && (
          <img src={imageUrl} className="aspect-auto h-[20vh] bg-neutral-950" />
        )}
        {video && (
          <video className="aspect-auto h-[20vh] bg-neutral-950">
            <source src={videoUrl} type="video/mp4"></source>
          </video>
        )}
        </div>
      </div>
    </div>
  );
}
