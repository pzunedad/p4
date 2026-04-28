"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PostCard from "./components/PostCard";
import { getCookie, TOKEN_COOKIE } from "@/lib/auth/token";
import type { PostResponse } from "@/types/twitter";

const Home = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<PostResponse[]>([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(true);
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);

  const token = getCookie(TOKEN_COOKIE);

  const load = async (newPage = 1) => {
    if (!token) return router.push("/login");
    try {
      setError(null);
      const result = await getFeed(token, newPage);
      setPosts(result.items);
      setPage(newPage);
      setHasNext(Boolean(result.meta.hasNext));
    } catch {
      setError("No se pudieron cargar los posts.");
    }
  };

  useEffect(() => {
    void load(1);
  }, []);

  const onPublish = async (e: FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !token) return;
    setContent("");
    await load(1);
  };

  const onLike = async (id: string) => {
    if (!token) return;
    await load(page);
  };

  const onRetweet = async (id: string) => {
    if (!token) return;
    await load(page);
  };

  return (
    <section className="pageSection">
      <h1>Inicio</h1>
      <form className="card" onSubmit={onPublish}>
        <textarea
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="¿Qué está pasando?"
          required
        />
        <button className="btn primary" type="submit">
          Publicar
        </button>
      </form>

      {error && <p>{error}</p>}
      {posts.map((post) => (
        <PostCard key={post._id} post={post} onLike={onLike} onRetweet={onRetweet} />
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

export default Home;