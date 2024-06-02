import Back from "@/components/Back";
import FollowBtn from "@/components/buttons/FollowBtn";
import db from "@/db/db";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic'

export default async function Page({ params }: { params: { id: string } }) {
  const user = await db.user.findUnique({ where: { id: params.id } });

  if (user == null) return notFound()

  return (
    <div className="px-5 mt-4">
      <div className="border-b pb-2 px-6 border-slate-800">
        <div className="pb-4 pt-8 flex flex-col gap-3">
          <img className="w-28 h-28 rounded-full select-none" src={user.image!} alt="user" />
          <div className="flex">
            <div className="flex flex-1 flex-col justify-center">
              <p className="text-2xl font-extrabold">{user.name}</p>
              <p className="text-md font-semibold text-slate-300">
                _flag_feature_future
              </p>
            </div>
            <div className="flex items-center justify-center">
              <FollowBtn />
            </div>
          </div>
        </div>
        <div className="text-sm">
          <p className="text-slate-400">
            joined {user.createdAt.toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
          </p>
        </div>
        <div className="flex gap-2 divide-slate-400 text-sm text-slate-400">
          <div className="flex gap-2 text-slate-400">
            <p className="text-slate-400">_flag_future</p>
            <p className="text-slate-400">followers</p>
          </div>
          <p className="text-slate-400">•</p>
          <div className="flex gap-2 text-slate-400">
            <p className="text-slate-400">_flag_future</p>
            <p className="text-slate-400">following</p>
          </div>
        </div>
      </div>
    </div>
  );
}
