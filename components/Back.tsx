"use client";

import { useRouter, usePathname } from "next/navigation";

export default function Back() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="border-r border-b border-slate-800 h-14 flex items-center justify-start px-4 bg-black/65 backdrop-blur-md fixed w-auto z-10">
      {pathname == "/" ? (
        <h2 className="font-black mx-4 text-xl">Home</h2>
      ) : (
        <button
          className="text-slate-300 px-2 py-1 rounded-full hover:bg-white/10 transition-colors"
          onClick={() => router.back()}
        >
          {"<"} back
        </button>
      )}
    </div>
  );
}
