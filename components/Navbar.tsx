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
    <nav className="h-screen border-neutral-800 px-7 py-3 md:flex flex-col items-start justify-between gap-3 fixed border-x w-0 sm:w-72 hidden">
      <a href="/" className="p-2 rounded-full hover:bg-white/10 transition-colors">
        <HashtagIcon className="w-9 h-9 stroke-2" />
      </a>
      <div className="flex flex-col items-start justify-normal w-full h-full">
        <Link
          href="/"
          className="nav-item"
        >
          <HomeIcon className="w-7" />
          Home
        </Link>
        <Link
          href="/"
          className="nav-item"
        >
          <MagnifyingGlassIcon className="w-7" />
          Explore
        </Link>
        <Link
          href="/"
          className="nav-item"
        >
          <BellIcon className="w-7" />
          Notification
        </Link>
        <Link
          href="/bookmark"
          className="nav-item"
        >
          <BookmarkIcon className="w-7" />
          Bookmark
        </Link>
        <Link
          href={`/profile/id/${session?.user?.id}`}
          className="nav-item"
        >
          <UserIcon className="w-7" />
          Profile
        </Link>
        <Link
          href="/"
          className="nav-item"
        >
          <Cog6ToothIcon className="w-7" />
          Settings
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
              className="nav-item"
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
