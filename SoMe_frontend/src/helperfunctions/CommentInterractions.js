const handleLikeComment = async (comment, context) => {
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

    context.reloadPosts();
  } catch (error) {
    console.error("Error liking post:", error);
  }
};

const handleDislikeComment = async (comment, context) => {
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

      context.reloadPosts();
    } catch (error) {
      console.error("Error disliking comment: ", error);
    }
  }
};

export { handleLikeComment, handleDislikeComment };
