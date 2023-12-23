import { useMutation } from "@tanstack/react-query";
import { postApi } from "@/apis/utils";

const login = async (data) => {
  const response = await postApi(`api/v1/auth/login`, data);
  return response;
};

export const useLogin = () => {
  return useMutation({
    mutationFn: (data) => login(data),
  });
};
