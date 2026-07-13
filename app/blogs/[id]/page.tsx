import { notFound } from "next/navigation";
import { getBlogById } from "../../services/blogs";
import { like } from "@/app/actions/blogs";
import { createReading } from "@/app/actions/readingList";
import { isOnList } from "@/app/actions/readingList";

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const blog = await getBlogById(Number(id));

  if (!blog) {
    notFound();
  }
  const isBlogOnList = await isOnList(blog.id);

  return (
    <div data-testid="blog-detail">
      <h2 data-testid="blog-title">{blog.title}</h2>

      <p>
        Autor: <span data-testid="blog-author">{blog.author}</span>
      </p>

      <p>
        URL: <a href={blog.url}>{blog.url}</a>
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <p>Likes: {blog.likes}</p>
        <form action={like}>
          <input type="hidden" name="id" value={blog.id} />
          <button
            type="submit"
            className="bg-gray-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2"
          >
            like
          </button>
        </form>
      </div>

      <form action={createReading}>
        <input type="hidden" name="id" value={blog.id} />
        {!isBlogOnList && (
          <button
            data-testid="add-to-reading-list-button"
            className="bg-gray-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
          >
            add to reading list
          </button>
        )}
      </form>

      <a href={`https://${blog.url}`} className="text-blue-600 hover:underline">
        {blog.url}
      </a>
    </div>
  );
};

export default BlogPage;
