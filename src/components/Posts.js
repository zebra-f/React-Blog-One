import { useState, useEffect } from "react";

import Post from "./Post";

function Posts() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const apiUrl = "http://127.0.0.1:8000/api/";
    fetch(apiUrl)
      .then((response) => response.json())
      .then((posts) => {
        setPosts(posts);
      });
  }, []);

  if (!posts) {
    return (
      <div className="PostsLoading">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="Posts">
      <ul>
        {posts.map((post) => {
          return (
            <li key={post.id}>
              <Post post={post} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Posts;
