import Link from "next/link";
import { getUsers } from "@/lib/users";

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div>
      <h1>Users</h1>

      {users.map((user) => (
        <div
          key={user.id}
          style={{
            border: "1px solid gray",
            padding: "1rem",
            marginBottom: "1rem",
          }}
        >
          <h2>
            <Link href={`/users/${user.id}`}>{user.name}</Link>
          </h2>

          <p>Username: {user.username}</p>
        </div>
      ))}
    </div>
  );
}
