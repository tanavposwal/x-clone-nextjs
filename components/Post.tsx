import { HashtagIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default async function Post({ post }: { post: any }) {
  return (
    <Link href={"/post/id/" + post.id} key={post.hash}>
      <div className="w-full flex border-b border-slate-800 px-5 py-1 antialiased hover:bg-white/5 transition-colors">
        <div className="pt-2 flex gap-3 items-start">
          <img
            className="w-10 h-10 rounded-full"
            src={post.author.image}
            alt="profile"
          />
        </div>
        <div className="ml-2">
          <div className="flex gap-2 items-center text-sm mt-2">
            <Link
              href={"/profile/id/" + post.author.id}
              className="font-bold hover:underline"
            >
              {post.author.name}
            </Link>
            <span className="text-slate-500 text-xs">
              {post.date.toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="mb-2 text-md">{post.content}</div>
          {post.image && (
            <div className="w-full flex">
              <img
                src={post.image}
                className="aspect-auto w-auto max-w-md border border-slate-700 rounded-2xl overflow-hidden min-h-[25vh] select-none"
                draggable={false}
                alt="image"
              />
            </div>
          )}
          {post.video && (
            <div className="w-full flex relative">
              <div className="absolute right-3 top-3">
                <HashtagIcon className="w-6 h-6 stroke-2 stroke-white mix-blend-exclusion" />
              </div>
              <video
                className="aspect-auto max-w-md border border-slate-700 rounded-2xl overflow-hidden select-none"
                draggable={false}
                controlsList="nodownload nopip"
                preload="metadata"
                controls
              >
                <source src={post.video} type="video/mp4"></source>
              </video>
            </div>
          )}
          <div className="text-sm text-slate-500 py-2">
            0 likes • 0 comments • share • bookmark
          </div>
        </div>
      </div>
    </Link>
  );
}
