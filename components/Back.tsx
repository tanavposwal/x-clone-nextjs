"use client";

import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter, usePathname } from "next/navigation";

export default function Back() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="h-14 flex items-center px-4 bg-black/75 backdrop-blur-md sticky top-0 z-20 w-full border-b border-stone-800">
      {pathname == "/" ? (
        <div className="w-full flex items-center justify-center relative">
          <span className="">
            My Space
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
