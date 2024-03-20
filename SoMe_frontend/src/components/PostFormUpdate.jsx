import { useState, useContext, useEffect } from "react";
import { AppContext } from "../App";
import PropTypes from "prop-types";

function PostFormUpdate({ post, setUpdateMode }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { setPosts } = useContext(AppContext);
  const { users } = useContext(AppContext);

  useEffect(() => {
    setTitle(post.title);
    setContent(post.content);
  }, [post]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    const updatedPostData = {
      title: title,
      content: content,
    };

    console.log(updatedPostData);

    console.log(
      "URL: ",
      `https://localhost:7234/posts/${post.postId}?postId=${post.postId}`
    );
    try {
      const response = await fetch(
        `https://localhost:7234/posts/${post.postId}?postId=${post.postId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedPostData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update post");
      }

      const updatedPost = await response.json();

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.postId === updatedPost.postId ? updatedPost : post
        )
      );

      setTitle("");
      setContent("");
      setUpdateMode(false);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <form className="post-form" onSubmit={(e) => handleUpdate(e, users)}>
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
      <button type="submit-post-update">Update</button>
    </form>
  );
}

PostFormUpdate.propTypes = {
  post: PropTypes.object,
  setUpdateMode: PropTypes.func,
};

export default PostFormUpdate;
