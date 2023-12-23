"use client";

import { Controller } from "react-hook-form";

export const Textarea = ({
  name = "",
  label = "",
  placeholder = "",
  control = {},
  className = "",
  disabled = false,
  rows = 10,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className={`form-control w-full ${className}`}>
          <label className="label">
            <span className="label-text">{label}</span>
          </label>

          <textarea
            placeholder={placeholder}
            className={`textarea textarea-primary ${
              error?.message ? "textarea-error" : ""
            }`}
            onChange={onChange}
            value={value}
            disabled={disabled}
            rows={rows}
          ></textarea>

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
