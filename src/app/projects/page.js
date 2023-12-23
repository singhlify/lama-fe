"use client";

import { useCreateProject, useGetProjects } from "@/apis";
import { Card, Empty, Loader, Input } from "@/components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { showToast } from "@/utils";

const defaultProjectValues = {
  name: "",
};

const projectSchema = z.object({
  name: z.string().min(1, { message: "Project name is required" }),
});

export default function ProjectsPage() {
  const [showModal, setShowModal] = useState(false);
  const { data: projects, isLoading, refetch } = useGetProjects();
  const { mutateAsync: createProject } = useCreateProject();

  const {
    handleSubmit: handleProjectSubmit,
    control: projectControl,
    reset,
  } = useForm({
    defaultValues: defaultProjectValues,
    resolver: zodResolver(projectSchema),
  });

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleCreateProject = async (data) => {
    reset();
    closeModal();
    const toastId = showToast({
      type: "loading",
      message: "Creating your project...",
    });

    try {
      const response = await createProject(data);
      if (response?.success) {
        refetch();
        showToast({
          type: "update",
          updateId: toastId,
          updateConfig: {
            type: "success",
            render: response?.message || "Project Created",
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
    <main>
      <div className="flex justify-between max-w-7xl mx-auto my-8">
        <h1 className="text-purple-700 text-5xl">Projects</h1>
        <button className="btn btn-primary" onClick={openModal}>
          Create New Project
        </button>
      </div>

      {isLoading ? (
        <Loader />
      ) : projects?.data?.length > 0 ? (
        <div className="grid grid-cols-4 gap-4 mx-auto my-8 max-w-7xl">
          {projects?.data?.map((project) => {
            return (
              <Card
                key={project.projectId}
                title={project.projectName}
                redirectUrl={`/projects/${project.projectId}/files`}
              />
            );
          })}
        </div>
      ) : (
        <Empty />
      )}

      <dialog open={showModal} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Create a New Project</h3>
          <form onSubmit={handleProjectSubmit(handleCreateProject)}>
            <div className="py-4">
              <Input
                name="name"
                label="Project Name"
                placeholder="Type here"
                control={projectControl}
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
    </main>
  );
}
