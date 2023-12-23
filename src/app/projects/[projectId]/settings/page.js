"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect } from "react";
import { useGetUser, useUpdateUser } from "@/apis";
import { Input, Loader } from "@/components";
import { showToast } from "@/utils";

const defaultUserValues = {
  fullName: "",
};

const userSchema = z.object({
  fullName: z.string().min(1, { message: "Full name is required" }),
});

export default function SettingsPage() {
  const { data: userData, isLoading, refetch } = useGetUser();
  const { mutateAsync: updateUserInfo } = useUpdateUser();

  const {
    handleSubmit: handleUserSubmit,
    control: userControl,
    setValue,
  } = useForm({
    defaultValues: defaultUserValues,
    resolver: zodResolver(userSchema),
  });

  const handleUpdateUserInfo = async (data) => {
    const toastId = showToast({
      type: "loading",
      message: "Updating your user info...",
    });

    try {
      const response = await updateUserInfo(data);
      if (response?.success) {
        refetch();
        showToast({
          type: "update",
          updateId: toastId,
          updateConfig: {
            type: "success",
            render: response?.message || "User Info Updated",
            isLoading: false,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          },
        });

        if (response?.data?.fullName) {
          localStorage.setItem("fullName", response?.data?.fullName);
        }
      } else {
        showToast({
          type: "update",
          updateId: toastId,
          updateConfig: {
            type: "error",
            render: response?.message || "Something went wrong",
            isLoading: false,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          },
        });
      }
    } catch (error) {
      showToast({
        type: "update",
        updateId: toastId,
        updateConfig: {
          type: "error",
          render: error?.message || "Something went wrong",
          isLoading: false,
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        },
      });
    }
  };

  useEffect(() => {
    setValue("fullName", userData?.data?.fullName);
  }, [userData]);

  return (
    <div className="max-w-6xl px-4 mt-5 mb-10 mx-auto min-h-full overflow-y-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-purple-700 text-5xl my-6">Settings</h1>
        <button type="submit" form="updateUserInfo" className="btn btn-primary">
          Save
        </button>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <form
          id="updateUserInfo"
          name="updateUserInfo"
          onSubmit={handleUserSubmit(handleUpdateUserInfo)}
        >
          <Input
            name="fullName"
            label="Full Name"
            control={userControl}
            placeholder="Enter your full name"
          />

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Email</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              value={userData?.data?.email}
              disabled
            />
          </label>
        </form>
      )}
    </div>
  );
}
