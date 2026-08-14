import React from "react";

export const LoadingFallback = () => {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading page content"
      className="w-full min-h-[60vh] flex flex-col items-center justify-center bg-[#030303] select-none"
    >
      <div className="flex items-center gap-3">
        <span className="w-2 h-2 rounded-full bg-white/60 animate-ping" />
        <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
          Loading
        </span>
      </div>
    </div>
  );
};

export default LoadingFallback;
