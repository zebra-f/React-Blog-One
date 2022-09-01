import { useState, useEffect } from "react";

import Post from "./Post";

function Posts() {
  const [posts, setPosts] = useState(null);
  const [postsApiError, setPostsApiError] = useState(false);
  useEffect(() => {
    const apiUrl = "http://127.0.0.1:8000/api/";
    fetch(apiUrl)
      .then((response) => response.json())
      .then((posts) => {
        setPosts(posts);
      })
      .catch((error) => {
        setPostsApiError(true);
      });
  }, []);

  if (!posts && !postsApiError) {
    return (
      <div className="PostsLoading">
        <p>Loading...</p>
      </div>
    );
  } else if (postsApiError) {
    return (
      <div className="PostsLoading">
        <p>We have a problem with our servers, come back later. Sorry.</p>
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
