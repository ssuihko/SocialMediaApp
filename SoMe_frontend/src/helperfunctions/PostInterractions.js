const handleLikePost = async (post, context, setLikes) => {
  const newLikesData = {
    likes: parseInt(post.likes + 1),
  };

  try {
    const response = await fetch(
      `https://localhost:7234/posts/${post.postId}/likes?postId=${post.postId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newLikesData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to like post");
    }

    const updatedPost = await response.json();

    const newPosts = context.allPosts.map((x) => {
      if (x.postId === updatedPost.postId) {
        return updatedPost;
      } else {
        return x;
      }
    });

    context.setPosts([...newPosts]);
  } catch (error) {
    console.error("Error liking post:", error);
  }

  setLikes(newLikesData.likes);
};

const handleDislikePost = async (post, context, setLikes) => {
  if (post.likes > 0) {
    const newLikesData = {
      likes: post.likes - 1,
    };
    try {
      const response = await fetch(
        `https://localhost:7234/posts/${post.postId}/likes?postId=${post.postId}`,
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

      const updatedPost = await response.json();

      const newPosts = context.allPosts.map((x) => {
        if (x.postId === updatedPost.postId) {
          return updatedPost;
        } else {
          return x;
        }
      });

      context.setPosts([...newPosts]);
    } catch (error) {
      console.error("Error disliking post:", error);
    }
    setLikes(newLikesData.likes);
  }
};

export { handleLikePost, handleDislikePost };
