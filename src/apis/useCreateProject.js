import { useMutation } from "@tanstack/react-query";
import { postApi } from "@/apis/utils";

const createProject = async (data) => {
  const response = await postApi(`api/v1/project/create`, data);
  return response;
};

export const useCreateProject = () => {
  return useMutation({
    mutationFn: (data) => createProject(data),
  });
};
