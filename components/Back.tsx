"use client";

import { ArrowLeftIcon, HashtagIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { useRouter, usePathname } from "next/navigation";

export default function Back() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="h-14 flex items-center px-4 bg-black/75 backdrop-blur-md sticky top-0 z-20 w-full border-b border-stone-800">
      {pathname == "/" ? (
        <div className="w-full flex items-center justify-center relative">
          <button
            className="text-neutral-300 flex gap-4 text-xl font-bold items-center absolute left-0"
          >
            <span className="p-2 rounded-full hover:bg-white/10 transition-colors active:bg-white/20">
              <Bars3Icon className="w-6 h-6 stroke-2" />
            </span>
          </button>
          <span className="">
            <HashtagIcon className="w-6 h-6 stroke-2" />
          </span>
        </div>
      ) : (
        <button
          className="text-neutral-300 flex gap-4 text-xl font-bold items-center"
          onClick={() => router.back()}
        >
          <span className="p-2 rounded-full hover:bg-white/10 transition-colors active:bg-white/20">
            <ArrowLeftIcon className="w-5 h-5" />
          </span>
        </button>
      )}
    </div>
  );
}
