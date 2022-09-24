import { Link } from "react-router-dom";

function Post({ post }) {
  return (
    <div className="Post">
      <Link to={`/posts/${post.id}`} color="black">
        <h3>{post.title}</h3>
      </Link>

      <p>{post.content}</p>
    </div>
  );
}

export default Post;
