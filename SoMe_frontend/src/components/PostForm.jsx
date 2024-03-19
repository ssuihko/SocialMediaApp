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

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const newPostData = {
    //   postId: posts.length + 1, // Generate unique id for the new post
    //   title,
    //   content,
    //   user: loggedInUser, // You can modify this according to your requirements
    //   comments: [],
    // };
    const newPostData = {
      title,
      content,
      userId: loggedInUser.userId, // Assuming you have a userId property in loggedInUser
    };
    try {
      // Make a POST request to the API endpoint to create the new post
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

      // Retrieve the newly created post from the API response
      const newPost = await response.json();

      // Update the local state with the newly created post
      setPosts([...posts, newPost]);

      // Reset form fields
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
