import axios from "axios";

export const getApi = async (url) => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BE_URL}/${url}`,
      { withCredentials: true }
    );
    return {
      data: data?.data,
      message: data?.message,
      success: true,
    };
  } catch (error) {
    throw error?.response?.data?.error || "Server Error";
  }
};

export const postApi = async (url, payLoad) => {
  try {
    const { data, status } = await axios.post(
      `${process.env.NEXT_PUBLIC_BE_URL}/${url}`,
      payLoad
    );
    return {
      data: data?.data,
      message: data?.message,
      success: status < 400,
    };
  } catch (error) {
    return {
      data: null,
      message: error?.response?.data?.error || "Server Error",
      success: false,
    };
  }
};

export const postApiFormData = async (url, form) => {
  try {
    const { data, status } = await axios.post(
      `${process.env.NEXT_PUBLIC_BE_URL}/${url}`,
      form
    );
    return {
      data: data?.data,
      message: data?.message,
      success: status < 400,
    };
  } catch (error) {
    return {
      data: null,
      message: error?.response?.data?.error || "Server Error",
      success: false,
    };
  }
};

export const putApi = async (url, payLoad) => {
  try {
    const { data, status } = await axios.put(
      `${process.env.NEXT_PUBLIC_BE_URL}/${url}`,
      payLoad
    );
    return {
      data: data?.data,
      message: data?.message,
      success: status === 200,
    };
  } catch (error) {
    return {
      data: null,
      message: error?.response?.data?.error || "Server Error",
      success: false,
    };
  }
};

export const deleteApi = async (url, payLoad) => {
  try {
    const { data, status } = await axios.delete(
      `${process.env.NEXT_PUBLIC_BE_URL}/${url}`,
      { data: payLoad }
    );
    return {
      data: data?.data,
      message: data?.message,
      success: status === 200,
    };
  } catch (error) {
    return {
      data: null,
      message: error?.response?.data?.error || "Server Error",
      success: false,
    };
  }
};
