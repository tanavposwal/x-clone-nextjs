"use client";

import { deletePost } from "@/actions/delete";
import { TrashIcon } from "@heroicons/react/24/outline";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export default function Dropdown({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const deletePostWithId = deletePost.bind(null, id)

  return (
    <div>
      <button
        className="p-1 absolute rounded-full hover:bg-sky-500/20 transition-colors group top-3 right-3"
        onClick={toggleDropdown}
      >
        <EllipsisHorizontalIcon className="w-6 h-6 fill-neutral-500 group-hover:fill-sky-500" />
      </button>

        <div
          className={
            "absolute right-4 top-12 w-48 rounded-xl bg-black z-50 overflow-hidden border-neutral-600 transition-all border "+(isOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-3 opacity-0")
          }
        >
          <form action={deletePostWithId}>
            <button
              type="submit"
              className="text-white w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition-colors flex gap-2 items-center"
              role="menuitem"
            >
              <TrashIcon className="w-4 h-4" />
              Delete
            </button>
          </form>
        </div>

    </div>
  );
}
