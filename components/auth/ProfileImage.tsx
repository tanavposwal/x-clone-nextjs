import { auth } from "@/auth";
import { cache } from "react";

const getUser = cache(async () => {
  const session = await auth();
  return session?.user;
});

export default async function ProfileImage({ className = "md:w-8 w-10 md:h-8 h-10 rounded-full" }: { className?: string }) {
  const user = await getUser();

  if (!user) return null;

  return (
    <img
      className={className}
      src={
        user.image ||
        "https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg"
      }
      alt={`${user.name}'s profile`}
    />
  );
}
