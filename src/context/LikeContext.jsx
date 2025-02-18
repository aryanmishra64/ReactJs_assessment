import { createContext, useState, useContext, useEffect } from "react";

// Create Context
const LikeContext = createContext();

// Custom Hook to use the context
export const useLikeContext = () => useContext(LikeContext);

// Context Provider Component
export const LikeProvider = ({ children }) => {
  const [likedPosts, setLikedPosts] = useState(() => {
    // Load liked posts from localStorage when app starts
    const savedLikes = localStorage.getItem("likedPosts");
    return savedLikes ? JSON.parse(savedLikes) : [];
  });

  // Function to toggle like (add/remove post)
  const toggleLike = (post) => {
    setLikedPosts((prevLikedPosts) => {
      const isLiked = prevLikedPosts.some((p) => p.id === post.id);
      const updatedLikes = isLiked
        ? prevLikedPosts.filter((p) => p.id !== post.id) // Remove if already liked
        : [...prevLikedPosts, post]; // Add if not liked

      localStorage.setItem("likedPosts", JSON.stringify(updatedLikes)); // Save to localStorage
      return updatedLikes;
    });
  };

  return (
    <LikeContext.Provider value={{ likedPosts, toggleLike }}>
      {children}
    </LikeContext.Provider>
  );
};
