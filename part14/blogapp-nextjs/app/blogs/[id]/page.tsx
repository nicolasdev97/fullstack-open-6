import { blogs } from "@/lib/blogs";

type BlogPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function BlogPage({ params }: BlogPageProps) {
  const { id } = await params;

  const blog = blogs.find((blog) => blog.id === Number(id));

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
    </div>
  );
}
