"use client";

import Link from "next/link";
import type { PostResponse } from "@/types/twitter";

type Props = {
  post: PostResponse;
  onLike: (id: string) => Promise<void>;
  onRetweet: (id: string) => Promise<void>;
};

const PostCard = ({ post, onLike, onRetweet }: Props) => {
  return (
    <article className="card">
      <Link href={`/post/${post._id}`} className="postLink">
        <header className="cardHeader">
          <strong>@{post.autor.username}</strong>
        </header>
        <p>{post.contenido}</p>
      </Link>
      <footer className="actions">
        <button className="btn" onClick={() => onLike(post._id)}>
          ❤️ {post.likes.length}
        </button>
        <button className="btn" onClick={() => onRetweet(post._id)}>
          🔁 {post.retweets.length}
        </button>
      </footer>
    </article>
  );
};

export default PostCard;