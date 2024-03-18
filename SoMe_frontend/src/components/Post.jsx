import PropTypes from "prop-types";

function Post({ post }) {
  return <p>{post.title}</p>;
}

Post.propTypes = {
  post: PropTypes.object,
};

export default Post;
