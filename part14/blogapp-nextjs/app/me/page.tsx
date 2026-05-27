import { auth } from "@/auth";
import { getUserById } from "@/lib/users";
import { revalidatePath } from "next/cache";
import crypto from "crypto";
import { updateUserToken } from "@/lib/users";

async function generateToken() {
  "use server";

  const session = await auth();

  if (!session?.user) {
    return;
  }

  const token = crypto.randomUUID();

  await updateUserToken(Number(session.user.id), token);

  revalidatePath("/me");
}

export default async function MePage() {
  const session = await auth();

  if (!session?.user) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold">Unauthorized</h1>

        <p className="mt-4">You must be logged in.</p>
      </div>
    );
  }

  const user = await getUserById(Number(session.user.id));

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="border border-gray-200 rounded-xl shadow-sm p-8">
        <h1 className="text-4xl font-bold mb-6">My Profile</h1>

        <div className="space-y-4">
          <p className="text-lg">
            <strong>Name:</strong> {user?.name}
          </p>

          <p className="text-lg">
            <strong>Username:</strong> {user?.username}
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">API Token</h2>

          {user?.token ? (
            <div className="bg-gray-100 p-4 rounded-lg break-all font-mono">
              <span className="text-gray-500">{user.token}</span>
            </div>
          ) : (
            <p className="text-gray-500">No token generated yet.</p>
          )}

          <form action={generateToken} className="mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Generate Token
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
