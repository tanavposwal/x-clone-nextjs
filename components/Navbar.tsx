import Link from "next/link";
import {
  AtSymbolIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  BellIcon,
  BookmarkIcon,
  UserIcon,
  Cog6ToothIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";
import CreatePost from "./CreatePost";
import Me from "./buttons/Me";
import { signOut, auth } from "@/auth";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="h-screen border-neutral-800 md:px-7 px-3 py-3 flex flex-col items-start justify-between gap-3 border-x w-fit">
      <a
        href="/"
        className="p-2 rounded-full hover:bg-white/10 transition-colors"
      >
        <AtSymbolIcon className="w-9 h-9 stroke-2" />
      </a>
      <div className="flex flex-col items-start justify-normal h-full">
        <Link href="/" className="nav-item">
          <HomeIcon className="w-7" />
          <p className="hidden md:block">Home</p>
        </Link>
        <Link href="/" className="nav-item">
          <MagnifyingGlassIcon className="w-7" />
          <p className="hidden md:block">Explore</p>
        </Link>
        <Link href="/" className="nav-item">
          <BellIcon className="w-7" />
          <p className="hidden md:block">Notification</p>
        </Link>
        <Link href="/bookmark" className="nav-item">
          <BookmarkIcon className="w-7" />
          <p className="hidden md:block">Bookmark</p>
        </Link>
        <Link href={`/u/${session?.user?.id}`} className="nav-item">
          <UserIcon className="w-7" />
          <p className="hidden md:block">Profile</p>
        </Link>
        <Link href="/" className="nav-item">
          <Cog6ToothIcon className="w-7" />
          <p className="hidden md:block">Settings</p>
        </Link>

        {session?.user && (
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button type="submit" className="nav-item">
              <PowerIcon className="w-7" />
              <p className="hidden md:block">Logout</p>
            </button>
          </form>
        )}
      </div>
      <div className="flex flex-col gap-5 w-full items-center justify-center">
        <CreatePost />
        <Me />
      </div>
    </nav>
  );
}
