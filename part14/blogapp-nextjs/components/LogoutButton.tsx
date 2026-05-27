import { signOut } from "@/auth";

export default function LogoutButton() {
  return (
    <form
      action={async () => {
        "use server";

        await signOut();
      }}
    >
      <button
        type="submit"
        className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
      >
        Logout
      </button>
    </form>
  );
}
