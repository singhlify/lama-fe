import { useMutation } from "@tanstack/react-query";
import { postApi } from "@/apis/utils";

const logout = async () => {
  const response = await postApi(`api/v1/user/logout`);
  return response;
};

export const useLogout = () => {
  return useMutation({
    mutationFn: logout,
  });
};
