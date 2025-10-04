/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Link from "next/link";

export type ButtonProps = {
  id?: string;
  label: string;
  style:
    | "primary"
    | "secondary"
    

  onMouseEnter?: () => void;
  onMouseLeave?: () => void;

  disabled?: boolean;
  width?: "fit-label" | "fill-container";
  leadingIcon?: any;
  leadingIconFill?: "0" | "1";
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";

  ariaLabel?: string;
  ariaHidden?: boolean;
  href?: string;
  newTab?: boolean; 
};

export const HandleButtonClick = (targetId: string) => {
  const targetElement = document.querySelector(targetId);
  if (targetElement) {
    const headerOffset = 150;
    const elementPosition =
      targetElement.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};

const ProFileButton: React.FC<ButtonProps> = ({
  id,
  label,
  style,
  disabled = false,
  width = "fit-label",
  onClick,
  className,
  type = "submit",
  ariaLabel,
  ariaHidden = false,
  href,
  newTab = false,
}) => {
  let buttonStyles = "";
  let stateLayerStyles = "";

  switch (style) {
    case "primary":
      buttonStyles =
        "border border-white shadow-sm rounded-lg cursor-pointer";
      stateLayerStyles =
        "text-text-md-semibold font-anonymous-pro text-white py-[10px]";
      break;
    case "secondary":
      buttonStyles =
        "border border-white shadow-sm bg-white rounded-lg ";
      stateLayerStyles =
        "text-text-md-semibold font-anonymous-pro text-black py-[10px]";
      break;
   
  }

  if (disabled) {
    stateLayerStyles +=
      " opacity-50 shadow-none hover:shadow-none cursor-not-allowed";
  }

  if (width === "fill-container") {
    buttonStyles += " w-full";
  }

  const content = (
    <div
      className={`${stateLayerStyles} flex items-center justify-center w-full h-full whitespace-nowrap`}
    >
      
      {label}
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        id={id}
        className={`${buttonStyles} ${className} flex items-center justify-center`}
        role="button"
        aria-label={ariaLabel || label}
        aria-hidden={ariaHidden}
        target={newTab ? "_blank" : undefined}
        rel={newTab ? "noopener noreferrer" : undefined}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      id={id}
      className={`${buttonStyles} ${className} flex items-center justify-center`}
      disabled={disabled}
      onClick={onClick}
      type={type}
      aria-label={ariaLabel || label}
      aria-hidden={ariaHidden}
    >
      {content}
    </button>
  );
};

export default ProFileButton;
