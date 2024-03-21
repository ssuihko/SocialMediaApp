import PropTypes from "prop-types";
import Comment from "./Comment";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import CreateCommentForm from "./CreateCommentForm";
import { createContext } from "react";
import { Link } from "react-router-dom";
import PostFormUpdate from "./PostFormUpdate";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  handleLikePost,
  handleDislikePost,
} from "../helperfunctions/PostInterractions";

const PostContext = createContext();

function Post({ post }) {
  const { postId } = useParams();
  const context = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [title, setPostTitle] = useState(post.title);
  const [content, setPostContent] = useState(post.content);
  const [likes, setLikes] = useState(post.likes);
  const [author, setAuthor] = useState(null);

  const [updateMode, setUpdateMode] = useState(false);
  const [comments, setComments] = useState([]);
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  // GET Post comments
  useEffect(() => {
    console.log("comments reset again...");

    if (postId !== undefined) {
      console.log("postID: ", postId);
      reloadComments(postId);
    } else {
      setComments(post.comments);
    }

    if (updateMode) {
      setUpdateMode(false);
    } else {
      setPostTitle(post.title);
      setPostContent(post.content);
    }

    setLikes(post.likes);

    const thisUser = context.users.find(
      (x) => parseInt(x.id) === parseInt(post.user.userId)
    );
    setAuthor(thisUser);

    console.log(context.allPosts);
  }, [post, context, postId]);

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

    navigate("/");
  };

  // find post author
  useEffect(() => {
    if (postId !== undefined && location.pathname.includes("/post")) {
      console.log("post searched for by id: ", postId);
      var thisPost = context.posts.find(
        (x) => parseInt(x.postId) === parseInt(postId)
      );

      var updateAuthor = context.users.find(
        (x) => parseInt(x.userId) === parseInt(thisPost.user.userId)
      );
      setAuthor(updateAuthor);
    }
  }, [context.users, post.user, postId, context.posts, location]);

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

  const reloadComments = (postIdEntry) => {
    fetch(
      `https://localhost:7234/posts/${postIdEntry}/comments?postId=${postIdEntry}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("comments here: ", data);
        console.log(postIdEntry, " should only match ", postId);
        setComments(data); // Update posts state with fetched data
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  };

  useEffect(() => {
    setShowDeleteButton(context.viewPostFlag);
  }, [context.viewPostFlag]);

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
          reloadComments: reloadComments,
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
                <p>likes: {likes}</p>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleLikePost(post, context, setLikes);
                  }}
                >
                  Like
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleDislikePost(post, context, setLikes);
                  }}
                >
                  Dislike
                </button>
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
              <div className="text-area-for-post">
                <Link to={`/profile/${author.userId}`} className="post-author">
                  {author.firstName} {author.lastName}
                </Link>
              </div>
            )}
            <p>{content}</p>
            <p>likes: {likes}</p>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleLikePost(post, context, setLikes);
              }}
            >
              Like
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleDislikePost(post, context, setLikes);
              }}
            >
              Dislike
            </button>
          </div>
        )}
        <hr className="horizontal-line" />
        <div>
          <CreateCommentForm postId={post.postId} />
          {comments
            .sort((a, b) => parseInt(b.commentId) - parseInt(a.commentId))
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
