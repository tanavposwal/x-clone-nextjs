"use client";

import { useEffect, useRef } from 'react';

export default function VideoElement({ video }: { video: string }) {
    const videoRef = useRef<any>(null);

    useEffect(() => {
        const videoElement = videoRef.current;
        
        if (!videoElement) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    videoElement.play();
                } else {
                    videoElement.pause();
                }
            },
            { threshold: 0.5 }
        );

        observer.observe(videoElement);

        return () => {
            observer.unobserve(videoElement);
        };
    }, []);

    return (
      <video
        className="aspect-auto border border-neutral-700 rounded-2xl overflow-hidden select-none max-h-[70vh]"
        draggable={false}
        ref={videoRef}
        controlsList="nodownload"
        preload="metadata"
        controls
        muted
        loop
      >
        <source src={video} type="video/mp4"></source>
      </video>
    );
  }
  