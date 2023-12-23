"use client";

import { Controller } from "react-hook-form";

export const Select = ({
  name = "",
  label = "",
  control = {},
  className = "",
  options = [],
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

          <select
            className="select select-bordered"
            onChange={onChange}
            value={value}
          >
            <option disabled selected>
              Pick one
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

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
