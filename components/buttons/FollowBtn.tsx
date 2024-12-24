"use client";

export default function FollowBtn() {
  return (
    <div>
      {false ? (
        <div>
          <button className="px-6 py-2 bg-red-500 text-black font-semibold rounded-full hover:bg-red-400 transition">
            Unfollow
          </button>
        </div>
      ) : (
        <div>
          <button className="px-7 py-1.5 bg-white rounded-full text-black hover:bg-neutral-200 active:bg-neutral-300 transition font-semibold">
            Follow
          </button>
        </div>
      )}
    </div>
  );
}
