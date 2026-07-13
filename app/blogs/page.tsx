import { getBlogs } from "../services/blogs";
import Link from "next/link";

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter: string }>;
}) => {
  const { filter } = await searchParams;
  const all_blogs = await getBlogs();
  const unordered_blogs = filter
    ? all_blogs.filter((blog) =>
        blog.title.toLowerCase().includes(filter.toLocaleLowerCase()),
      )
    : all_blogs;

  const blogs = unordered_blogs.sort((a, b) => b.likes - a.likes);

  return (
    <div className="max-w-2xl p-6">
      <h2 className="text-2xl font-bold mb-4">Blogs</h2>
      <div className="mb-4">
        <form action="/blogs" method="GET">
          <input
            type="text"
            name="filter"
            defaultValue={filter || ""}
            className="mt-1 px-3 py-1 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            data-testid="filter-input"
          />
          <button
            type="submit"
            className="bg-gray-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            data-testid="search-button"
          >
            filter
          </button>
        </form>
      </div>
      <ul className="space-y-2" data-testid="blogs-list">
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link
              href={`/blogs/${blog.id}`}
              className="text-blue-600 hover:underline"
            >
              {blog.title}
            </Link>{" "}
            {blog.author} {blog.likes} {blog.url}
            <p>{blog.likes} likes</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blogs;
