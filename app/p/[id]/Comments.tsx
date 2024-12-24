import { auth } from "@/auth";
import db from "@/db/db";
import { TrashIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default async function Comments({ id }: { id: string }) {
  const comments = await db.comment.findMany({
    where: {
      postId: id,
    },
    include: {
      user: true,
    },
  });

  const session = await auth();

  return (
    <div>
      {comments.map((comment) => (
        <CommentCard
          comment={comment}
          key={comment.id}
          me={session?.user?.id!}
        />
      ))}
      <div className="h-96 text-sm text-neutral-600 flex items-center justify-center">
        end of comments ...
      </div>
    </div>
  );
}

function CommentCard({ comment, me }: { comment: any; me: string }) {
  return (
    <div className="w-full flex border-b border-neutral-800 px-5 py-3 antialiased justify-between items-center">
      <div className="flex">
      <div className="flex gap-3 items-start">
        <img
          className="w-9 h-9 rounded-full"
          src={comment.user.image}
          alt="profile"
        />
      </div>
      <div className="ml-2">
        <div className="flex gap-2 items-center text-sm">
          <Link
            href={"/u/" + comment.user.id}
            className="font-bold hover:underline"
          >
            {comment.user.id != me ? comment.user.name : "you"}
          </Link>
          <span className="text-neutral-500 text-xs">
            {comment.createdAt.toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
        <div className="text-md">{comment.content}</div>
      </div>
      </div>
      <div className="">
        <form action="">
          <button className="p-2 rounded-full hover:bg-red-500/20 transition-colors">
            <TrashIcon className="w-4 h-4 fill-red-500 stroke-0" />
          </button>
        </form>
      </div>
    </div>
  );
}
