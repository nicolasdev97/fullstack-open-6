import { signIn } from "@/auth";
import Link from "next/dist/client/link";

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto p-6">
      <div className="border border-gray-200 rounded-xl shadow-sm p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>

        <form
          action={async (formData) => {
            "use server";

            await signIn("credentials", formData);
          }}
          className="space-y-4"
        >
          <div>
            <input
              name="username"
              placeholder="Username"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition font-semibold"
          >
            Login
          </button>

          <p className="text-center text-gray-600 mt-4">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
