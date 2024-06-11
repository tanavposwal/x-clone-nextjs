import db from "@/db/db";
import { auth } from "@/auth";
import { notFound, redirect } from "next/navigation";
import FormBtn from "@/components/buttons/FormBtn";
import AddMedia from "@/components/AddMedia";
import Link from "next/link";

export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const session = await auth();
  let repost: any;

  if (searchParams?.repost) {
    try {
      repost = await db.post.findUnique({
        where: { id: searchParams.repost as string },
        include: {
          author: true,
        },
      });
    } catch (error) {
      notFound();
    }
  }

  async function CreatePost(formdata: FormData) {
    "use server";

    const content = formdata.get("post") as string;
    const authorId = session?.user?.id!;
    const image = formdata.get("image") as string;
    const video = formdata.get("video") as string;

    if (image != null) {
      await db.post.create({
        data: {
          content,
          authorId,
          repost: (repost ? searchParams?.repost! as string : null),
          image,
        },
      });
    } else if (video != null) {
      await db.post.create({
        data: {
          content,
          authorId,
          repost: (repost ? searchParams?.repost! as string : null),
          video,
        },
      });
    } else {
      await db.post.create({
        data: {
          content,
          authorId,
          repost: (repost ? searchParams?.repost! as string : null),
        },
      });
    }

    redirect("/");
  }

  return (
    <div className="px-3 mt-4">
      <div className="pt-2 font-semibold flex items-center">
        <p>Write a post.</p>
      </div>
      <form action={CreatePost}>

        {repost && (
        <div className="mt-3 mb-4">
            <span className="pl-2 text-xs text-neutral-400 italic">repost</span>
            <Link href={"/post/id/" + repost.id}>
            <div className="w-full flex flex-col border border-neutral-800 p-3 antialiased hover:bg-white/5 transition-colors rounded-2xl gap-2">
              <div className="flex gap-2 items-center justify-start">
                <img
                  className="w-6 h-6 rounded-full"
                  src={repost.author.image!}
                  alt="profile"
                />
                <span
                  className="font-bold"
                >
                  {repost.author.name}
                </span>
                <span className="text-neutral-500 text-xs">
                  {repost.date.toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
                <div className="text-md">{repost.content}</div>
            </div>
            </Link>
          </div>
          )}

        <textarea
          className="w-full h-32 py-2 px-3 text-lg form-inp"
          name="post"
          placeholder="Whats is your brain"
        ></textarea>

        <AddMedia />
        <FormBtn text="Post" />
      </form>
    </div>
  );
}
