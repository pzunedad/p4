import {
  AuthResponse,
  FollowResponse,
  HomeResponse,
  PostResponse,
  ProfileResponse,
  UserResponse,
} from "@/types/twitter";
import { api, authHeaders } from "./axios";

export const register = async (
  username: string,
  email: string,
  password: string
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    "/api/auth/register",
    { username, email, password },
    { headers: authHeaders() }
  );

  return response.data;
};

export const login = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    "/api/auth/login",
    { email, password },
    { headers: authHeaders() }
  );

  return response.data;
};

export const getMe = async (token: string): Promise<UserResponse> => {
  const response = await api.get<UserResponse>("/api/auth/me", {
    headers: authHeaders(token),
  });

  return response.data;
};

export const getHomePosts = async (
  token: string,
  page = 1
): Promise<HomeResponse> => {
  const response = await api.get<HomeResponse>(`/api/home?page=${page}`, {
    headers: authHeaders(token),
  });

  return response.data;
};

export const createPost = async (
  token: string,
  contenido: string
): Promise<PostResponse> => {
  const response = await api.post<PostResponse>(
    "/api/posts",
    { contenido },
    { headers: authHeaders(token) }
  );

  return response.data;
};

export const getPostById = async (
  token: string,
  postId: string
): Promise<PostResponse> => {
  const response = await api.get<PostResponse>(`/api/posts/${postId}`, {
    headers: authHeaders(token),
  });

  return response.data;
};

export const deletePost = async (
  token: string,
  postId: string
): Promise<void> => {
  await api.delete(`/api/posts/${postId}`, {
    headers: authHeaders(token),
  });
};

export const toggleLikePost = async (
  token: string,
  postId: string
): Promise<PostResponse> => {
  const response = await api.post<PostResponse>(
    `/api/posts/${postId}/like`,
    {},
    { headers: authHeaders(token) }
  );

  return response.data;
};

export const retweetPost = async (
  token: string,
  postId: string
): Promise<PostResponse> => {
  const response = await api.post<PostResponse>(
    `/api/posts/${postId}/retweet`,
    {},
    { headers: authHeaders(token) }
  );

  return response.data;
};

export const addComment = async (
  token: string,
  postId: string,
  contenido: string
): Promise<PostResponse> => {
  const response = await api.post<PostResponse>(
    `/api/posts/${postId}/comment`,
    { contenido },
    { headers: authHeaders(token) }
  );

  return response.data;
};

export const getProfile = async (
  token: string,
  userId: string
): Promise<ProfileResponse> => {
  const response = await api.get<ProfileResponse>(`/api/users/${userId}/profile`, {
    headers: authHeaders(token),
  });

  return response.data;
};

export const toggleFollow = async (
  token: string,
  userId: string
): Promise<FollowResponse> => {
  const response = await api.post<FollowResponse>(
    `/api/users/${userId}/follow`,
    {},
    { headers: authHeaders(token) }
  );

  return response.data;
};