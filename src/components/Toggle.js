"use client";

import { Controller } from "react-hook-form";

export const Toggle = ({
  name = "",
  label = "",
  control = {},
  className = "",
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className={`form-control w-full max-w-xs ${className}`}>
          <label className="cursor-pointer label">
            <span className="label-text">{label}</span>
          </label>

          <input
            type="checkbox"
            className="toggle toggle-primary"
            checked={value}
            onChange={onChange}
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
