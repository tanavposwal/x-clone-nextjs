"use client";

import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { fetchLikes, updateLikeStatus } from "@/actions/likes";
import { HeartIcon } from "@heroicons/react/24/outline";

export default function LikePost({ id, user }: { id: string; user: string }) {
  const [likes, setLikes] = useState<number>(0);
  const [liked, setLiked] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      const { likesCount, likedStatus } = await fetchLikes(id, user);
      setLikes(likesCount);
      setLiked(likedStatus);
    }
    fetchData();
  }, [id, user]);

  const handleLike = async () => {
    await updateLikeStatus(id, user, liked);
    setLikes(liked ? likes - 1 : likes + 1);
    setLiked(!liked);
    if (!liked) {
      confetti();
    }
  };

  return (
    <button onClick={handleLike}>
      {liked ? (
        <button
          type="submit"
          className="group flex items-center justify-center"
        >
          <div className="p-2 rounded-full group-hover:bg-pink-500/10 transition-colors">
            <HeartIcon className="w-5 stroke-pink-600 fill-pink-600 group-hover:scale-130 group-active:scale-80 transition" />
          </div>
          <span className="text-pink-600 text-sm -ml-1 font-mono">{likes}</span>
        </button>
      ) : (
        <button
          type="submit"
          className="group flex items-center justify-center"
        >
          <div className="p-2 rounded-full group-hover:bg-pink-500/10 transition-colors">
            <HeartIcon className="w-5 stroke-neutral-300 group-hover:stroke-pink-600 transition group-hover:scale-110 group-active:scale-90" />
          </div>
          <span className="group-hover:text-pink-600 text-sm w-fit -ml-1 font-mono">
            {likes}
          </span>
        </button>
      )}
    </button>
  );
}
