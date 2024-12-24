import { auth } from "@/auth";
import { cache } from "react";

export default async function ProfileImage({ className = "md:w-8 w-10 md:h-8 h-10 rounded-full" }: { className?: string }) {
  const session = await auth();

  if (session?.user == null) return null;

  return (
    <img
      className={className}
      src={
        session!.user?.image ||
        "https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg"
      }
      alt={`${session!.user.name}'s profile`}
    />
  );
}
