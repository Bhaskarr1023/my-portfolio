import React from "react";

export const Section = ({ children, id, className = "", style = {} }) => {
  return (
    <section
      id={id}
      className={`py-20 sm:py-24 md:py-32 lg:py-36 w-full relative ${className}`}
      style={style}
    >
      {children}
    </section>
  );
};

export default Section;
