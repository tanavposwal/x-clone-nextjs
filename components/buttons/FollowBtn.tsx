"use client";

export default function FollowBtn() {
  return (
    <div>
          {false ? (
            <div>
              <button
                className="px-6 py-2 bg-red-500 text-black font-semibold rounded-full hover:bg-red-400 transition"
              >
                Unfollow
              </button>
            </div>
          ) : (
            <div>
              <button
                className="px-6 py-2 bg-white rounded-full text-black hover:bg-slate-300 transition font-semibold"
              >
                Follow
              </button>
            </div>
          )}
        </div>
  );
}
