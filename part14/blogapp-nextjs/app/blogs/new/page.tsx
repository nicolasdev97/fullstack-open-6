import { redirect } from "next/navigation";
import { blogs } from "@/lib/blogs";
import { revalidatePath } from "next/dist/server/web/spec-extension/revalidate";

async function createBlog(formData: FormData) {
  "use server";

  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const url = formData.get("url") as string;

  const newBlog = {
    id: blogs.length + 1,
    title,
    author,
    url,
    likes: 0,
  };

  blogs.push(newBlog);

  revalidatePath("/blogs");

  redirect("/blogs");
}

export default function NewBlogPage() {
  return (
    <div>
      <h1>Create New Blog</h1>

      <form action={createBlog}>
        <div>
          <label>Title</label>
          <br />
          <input name="title" />
        </div>

        <div>
          <label>Author</label>
          <br />
          <input name="author" />
        </div>

        <div>
          <label>URL</label>
          <br />
          <input name="url" />
        </div>

        <br />

        <button type="submit">Create Blog</button>
      </form>
    </div>
  );
}
