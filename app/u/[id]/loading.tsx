export default function Loading() {
  return (
    <div className="px-5 mt-4 animate-pulse">
      <div className="pb-2 px-6">
        <div className="pb-4 pt-8 flex flex-col gap-3">
          <div className="w-28 h-28 rounded-full bg-white/20" />
          <div className="flex">
            <div className="flex flex-1 flex-col justify-center">
              <p className="text-2xl font-extrabold w-full bg-neutral-300"></p>
              <div className="flex flex-col gap-2">
                <div className="text-md font-medium h-5 w-32 bg-white/20 rounded-full" />
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="h-12 w-32 bg-white/20 rounded-full" />
            </div>
          </div>
        </div>
        <div className="text-sm">
          <div className="h-4 w-48 rounded-full bg-white/20" />
        </div>
      </div>
    </div>
  );
}
