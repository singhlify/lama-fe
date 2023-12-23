"use client";
import { useQuery } from "@tanstack/react-query";
import { getApi } from "./utils";

const getFile = async (fileId = "") => {
  const response = await getApi(`api/v1/file/${fileId}`);
  return response;
};

export const useGetFile = (fileId = "") => {
  return useQuery({
    queryKey: ["file", fileId],
    queryFn: () => getFile(fileId),
  });
};
