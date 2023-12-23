import { useMutation } from "@tanstack/react-query";
import { postApiFormData } from "@/apis/utils";

const uploadBotIcon = async (data) => {
  const response = await postApiFormData(`api/v1/widgetConfig/upload`, data);
  return response;
};

export const useUploadBotIcon = () => {
  return useMutation({
    mutationFn: (data) => uploadBotIcon(data),
  });
};
