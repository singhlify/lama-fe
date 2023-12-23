"use client";
import { useQuery } from "@tanstack/react-query";
import { getApi } from "./utils";

const getFiles = async (projectId = "") => {
  const response = await getApi(`api/v1/file/all?projectId=${projectId}`);
  return response;
};

export const useGetFiles = (projectId = "") => {
  return useQuery({
    queryKey: ["files", projectId],
    queryFn: () => getFiles(projectId),
  });
};
