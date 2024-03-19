import PropTypes from "prop-types";
import Comment from "./Comment";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import CreateCommentForm from "./CreateCommentForm";
import { createContext } from "react";
import { Link } from "react-router-dom";

const PostContext = createContext();

function Post({ post }) {
  const context = useContext(AppContext);
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    var foundAuthor = context.users.find(
      (x) => parseInt(x.userId) === parseInt(post.user.userId)
    );
    setAuthor(foundAuthor);
  }, [context.users, post.user.userId]);

  return (
    <div className="post">
      <PostContext.Provider
        value={{
          post: post,
        }}
      >
        <h3
          onClick={(e) => {
            e.preventDefault();
            context.findPost(post.postId);
          }}
        >
          <Link to={`/post/${post.postId}`} className="post-title">
            {post.title}
          </Link>
        </h3>
        <p>{post.content}</p>
        {author === undefined || author === null ? (
          <div></div>
        ) : (
          <Link to={`/profile/${author.userId}`}>
            Author: {author.firstName + " " + author.lastName}
          </Link>
        )}

        <div>
          <CreateCommentForm postId={post.postId} />
          {context.comments
            .filter((x) => parseInt(x.postId) === parseInt(post.postId))
            .map((comment, index) => (
              <Comment comment={comment} key={index} />
            ))}
        </div>
      </PostContext.Provider>
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.object,
};

export { Post as default, PostContext };
