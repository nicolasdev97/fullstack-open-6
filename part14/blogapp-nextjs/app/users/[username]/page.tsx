import { getUserByUsername } from "@/lib/users";

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
    <div>
      <h1>{user.name}</h1>

      <p>Username: {user.username}</p>

      <h2>Blogs added</h2>

      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
}
