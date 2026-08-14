import React from "react";
import { Link } from "react-router-dom";

export const Button = ({
  children,
  onClick,
  to,
  href,
  variant = "primary",
  className = "",
  disabled = false,
  type = "button",
  showArrow = true,
  ...props
}) => {
  const baseStyle = "inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 text-xs md:text-sm tracking-wider uppercase py-3.5 px-7 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none group";
  
  const variants = {
    primary: "bg-white text-black hover:bg-neutral-200 border border-transparent",
    secondary: "bg-transparent text-white border border-white/20 hover:border-white/40 hover:bg-white/5 backdrop-blur-sm"
  };

  const buttonContent = (
    <>
      <span className="relative z-10">{children}</span>
      {showArrow && (
        <svg
          className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1 relative z-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      )}
    </>
  );

  const classes = `${baseStyle} ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {buttonContent}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {buttonContent}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      {...props}
    >
      {buttonContent}
    </button>
  );
};

export default Button;
