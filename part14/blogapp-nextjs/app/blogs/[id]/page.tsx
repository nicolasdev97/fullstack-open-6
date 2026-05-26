import { redirect } from "next/navigation";
import { getBlogById, likeBlog as likeBlogService } from "@/lib/blogs";
import { revalidatePath } from "next/cache";

type BlogPageProps = {
  params: Promise<{
    id: string;
  }>;
};

async function likeBlog(formData: FormData) {
  "use server";

  const id = Number(formData.get("id"));

  await likeBlogService(id);

  revalidatePath(`/blogs/${id}`);
  revalidatePath(`/blogs`);

  redirect(`/blogs/${id}`);
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { id } = await params;

  const blog = await getBlogById(Number(id));

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div>
      <h1>{blog.title}</h1>

      <p>
        <strong>Author:</strong> {blog.author}
      </p>

      <p>
        <strong>URL:</strong> {blog.url}
      </p>

      <p>
        <strong>Likes:</strong> {blog.likes}
      </p>

      <form action={likeBlog}>
        <input type="hidden" name="id" value={blog.id} />

        <button type="submit">Like</button>
      </form>
    </div>
  );
}
