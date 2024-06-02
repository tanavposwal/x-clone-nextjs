import db from "@/db/db";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import FormBtn from "@/components/buttons/FormBtn";

export default async function Home() {
  const session = await auth();

  async function CreatePost(formdata: FormData) {
    "use server";

    await db.post.create({
      data: {
        content: formdata.get("post") as string,
        authorId: session?.user?.id!,
        image: formdata.get("url") as string
      },
    });

    redirect("/");
  }

  return (
    <div className="px-3 mt-4">
      <div className="pt-2 font-semibold flex gap-3 items-center">
        <p>Write a post.</p>
      </div>
      <form action={CreatePost}>
        <textarea
          className="w-full h-32 border border-slate-600 rounded-lg mt-3 py-2 px-3 outline-none hover:border-white focus:border-white focus:ring-4 ring-white/30 transition text-lg"
          name="post"
        ></textarea>
        <div className="flex items-center justify-center">
          <span className="px-2 py-1 bg-green-400 rounded-md text-black font-black mr-3">
            #
          </span>
          <input
            type="text"
            className="w-full  border border-slate-600 rounded-lg my-3 py-2 px-3 outline-none hover:border-white focus:border-white focus:ring-4 ring-white/30 transition"
            placeholder="hashtags"
          />
        </div>
        <div className="flex items-center justify-center">
          <span className="px-2 py-1 bg-green-400 rounded-md text-black font-black mr-3">
            URL
          </span>
          <input
            type="text"
            className="w-full  border border-slate-600 rounded-lg my-3 py-2 px-3 outline-none hover:border-white focus:border-white focus:ring-4 ring-white/30 transition"
            placeholder="image"
            name="url"
          />
        </div>
        <div className="flex items-center justify-center">
          <span className="px-2 py-1 bg-green-400 rounded-md text-black font-black mr-3">
            URL
          </span>
          <input
            type="text"
            className="w-full  border border-slate-600 rounded-lg my-3 py-2 px-3 outline-none hover:border-white focus:border-white focus:ring-4 ring-white/30 transition"
            placeholder="video"
            name="videourl"
          />
        </div>
        <FormBtn text="Post" />
      </form>
    </div>
  );
}
