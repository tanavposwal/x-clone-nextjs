import { auth, signIn } from "@/auth";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/solid";

export default async function Me() {
  const session = await auth();

  return (
    <div>
      {session?.user ? (
        <div className="hover:bg-white/10 transition flex rounded-full p-3 items-center gap-4 cursor-pointer">
          <img
            className="w-10 h-10 rounded-full"
            src={session.user.image || "https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg"}
          />
          <h1 className="text-md font-bold">{session.user.name}</h1>
        </div>
      ) : (
        <form
            action={async () => {
              "use server";
              await signIn();
            }}
          >
        <button
          className="px-8 py-3 hover:bg-white/10 transition w-full text-lg font-bold rounded-full items-center gap-2 flex"
          type="submit"
        >
          <ArrowRightEndOnRectangleIcon className="w-8 h-8" />
          Signin
        </button>
        </form>
      )}
    </div>
  );
}
