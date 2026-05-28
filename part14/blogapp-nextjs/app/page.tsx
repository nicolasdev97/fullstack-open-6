import Homepage from "./homepage.mdx";

export default async function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-5xl mx-auto px-6 py-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl p-10">
          <div className="markdown">
            <Homepage />
          </div>
        </div>
      </div>
    </main>
  );
}
