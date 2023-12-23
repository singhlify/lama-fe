import { useMutation } from "@tanstack/react-query";
import { putApi } from "@/apis/utils";

const updateUser = async (data) => {
  const response = await putApi(`api/v1/user/update`, data);
  return response;
};

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: (data) => updateUser(data),
  });
};
