"use client";

import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";

export default function Me() {
  const session = useSession();

  return (
    <div>
      {session.data?.user ? (
        <div className="hover:bg-white/10 transition flex rounded-full p-3 items-center gap-4 cursor-pointer">
          <img
            className="w-10 h-10 rounded-full"
            src={session.data?.user?.image!}
          />
          <h1 className="text-md font-bold">{session.data.user.name}</h1>
        </div>
      ) : (
        <button
          className="px-8 py-3 hover:bg-white/10 transition w-full text-lg font-bold rounded-full items-center gap-2 flex"
          onClick={() => signIn()}
        >
          <ArrowRightEndOnRectangleIcon className="w-8 h-8" />
          Signin
        </button>
      )}
    </div>
  );
}
