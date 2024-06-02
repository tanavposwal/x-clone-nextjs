import Link from "next/link";
import {
  HashtagIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  BellIcon,
  BookmarkIcon,
  UserIcon,
  ArrowLeftStartOnRectangleIcon,
  Cog6ToothIcon
} from "@heroicons/react/24/outline";
import CreatePost from "./CreatePost";
import Me from "./buttons/Me";
import { signOut, auth } from "@/auth";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="h-screen w-72 border-slate-800 px-7 py-3 flex flex-col items-start justify-between gap-3 fixed border-r">
      <a href="/" className="p-2 rounded-full hover:bg-white/10 transition-colors">
        <HashtagIcon className="w-9 h-9 stroke-2" />
      </a>
      <div className="flex flex-col gap-2 items-start justify-normal w-full h-full">
        <Link
          href="/"
          className="hover:bg-white/10 transition rounded-full py-3 flex gap-3 items-center px-5 text-xl font-bold"
        >
          <HomeIcon className="w-7" />
          Home
        </Link>
        <Link
          href="/"
          className="hover:bg-white/10 transition rounded-full py-3 flex gap-3 items-center px-5 text-xl font-bold"
        >
          <MagnifyingGlassIcon className="w-7" />
          Explore
        </Link>
        <Link
          href="/"
          className="hover:bg-white/10 transition rounded-full py-3 flex gap-3 items-center px-5 text-xl font-bold"
        >
          <BellIcon className="w-7" />
          Notification
        </Link>
        <Link
          href="/bookmark"
          className="hover:bg-white/10 transition rounded-full py-3 flex gap-3 items-center px-5 text-xl font-bold"
        >
          <BookmarkIcon className="w-7" />
          Bookmark
        </Link>
        <Link
          href="/"
          className="hover:bg-white/10 transition rounded-full py-3 flex gap-3 items-center px-5 text-xl font-bold"
        >
          <UserIcon className="w-7" />
          Profile
        </Link>
        <Link
          href="/"
          className="hover:bg-white/10 transition rounded-full py-3 flex gap-3 items-center px-5 text-xl font-bold"
        >
          <Cog6ToothIcon className="w-7" />
          Setting
        </Link>

        {session?.user && (
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button
              type="submit"
              className="hover:bg-white/10 transition rounded-full py-3 flex gap-3 items-center px-5 text-xl font-bold"
            >
              <ArrowLeftStartOnRectangleIcon className="w-7" />
              Logout
            </button>
          </form>
        )}
      </div>
      <div className="flex flex-col gap-5">
        <CreatePost />
        <Me />
      </div>
    </nav>
  );
}
