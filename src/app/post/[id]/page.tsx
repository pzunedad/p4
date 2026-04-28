"use client";

import { FormEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createComment, getComments, getPostDetail, toggleLike, toggleRetweet } from "@/lib/api/twitter";
import { getCookie, TOKEN_COOKIE } from "@/lib/auth/token";
import type { Comment, Post } from "@/types/twitter";

const PostDetailPage = () => {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [comment, setComment] = useState("");

  const token = getCookie(TOKEN_COOKIE);

  const load = async () => {
    if (!token) return router.push("/login");
    const [postData, commentsData] = await Promise.all([
      getPostDetail(token, params.id),
      getComments(token, params.id, 1),
    ]);
    setPost(postData);
    setComments(commentsData.items);
  };

  useEffect(() => {
    if (params.id) {
      void load();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const onComment = async (e: FormEvent) => {
    e.preventDefault();
    if (!token || !comment.trim()) return;
    await createComment(token, params.id, comment);
    setComment("");
    await load();
  };

  if (!post) return <p>Cargando...</p>;

  return (
    <section className="pageSection">
      <article className="card">
        <header className="cardHeader">
          <strong>@{post.author.username}</strong>
          <small>{new Date(post.createdAt).toLocaleString()}</small>
        </header>
        <p>{post.content}</p>
        <div className="actions">
          <button className="btn" onClick={() => void toggleLike(token!, post.id).then(load)}>
            ❤️ {post.likesCount}
          </button>
          <button className="btn" onClick={() => void toggleRetweet(token!, post.id).then(load)}>
            🔁 {post.retweetsCount}
          </button>
        </div>
      </article>

      <form className="card" onSubmit={onComment}>
        <textarea
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Escribe un comentario"
          required
        />
        <button className="btn primary" type="submit">
          Comentar
        </button>
      </form>

      {comments.map((item) => (
        <article className="card" key={item.id}>
          <header className="cardHeader">
            <strong>@{item.author.username}</strong>
            <small>{new Date(item.createdAt).toLocaleString()}</small>
          </header>
          <p>{item.content}</p>
        </article>
      ))}
    </section>
  );
};

export default PostDetailPage;