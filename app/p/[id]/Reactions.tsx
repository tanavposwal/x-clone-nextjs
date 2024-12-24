import { auth } from "@/auth";

import db from "@/db/db";
import {
  ChatBubbleOvalLeftIcon,
  ArrowPathRoundedSquareIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import LikePost from "./LikePost";
import BookmarkBtn from "./BookmarkBtn";

export default async function Reactions({ id }: { id: string }) {
  const session = await auth();
  if (session?.user == null) return "Not authenticated";

  const comments = await db.comment.count({
    where: {
      postId: id,
    },
  });

  return (
    <div className="py-1 w-full flex justify-between z-10">
      <div className="group flex items-center justify-center">
        <button className="p-2 rounded-full group-hover:bg-sky-500/10 transition-colors group">
          <ChatBubbleOvalLeftIcon className="w-5 stroke-neutral-300 group-hover:stroke-sky-500 transition-colors" />
        </button>
        <span className="group-hover:text-sky-500 text-sm -ml-1 font-mono">
          {comments}
        </span>
      </div>
      <Link
        href={"/post/create?repost=" + id}
        className="p-2 rounded-full hover:bg-green-500/10 transition-colors group"
      >
        <ArrowPathRoundedSquareIcon className="w-5 stroke-neutral-300 group-hover:stroke-green-500 transition-colors" />
      </Link>
      <LikePost id={id} user={session?.user?.id!} />
      <BookmarkBtn id={id} user={session?.user?.id!} />
    </div>
  );
}

