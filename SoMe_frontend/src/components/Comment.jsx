import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../App";
import { PostContext } from "./Post";
import { Link } from "react-router-dom";
import {
  handleLikeComment,
  handleDislikeComment,
} from "../helperfunctions/CommentInterractions";

function Comment({ comment }) {
  const [update, setUpdate] = useState(false);
  const [formData, setFormData] = useState({});
  const [user, setUser] = useState("");

  const context = useContext(AppContext);
  const postContext = useContext(PostContext);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name !== undefined) {
      setFormData({ ...formData, [name]: value });
    }
  };

  useEffect(() => {
    const thisUser = context.users.find(
      (x) => parseInt(x.userId) === parseInt(comment.userId)
    );
    setUser(thisUser);
  }, [context.users, comment.userId]);

  const handleUpdateComment = async () => {
    const newCommentData = {
      content: formData.content,
    };

    try {
      const response = await fetch(
        `https://localhost:7234/posts/${postContext.post.post_id}/comments/${comment.commentId}?commentId=${comment.commentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCommentData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update comment");
      }

      postContext.reloadPosts();
      setUpdate(false);
    } catch (error) {
      console.error("Error updating comment:", error);
      return formData;
    }
  };

  return (
    <div>
      {user === undefined ? (
        <p>loading...</p>
      ) : (
        <div className="comment">
          <Link to={`/profile/${user.userId}`} className="comment-author">
            <h4>{user.firstName + " " + user.lastName}</h4>
          </Link>
          {update ? (
            <form
              className="update-comment-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateComment();
              }}
            >
              <div className="update-comment-field">
                <input
                  className="update-comment-input"
                  id="content"
                  name="content"
                  type="text"
                  placeholder={`${formData.content}`}
                  value={formData.content ?? ""}
                  onChange={handleInputChange}
                ></input>
                <button className="update-comment-btn" type="submit">
                  Update
                </button>
              </div>
            </form>
          ) : (
            <div>
              <button
                className="like-comment"
                onClick={(e) => {
                  e.preventDefault();
                  handleLikeComment(comment, postContext);
                }}
              >
                Like
              </button>
              <button
                className="dislike-comment"
                onClick={(e) => {
                  e.preventDefault();
                  handleDislikeComment(comment, postContext);
                }}
              >
                Dislike
              </button>
              <p>
                {comment.content} likes: {comment.likes}
              </p>
            </div>
          )}
          <button
            className="modify-btn"
            onClick={(e) => {
              e.preventDefault();
              setFormData(comment);
              setUpdate(!update);
            }}
          >
            Modify
          </button>
        </div>
      )}
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.object,
};

export default Comment;
