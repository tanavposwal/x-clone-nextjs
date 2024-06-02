import Link from "next/link"
import { auth } from "../auth"

export default async function CreatePost() {
    const session = await auth()

    return (
    <div className="">
        {session?.user && 
        <Link
          className="bg-blue-500 py-4 px-24 rounded-full"
          href={"/post/create"}
        >
          Post
        </Link>}
      </div>
    )
}