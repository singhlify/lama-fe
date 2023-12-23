"use client";

import { useCreateFile, useDeleteFile, useGetFiles } from "@/apis";
import { Empty, Loader, Input } from "@/components";
import { showToast } from "@/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import Link from "next/link";

const tableHeader = ["S.No.", , "Upload Date & Time", "Actions"];
const defaultFileValues = {
  fileName: "",
  fileDescription: "",
};

const fileSchema = z.object({
  fileName: z.string().min(1, { message: "File name is required" }),
  fileDescription: z.string(),
});

export default function FilesPage({ params: { projectId = "" } }) {
  const [showModal, setShowModal] = useState(false);
  const { data, isLoading, refetch } = useGetFiles(projectId);
  const { mutateAsync: createFile } = useCreateFile();
  const { mutateAsync: deleteFile } = useDeleteFile();

  const {
    handleSubmit: handleFileSubmit,
    control: fileControl,
    reset,
  } = useForm({
    defaultValues: defaultFileValues,
    resolver: zodResolver(fileSchema),
  });

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleCreateFile = async (data) => {
    reset();
    closeModal();
    const toastId = showToast({
      type: "loading",
      message: "Creating your file...",
    });

    try {
      const finalData = { projectId, ...data };
      const response = await createFile(finalData);
      if (response?.success) {
        refetch();
        showToast({
          type: "update",
          updateId: toastId,
          updateConfig: {
            type: "success",
            render: response?.message || "File Created",
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

  const handleDeleteFile = async (fileId) => {
    const toastId = showToast({
      type: "loading",
      message: "Deleting your file...",
    });

    try {
      const response = await deleteFile({ fileId });
      if (response?.success) {
        refetch();
        showToast({
          type: "update",
          updateId: toastId,
          updateConfig: {
            type: "success",
            render: response?.message || "File Deleted",
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

  return (
    <div className="max-w-6xl px-4 mx-auto min-h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-purple-700 text-5xl my-6">
          {data?.data?.projectName || "Project"}
        </h1>
        <button className="btn btn-primary" onClick={openModal}>
          Create New File
        </button>
      </div>

      <div className="overflow-x-auto max-h-[450px]">
        <table className="table table-zebra table-pin-rows">
          <thead>
            <tr>
              {tableHeader.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={4}>
                  <Loader />
                </td>
              </tr>
            ) : data?.data?.files?.length ? (
              data?.data?.files?.map((file, index) => (
                <tr key={file.id}>
                  <th>{index + 1}</th>
                  <td>{file.name}</td>
                  <td>
                    {file?.updatedAt ? `${new Date(file?.updatedAt)}` : ""}
                  </td>
                  <td className="flex gap-4">
                    <Link
                      href={`/projects/${projectId}/files/${file.id}?projectName=${data?.data?.projectName}`}
                    >
                      <button className="btn btn-sm btn-outline btn-primary">
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDeleteFile(file.id)}
                      className="btn btn-sm btn-outline btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4}>
                  <Empty />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <dialog open={showModal} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Create a New File</h3>
          <form onSubmit={handleFileSubmit(handleCreateFile)}>
            <div className="py-4">
              <Input
                name="fileName"
                label="File Name"
                placeholder="Type here"
                control={fileControl}
                className="!max-w-full"
              />

              <Input
                name="fileDescription"
                label="File Description"
                placeholder="Type here"
                control={fileControl}
                className="!max-w-full"
              />
            </div>

            <div className="modal-action">
              <button className="btn" onClick={closeModal}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}
