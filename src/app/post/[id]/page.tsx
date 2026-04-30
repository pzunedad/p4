"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import PostCard from "@/app/components/PostCard";
import { getCookie, TOKEN_COOKIE } from "@/lib/auth/token";
import { getPostById, retweetPost, likePost} from "@/lib/api/twitter";
import type { PostResponse } from "@/types/twitter";

const PostPage = () => {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [post, setPost] = useState<PostResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const token = getCookie(TOKEN_COOKIE);
  const postId = params.id;

  const load = async () => {
    if (!token) return router.push("/login");
    try {
      setError(null);
      const postData = await getPostById(postId);
      setPost(postData);
    } catch {
      setError("No se pudo cargar el post.");
    }
  };

  useEffect(() => {
    if (postId) {
      void load();
    }
  }, [postId]);

  if (error) return <p>{error}</p>;
  if (!post) return <p>Cargando post...</p>;

  return (
    <section className="pageSection">
      <PostCard
        post={post}
        onLike={async (id) => {
          await likePost(id);
          await load();
        }}
        onRetweet={async (id) => {
          await retweetPost(id);
          await load();
        }}
      />
    </section>
  );
};

export default PostPage;