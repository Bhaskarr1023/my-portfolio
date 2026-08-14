import React, { useEffect, useRef, useState } from "react";

export const HeroVideo = ({ src, poster = "" }) => {
  const videoRef = useRef(null);
  const hlsRef = useRef(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    const isHls = typeof src === "string" && src.includes(".m3u8");

    if (!isHls) {
      // Standard Direct MP4 / WebM playback without loading HLS library
      video.src = src;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay fallback handling
        });
      }
      return;
    }

    // Dynamic HLS.js loading only when an actual .m3u8 stream is supplied
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    } else {
      import("hls.js")
        .then(({ default: Hls }) => {
          if (!Hls.isSupported()) {
            console.warn("HLS streaming is not supported on this browser.");
            setLoadError(true);
            return;
          }

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
                  console.error("Fatal HLS error, disabling stream.");
                  setLoadError(true);
                  hls.destroy();
                  break;
              }
            }
          });
        })
        .catch((err) => {
          console.error("Failed to load HLS engine:", err);
          setLoadError(true);
        });
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
      <div className="absolute inset-0 w-full h-full bg-[#030303] pointer-events-none select-none" />
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
      preload="metadata"
      poster={poster}
    />
  );
};

export default HeroVideo;
