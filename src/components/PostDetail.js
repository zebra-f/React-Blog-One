import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axios.js";

function PostDetail() {
  const params = useParams();
  const [post, setPost] = useState(null);
  const [postData, setPostData] = useState(null);
  const [postApiError, setPostApiError] = useState(false);

  useEffect(() => {
    axiosInstance
      .get(`/posts/${params.id}`)
      .then((response) => {
        setPost(response);
        setPostData(response.data);
      })
      .catch((error) => {
        setPostApiError(true);
      });
  }, [params]);

  if (postApiError) {
    return (
      <div className="PostDetailLoading">
        <h3>Post doesn't exist or server is down.</h3>
      </div>
    );
  }

  if (postData) {
    return (
      <div className="PostDetail">
        <h2>{postData.title}</h2>
        <p>{postData.content}</p>
        <p>{postData.author}</p>
      </div>
    );
  }

  return (
    <div className="PostDetailLoading">
      <h3>Loading...</h3>
    </div>
  );
}

export default PostDetail;
