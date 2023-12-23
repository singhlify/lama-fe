"use client";
import { useQuery } from "@tanstack/react-query";
import { getApi } from "./utils";

const getWidgetConfig = async (projectId = "") => {
  const response = await getApi(`api/v1/widgetConfig?projectId=${projectId}`);
  return response;
};

export const useGetWidgetConfig = (projectId = "") => {
  return useQuery({
    queryKey: ["widgetConfig", projectId],
    queryFn: () => getWidgetConfig(projectId),
  });
};
