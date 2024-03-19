import { useState, useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../App";
import { PostContext } from "./Post";

function CreateCommentForm() {
  const [formData, setFormData] = useState({});
  const [flag, setFlag] = useState(true);

  const context = useContext(AppContext);
  const postContext = useContext(PostContext);

  const addComment = (formData) => {
    formData.postId = postContext.post.id; // change later
    console.log(formData);
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
            addComment(formData);
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
