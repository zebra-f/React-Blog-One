function Post({ post }) {
  return (
    <div className="Post">
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );
}

export default Post;
