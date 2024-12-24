import ReactionSkeleton from "@/app/p/[id]/ReactionSkeleton";
import Reactions from "@/app/p/[id]/Reactions";
import db from "@/db/db";
import { HashtagIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Suspense } from "react";
import VideoElement from "@/components/VideoElement";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { Session } from "next-auth";

export default async function Post({ post, session }: { post: any, session: Session }) {
  
  let repost;
  if (post?.repost) {
    repost = await db.post.findUnique({
      where: { id: post.repost },
      include: {
        author: true,
      },
    });
  }

  return (
    <div className="w-full flex border-b border-neutral-800 px-4 pt-3 pb-0 antialiased hover:bg-white/5 transition-colors cursor-pointer relative">
      <div className="w-11">
        <img
          className="w-10 h-10 rounded-full bg-neutral-800"
          src={post.author.image || "https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg"}
          alt="profile"
        />
      </div>
      <div className="ml-3 w-full flex flex-col">
        <div className="flex gap-2 items-center text-sm">
          <Link
            href={"/u/" + post.author.id}
            className="font-bold hover:underline flex gap-1"
          >
            {post.author.name}
            {post.author.email == "tanavposwal939@gmail.com" && <CheckBadgeIcon className="w-5 h-5 fill-yellow-300" />}
          </Link>
          <span className="text-neutral-500 text-xs">
            {post.date.toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
        <Link href={"/p/" + post.id} key={post.hash}>
          <div className="text-md">{post.content}</div>
          {post.image && (
            <div className="w-full flex mt-2">
              <img
                src={post.image}
                className="aspect-auto w-auto border border-neutral-700 rounded-2xl overflow-hidden max-h-[70vh] select-none"
                draggable={false}
                alt="image"
              />
            </div>
          )}
          {post.video && (
            <div className="w-fit flex relative mt-2">
              <div className="absolute right-3 top-3">
                <HashtagIcon className="w-7 h-7 stroke-[2px] stroke-white drop-shadow-2xl" />
              </div>
              <VideoElement video={post.video} />
            </div>
          )}
          {repost && (
            <Link href={"/post/id/" + repost.id} className="mt-2">
              <div className="w-fit flex flex-col border border-neutral-800 antialiased hover:bg-white/5 transition rounded-2xl gap-2">
                <div className="flex gap-2 items-center justify-start pt-3 px-3">
                  <img
                    className="w-6 h-6 rounded-full"
                    src={repost.author.image!}
                    alt="profile"
                  />
                  <Link
                    href={"/u/" + repost.author.id}
                    className="font-bold"
                  >
                    {repost.author.name}
                  </Link>
                  <span className="text-neutral-500 text-xs">
                    {repost.date.toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="text-md px-3">{repost.content}</div>
                {repost.image && (
                  <img
                    src={repost.image}
                    className="aspect-auto rounded-b-2xl overflow-hidden h-auto select-none"
                    draggable={false}
                    alt="image"
                  />
                )}
              </div>
            </Link>
          )}
        </Link>
        <Suspense fallback={<ReactionSkeleton />}>
          <Reactions id={post.id} />
        </Suspense>
      </div>
    </div>
  );
}
