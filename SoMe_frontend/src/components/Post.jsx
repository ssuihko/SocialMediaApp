import PropTypes from "prop-types";

function Post({ post }) {
  return (
    <div>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <p>Author: {post.author}</p>
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.object,
};

export default Post;
