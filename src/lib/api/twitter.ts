import axios from "axios";
import {
  AuthResponse,
  FollowResponse,
  HomeResponse,
  PostResponse,
  ProfileResponse,
  UserResponse,
} from "@/types/twitter";
import { STUDENT_HEADER_VALUE } from "./axios";

const api_url = "https://backend-p4-klvc.onrender.com";

const api = axios.create({
  baseURL: api_url,
  headers: {
    "x-student": STUDENT_HEADER_VALUE,
  },
});


export const register = async (
  username: string,
  email: string,
  password: string
): Promise<AuthResponse> => {
  const { data } = await api.post("/api/auth/register", {
    username,
    email,
    password,
  });

  return data;
};

export const login = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const { data } = await api.post("/api/auth/login", {
    email,
    password,
  });

  return data;
};

export const getMe = async (token: string): Promise<UserResponse> => {
  const { data } = await api.get("/api/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};


export const getHomePosts = async (
  token: string,
  page = 1
): Promise<HomeResponse> => {
  const { data } = await api.get(`/api/posts/home?page=${page}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const createPost = async (
  token: string,
  contenido: string
): Promise<PostResponse> => {
  const { data } = await api.post(
    "/api/posts",
    { contenido },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const getPostById = async (
  token: string,
  postId: string
): Promise<PostResponse> => {
  const { data } = await api.get(`/api/posts/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const deletePost = async (
  token: string,
  postId: string
): Promise<void> => {
  await api.delete(`/api/posts/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const toggleLikePost = async (
  token: string,
  postId: string
): Promise<PostResponse> => {
  const { data } = await api.post(
    `/api/posts/${postId}/like`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const retweetPost = async (
  token: string,
  postId: string
): Promise<PostResponse> => {
  const { data } = await api.post(
    `/api/posts/${postId}/retweet`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};


export const addComment = async (
  token: string,
  postId: string,
  contenido: string
): Promise<PostResponse> => {
  const { data } = await api.post(
    `/api/posts/${postId}/comments`,
    { contenido },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const getProfile = async (
  token: string,
  userId: string
): Promise<ProfileResponse> => {
  const { data } = await api.get(`/api/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const toggleFollow = async (
  token: string,
  userId: string
): Promise<FollowResponse> => {
  const { data } = await api.post(
    `/api/users/${userId}/follow`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};