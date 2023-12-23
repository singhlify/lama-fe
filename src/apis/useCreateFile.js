import { useMutation } from "@tanstack/react-query";
import { postApi } from "@/apis/utils";

const createFile = async (data) => {
  const response = await postApi(`api/v1/file/create`, data);
  return response;
};

export const useCreateFile = () => {
  return useMutation({
    mutationFn: (data) => createFile(data),
  });
};
