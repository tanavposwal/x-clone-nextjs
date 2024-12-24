"use client";

import { useState, useEffect } from "react";
import { fetchMark, updateMarkStatus } from "@/actions/bookmark";
import { ArrowUpOnSquareIcon, BookmarkIcon } from "@heroicons/react/24/outline";

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
      <button className="p-2 rounded-full hover:bg-sky-500/20 transition-colors group">
        <ArrowUpOnSquareIcon className="w-5 stroke-neutral-300 group-hover:stroke-sky-500 transition-colors" />
      </button>
    </div>
  );
}
