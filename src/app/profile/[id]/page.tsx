"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import PostCard from "@/app/components/PostCard";
import { getCookie, TOKEN_COOKIE } from "@/lib/auth/token";
import { getProfile, getProfilePosts, toggleFollow, toggleLike, toggleRetweet } from "@/lib/api/twitter";
import type { Post, User } from "@/types/twitter";

const ProfilePage = () => {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [profile, setProfile] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(true);

  const token = getCookie(TOKEN_COOKIE);

  const userId = params.id;

  const load = async (newPage = 1) => {
    if (!token) return router.push("/login");
    const [profileData, postsData] = await Promise.all([
      getProfile(token, userId),
      getProfilePosts(token, userId, newPage),
    ]);

    setProfile(profileData);
    setPosts(postsData.items);
    setPage(newPage);
    setHasNext(Boolean(postsData.meta.hasNext));
  };

  useEffect(() => {
    if (userId) {
      void load(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  if (!profile) return <p>Cargando perfil...</p>;

  return (
    <section className="pageSection">
      <article className="card">
        <h1>@{profile.username}</h1>
        <p>{profile.bio || "Sin bio"}</p>
        <p>
          Seguidores: {profile.followersCount ?? 0} · Siguiendo: {profile.followingCount ?? 0}
        </p>
        <button className="btn primary" onClick={() => void toggleFollow(token!, userId).then(() => load(page))}>
          {profile.isFollowing ? "Dejar de seguir" : "Seguir"}
        </button>
      </article>

      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onLike={async (id) => {
            await toggleLike(token!, id);
            await load(page);
          }}
          onRetweet={async (id) => {
            await toggleRetweet(token!, id);
            await load(page);
          }}
        />
      ))}

      <div className="pagination">
        <button className="btn" disabled={page <= 1} onClick={() => void load(page - 1)}>
          Anterior
        </button>
        <span>Página {page}</span>
        <button className="btn" disabled={!hasNext} onClick={() => void load(page + 1)}>
          Siguiente
        </button>
      </div>
    </section>
  );
};

export default ProfilePage;