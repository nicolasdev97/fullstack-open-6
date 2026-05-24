import Link from "next/link";
import { blogs } from "@/lib/blogs";

export default function BlogsPage() {
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Blogs</h1>

        <Link href="/blogs/new">Create New Blog</Link>
      </div>

      {sortedBlogs.map((blog) => (
        <div
          key={blog.id}
          style={{
            border: "1px solid gray",
            padding: "1rem",
            marginBottom: "1rem",
          }}
        >
          <h2>
            <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
          </h2>

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
      ))}
    </div>
  );
}
