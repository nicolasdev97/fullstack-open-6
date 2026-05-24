const blogs = [
  {
    id: 1,
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com",
    likes: 7,
  },
  {
    id: 2,
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://harmful.goto",
    likes: 5,
  },
  {
    id: 3,
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://example.com",
    likes: 12,
  },
];

export default function BlogsPage() {
  return (
    <div>
      <h1>Blogs</h1>

      {blogs.map((blog) => (
        <div
          key={blog.id}
          style={{
            border: "1px solid gray",
            padding: "1rem",
            marginBottom: "1rem",
          }}
        >
          <h2>{blog.title}</h2>

          <p>
            <strong>Author:</strong> {blog.author}
          </p>

          <p>
            <strong>URL:</strong> {blog.url}
          </p>

          <p>
            <strong>Likes:</strong> {blog.likes}
          </p>
        </div>
      ))}
    </div>
  );
}
