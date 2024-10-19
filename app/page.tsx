import { auth } from "@/auth";
import Post from "@/components/Post";
import db from "@/db/db";
import { SessionProvider } from "next-auth/react";

export const dynamic = 'force-dynamic'

export default async function Home() {
  const posts = await db.post.findMany({ orderBy: {
    date: 'desc'
  },include: { author: true } })
  const session = await auth()

  return (
    <div className="flex flex-col h-auto">
      <SessionProvider>
      {posts.map(post => (
        <Post post={post} session={session!} key={post.id} />
      ))}
      </SessionProvider>
    </div>
  );
}
