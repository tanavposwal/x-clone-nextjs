import Link from "next/link";

export default async function Comments() {
  return (
    <div>
      
      <div className="h-96 text-sm text-slate-600 flex items-center justify-center">
        end of comments ...
      </div>
    </div>
  );
}

function CommentCard({ comment }: { comment: any }) {
    return (
        <div className="w-full flex border-b border-slate-800 px-5 py-1 antialiased hover:bg-white/5 transition-colors">
        <div className="pt-2 flex gap-3 items-start">
          <img
            className="w-10 h-10 rounded-full"
            src={comment.author.image}
            alt="profile"
          />
        </div>
        <div className="ml-2">
          <div className="flex gap-2 items-center text-sm mt-2">
            <Link href={"/profile/id/"+comment.author.id} className="font-bold hover:underline">
              {comment.author.name}
            </Link>
            <span className="text-slate-500 text-xs">{comment.date.toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}</span>
          </div>
          <div className="mb-2 text-md">{comment.content}</div>
          {comment.image && (
            <div className="w-full flex">
              <img
                src={comment.image}
                className="aspect-auto h-[30vh] border border-slate-700 rounded-xl overflow-hidden"
                alt="image"
              />
            </div>
          )}
          <div className="text-sm text-slate-500 py-2">
            0 likes • 0 comments • share • bookmark
          </div>
        </div>
      </div>
    )
}
