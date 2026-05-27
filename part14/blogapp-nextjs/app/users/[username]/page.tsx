import { getUserByUsername } from "@/lib/users";
import Link from "next/dist/client/link";

type UserPageProps = {
  params: Promise<{
    username: string;
  }>;
};

export default async function UserPage({ params }: UserPageProps) {
  const { username } = await params;

  const user = await getUserByUsername(username);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-2">{user.name}</h1>

      <p className="text-gray-500 text-lg mb-8">Username: {user.username}</p>

      <h2 className="text-2xl font-semibold mb-4">Blogs added</h2>

      <div className="space-y-4">
        {user.blogs.map((blog) => (
          <div
            key={blog.id}
            className="border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition"
          >
            <Link
              href={`/blogs/${blog.id}`}
              className="text-2xl font-semibold hover:text-blue-600"
            >
              {blog.title}
            </Link>

            <p className="text-gray-700 mt-2">{blog.author}</p>

            <p className="text-gray-500 mt-1">Likes: {blog.likes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
