import { getBlogs } from "../services/blogs";
import Link from "next/link";

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter: string }>;
}) => {
  const { filter } = await searchParams;
  const all_blogs = getBlogs();
  const unordered_blogs = filter
    ? all_blogs.filter((blog) =>
        blog.title.toLowerCase().includes(filter.toLocaleLowerCase()),
      )
    : all_blogs;

  const blogs = unordered_blogs.sort((a, b) => b.likes - a.likes);

  return (
    <div>
      <h2>Blogs</h2>
      <div>
        <form action="/blogs" method="GET">
          <input type="text" name="filter" defaultValue={filter || ""} />
          <button type="submit">filter</button>
        </form>
      </div>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>{blog.title}</Link> {blog.author}{" "}
            {blog.likes} {blog.url}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blogs;
