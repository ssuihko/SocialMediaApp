import { useState, useContext, useEffect } from "react";
import { AppContext } from "../App";
import { PostContext } from "./Post";

function PostFormUpdate() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { users, allPosts } = useContext(AppContext);
  const appContext = useContext(AppContext);
  const { post, setPostTitle, setPostContent } = useContext(PostContext);

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

      let newPosts = allPosts.map((item) => {
        if (parseInt(item.postId) === parseInt(updatedPost.postId)) {
          return { ...item, ...updatedPost };
        }
        return item;
      });

      // appContext.reloadPosts();
      // setPostTitle(title);
      // setPostContent(content);
      appContext.reloadOnePost(post.postId);

      appContext.setPosts([...newPosts]);
      setTitle("");
      setContent("");
      appContext.findPost(updatedPost.postId); // reset POST view
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <form className="post-form-update" onSubmit={(e) => handleUpdate(e, users)}>
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

export default PostFormUpdate;
