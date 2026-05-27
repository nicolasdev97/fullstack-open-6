import { redirect } from "next/navigation";
import { getBlogById, likeBlog as likeBlogService } from "@/lib/blogs";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { addToReadingList } from "@/lib/users";

async function handleAddToReadingList(formData: FormData) {
  "use server";

  const session = await auth();

  if (!session?.user) {
    return;
  }

  const blogId = Number(formData.get("blogId"));

  await addToReadingList(Number(session.user.id), blogId);

  revalidatePath("/me");
}

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
  const session = await auth();

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

      {session?.user && Number(session.user.id) !== blog.userId && (
        <form action={handleAddToReadingList} className="mt-4">
          <input type="hidden" name="blogId" value={blog.id} />

          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Add to reading list
          </button>
        </form>
      )}
    </div>
  );
}
