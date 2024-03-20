import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../App";
import { PostContext } from "./Post";
import { Link } from "react-router-dom";

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
    try {
      const response = await fetch(
        `https://localhost:7234/posts/${postContext.post.postId}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating comment:", error.message);
    }
  };

  return (
    <div>
      {user === undefined ? (
        <p>loading...</p>
      ) : (
        <div className="comment">
          <Link to={`/profile/${user.userId}`}>
            <h4>{user.firstName + " " + user.lastName}</h4>
          </Link>
          {update ? (
            <form
              className="update-comment-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateComment(formData);
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
                <button type="submit">Update</button>
              </div>
            </form>
          ) : (
            <p>{comment.content}</p>
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
