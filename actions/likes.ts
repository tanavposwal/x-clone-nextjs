"use server";

import prisma from "@/db/db";

export async function fetchLikes(id: string, user: string) {
  const likesCount = await prisma.like.count({ where: { postId: id } });
  const likedStatus = await prisma.like.findFirst({
    where: { postId: id, userId: user },
  });
  return { likesCount, likedStatus: !!likedStatus };
}

export async function updateLikeStatus(id: string, user: string, liked: boolean) {
  if (liked) {
    await prisma.like.deleteMany({
      where: {
        userId: user,
        postId: id,
      },
    });
  } else {
    await prisma.like.create({
      data: {
        userId: user,
        postId: id,
      },
    });
  }
}