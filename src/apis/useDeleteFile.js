import { useMutation } from "@tanstack/react-query";
import { deleteApi } from "@/apis/utils";

const deleteFile = async (data) => {
  const response = await deleteApi("api/v1/file/delete", data);
  return response;
};

export const useDeleteFile = () => {
  return useMutation({
    mutationFn: (data) => deleteFile(data),
  });
};
