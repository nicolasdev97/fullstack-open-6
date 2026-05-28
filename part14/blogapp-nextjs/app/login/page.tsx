import { signIn } from "@/auth";
import { redirect } from "next/dist/client/components/navigation";
import Link from "next/dist/client/link";
import { AuthError } from "next-auth";

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto p-6">
      <div className="border border-gray-200 rounded-xl shadow-sm p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>

        <form
          action={async (formData) => {
            "use server";

            try {
              await signIn("credentials", {
                username: formData.get("username"),
                password: formData.get("password"),
                redirectTo: "/?login=success",
              });
            } catch (error) {
              if (error instanceof AuthError) {
                redirect("/login?error=credentials");
              }

              throw error;
            }
          }}
          className="space-y-4"
        >
          <div>
            <label htmlFor="username">Username</label>
            <input
              name="username"
              id="username"
              placeholder="Username"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            data-testid="login-button"
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
