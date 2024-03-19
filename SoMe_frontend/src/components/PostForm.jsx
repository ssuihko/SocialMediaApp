import React, { useState, useContext } from "react";
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPost = {
      postId: posts.length + 1, // Generate unique id for the new post
      title,
      content,
      user: loggedInUser, // You can modify this according to your requirements
      comments: [],
    };
    setPosts([...posts, newPost]);
    // Reset form fields
    setTitle("");
    setContent("");
  };

  return (
    <form className="post-form" onSubmit={(e) => handleSubmit(e, users)}>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        placeholder="Title"
        value={title}
        onChange={handleTitleChange}
      />
      <label htmlFor="content">Content:</label>
      <textarea
        id="content"
        placeholder="Write a new post.."
        value={content}
        onChange={handleContentChange}
      ></textarea>
      <button type="submit">POST</button>
    </form>
  );
}

export default PostForm;
