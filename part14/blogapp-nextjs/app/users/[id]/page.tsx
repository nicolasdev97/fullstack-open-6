import { getUserById, getBlogsByUserId } from "@/lib/users";

type UserPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function UserPage({ params }: UserPageProps) {
  const { id } = await params;

  const user = await getUserById(Number(id));

  if (!user) {
    return <div>User not found</div>;
  }

  const blogs = await getBlogsByUserId(user.id);

  return (
    <div>
      <h1>{user.name}</h1>

      <p>Username: {user.username}</p>

      <h2>Blogs</h2>

      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
}
