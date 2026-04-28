"use client";

import Link from "next/link";
import type { Post } from "@/types/twitter";

type Props = {
  post: Post;
  onLike: (id: string) => Promise<void>;
  onRetweet: (id: string) => Promise<void>;
};

const PostCard = ({ post, onLike, onRetweet }: Props) => {
  return (
    <article className="card">
      <Link href={`/post/${post.id}`} className="postLink">
        <header className="cardHeader">
          <strong>@{post.author.username}</strong>
          <small>{new Date(post.createdAt).toLocaleString()}</small>
        </header>
        <p>{post.content}</p>
      </Link>
      <footer className="actions">
        <button className="btn" onClick={() => onLike(post.id)}>
          ❤️ {post.likesCount}
        </button>
        <button className="btn" onClick={() => onRetweet(post.id)}>
          🔁 {post.retweetsCount}
        </button>
      </footer>
    </article>
  );
};

export default PostCard;