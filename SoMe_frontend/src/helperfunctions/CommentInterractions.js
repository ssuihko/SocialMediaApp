const handleLikeComment = async (comment, postContext) => {
  const newLikesData = {
    likes: parseInt(comment.likes + 1),
  };

  try {
    const response = await fetch(
      `https://localhost:7234/posts/{post_id}/comments/${comment.commentId}/likes?commentId=${comment.commentId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newLikesData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to like comment");
    }

    postContext.reloadPosts();
  } catch (error) {
    console.error("Error liking post:", error);
  }
};

const handleDislikeComment = async (comment, postContext) => {
  if (comment.likes > 0) {
    const newLikesData = {
      likes: comment.likes - 1,
    };
    try {
      const response = await fetch(
        `https://localhost:7234/posts/{post_id}/comments/${comment.commentId}/likes?commentId=${comment.commentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newLikesData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to dislike post");
      }

      postContext.reloadPosts();
    } catch (error) {
      console.error("Error disliking comment: ", error);
    }
  }
};

const handleUpdateComment = async (
  formData,
  comment,
  postContext,
  setUpdate
) => {
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

export { handleLikeComment, handleDislikeComment, handleUpdateComment };
