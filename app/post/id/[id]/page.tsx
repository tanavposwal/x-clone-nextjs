import { auth } from "@/auth";
import db from "@/db/db";
import {
  EllipsisHorizontalIcon,
  HashtagIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReplyBtn from "./ReplyBtn";
import Comments from "./Comments";
import { Suspense } from "react";
import Reactions from "./Reactions";
import ReactionSkeleton from "./ReactionSkeleton";

export default async function Page({ params }: { params: { id: string } }) {
  const session = await auth();

  const post = await db.post.findUnique({
    where: { id: params.id },
    include: { author: true },
  });

  let repost;
  if (post?.repost) {
    repost = await db.post.findUnique({
      where: { id: post.repost },
      include: {
        author: true,
      },
    });
  }

  async function handleReply(formdata: FormData) {
    "use server";

    console.log("replying");
  }

  if (post == null) return notFound();

  return (
    <main>
      <div className="w-full border-b border-slate-800 px-5 py-3 antialiased">
        <div className="flex items-center justify-between mb-3">
          <div className="flex w-full items-center justify-between">
            <div className="flex gap-2 items-center">
              <img
                className="w-10 h-10 rounded-full"
                src={post.author.image!}
                alt="profile"
              />
              <Link
                href={"/profile/id/" + post.author.id}
                className="font-semibold hover:underline outline-1 text-base"
              >
                {post.author.name}
              </Link>
            </div>
            <button className="p-1 rounded-full hover:bg-sky-500/20 transition-colors group">
              <EllipsisHorizontalIcon className="w-6 h-6 stroke-slate-500 group-hover:stroke-sky-500" />
            </button>
          </div>
        </div>
        <div className="w-full">
          <div className="mb-2 text-lg">{post.content}</div>
          {post.image && (
            <div className="w-full flex">
              <img
                src={post.image}
                className="aspect-auto w-full border border-slate-700 rounded-2xl overflow-hidden select-none"
                alt="image"
                loading="eager"
              />
            </div>
          )}
          {post.video && (
            <div className="w-full flex relative">
              <div className="absolute right-3 top-3">
                <HashtagIcon className="w-6 h-6 stroke-2 stroke-white mix-blend-exclusion" />
              </div>
              <video
                className="aspect-auto w-full border border-slate-700 rounded-2xl overflow-hidden"
                controlsList="nodownload nopip"
                controls
              >
                <source src={post.video} type="video/mp4"></source>
              </video>
            </div>
          )}
          {repost && (
            <Link href={"/post/id/" + repost.id}>
            <div className="w-full flex flex-col border border-slate-800 p-3 antialiased hover:bg-white/5 transition-colors rounded-2xl gap-2">
              <div className="flex gap-2 items-center justify-start">
                <img
                  className="w-6 h-6 rounded-full"
                  src={repost.author.image!}
                  alt="profile"
                />
                <Link
                  href={"/profile/id/" + repost.author.id}
                  className="font-bold hover:underline"
                >
                  {repost.author.name}
                </Link>
                <span className="text-slate-500 text-xs">
                  {repost.date.toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
                <div className="text-md">{repost.content}</div>
            </div>
            </Link>
          )}

          <div className="text-sm text-slate-500 py-2">
            {post.date.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            •{" "}
            {post.date.toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </div>
          <Suspense fallback={<ReactionSkeleton />}>
            <Reactions id={params.id} />
          </Suspense>
          <div className="w-full flex border-slate-800 pt-2 antialiased gap-3">
            <img
              src={session?.user?.image!}
              className="w-10 h-10 rounded-full"
            />
            <form action={handleReply} className="flex w-full pt-1 gap-3">
              <textarea
                className="text-lg outline-none w-full resize-y border rounded-md border-slate-900 px-2 py-1 min-h-16"
                placeholder="Post your reply"
              />
              <ReplyBtn />
            </form>
          </div>
        </div>
      </div>
      <Suspense fallback={"loading..."}>
        <Comments />
      </Suspense>
    </main>
  );
}
