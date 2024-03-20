import PropTypes from "prop-types";
import Comment from "./Comment";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import CreateCommentForm from "./CreateCommentForm";
import { createContext } from "react";
import { Link } from "react-router-dom";
import PostFormUpdate from "./PostFormUpdate";

const PostContext = createContext();

function Post({ post }) {
  const context = useContext(AppContext);
  const [title, setPostTitle] = useState(post.title);
  const [content, setPostContent] = useState(post.content);
  const [author, setAuthor] = useState(null);
  const [updateMode, setUpdateMode] = useState(false);
  const [comments, setComments] = useState([]);
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  // find post author
  useEffect(() => {
    var foundAuthor = context.users.find(
      (x) => parseInt(x.userId) === parseInt(post.user.userId)
    );
    setAuthor(foundAuthor);
  }, [context.users, post.user.userId]);

  // GET Post comments
  useEffect(() => {
    setComments(post.comments);
  }, [post.comments]);

  const reloadPosts = () => {
    fetch("https://localhost:7234/posts")
      .then((response) => response.json())
      .then((data) => {
        context.setPosts(data); // Update posts state with fetched data
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  };

  useEffect(() => {
    setShowDeleteButton(context.viewPostFlag);
  }, [context.viewPostFlag]);

  const handleDelete = () => {
    fetch(`https://localhost:7234/posts/${post.postId}?postId=${post.postId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete post");
        }

        context.setPosts((prevPosts) =>
          prevPosts.filter((p) => p.postId !== post.postId)
        );
      })
      .catch((error) => {
        console.error("Error deleting post:", error.message);
      });
  };

  const toggleUpdateButton = () => {
    setUpdateMode(!updateMode);
  };

  return (
    <div className="post">
      <PostContext.Provider
        value={{
          post: post,
          comments: comments,
          setPostTitle: setPostTitle,
          setPostContent: setPostContent,
          setUpdateMode: setUpdateMode,
          setComments: setComments,
          reloadPosts: reloadPosts,
        }}
      >
        {showDeleteButton ? (
          <div>
            {updateMode ? (
              <PostFormUpdate />
            ) : (
              <div>
                <h3
                  onClick={(e) => {
                    e.preventDefault();
                    context.findPost(post.postId);
                  }}
                >
                  <Link to={`/post/${post.postId}`} className="post-title">
                    {title}
                  </Link>
                </h3>
                {author && (
                  <div>
                    <Link
                      to={`/profile/${author.userId}`}
                      className="post-author"
                    >
                      {author.firstName} {author.lastName}
                    </Link>
                  </div>
                )}
                <p>{content}</p>
              </div>
            )}

            <button className="delete-button" onClick={handleDelete}>
              Delete
            </button>
            <button
              className="modify-post-button"
              onClick={() => toggleUpdateButton()}
            >
              Modify
            </button>
          </div>
        ) : (
          <div>
            <h3
              onClick={(e) => {
                e.preventDefault();
                context.findPost(post.postId);
              }}
            >
              <Link to={`/post/${post.postId}`} className="post-title">
                {title}
              </Link>
            </h3>
            {author && (
              <div>
                <Link to={`/profile/${author.userId}`} className="post-author">
                  {author.firstName} {author.lastName}
                </Link>
              </div>
            )}
            <p>{content}</p>
          </div>
        )}
        <hr className="horizontal-line" />
        <div>
          <CreateCommentForm postId={post.postId} />
          {comments.map((comment, index) => (
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
