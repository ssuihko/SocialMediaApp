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
    }
}
