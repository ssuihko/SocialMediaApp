using BackEnd.Models;

namespace BackEnd.Repository
{
    public interface IRepository
    {
        Task<IEnumerable<User>> GetUsers();
        Task<User> CreateUser(User user);
        Task<User?> GetUser(int userId);
        Task<User?> UpdateUser(int userId, User user);
        Task<User?> DeleteUser(int userId);
        Task<IEnumerable<Post>> GetPosts();
        Task<Post?> CreatePost(Post post, User user);
        Task<Post?> GetPost(int postId);
        Task<Post?> UpdatePost(int postId, Post post);
        Task<Post?> DeletePost(int postId);
        Task<IEnumerable<Comment>>GetCommentsByPost(int postId);
        Task<Comment?> CreateComment(Comment comment, Post post, User user);
        Task<Comment?> GetComment(int commentId);
        Task<Comment?> DeleteComment(int commentId);
        Task<Post?> UpdatePostLikes(int postId, int likes);
        Task<Comment?> UpdateCommentLikes(int commentId, int likes);
    }
}
