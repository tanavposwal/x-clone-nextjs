import { FaSpinner } from "react-icons/fa";

export default function Loading() {
  return (
    <div className="w-full h-[80vh] flex items-center justify-center">
      <div
        className="animate-spin inline-block size-10 border-[4px] border-current border-t-transparent text-sky-500 rounded-full"
        role="status"
        aria-label="loading"
      ></div>
    </div>
  );
}
