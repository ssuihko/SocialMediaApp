import React, { useState, useContext } from "react";
import { AppContext } from "../App";

function PostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { posts, setPosts } = useContext(AppContext);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  //   const handleSubmit = (event) => {
  //     event.preventDefault();
  //     // Handle form submission logic here
  //     console.log("Submitted:", { title, content });
  //     // Reset form fields
  //     setTitle("");
  //     setContent("");
  //   };
  const handleSubmit = (event) => {
    event.preventDefault();
    const newPost = {
      id: posts.length + 1, // Generate unique id for the new post
      title,
      content,
      author: "Logged In User", // You can modify this according to your requirements
    };
    setPosts([...posts, newPost]); // Add the new post to the posts array
    // Reset form fields
    setTitle("");
    setContent("");
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
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
