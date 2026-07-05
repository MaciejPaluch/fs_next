const blogs = [
  {
    id: 1,
    title: "Wprowadzenie do magii Next.js",
    author: "Jan Kowalski",
    url: "https://jankowalski.blog/nextjs",
    likes: 15,
  },
  {
    id: 2,
    title: "Jak przetrwać instalację npm na wolnym łączu",
    author: "Ty",
    url: "https://twojblog.dev/npm-survival",
    likes: 9001,
  },
  {
    id: 3,
    title: "Server Components dla opornych",
    author: "Anna Nowak",
    url: "https://annanowak.pl/rsc",
    likes: 42,
  },
];

let nextId = 4;

export const getBlogs = () => {
  return blogs;
};

export const addBlog = (
  title: string,
  author: string,
  url: string,
  likes: number,
) => {
  blogs.push({ id: nextId++, title, author, url, likes });
};

export const getBlogById = (id: number) => {
  return blogs.find((blog) => blog.id === id);
};

export const likeBlog = (id: number) => {
  const blog = getBlogById(id);
  if (blog) {
    blog.likes++;
  }
};
