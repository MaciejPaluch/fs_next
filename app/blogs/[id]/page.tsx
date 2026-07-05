import { notFound } from "next/navigation";
import { getBlogById } from "../../services/blogs";
import { like } from "@/app/actions/blogs";

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const blog = getBlogById(Number(id));

  if (!blog) {
    notFound();
  }

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <p>Likes: {blog.likes}</p>
        <form action={like}>
          <input type="hidden" name="id" value={blog.id} />
          <button type="submit">like</button>
        </form>
      </div>
      <p>{blog.url}</p>
    </div>
  );
};

export default BlogPage;
