import Link from "next/link";

import { getBlogs } from "@/lib/blogs";

import BlogNotifications from "@/components/BlogNotifications";

import { cookies } from "next/headers";

type BlogsPageProps = {
  searchParams: Promise<{
    filter?: string;
  }>;
};

export default async function BlogsPage({ searchParams }: BlogsPageProps) {
  const cookieStore = await cookies();

  const success = cookieStore.get("blog-created");

  const { filter = "" } = await searchParams;

  const filteredBlogs = await getBlogs(filter);

  const sortedBlogs = [...filteredBlogs].sort((a, b) => b.likes - a.likes);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <BlogNotifications success={!!success} />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Blogs</h1>

        <Link
          href="/blogs/new"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create New Blog
        </Link>
      </div>
      <form className="flex gap-2 mb-6">
        <input
          data-testid="filter-input"
          type="text"
          name="filter"
          placeholder="Search blogs..."
          defaultValue={filter}
          className="border border-gray-300 rounded px-3 py-2 flex-1"
        />

        <button
          data-testid="search-button"
          type="submit"
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
        >
          Search
        </button>
      </form>
      <div data-testid="blogs-list">
        {sortedBlogs.map((blog) => (
          <div
            key={blog.id}
            className="border border-gray-200 rounded-lg p-5 mb-4 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-2xl font-semibold mb-2">
              <Link href={`/blogs/${blog.id}`} className="hover:text-blue-600">
                {blog.title}
              </Link>
            </h2>

            <p className="text-gray-700">
              <strong>Author:</strong> {blog.author}
            </p>

            <p className="text-gray-700">{blog.likes} likes</p>
          </div>
        ))}
      </div>
    </div>
  );
}
