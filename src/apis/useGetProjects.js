"use client";
import { useQuery } from "@tanstack/react-query";
import { getApi } from "./utils";

const getProjects = async () => {
  const response = await getApi("api/v1/project/all");
  return response;
};

export const useGetProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });
};
