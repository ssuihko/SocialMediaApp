import PropTypes from "prop-types";
import Comment from "./Comment";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import CreateCommentForm from "./CreateCommentForm";
import { createContext } from "react";
import { Link } from "react-router-dom";
import PostFormUpdate from "./PostFormUpdate";
import { useParams, useLocation } from "react-router-dom";

const PostContext = createContext();

function Post({ post }) {
  const { postId } = useParams();
  const context = useContext(AppContext);
  const location = useLocation();
  const [title, setPostTitle] = useState(post.title);
  const [content, setPostContent] = useState(post.content);
  const [likes, setLikes] = useState(post.likes);
  const [author, setAuthor] = useState(null);
  const [updateMode, setUpdateMode] = useState(false);
  const [comments, setComments] = useState([]);
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  // GET Post comments
  useEffect(() => {
    setComments(post.comments);
    setPostTitle(post.title);
    setPostContent(post.content);
    setLikes(post.likes);
  }, [post]);

  // find post author
  useEffect(() => {
    var foundAuthor = context.users.find(
      (x) => parseInt(x.userId) === parseInt(post.user.userId)
    );
    setAuthor(foundAuthor);

    if (postId !== undefined && location.pathname.includes("/post")) {
      console.log("here!", postId);
      var thisPost = context.posts.find(
        (x) => parseInt(x.postId) === parseInt(postId)
      );

      var updateAuthor = context.users.find(
        (x) => parseInt(x.userId) === parseInt(thisPost.user.userId)
      );
      setAuthor(updateAuthor);
    }
  }, [context.users, post.user.userId, postId, context.posts, location]);

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

  const handleLike = async () => {
    const newLikesData = {
      likes: parseInt(post.likes + 1),
    };

    try {
      const response = await fetch(
        `https://localhost:7234/posts/${post.postId}/likes?postId=${post.postId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newLikesData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to like post");
      }

      const updatedPost = await response.json();

      const newPosts = context.posts.map((x) => {
        if (x.postId === updatedPost.postId) {
          return updatedPost;
        } else {
          return x;
        }
      });

      context.setPosts([...newPosts]);
    } catch (error) {
      console.error("Error liking post:", error);
    }

    setLikes(newLikesData.likes);
  };

  const handleDislike = async () => {
    if (post.likes > 0) {
      const newLikesData = {
        likes: post.likes - 1,
      };
      try {
        const response = await fetch(
          `https://localhost:7234/posts/${post.postId}/likes?postId=${post.postId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newLikesData),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to dislike post");
        }

        const updatedPost = await response.json();

        const newPosts = context.posts.map((x) => {
          if (x.postId === updatedPost.postId) {
            return updatedPost;
          } else {
            return x;
          }
        });

        context.setPosts([...newPosts]);
      } catch (error) {
        console.error("Error disliking post:", error);
      }
      setLikes(newLikesData.likes);
    }
  };

  const toggleUpdateButton = () => {
    setUpdateMode(!updateMode);
    console.log("upmode: ", updateMode);
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
                <p>likes: {likes}</p>
              </div>
            )}

            <button className="delete-button" onClick={handleDelete}>
              Delete
            </button>
            <button
              className="modify-button"
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
            <p>likes: {likes}</p>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleLike();
              }}
            >
              Like
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleDislike();
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
