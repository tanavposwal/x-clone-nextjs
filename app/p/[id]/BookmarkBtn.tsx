"use client";

import { useState, useEffect } from "react";
import { fetchMark, updateMarkStatus } from "@/actions/bookmark";
import { BookmarkIcon, ShareIcon } from "@heroicons/react/24/outline";

export default function BookmarkBtn({
  id,
  user,
}: {
  id: string;
  user: string;
}) {
  const [marked, setMarked] = useState<any>({});

  useEffect(() => {
    async function fetchData() {
      const bool = await fetchMark(id, user);
      setMarked(bool);
    }
    fetchData();
  }, [id, user]);

  const handleMark = async () => {
    await updateMarkStatus(id, user, marked);
    setMarked(!marked);
  };

  return (
    <div className="flex gap-1">
      <button
        onClick={handleMark}
        className="p-2 rounded-full hover:bg-sky-500/10 transition-colors group"
      >
        {marked ? (
          <BookmarkIcon className="w-5 stroke-sky-500 fill-sky-500 transition-colors" />
        ) : (
          <BookmarkIcon className="w-5 stroke-neutral-300 group-hover:stroke-sky-500 transition-colors" />
        )}
      </button>
      <ShareBtn id={id} />
    </div>
  );
}

function ShareBtn({ id }: { id: string }) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check this out!",
          text: "Here is something interesting to share.",
          url: window.location.origin+"/post/id/"+id,
        });
        console.log("Content shared successfully!");
      } catch (error) {
        console.error("Error sharing content:", error);
      }
    } else {
      alert("Web Share API not supported in this browser.");
    }
  };

  return (
    <button className="p-2 rounded-full hover:bg-sky-500/10 transition-colors group" onClick={handleShare}>
      <ShareIcon className="w-5 stroke-neutral-300 group-hover:stroke-sky-500 transition-colors" />
    </button>
  );
}
