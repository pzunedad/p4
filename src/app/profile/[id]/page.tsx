"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import PostCard from "@/app/components/PostCard";
import { getCookie, TOKEN_COOKIE } from "@/lib/auth/token";
import { getProfile, retweetPost, toggleFollow, toggleLikePost } from "@/lib/api/twitter";
import type { PostResponse, UserResponse } from "@/types/twitter";

const ProfilePage = () => {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [profile, setProfile] = useState<UserResponse | null>(null);
  const [posts, setPosts] = useState<PostResponse[]>([]);
  const [error, setError] = useState<string | null>(null);

  const token = getCookie(TOKEN_COOKIE);
  const userId = params.id;

  const load = async () => {
    if (!token) return router.push("/login");
    try {
      setError(null);
      const profileData = await getProfile(token, userId);
      setProfile(profileData.user);
      setPosts(profileData.posts);
    } catch {
      setError("No se pudo cargar el perfil.");
    }
  };

  useEffect(() => {
    if (userId) {
      void load();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  if (error) return <p>{error}</p>;
  if (!profile) return <p>Cargando perfil...</p>;

  return (
    <section className="pageSection">
      <article className="card">
        <h1>@{profile.username}</h1>
        <p>{profile.email}</p>
        <button className="btn primary" onClick={() => void toggleFollow(token!, userId).then(load)}>
          Seguir / Dejar de seguir
        </button>
      </article>

      {posts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          onLike={async (id) => {
            await toggleLikePost(token!, id);
            await load();
          }}
          onRetweet={async (id) => {
            await retweetPost(token!, id);
            await load();
          }}
        />
      ))}
    </section>
  );
};

export default ProfilePage;