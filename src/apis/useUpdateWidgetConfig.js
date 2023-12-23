import { useMutation } from "@tanstack/react-query";
import { putApi } from "@/apis/utils";

const updateWidgetConfig = async (data) => {
  const response = await putApi(`api/v1/widgetConfig/update`, data);
  return response;
};

export const useUpdateWidgetConfig = () => {
  return useMutation({
    mutationFn: (data) => updateWidgetConfig(data),
  });
};
