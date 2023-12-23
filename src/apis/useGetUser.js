"use client";
import { useQuery } from "@tanstack/react-query";
import { getApi } from "./utils";

const getUser = async () => {
  const response = await getApi("api/v1/user");
  return response;
};

export const useGetUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
};
