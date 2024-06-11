import Link from "next/link"
import { auth } from "../auth"

export default async function CreatePost() {
    const session = await auth()

    return (
    <div className="">
        {session?.user && 
        <Link
          className="bg-sky-500 hover:bg-sky-600 transition-colors py-4 px-24 rounded-full text-lg font-bold"
          href={"/post/create"}
        >
          Post
        </Link>}
      </div>
    )
}