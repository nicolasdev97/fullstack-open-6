import { signIn } from "@/auth";

export default function LoginPage() {
  return (
    <div>
      <h1>Login</h1>

      <form
        action={async (formData) => {
          "use server";

          await signIn("credentials", formData);
        }}
      >
        <div>
          <input name="username" placeholder="Username" />
        </div>

        <div>
          <input type="password" name="password" placeholder="Password" />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
