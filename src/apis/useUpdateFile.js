import { useMutation } from "@tanstack/react-query";
import { putApi } from "@/apis/utils";

const updateFile = async (data) => {
  const response = await putApi(`api/v1/file/update`, data);
  return response;
};

export const useUpdateFile = () => {
  return useMutation({
    mutationFn: (data) => updateFile(data),
  });
};
