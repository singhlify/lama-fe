"use client";

import { useGetFile, useUpdateFile } from "@/apis";
import { Loader, Textarea } from "@/components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
import { showToast } from "@/utils";

const defaultFileValues = {
  fileDescription: "",
};

const fileSchema = z.object({
  fileDescription: z.string(),
});

export default function FilePage({
  params: { fileId = "" },
  searchParams: { projectName = "" },
}) {
  const [editTable, setEditTable] = useState(false);
  const { data, isLoading, refetch } = useGetFile(fileId);
  const { mutateAsync: updateFile } = useUpdateFile();

  const {
    handleSubmit: handleFileSubmit,
    control: fileControl,
    reset,
    setValue,
  } = useForm({
    defaultValues: defaultFileValues,
    resolver: zodResolver(fileSchema),
  });

  const handleUpdateFile = async (data) => {
    reset();
    const toastId = showToast({
      type: "loading",
      message: "Updating your file...",
    });

    try {
      const finalData = { fileId, ...data };
      const response = await updateFile(finalData);
      if (response?.success) {
        refetch();
        showToast({
          type: "update",
          updateId: toastId,
          updateConfig: {
            type: "success",
            render: response?.message || "File Updated",
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
    setEditTable(false);
  };

  useEffect(() => {
    setValue("fileDescription", data?.data?.fileDescription);
  }, [data?.data?.fileDescription]);

  return (
    <div className="max-w-6xl px-4 mx-auto min-h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-purple-700 text-5xl my-6">
          {data?.data?.fileName || "File"}
        </h1>
        <div className="flex gap-4">
          {editTable ? (
            <>
              <button
                className="btn btn-error btn-outline"
                onClick={() => setEditTable(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                form="updateFileDescription"
                className="btn btn-primary"
              >
                Save
              </button>
            </>
          ) : (
            <button
              className="btn btn-primary btn-outline"
              onClick={() => setEditTable(true)}
            >
              Edit
            </button>
          )}
        </div>
      </div>

      <div className="">
        {isLoading ? (
          <Loader />
        ) : (
          <form
            onSubmit={handleFileSubmit(handleUpdateFile)}
            name="updateFileDescription"
            id="updateFileDescription"
          >
            <Textarea
              name="fileDescription"
              placeholder="File Description"
              control={fileControl}
              disabled={!editTable}
              rows={14}
            />
          </form>
        )}
      </div>
    </div>
  );
}
