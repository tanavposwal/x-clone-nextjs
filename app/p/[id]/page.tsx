import { auth } from "@/auth";
import db from "@/db/db";
import { HashtagIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReplyBtn from "./ReplyBtn";
import Comments from "./Comments";
import { Suspense } from "react";
import Reactions from "./Reactions";
import ReactionSkeleton from "./ReactionSkeleton";
import { revalidatePath } from "next/cache";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import Dropdown from "@/components/Dropdown";
import ProfileImage from "@/components/auth/ProfileImage";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const session = await auth();

  const post = await db.post.findUnique({
    where: { id: params.id },
    include: { author: true },
  });

  if (post == null) return notFound();

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

    const reply = formdata.get("reply") as string;

    if (reply && reply != "") {
      await db.comment.create({
        data: {
          content: reply,
          userId: session?.user?.id!,
          postId: params.id,
        },
      });
    }

    revalidatePath(`/post/id/${post?.id}`);
  }

  return (
    <main>
      <div className="w-full border-b border-neutral-800 px-5 py-3 antialiased relative">
        {post.authorId == session?.user?.id && (
          <Dropdown id={post.id} />
        )}
        <div className="flex items-center justify-between mb-3">
          <div className="flex w-full items-center justify-between">
            <div className="flex gap-2 items-center">
              <img
                className="w-9 h-9 rounded-full hover:opacity-85 transition-opacity bg-neutral-800"
                src={post.author.image!}
                alt="profile"
              />
              <Link
                href={"/u/" + post.author.id}
                className="font-semibold text-base hover:underline flex gap-1 items-center"
              >
                {post.author.name}
                {post.author.email == "tanavposwal939@gmail.com" && (
                  <CheckBadgeIcon className="w-5 h-5 fill-yellow-300" />
                )}
              </Link>
            </div>
          </div>
        </div>
        <div className="mb-2 text-lg">{post.content}</div>
        {post.image && (
          <div className="w-full flex">
            <img
              src={post.image}
              className="aspect-auto w-full min-h-[30vh] border border-neutral-700 rounded-2xl overflow-hidden select-none"
              alt="image"
              loading="eager"
            />
          </div>
        )}
        {post.video && (
          <div className="w-full flex relative">
            <div className="absolute right-3 top-3">
              <HashtagIcon className="w-6 h-6 stroke-2 stroke-white" />
            </div>
            <video
              className="aspect-auto w-full border border-neutral-700 rounded-2xl overflow-hidden"
              controlsList="nodownload nopip"
              controls
              muted
              loop
              autoPlay
            >
              <source src={post.video} type="video/mp4"></source>
            </video>
          </div>
        )}
        {repost && (
          <Link href={"/post/id/" + repost.id} className="w-fit h-fit">
            <div className="flex flex-col border border-neutral-800 antialiased hover:bg-white/5 transition-colors rounded-2xl gap-2">
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

        <div className="text-sm text-neutral-500 py-4">
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
        <div className="border-y border-neutral-800">
          <Suspense fallback={<ReactionSkeleton />}>
            <Reactions id={params.id} />
          </Suspense>
        </div>
        {session?.user && (
          <div className="w-full flex border-neutral-800 pt-2 antialiased gap-3 transition-all">
            <ProfileImage />
            <form action={handleReply} className="flex w-full pt-1 gap-3">
              <textarea
                className="text-lg outline-none w-full resize-y px-2 min-h-16"
                placeholder="Post your reply"
                name="reply"
              />
              <ReplyBtn />
            </form>
          </div>
        )}
      </div>
      <Suspense fallback={"loading..."}>
        <Comments id={params.id} />
      </Suspense>
    </main>
  );
}
