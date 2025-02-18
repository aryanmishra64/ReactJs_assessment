import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PostDetails from "./pages/PostDetails";
import LikedPosts from "./pages/LikedPosts";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<PostDetails />} />
        <Route path="/liked-posts" element={<LikedPosts />} />
      </Routes>
    </Router>
  );
}

export default App;
