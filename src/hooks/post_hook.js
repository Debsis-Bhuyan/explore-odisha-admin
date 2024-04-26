import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../utils";
export const useAnalytics = (toast, toggle, token) => {
  return useMutation({
    mutationFn: async (val) => {
      toggle();
      const { data } = await axios.post(
        `${API_URL}/posts/admin-analytics?query=${val}}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    },
    onError: (error, data) => {
      toggle();
      const errMsg = error?.response?.data?.message;
      toast.error(errMsg ?? error?.message);
    },
    onSuccess: (data) => {
      toggle();
      toast.success(data?.message);
    },
  });
};
export const useCreatePost = (toast, toggle, token) => {
  return useMutation({
    mutationFn: async (formData) => {
      toggle();
      const { data } = await axios.post(
        `${API_URL}/posts/create-post`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      return data;
    },
    onError: (error, data) => {
      toggle();
      const errMsg = error?.response?.data?.message;
      toast.error(errMsg ?? error.message);
    },
    onSuccess: (data) => {
      toggle();
      console.log(data);
      toast.success(data?.message);
      setTimeout(() => {
        window.location.replace("/contents");
      }, 2000);
    },
  });
};

export const useContent = (toast, toggle, token) => {
  return useMutation({
    mutationFn: async (page) => {
      toggle();
      const { data } = await axios.post(
        `${API_URL}/posts/admin-content?page=${page}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    },
    onError: (error, data) => {
      toggle();
      const errMsg = error?.response?.data?.message;
      toast.error(errMsg ?? error.message);
    },
    onSuccess: (data) => {
      toggle();
      toast.success(data?.message);
    },
  });
};
export const useDeletePost = (toast, token) => {
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await axios.delete(`${API_URL}/posts/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    onError: (error, data) => {
      const errMsg = error?.response?.data?.message;
      toast.error(errMsg ?? error.message);
    },
    onSuccess: (data) => {
      toast.success(data?.message);
    },
  });
};
export const useAction = (toast, token) => {
  return useMutation({
    mutationFn: async ({ id, status }) => {
      const { data } = await axios.patch(
        `${API_URL}/posts/update/${id}`,
        { status: status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    },
    onError: (error, data) => {
      const errMsg = error?.response?.data?.message;
      toast.error(errMsg ?? error.message);
    },
    onSuccess: (data) => {
      toast.success(data?.message);
    },
  });
};
export const useComments = (toast, token) => {
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await axios.get(`${API_URL}/posts/comments/${id}`);
      return data;
    },
  });
};
export const useDeleteComment = (token) => {
  return useMutation({
    mutationFn: async ({ id, postId }) => {
      const { data } = await axios.delete(
        `${API_URL}/posts/comment/${id}/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    },
  });
};
export const useContact = (toast, toggle, token) => {
  return useMutation({
    mutationFn: async () => {
      toggle();
      const { data } =await axios.get(`${API_URL}/contacts/contact-data`,
       
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    },
    onError: (error, data) => {
      toggle();
      const errMsg = error?.response?.data?.message;
      toast.error(errMsg ?? error.message);
    },
    onSuccess: (data) => {
      toggle();
      toast.success(data?.message);
    },
  });
};
