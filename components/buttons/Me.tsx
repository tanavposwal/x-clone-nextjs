"use cache";

import { auth, signIn } from "@/auth";
import ProfileImage from "../auth/ProfileImage";
import { PowerIcon } from "@heroicons/react/24/outline";

export default async function Me() {
  const session = await auth();

  return (
    <div>
      {session?.user ? (
        <div className="hover:bg-white/10 transition flex rounded-full md:p-2 p-0 items-center gap-4 cursor-pointer">
          <ProfileImage />
          <h1 className="text-md font-bold md:block hidden">{session.user.name}</h1>
        </div>
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
