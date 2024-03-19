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
    }
}
