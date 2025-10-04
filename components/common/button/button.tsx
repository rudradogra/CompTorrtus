import React from "react";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  fullWidth?: boolean;
  type?: "primary" | "secondary";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  fullWidth,
  type = "primary",
  disabled = false,
}) => {
  let typeClass;

  switch (type) {
    case "secondary":
      typeClass = "bg-white text-pink border-pink";
      break;
    case "primary":
    default:
      typeClass = "bg-black text-white border-white";
      break;
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative text-text-xs-regular font-press-start-2p border-t-[3px] border-l-[3px] border-r-[7px] hover:border-r-[3px] hover:border-b-[3px] hover:mr-[4px] hover:mb-[4px] border-b-[7px] ${typeClass} ${
        fullWidth ? "w-full" : "w-[220px]"
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""} py-5 transition-all duration-100 ease-in-out`}
    >
      {/* Black borders pixel */}
      <span className="absolute top-[-3px] left-[-3px] w-[3px] h-[3px] bg-black" />
      <span className="absolute top-[-3px] right-[-5px] w-[3px] h-[3px] bg-black" />
      <span className="absolute top-[-3px] right-[-7px] w-[3px] h-[3px] bg-black" />
      <span className="absolute top-0 right-[-7px] w-[3px] h-[3px] bg-black" />
      <span className="absolute bottom-[-7px] right-[-5px] w-[3px] h-[3px] bg-black" />
      <span className="absolute bottom-[-7px] right-[-7px] w-[3px] h-[3px] bg-black" />
      <span className="absolute bottom-[-5px] right-[-7px] w-[3px] h-[3px] bg-black" />
      <span className="absolute bottom-[-7px] left-0 w-[3px] h-[3px] bg-black" />
      <span className="absolute bottom-[-7px] left-[-3px] w-[3px] h-[3px] bg-black" />
      <span className="absolute bottom-[-5px] left-[-3px] w-[3px] h-[3px] bg-black" />

      {/* White borders pixel */}
      <span
        className={`absolute top-0 left-0 w-[3px] h-[3px]`}
        style={{ backgroundColor: type === "primary" ? "white" : "#D83F97" }}
      />
      <span
        className={`absolute top-0 right-0 w-[3px] h-[3px]`}
        style={{ backgroundColor: type === "primary" ? "white" : "#D83F97" }}
      />
      <span
        className={`absolute bottom-0 right-0 w-[3px] h-[3px]`}
        style={{ backgroundColor: type === "primary" ? "white" : "#D83F97" }}
      />
      <span
        className={`absolute bottom-0 left-0 w-[3px] h-[3px]`}
        style={{ backgroundColor: type === "primary" ? "white" : "#D83F97" }}
      />

      {text}
    </button>
  );
};

export default Button;
