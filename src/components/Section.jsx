import React from "react";

export const Section = ({ children, id, className = "", style = {} }) => {
  return (
    <section
      id={id}
      className={`py-20 md:py-32 w-full relative ${className}`}
      style={style}
    >
      {children}
    </section>
  );
};

export default Section;
