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
      <button className="p-2">
        <ChatBubbleOvalLeftIcon className="w-5 stroke-neutral-800" />
      </button>
      <button className="p-2">
        <ArrowPathRoundedSquareIcon className="w-5 stroke-neutral-800 transition-colors" />
      </button>
      <button className="p-2">
          <HeartIcon className="w-5 stroke-neutral-800" />
      </button>
      <div className="flex gap-1">
        <button className="p-2">
          <BookmarkIcon className="w-5 stroke-neutral-800" />
        </button>
        <button className="p-2">
          <ArrowUpOnSquareIcon className="w-5 stroke-neutral-800" />
        </button>
      </div>
      </div>
    </div>
  );
}
