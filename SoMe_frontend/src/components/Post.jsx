import PropTypes from "prop-types";
import Comment from "./Comment";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import CreateCommentForm from "./CreateCommentForm";
import { createContext } from "react";
import { Link } from "react-router-dom";
import PostFormUpdate from "./PostFormUpdate";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import thumbsUpImage from "../../../img/thumbs_13653275.png";

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

  const [likesUpdate, setLikesUpdate] = useState(null);

  const [updateMode, setUpdateMode] = useState(false);
  const [comments, setComments] = useState([]);
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  // GET Post comments
  useEffect(() => {
    console.log("comments reset again...");

    // we are in post-view...
    if (postId !== undefined) {
      if (post.comments.length > 0 && comments.length > 0) {
        if (comments.length !== post.comments.length) {
          setComments(post.comments);
        }

        if (comments[0].commentId !== post.comments[0].commentId) {
          setComments([]);
        }
      }
      reloadComments(postId);

      if (likes !== post.likes) {
        if (likesUpdate !== null) {
          setLikes(likesUpdate);
        } else {
          setLikes(post.likes);
        }
      }
    } else {
      // in dashboard
      setLikesUpdate(null);
      setComments(post.comments);
      setLikes(post.likes);
    }

    if (updateMode) {
      setUpdateMode(false);
    } else {
      setPostTitle(post.title);
      setPostContent(post.content);
    }

    const thisUser = context.users.find(
      (x) => parseInt(x.userId) === parseInt(post.userId)
    );

    setAuthor(thisUser);
  }, [post, context, postId]);

  // managing mismatching between posts and comments
  useEffect(() => {
    if (post.comments.length > 0 && comments.length > 0) {
      if (comments[0].postId !== post.comments[0].postId) {
        console.log(comments[0].postId, post.comments[0].postId);
        setComments(post.comments);
      }
    }
  }, [post, comments]);

  /** 
  console.log("POST MODS + LIKE");
  console.log(
    post.content,
    content,
    post.postId,
    context.allPosts.find((x) => parseInt(x.postId) === parseInt(post.postId))
  );**/

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

    context.reloadPosts();

    navigate("/");
  };

  // find post author
  useEffect(() => {
    if (postId !== undefined && location.pathname.includes("/post")) {
      var thisPost = context.posts.find(
        (x) => parseInt(x.postId) === parseInt(postId)
      );

      var updateAuthor = context.users.find(
        (x) => parseInt(x.userId) === parseInt(thisPost.user.userId)
      );
      setAuthor(updateAuthor);
    }
  }, [context.users, post.user, postId, context.posts, location]);

  const reloadComments = (postIdEntry) => {
    fetch(
      `https://localhost:7234/posts/${postIdEntry}/comments?postId=${postIdEntry}`
    )
      .then((response) => response.json())
      .then((data) => {
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

  // LIKING AND DISLIKING
  const handleLikePost = async () => {
    var newlike = post.likes + 1;

    if (likesUpdate !== null && postId !== undefined) {
      newlike = likesUpdate + 1;
    }

    const newLikesData = {
      likes: parseInt(newlike),
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

      // context.reloadPosts();

      const updatedPost = await response.json();

      const newPosts = context.allPosts.map((x) => {
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
    setLikesUpdate(newLikesData.likes);
  };

  const handleDislikePost = async () => {
    console.log("in dislike: ", post.likes);
    if (post.likes > -1) {
      console.log("in handle dislike");

      var newlike = post.likes - 1;

      if (likesUpdate !== null && postId !== undefined) {
        newlike = likesUpdate - 1;
      }

      const newLikesData = {
        likes: parseInt(newlike),
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

        const newPosts = context.allPosts.map((x) => {
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
      setLikesUpdate(newLikesData.likes);
    }
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
                <div
                  className="likesfield"
                  style={{
                    marginBottom: "15px",
                  }}
                >
                  <button
                    className="Like-button"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLikePost(post);
                    }}
                  >
                    <img
                      src={thumbsUpImage}
                      alt="Thumbs Up"
                      style={{
                        width: "20px",
                        height: "20px",
                        marginBottom: "8px",
                        verticalAlign: "middle",
                      }}
                    />
                  </button>

                  <span
                    className="postLikes"
                    style={{
                      fontSize: "1.2em",
                      marginTop: "35px",
                    }}
                  >
                    {likes}
                  </span>

                  <button
                    className="Dislike-button"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDislikePost(post);
                    }}
                  >
                    <img
                      src={thumbsUpImage}
                      alt="Thumbs Up"
                      style={{
                        width: "20px",
                        height: "20px",

                        verticalAlign: "middle",
                        transform: "rotate(180deg)",
                      }}
                    />
                  </button>
                </div>
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
            <div className="likesfield">
              <button
                className="Like-button"
                onClick={(e) => {
                  e.preventDefault();
                  handleLikePost();
                }}
              >
                <img
                  src={thumbsUpImage}
                  alt="Thumbs Up"
                  style={{
                    width: "20px",
                    height: "20px",
                    marginBottom: "8px",
                    verticalAlign: "middle",
                  }}
                />
              </button>

              <span
                className="postLikes"
                style={{
                  fontSize: "1.2em",
                  marginTop: "35px",
                }}
              >
                {likes}
              </span>

              <button
                className="Dislike-button"
                onClick={(e) => {
                  e.preventDefault();
                  handleDislikePost(post, context, setLikes);
                }}
              >
                <img
                  src={thumbsUpImage}
                  alt="Thumbs Up"
                  style={{
                    width: "20px",
                    height: "20px",

                    verticalAlign: "middle",
                    transform: "rotate(180deg)",
                  }}
                />
              </button>
            </div>
          </div>
        )}
        <hr className="horizontal-line" />
        <div>
          <CreateCommentForm postId={post.postId} />
          {comments.length > 0 ? (
            <div>
              {comments
                .sort((a, b) => parseInt(b.commentId) - parseInt(a.commentId))
                .map((comment, index) => (
                  <Comment comment={comment} key={index} />
                ))}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </PostContext.Provider>
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.object,
};

export { Post as default, PostContext };
