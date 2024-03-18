import PropTypes from "prop-types";
import Comment from "./Comment";
import { useContext } from "react";
import { AppContext } from "../App";

function Post({ post }) {
  const context = useContext(AppContext);

  return (
    <div className="post">
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <p>Author: {post.author}</p>
      <div>
        {context.comments
          .filter((x) => parseInt(x.postId) === parseInt(post.id))
          .map((comment, index) => (
            <Comment comment={comment} key={index} />
          ))}
      </div>
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.object,
};

export default Post;
