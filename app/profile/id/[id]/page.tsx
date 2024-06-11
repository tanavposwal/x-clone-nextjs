import { auth } from "@/auth";
import Post from "@/components/Post";
import EditProfile from "@/components/buttons/EditProfile";
import FollowBtn from "@/components/buttons/FollowBtn";
import db from "@/db/db";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";

import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { id: string } }) {
  const session = await auth()

  const user = await db.user.findUnique({
    where: {
      id: params.id
    },
    include: {
      post: {
        include: {
          author: true
        }
      }
    }
  });

  if (user == null) return notFound();

  return (
    <section>
      <div>
        <img
          src="https://png.pngtree.com/thumb_back/fh260/background/20220215/pngtree-pure-original-warm-solid-banner-background-image_923708.jpg"
          className="h-48 w-full"
          alt=""
        />

        <div className="flex relative h-16">
          <img
            className="w-36 h-36 border-4 absolute border-black rounded-full select-none bottom-0 left-6"
            src={user.image!}
            alt="user"
          />
          <div className="flex w-full items-center justify-end px-4">
            { session?.user?.id == user.id ? <EditProfile /> : <FollowBtn />}
            
          </div>
        </div>
      </div>

      <div className="px-4 border-b border-neutral-800 pb-2">
        <div className="flex flex-col my-4">
          <p className="text-xl font-extrabold flex gap-2 items-center">
            {user.name}
            <CheckBadgeIcon className="w-5 h-5 fill-blue-400" />
          </p>
          <p className="text-md text-neutral-500">@auser</p>
        </div>

        <p className="mb-2">{user.bio}</p>

        <div className="text-sm flex gap-4 mb-2">
          <p className="text-neutral-500 flex gap-1 items-center w-fit">
            <CalendarDaysIcon className="w-4 h-4 stroke-neutral-500" />
            Joined{" "}
            {user.createdAt.toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
            })}
          </p>
        </div>

        <div className="flex gap-4 text-md mb-2">
          <div className="flex gap-1 text-neutral-400 items-center hover:underline cursor-pointer">
            <p className="font-bold">0</p>
            <p className="text-neutral-500">Following</p>
          </div>
          <div className="flex gap-1 text-neutral-400 items-center hover:underline cursor-pointer">
            <p className="font-bold">33M</p>
            <p className="text-neutral-500">Followers</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col h-auto">
        {user.post.map((post) => (
          <Post post={post} session={session!} key={post.id} />
        ))}
      </div>
    </section>
  );
}
