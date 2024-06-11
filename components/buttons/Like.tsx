import { FiHeart } from "react-icons/fi";

export default function Like() {
  return (
    <button
      className="text-xl hover:scale-125 transition"
    >
      {true ? <FiHeart className="stroke-red-500 fill-red-500" /> : <FiHeart className="stroke-neutral-400 fill-neutral-400" />}
      
    </button>
  );
}
