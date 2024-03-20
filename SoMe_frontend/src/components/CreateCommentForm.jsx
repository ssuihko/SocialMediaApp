import { useState, useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../App";
import { PostContext } from "./Post";

function CreateCommentForm() {
  const [formData, setFormData] = useState({});
  const [flag, setFlag] = useState(true);

  const context = useContext(AppContext);
  const postContext = useContext(PostContext);

  const addComment = async () => {
    const newCommentData = {
      content: formData.content,
      postId: postContext.post.postId,
      userId: context.loggedInUser.userId, // Assuming you have a userId property in loggedInUser
    };

    try {
      // Make a POST request to the API endpoint to create the new post
      const response = await fetch(
        `https://localhost:7234/posts/${postContext.post.postId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCommentData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create comment");
      }

      postContext.reloadPosts();

      // Reset form fields
      setFormData({});
    } catch (error) {
      console.error("Error creating comment:", error);
    }

    setFlag(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name !== undefined) {
      setFormData({ ...formData, [name]: value });
    }
  };

  useEffect(() => {
    if (context.loggedInUser !== null) {
      if (flag === true) {
        setFormData({
          userId: context.loggedInUser.userId,
          content: "",
          likes: 0,
        });
      }
      setFlag(false);
    }
  }, [context.loggedInUser, flag]);

  return (
    <div className="create-comment">
      {formData === undefined ? (
        <p>loading...</p>
      ) : (
        <form
          className="create-comment-form"
          onSubmit={(e) => {
            e.preventDefault();
            addComment();
          }}
        >
          <div className="textarea-section">
            <textarea
              id="content"
              name="content"
              type="text"
              placeholder="Add a comment..."
              value={formData.content}
              onChange={handleInputChange}
            ></textarea>
            <button type="submit" className="img-update-btn">
              Send
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default CreateCommentForm;
