import { auth } from "@/auth";
import { getUserById } from "../services/users";
import { redirect } from "next/navigation";
import GenerateTokenButton from "./GenerateTokenButton";
import { getMyFullReadingList } from "../actions/readingList";
import { markAsRead } from "../actions/readingList";

const MePage = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const user = await getUserById(Number(session.user.id));
  const allListItems = await getMyFullReadingList();
  const unreadBlogs = allListItems.filter((item) => item.read === false);
  const readBlogs = allListItems.filter((item) => item.read === true);

  return (
    <div data-testid="user-profile">
      <h2>My Profile</h2>
      <div>
        {/* DODANE: data-testid="user-name" */}
        <p data-testid="user-name">Name: {session.user.name}</p>
        <p data-testid="user-username">Username: {session.user.email}</p>
      </div>

      <hr className="w-1/4 my-2 border-gray-300" />

      {/* DODANE: Ten div teraz poprawnie OTACZA całą listę czytelniczą */}
      <div data-testid="reading-list-section">
        <h2>Reading List</h2>

        {/* DODANE: Logika dla całkowicie pustej listy (Playwright tego wymaga) */}
        {allListItems.length === 0 ? (
          <p data-testid="empty-reading-list">Your reading list is empty.</p>
        ) : (
          <>
            {/* DODANE: Osobna sekcja dla nieprzeczytanych */}
            <div data-testid="unread-section">
              <p>
                Unread {"("}
                {unreadBlogs.length}
                {")"}
              </p>

              {/* DODANE: Informacja o braku nieprzeczytanych (też wymagane przez test) */}
              {unreadBlogs.length === 0 ? (
                <p data-testid="no-unread-blogs">No unread blogs</p>
              ) : (
                unreadBlogs.map((blog) => (
                  <div
                    key={blog.id}
                    className="w-1/5 my-2 bg-red-400 flex items-center justify-between p-2"
                  >
                    <a
                      className="text-blue-600 hover:underline"
                      href={`blogs/${blog.blogId}`}
                    >
                      {blog.blog.title}
                    </a>
                    <form action={markAsRead}>
                      <input type="hidden" name="id" value={blog.id} />
                      {/* DODANE: Specjalne ID dla każdego przycisku, żeby Playwright mógł go kliknąć */}
                      <button
                        data-testid={`mark-read-${blog.id}`}
                        className="bg-green-800 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                      >
                        mark as read
                      </button>
                    </form>
                  </div>
                ))
              )}
            </div>

            <p>
              Read {"("}
              {readBlogs.length}
              {")"}
            </p>
            {readBlogs.map((blog) => (
              <div key={blog.id} className="w-1/4 my-2 bg-green-400">
                <a
                  className="text-blue-600 hover:underline"
                  href={`blogs/${blog.blogId}`}
                >
                  {blog.blog.title}
                </a>
              </div>
            ))}
          </>
        )}
      </div>

      <hr className="w-1/4 my-2 border-gray-300" />

      {/* DODANE: Opakowanie i identyfikatory dla sekcji tokenu */}
      <div data-testid="api-token-section">
        <h2>API Token</h2>
        <p>Current token:</p>

        {!user?.token ? (
          <p data-testid="no-token-message">Nie wygenerowano jeszcze tokenu.</p>
        ) : (
          <div data-testid="token-display">
            <code data-testid="api-token">{user.token}</code>
          </div>
        )}

        <GenerateTokenButton />
      </div>
    </div>
  );
};

export default MePage;
