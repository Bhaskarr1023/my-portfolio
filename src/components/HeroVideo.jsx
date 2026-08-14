import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

export const HeroVideo = ({ src, poster = "" }) => {
  const videoRef = useRef(null);
  const hlsRef = useRef(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    const isHls = typeof src === "string" && src.includes(".m3u8");

    if (!isHls) {
      // Standard Direct MP4 / WebM playback
      video.src = src;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay fallback if needed
        });
      }
      return;
    }

    // Check native HLS playback (Safari/iOS)
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    } else if (Hls.isSupported()) {
      const hls = new Hls({
        maxMaxBufferLength: 10,
        enableWorker: true,
        lowLatencyMode: true
      });
      hlsRef.current = hls;
      
      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls.recoverMediaError();
              break;
            default:
              console.error("Fatal HLS playback error, shutting down HLS interface.");
              setLoadError(true);
              hls.destroy();
              break;
          }
        }
      });
    } else {
      console.warn("HLS streaming is not supported on this browser.");
      setLoadError(true);
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [src]);

  // If there's an error loading the video stream, show a clean dark background
  if (loadError) {
    return (
      <div className="absolute inset-0 w-full h-full bg-[#050505] pointer-events-none select-none" />
    );
  }

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none transition-opacity duration-1000"
      autoPlay
      muted
      loop
      playsInline
      poster={poster}
    />
  );
};

export default HeroVideo;
