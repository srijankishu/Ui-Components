import React, { useState, useEffect } from "react";

interface InputFieldProps {
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
  type?: "text" | "password";
  clearable?: boolean;
  darkMode?: boolean;
  value?: string;
  passwordToggle?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled,
  invalid,
  loading,
  variant = "outlined",
  size = "md",
  type = "text",
  clearable,
  darkMode,
  value,
  onChange,
}) => {
  // keep internal state for typing
  const [internalValue, setInternalValue] = useState(value ?? "");

  // sync when Storybook changes value externally
  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
    onChange?.(e); // still notify parent if needed
  };

  const handleClear = () => {
    setInternalValue("");
    onChange?.({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>);
  };

  const sizeClasses =
    size === "sm"
      ? "px-2 py-1 text-sm"
      : size === "lg"
      ? "px-4 py-3 text-lg"
      : "px-3 py-2 text-base";

  const variantClasses =
    variant === "filled"
      ? "bg-gray-100 border border-transparent focus:border-blue-500"
      : variant === "ghost"
      ? "bg-transparent border-b border-gray-400 focus:border-blue-500"
      : "border border-gray-400 focus:border-blue-500";

  return (
    <div className={`flex flex-col gap-1 w-full ${darkMode ? "text-white" : "text-black"}`}>
      {label && <label className="font-medium">{label}</label>}

      <div className="relative w-full">
        <input
          type={type}
          placeholder={placeholder}
          value={internalValue}
          onChange={handleChange}
          disabled={disabled}
          className={`w-full rounded-md outline-none ${sizeClasses} ${variantClasses} ${
            invalid ? "border-red-500" : ""
          } ${disabled ? "bg-gray-200 cursor-not-allowed" : ""} ${
            darkMode ? "bg-gray-800 text-white" : ""
          }`}
        />

        {/* Clear button */}
        {clearable && internalValue && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
          >
            ✕
          </button>
        )}

        {/* Loading spinner */}
        {loading && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2 animate-spin">
            ⏳
          </div>
        )}
      </div>

      {/* Helper / Error text */}
      {invalid && errorMessage ? (
        <span className="text-sm text-red-500">{errorMessage}</span>
      ) : (
        helperText && <span className="text-sm text-gray-500">{helperText}</span>
      )}
    </div>
  );
};

export default InputField;
