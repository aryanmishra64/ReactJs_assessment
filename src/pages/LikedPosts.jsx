import { Link } from "react-router-dom";
import { useLikeContext } from "../context/LikeContext";

const LikedPosts = () => {
  const { likedPosts, toggleLike } = useLikeContext();

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="container mx-auto mb-6">
        <Link to="/" className="text-blue-500 hover:underline text-lg">← Back to Home</Link>
      </div>

      <div className="container mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">❤️ Liked Posts</h1>

        {likedPosts.length > 0 ? (
          likedPosts.map((post) => (
            <div key={post.id} className="border-b border-gray-300 py-3">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <button onClick={() => toggleLike(post)} className="text-red-500 text-2xl">❤️</button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-lg">No liked posts.</p>
        )}
      </div>
    </div>
  );
};

export default LikedPosts;
