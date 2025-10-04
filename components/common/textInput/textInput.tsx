import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

interface TextInputProps {
  type: "text" | "email" | "password" | "tel" | "textarea";
  title: string;
  placeholder?: string;
  value: string;
  name?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  error?: string;
  inputMode?: string;
  pattern?: string;
  readOnly?: boolean;
  className?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  type,
  title,
  placeholder,
  value,
  onChange,
  name,
  error,
  inputMode,
  pattern,
  readOnly = false,
  className = "",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="flex flex-col gap-[10px]">
      <p className="font-ibm-plex-mono text-text-sm-medium text-white">
        {title}
      </p>
      <div className="relative">
        {type === "textarea" ? (
          <textarea
            placeholder={placeholder}
            value={value}
            // onChange={
            //   onChange as (e: React.ChangeEvent<HTMLTextAreaElement>) => void
            // }
            name={name}
            readOnly={readOnly}
            className={`w-full h-[136px] px-4 py-3 border border-strokeColor rounded bg-transparent placeholder:text-text-md-medium placeholder:text-strokeColor placeholder:font-ibm-plex-mono text-text-md-medium text-white font-ibm-plex-mono ${
              error ? "border-red-500" : ""
            } ${readOnly ? "cursor-not-allowed opacity-75" : ""} ${className}`}
          />
        ) : (
          <input
            type={isPassword && showPassword ? "text" : type}
            placeholder={placeholder}
            value={value}
            onChange={
              onChange as (e: React.ChangeEvent<HTMLInputElement>) => void
            }
            name={name}
            inputMode={
              inputMode as
                | "text"
                | "email"
                | "tel"
                | "search"
                | "url"
                | "none"
                | "numeric"
                | "decimal"
            }
            pattern={pattern}
            readOnly={readOnly}
            className={`w-full px-4 py-3 border border-strokeColor rounded bg-transparent placeholder:text-text-md-medium placeholder:text-strokeColor placeholder:font-ibm-plex-mono text-text-md-medium text-white font-ibm-plex-mono ${
              error ? "border-red-500" : ""
            } ${readOnly ? "cursor-not-allowed opacity-75" : ""} ${className}`}
          />
        )}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white"
            disabled={readOnly}
          >
            {showPassword ? (
              <EyeSlashIcon className="w-5 h-5" />
            ) : (
              <EyeIcon className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
      {error && (
        <span className="text-red-500 text-xs font-ibm-plex-mono mt-1">
          {error}
        </span>
      )}
    </div>
  );
};

export default TextInput;