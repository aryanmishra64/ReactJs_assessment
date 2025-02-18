import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const PostDetails = () => {
  const { id } = useParams(); // Get post ID from URL
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        // Fetch Post Data
        const postRes = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        if (!postRes.ok) throw new Error("Failed to fetch post");
        const postData = await postRes.json();
        setPost(postData);

        // Fetch Comments
        const commentsRes = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
        if (!commentsRes.ok) throw new Error("Failed to fetch comments");
        const commentsData = await commentsRes.json();
        setComments(commentsData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [id]);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Back Button */}
      <div className="container mx-auto mb-6">
        <Link to="/" className="text-blue-500 hover:underline text-lg">← Back to Home</Link>
      </div>

      {/* Post Details */}
      <div className="container mx-auto bg-white p-6 rounded-lg shadow-lg">
        {loading ? (
          <p className="text-center text-gray-600 text-lg">Loading post...</p>
        ) : post ? (
          <>
            <h1 className="text-3xl font-bold text-gray-800">{post.title}</h1>
            <p className="text-gray-700 mt-4">{post.body}</p>
          </>
        ) : (
          <p className="text-center text-red-500 text-lg">Post not found.</p>
        )}
      </div>

      {/* Comments Section */}
      <div className="container mx-auto mt-6 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Comments</h2>
        {loading ? (
          <p className="text-center text-gray-600 text-lg">Loading comments...</p>
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="border-b border-gray-300 py-3">
              <p className="text-gray-900 font-medium">{comment.name} - <span className="text-gray-500 text-sm">{comment.email}</span></p>
              <p className="text-gray-700 mt-1">{comment.body}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No comments available.</p>
        )}
      </div>
    </div>
  );
};

export default PostDetails;
