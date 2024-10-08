import {
  ChatBubbleOvalLeftIcon,
  ArrowPathRoundedSquareIcon,
  HeartIcon,
  BookmarkIcon,
  ArrowUpOnSquareIcon,
} from "@heroicons/react/24/outline";

export default async function ReactionSkeleton() {
  return (
    <div className="w-full">
        <div className="py-1 flex justify-between animate-pulse">
      <button className="p-2 bg-neutral-800 rounded-full">
        <ChatBubbleOvalLeftIcon className="w-5 stroke-neutral-800" />
      </button>
      <button className="p-2 bg-neutral-800 rounded-full">
        <ArrowPathRoundedSquareIcon className="w-5 stroke-neutral-800 transition-colors" />
      </button>
      <button className="p-2 bg-neutral-800 rounded-full">
          <HeartIcon className="w-5 stroke-neutral-800" />
      </button>
      <div className="flex gap-1">
        <button className="p-2 bg-neutral-800 rounded-full">
          <BookmarkIcon className="w-5 stroke-neutral-800" />
        </button>
        <button className="p-2 bg-neutral-800 rounded-full">
          <ArrowUpOnSquareIcon className="w-5 stroke-neutral-800" />
        </button>
      </div>
      </div>
    </div>
  );
}
