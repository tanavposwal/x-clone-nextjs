import Link from "next/link";
import { auth } from "../auth";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

export default async function CreatePost() {
  const session = await auth();

  return (
    <div className="">
      {session?.user && (
        <Link
          className="bg-white hover:bg-neutral-200 transition-colors rounded-full md:py-3 p-3 flex gap-2 items-center justify-center md:pl-3 text-xl md:pr-5 group w-full"
          href={"/post/create"}
        >
          <PaperAirplaneIcon className="w-5 md:w-6 group-hover:-rotate-12 transition-transform stroke-black" />
          <p className="hidden md:block text-black font-bold">Post</p>
        </Link>
      )}
    </div>
  );
}
