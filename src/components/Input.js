"use client";

import { Controller } from "react-hook-form";

export const Input = ({
  name = "",
  label = "",
  placeholder = "",
  control = {},
  className = "",
  type = "text",
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className={`form-control w-full max-w-xs ${className}`}>
          <label className="label">
            <span className="label-text">{label}</span>
          </label>

          <input
            type={type}
            placeholder={placeholder}
            className={`input input-bordered w-full max-w-full ${
              error?.message ? "input-error" : ""
            }`}
            onChange={onChange}
            value={value}
          />

          {error?.message && (
            <label className="label">
              <span className="label-text-alt text-red-500">
                {error?.message}
              </span>
            </label>
          )}
        </div>
      )}
    />
  );
};
