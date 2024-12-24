"use cache";

import { auth, signIn } from "@/auth";
import ProfileImage from "../auth/ProfileImage";
import { PowerIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default async function Me() {
  const session = await auth();

  return (
    <div>
      {session?.user ? (
        <Link className="hover:bg-white/10 transition flex rounded-full md:p-3 p-0 items-center gap-4 cursor-pointer" href={"/profile/id/"+session.user.id}>
          <ProfileImage />
          <h1 className="text-md font-bold md:block hidden">{session.user.name}</h1>
        </Link>
      ) : (
        <form
            action={async () => {
              "use server";
              await signIn();
            }}
          >
        <button
          className="nav-item"
          type="submit"
        >
          <PowerIcon className="w-7 h-7" />
          <p className="hidden md:block">
          Signin
          </p>
        </button>
        </form>
      )}
    </div>
  );
}
