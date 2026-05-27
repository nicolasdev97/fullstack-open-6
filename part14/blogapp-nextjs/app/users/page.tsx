import Link from "next/link";
import { getUsers } from "@/lib/users";

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">Users</h1>

      {users.map((user) => (
        <div
          key={user.id}
          className="border border-gray-200 rounded-lg p-5 mb-4 shadow-sm hover:shadow-md transition"
        >
          <h2 className="text-2xl font-semibold mb-2">
            <Link
              href={`/users/${user.username}`}
              className="hover:text-blue-600"
            >
              {user.name}
            </Link>
          </h2>

          <p className="text-gray-600">@{user.username}</p>
        </div>
      ))}
    </div>
  );
}
