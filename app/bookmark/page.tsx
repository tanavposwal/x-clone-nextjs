import { auth } from "@/auth";
import Post from "@/components/Post";
import db from "@/db/db";

export default async function Bookmark() {

  await new Promise((resolve) => setTimeout(resolve, 3000))

  const session = await auth();

  const posts = await db.bookmark.findMany({
    where: { userId: session?.user?.id },
    include: { post: { include: {author: true} } }
  });

  return (
    <div className="flex flex-col h-auto">
      {posts.map((item) => (
        <Post post={item.post} session={session!} key={item.id} />
      ))}
      <div className="w-full h-24 flex items-center justify-center text-neutral-500">
        end of bookmark
      </div>
    </div>
  );
}
