export const dynamic = "force-dynamic";

import { auth } from "@/auth";
import { getUserById } from "@/lib/users";
import crypto from "crypto";
import { updateUserToken } from "@/lib/users";
import { getReadingList } from "@/lib/users";
import { markReadingAsRead } from "@/lib/users";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/dist/server/web/spec-extension/revalidate";

async function generateToken() {
  "use server";

  const session = await auth();

  if (!session?.user) {
    return;
  }

  const token = crypto.randomUUID();

  await updateUserToken(Number(session.user.id), token);

  revalidatePath("/me", "page");
  redirect("/me");
}

async function handleMarkAsRead(formData: FormData) {
  "use server";

  const id = Number(formData.get("readingListId"));

  await markReadingAsRead(id);

  redirect("/me");
}

export default async function MePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const user = await getUserById(Number(session.user.id));

  const readingList = await getReadingList(Number(session.user.id));

  const unreadBlogs = readingList.filter((item) => !item.read);

  const readBlogs = readingList.filter((item) => item.read);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="border border-gray-200 rounded-xl shadow-sm p-8">
        <h1 className="text-4xl font-bold mb-6">My Profile</h1>

        <div className="space-y-4" data-testid="user-profile">
          <p className="text-lg" data-testid="user-name">
            <strong>Name:</strong> {user?.name}
          </p>

          <p className="text-lg" data-testid="user-username">
            <strong>Username:</strong> {user?.username}
          </p>
        </div>

        <div className="mt-8" data-testid="api-token-section">
          <h2 className="text-2xl font-semibold mb-4">API Token</h2>

          {user?.token ? (
            <div
              className="bg-gray-100 p-4 rounded-lg break-all font-mono"
              data-testid="token-display"
            >
              <span className="text-gray-500" data-testid="api-token">
                {user.token}
              </span>
            </div>
          ) : (
            <p className="text-gray-500" data-testid="no-token-message">
              No token generated yet.
            </p>
          )}

          <form action={generateToken} className="mt-4">
            <button
              type="submit"
              data-testid="generate-token-button"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Generate Token
            </button>
          </form>
        </div>

        <div className="mt-10" data-testid="reading-list-section">
          <h2 className="text-2xl font-semibold mb-4">Reading List</h2>

          <div className="mt-10" data-testid="unread-section">
            <h2 className="text-2xl font-semibold mb-4">Unread</h2>

            {unreadBlogs.length === 0 ? (
              <p className="text-gray-500" data-testid="empty-reading-list">
                No unread blogs.
              </p>
            ) : (
              <div className="space-y-4">
                {unreadBlogs.map((item) => (
                  <div
                    key={item.id}
                    className="border border-gray-200 rounded-xl p-5 shadow-sm"
                  >
                    <h3 className="text-xl font-semibold">{item.blog.title}</h3>

                    <p className="text-gray-600">{item.blog.author}</p>

                    <form action={handleMarkAsRead} className="mt-4">
                      <input
                        type="hidden"
                        name="readingListId"
                        value={item.id}
                      />

                      <button
                        type="submit"
                        data-testid="mark-as-read-button"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                      >
                        Mark as read
                      </button>
                    </form>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-10" data-testid="mark-read-">
            <h2 className="text-2xl font-semibold mb-4">Read</h2>

            {readBlogs.length === 0 ? (
              <p className="text-gray-500" data-testid="no-unread-blogs">
                No read blogs yet.
              </p>
            ) : (
              <div className="space-y-4">
                {readBlogs.map((item) => (
                  <div
                    key={item.id}
                    className="border border-gray-200 rounded-2xl p-6 shadow-sm bg-white hover:shadow-md transition"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800">
                          {item.blog.title}
                        </h3>

                        <p className="text-gray-500 mt-1">{item.blog.author}</p>
                      </div>

                      <span className="bg-green-100 text-green-700 text-sm font-medium px-3 py-1 rounded-full">
                        ✓ Read
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
