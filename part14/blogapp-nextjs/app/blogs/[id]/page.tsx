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
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">{blog.title}</h1>

      <div className="space-y-4 text-lg">
        <p>
          <strong>Author:</strong> {blog.author}
        </p>

        <p>
          <strong>URL:</strong> {blog.url}
        </p>

        <p>
          <strong>Likes:</strong> {blog.likes}
        </p>
      </div>

      <form action={likeBlog} className="mt-6">
        <input type="hidden" name="id" value={blog.id} />

        <button
          type="submit"
          className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
        >
          Like
        </button>
      </form>
    </div>
  );
}
