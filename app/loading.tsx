export default function Loading() {
  return (
    <div className="w-full h-[80vh] flex items-center justify-center">
      <div
        className="animate-spin inline-block size-8 border-[2px] border-current border-t-transparent text-neutral-700 rounded-full"
        role="status"
        aria-label="loading"
      ></div>
    </div>
  );
}
