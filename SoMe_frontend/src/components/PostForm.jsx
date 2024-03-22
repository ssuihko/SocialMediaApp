import { useState, useContext } from "react";
import { AppContext } from "../App";

function PostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { posts, setPosts, loggedInUser } = useContext(AppContext);
  const { users } = useContext(AppContext);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newPostData = {
      title,
      content,
      userId: loggedInUser.userId,
    };
    try {
      const response = await fetch("https://localhost:7234/" + "posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPostData),
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      const newPost = await response.json();

      setPosts([...posts, newPost]);

      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <form className="post-form" onSubmit={(e) => handleSubmit(e, users)}>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        placeholder="Title"
        value={title}
        autoComplete="off"
        onChange={handleTitleChange}
      />
      <label htmlFor="content">Content:</label>
      <textarea
        id="content"
        placeholder="Write a new post.."
        value={content}
        onChange={handleContentChange}
      ></textarea>
      <button className="post-form-button" type="submit">
        POST
      </button>
    </form>
  );
}

export default PostForm;
