import { auth } from "@/auth";
import db from "@/db/db";
import {
  ChatBubbleOvalLeftIcon,
  ArrowPathRoundedSquareIcon,
  HeartIcon,
  BookmarkIcon,
  ArrowUpOnSquareIcon,
} from "@heroicons/react/24/outline";
import { revalidatePath } from "next/cache";

export default async function Reactions({ id }: { id: string }) {

  const session = await auth();
  if (session?.user == null) return "Not authenticated";

  return (
    <div className="py-1 w-full border-y border-slate-800 flex justify-between">
      <button className="p-2 rounded-full hover:bg-sky-500/20 transition-colors group">
        <ChatBubbleOvalLeftIcon className="w-5 stroke-slate-300 group-hover:stroke-sky-500 transition-colors" />
      </button>
      <button className="p-2 rounded-full hover:bg-green-500/20 transition-colors group">
        <ArrowPathRoundedSquareIcon className="w-5 stroke-slate-300 group-hover:stroke-green-500 transition-colors" />
      </button>
      <LikeBtn id={id} user={session?.user?.id!} />
      <UserBtn id={id} user={session?.user?.id!} />
    </div>
  );
}

async function UserBtn({ id, user }: { id: string; user: string }) {
  const marked = await db.bookmark.findFirst({
    where: {
      userId: user,
      postId: id,
    },
  });

  return (
    <div className="flex gap-1">
      <form
        action={async () => {
          "use server";

          if (marked) {
            await db.bookmark.deleteMany({
              where: {
                userId: user,
                postId: id,
              },
            });
          } else {
            await db.bookmark.create({
              data: {
                userId: user,
                postId: id,
              },
            });
          }

          revalidatePath(`/post/id/${id}`);
        }}
      >
        <button
          type="submit"
          className="p-2 rounded-full hover:bg-sky-500/20 transition-colors group"
        >
          {marked ? (
            <BookmarkIcon className="w-5 stroke-sky-500 fill-sky-500 transition-colors" />
          ) : (
            <BookmarkIcon className="w-5 stroke-slate-300 group-hover:stroke-sky-500 transition-colors" />
          )}
        </button>
      </form>
      <button className="p-2 rounded-full hover:bg-sky-500/20 transition-colors group">
        <ArrowUpOnSquareIcon className="w-5 stroke-slate-300 group-hover:stroke-sky-500 transition-colors" />
      </button>
    </div>
  );
}

async function LikeBtn({ id, user }: { id: string; user: string }) {
  const likes = await db.like.count({ where: { postId: id } });
  const liked = await db.like.findFirst({
    where: { postId: id, userId: user },
  });

  if (liked) {
    return (
      <form
        action={async () => {
          "use server";

          await db.like.deleteMany({
            where: {
              userId: user,
              postId: id,
            },
          });

          revalidatePath(`/post/id/${id}`);
        }}
      >
        <button
          type="submit"
          className="group flex items-center justify-center"
        >
          <div className="p-2 rounded-full group-hover:bg-pink-500/20 transition-colors">
            <HeartIcon className="w-5 stroke-pink-600 fill-pink-600 group-hover:scale-110 group-active:scale-90 transition" />
          </div>
          <span className="text-pink-600 text-sm">{likes}</span>
        </button>
      </form>
    );
  }

  return (
    <form
      action={async () => {
        "use server";

        await db.like.create({
          data: {
            userId: user,
            postId: id,
          },
        });

        revalidatePath(`/post/id/${id}`);
      }}
    >
      <button type="submit" className="group flex items-center justify-center">
        <div className="p-2 rounded-full group-hover:bg-pink-500/20 transition-colors">
          <HeartIcon className="w-5 stroke-slate-300 group-hover:stroke-pink-600 transition group-hover:scale-110 group-active:scale-90" />
        </div>
        <span className="group-hover:text-pink-600 text-sm">{likes}</span>
      </button>
    </form>
  );
}
