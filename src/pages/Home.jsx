import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLikeContext } from "../context/LikeContext";

const Home = () => {
  const { likedPosts, toggleLike } = useLikeContext();
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Dark Mode State
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark"; // Get saved theme from localStorage
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!response.ok) throw new Error("Failed to fetch posts");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("theme", newMode ? "dark" : "light"); // Save theme preference
      return newMode;
    });
  };

  // Apply dark mode class to the body element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      {/* Navbar */}
      <header className={`py-5 shadow-md ${darkMode ? "bg-gray-800" : "bg-blue-700 text-white"}`}>
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-3xl font-bold tracking-wide">📖 My Blog</h1>
          <nav className="flex space-x-6">
            <Link to="/" className="text-lg hover:text-gray-300 transition">Home</Link>
            <Link to="/liked-posts" className="text-lg hover:text-gray-300 transition">
              ❤️ Liked Posts ({likedPosts.length})
            </Link>
            <button
              onClick={toggleDarkMode}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
            >
              {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto p-6">
        {/* Search Bar */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="🔍 Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full md:w-2/3 p-3 border rounded-xl shadow-md focus:outline-none focus:ring-2 ${darkMode ? "bg-gray-800 border-gray-700 text-white focus:ring-blue-400" : "border-gray-300 text-black focus:ring-blue-500"}`}
          />
        </div>

        <h1 className="text-4xl font-extrabold text-center mb-8">Latest Posts</h1>

        {loading ? (
          <p className="text-center text-lg">Loading...</p>
        ) : (
          <div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
              {currentPosts.length > 0 ? (
                currentPosts.map((post) => (
                  <div key={post.id} className={`p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 ${darkMode ? "bg-gray-800 text-white" : "bg-white"}`}>
                    <h2 className="text-2xl font-semibold">{post.title}</h2>
                    <p className="mt-3">{post.body.substring(0, 100)}...</p>

                    {/* Like Button */}
                    <div className="mt-4 flex items-center justify-between">
                      <Link to={`/post/${post.id}`} className="text-blue-600 font-medium hover:text-blue-800 transition">
                        Read More →
                      </Link>

                      <button
                        onClick={() => toggleLike(post)}
                        className="text-3xl cursor-pointer transition-transform transform hover:scale-110"
                        title="Like this post"
                      >
                        {likedPosts.some((p) => p.id === post.id) ? "❤️" : "🤍"}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-lg">No posts found.</p>
              )}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-10 space-x-4">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`px-6 py-2 rounded-lg font-semibold transition ${currentPage === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
              >
                ← Previous
              </button>
              <span className="px-5 py-2 bg-gray-500 rounded-lg text-lg font-semibold">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`px-6 py-2 rounded-lg font-semibold transition ${currentPage === totalPages ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
