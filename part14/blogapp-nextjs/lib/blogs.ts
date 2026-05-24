export type Blog = {
  id: number;
  title: string;
  author: string;
  url: string;
  likes: number;
};

export const blogs: Blog[] = [
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
];
