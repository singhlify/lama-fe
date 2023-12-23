"use client";

import {
  useGetWidgetConfig,
  useUpdateWidgetConfig,
  useUploadBotIcon,
} from "@/apis";
import { Input, Loader, Toggle } from "@/components";
import { Controller, useForm } from "react-hook-form";
import { showToast } from "@/utils";
import { useEffect, useState } from "react";

const defaultWidgetValues = {
  chatBotName: "",
  welcomeMessage: "",
  primaryColor: "",
  fontColor: "",
  fontSize: "",
  chatHeight: "",
  showSources: false,
  iconSize: "",
  screenPosition: "",
  bottomDistance: "",
  horizontalDistance: "",
};

export default function WidgetPage({ params: { projectId = "" } }) {
  const [botIconSrc, setBotIconSrc] = useState("");

  const {
    data: widgetConfig,
    isLoading,
    refetch,
  } = useGetWidgetConfig(projectId);
  const { mutateAsync: updateWidgetConfig } = useUpdateWidgetConfig();
  const { mutateAsync: uploadBotIcon } = useUploadBotIcon();

  const {
    handleSubmit: handleWidgetSubmit,
    control: widgetControl,
    setValue,
  } = useForm({
    defaultValues: defaultWidgetValues,
  });

  const {
    handleSubmit: handleBotIconSubmit,
    control: botIconControl,
    watch,
  } = useForm({
    defaultValues: {
      botIcon: null,
    },
  });

  const handleUploadBotIcon = async (data) => {
    const toastId = showToast({
      type: "loading",
      message: "Updating your Bot Icon...",
    });

    try {
      const form = new FormData();
      form.append("image", data?.botIcon);
      form.append("projectId", projectId);
      const response = await uploadBotIcon(form);
      if (response?.success) {
        refetch();
        showToast({
          type: "update",
          updateId: toastId,
          updateConfig: {
            type: "success",
            render: response?.data?.message || "Bot Icon Updated",
            isLoading: false,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          },
        });
      } else {
        showToast({
          type: "update",
          updateId: toastId,
          updateConfig: {
            type: "error",
            render: response?.data?.message || "Something went wrong",
            isLoading: false,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
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
          progress: undefined,
          theme: "colored",
        },
      });
    }
  };

  const handleUpdateWidgetConfig = async (data) => {
    const toastId = showToast({
      type: "loading",
      message: "Updating your widget settings...",
    });

    try {
      const finalData = {
        projectId,
        widgetConfigData: {
          general: {
            chatBotName: data?.chatBotName || "",
            welcomeMessage: data?.welcomeMessage || "",
          },
          display: {
            botProp: {
              primaryColor: data?.primaryColor || "",
              fontColor: data?.fontColor || "",
              fontSize: data?.fontSize || "",
              chatHeight: data?.chatHeight || "",
              showSources: data?.showSources || "",
            },
            chatIconProp: {
              iconSize: data?.iconSize || "",
              screenPosition: data?.screenPosition || "",
              bottomDistance: data?.bottomDistance || "",
              horizontalDistance: data?.horizontalDistance || "",
              botIcon: data?.botIcon || "",
            },
          },
        },
      };
      const response = await updateWidgetConfig(finalData);
      if (response?.success) {
        refetch();
        showToast({
          type: "update",
          updateId: toastId,
          updateConfig: {
            type: "success",
            render: response?.message || "Widget Settings Updated",
            isLoading: false,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          },
        });
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
            progress: undefined,
            theme: "colored",
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
          progress: undefined,
          theme: "colored",
        },
      });
    }
  };

  useEffect(() => {
    setValue(
      "chatBotName",
      widgetConfig?.data?.widgetConfig?.general?.chatBotName || ""
    );
    setValue(
      "welcomeMessage",
      widgetConfig?.data?.widgetConfig?.general?.welcomeMessage || ""
    );
    setValue(
      "primaryColor",
      widgetConfig?.data?.widgetConfig?.display?.botProp?.primaryColor || ""
    );
    setValue(
      "fontColor",
      widgetConfig?.data?.widgetConfig?.display?.botProp?.fontColor || ""
    );
    setValue(
      "fontSize",
      widgetConfig?.data?.widgetConfig?.display?.botProp?.fontSize || ""
    );
    setValue(
      "chatHeight",
      widgetConfig?.data?.widgetConfig?.display?.botProp?.chatHeight || ""
    );
    setValue(
      "showSources",
      widgetConfig?.data?.widgetConfig?.display?.botProp?.showSources === "true"
    );
    setValue(
      "iconSize",
      widgetConfig?.data?.widgetConfig?.display?.chatIconProp?.iconSize || ""
    );
    setValue(
      "screenPosition",
      widgetConfig?.data?.widgetConfig?.display?.chatIconProp?.screenPosition ||
        ""
    );
    setValue(
      "bottomDistance",
      widgetConfig?.data?.widgetConfig?.display?.chatIconProp?.bottomDistance ||
        ""
    );
    setValue(
      "horizontalDistance",
      widgetConfig?.data?.widgetConfig?.display?.chatIconProp
        ?.horizontalDistance || ""
    );
    setValue(
      "botIcon",
      widgetConfig?.data?.widgetConfig?.display?.chatIconProp?.botIcon || ""
    );
  }, [widgetConfig]);

  useEffect(() => {
    if (watch()?.botIcon) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBotIconSrc(reader.result);
      };
      reader.readAsDataURL(watch()?.botIcon);
    }
  }, [watch()?.botIcon]);

  return (
    <div className="max-w-6xl px-4 mt-5 mb-10 mx-auto min-h-full overflow-y-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-purple-700 text-5xl my-6">Configuration</h1>
        <button
          type="submit"
          form="updateWidgetConfig"
          className="btn btn-primary"
        >
          Save
        </button>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <form
            id="updateWidgetConfig"
            onSubmit={handleWidgetSubmit(handleUpdateWidgetConfig)}
          >
            <div className="divider divider-start">General</div>
            <div className="grid grid-cols-4 gap-4">
              {/* General */}
              <Input
                name="chatBotName"
                label="Chat Bot Name"
                placeholder="Type here"
                control={widgetControl}
                className="!max-w-full"
              />

              <Input
                name="welcomeMessage"
                label="Welcome Message"
                placeholder="Type here"
                control={widgetControl}
                className="!max-w-full"
              />
            </div>

            {/* Display */}
            {/* Bot */}
            <div className="divider divider-start">Display</div>
            <div className="grid grid-cols-4 gap-4">
              <Input
                name="primaryColor"
                label="Primary Color"
                placeholder="Type here"
                control={widgetControl}
                className="!max-w-full"
                type="color"
              />

              <Input
                name="fontColor"
                label="Font Color"
                placeholder="Type here"
                control={widgetControl}
                className="!max-w-full"
                type="color"
              />

              <Input
                name="fontSize"
                label="Font Size (in px)"
                placeholder="Type here"
                control={widgetControl}
                className="!max-w-full"
                type="number"
              />

              <Input
                name="chatHeight"
                label="Chat Height (in % of total screen)"
                placeholder="Type here"
                control={widgetControl}
                className="!max-w-full"
              />

              <Toggle
                name="showSources"
                label="Show Sources"
                control={widgetControl}
                className="!max-w-full"
              />
            </div>
            {/* Chat Icon */}

            <div className="divider divider-start">Chat Icon</div>
            <div className="grid grid-cols-4 gap-4">
              <Input
                name="iconSize"
                label="Icon Size"
                placeholder="Type here"
                control={widgetControl}
                className="!max-w-full"
              />

              <Input
                name="screenPosition"
                label="Screen Position"
                placeholder="Type here"
                control={widgetControl}
                className="!max-w-full"
              />

              <Input
                name="bottomDistance"
                label="Distance from Bottom (in px)"
                placeholder="Type here"
                control={widgetControl}
                className="!max-w-full"
                type="number"
              />

              <Input
                name="horizontalDistance"
                label="Horizontal Distance (in px)"
                placeholder="Type here"
                control={widgetControl}
                className="!max-w-full"
                type="number"
              />

              {/* <input type="file"  /> */}
              {/* <Controller
                name="botIcon"
                control={widgetControl}
                render={({ field: { onChange, value } }) => (
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Bot Icon</span>
                    </label>

                    <img
                      src={
                        value?.botIcon ||
                        widgetConfig?.data?.widgetConfig?.display?.chatIconProp
                          ?.botIcon ||
                        "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                      }
                      width={48}
                      height={48}
                    />

                    <input
                      type="file"
                      className={`input input-bordered w-full max-w-full`}
                      value={value?.botIcon}
                      onChange={(event) => {
                        onChange(event.target.files[0]);
                      }}
                    />
                  </div>
                )}
              /> */}
            </div>
          </form>

          <div className="divider divider-start my-10">
            <h2 className="text-purple-700 text-2xl">Bot Icon</h2>
          </div>

          <form
            onSubmit={handleBotIconSubmit(handleUploadBotIcon)}
            className="flex items-center gap-4 mt-4"
          >
            <div className="avatar">
              <div className="w-12 rounded-full">
                <img
                  src={
                    botIconSrc ||
                    widgetConfig?.data?.widgetConfig?.display?.chatIconProp
                      ?.botIcon ||
                    "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  }
                  width={48}
                  height={48}
                />
              </div>
            </div>

            <Controller
              name="botIcon"
              control={botIconControl}
              render={({ field: { onChange, value } }) => (
                <div className="form-control w-full max-w-xs">
                  <input
                    type="file"
                    value={value?.botIcon}
                    onChange={(event) => {
                      onChange(event.target.files[0]);
                    }}
                  />
                </div>
              )}
            />

            <button className="btn btn-primary btn-outline" type="submit">
              Upload
            </button>
          </form>
        </>
      )}
    </div>
  );
}
