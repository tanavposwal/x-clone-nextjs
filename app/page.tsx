import Post from "@/components/Post";
import db from "@/db/db";

export const dynamic = 'force-dynamic'

export default async function Home() {
  const posts = await db.post.findMany({ include: { author: true } })

  return (
    <div className="flex flex-col h-auto">
      {posts.map(post => (
        <Post post={post} />
      ))}
    </div>
  );
}
