import { toast } from "react-toastify";

const defaultConfig = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

export const showToast = ({
  type = "success",
  message = "Some message",
  config = defaultConfig,
  updateId = "",
  updateConfig = {},
}) => {
  switch (type) {
    case "success":
      toast.success(message, config);
      break;
    case "error":
      toast.error(message, config);
      break;
    case "info":
      toast.info(message, config);
      break;
    case "warn":
      toast.warn(message, config);
      break;
    case "loading":
      return toast.loading(message);
    case "update":
      toast.update(updateId, updateConfig);
      break;
    default:
      toast(message, config);
  }
};
