import Link from "next/link";

import { getBlogs } from "@/lib/blogs";

import BlogsSuccessNotification from "@/components/BlogsSuccessNotification";

type BlogsPageProps = {
  searchParams: Promise<{
    filter?: string;
    success?: string;
  }>;
};

export default async function BlogsPage({ searchParams }: BlogsPageProps) {
  const { filter = "", success } = await searchParams;

  const filteredBlogs = await getBlogs(filter);

  const sortedBlogs = [...filteredBlogs].sort((a, b) => b.likes - a.likes);

  return (
    <div>
      <BlogsSuccessNotification success={success} />

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

      <form
        style={{
          marginTop: "1rem",
          marginBottom: "1rem",
        }}
      >
        <input
          type="text"
          name="filter"
          placeholder="Search blogs..."
          defaultValue={filter}
        />

        <button type="submit">Search</button>
      </form>

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
            <strong>Likes:</strong> {blog.likes}
          </p>
        </div>
      ))}
    </div>
  );
}
