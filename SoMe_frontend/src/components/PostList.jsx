import Post from "./Post";
import PropTypes from "prop-types";

function PostList({ posts }) {
  return (
    <div>
      <div>
        <h2 className="title"></h2>
      </div>
      {posts.map((post, index) => (
        <Post post={post} key={index} />
      ))}
    </div>
  );
}

PostList.propTypes = {
  posts: PropTypes.array,
};

export default PostList;
