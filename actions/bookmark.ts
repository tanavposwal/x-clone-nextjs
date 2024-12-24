"use server";

import prisma from "@/db/db";

export async function fetchMark(id: string, user: string) {
  const marked = await prisma.bookmark.findFirst({
    where: {
      userId: user,
      postId: id,
    },
  });
  return marked;
}

export async function updateMarkStatus(
  id: string,
  user: string,
  marked: boolean
) {
  if (marked) {
    await prisma.bookmark.deleteMany({
      where: {
        userId: user,
        postId: id,
      },
    });
  } else {
    await prisma.bookmark.create({
      data: {
        userId: user,
        postId: id,
      },
    });
  }
}
