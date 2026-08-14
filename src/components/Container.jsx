import React from "react";

export const Container = ({ children, className = "" }) => {
  return (
    <div className={`max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16 w-full ${className}`}>
      {children}
    </div>
  );
};

export default Container;
