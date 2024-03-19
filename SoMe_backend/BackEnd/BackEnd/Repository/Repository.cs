using BackEnd.Data;
using BackEnd.Models;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Repository
{
    public class Repository:IRepository
    {
        private SoMeContext _databaseContext;
        public Repository(SoMeContext databaseContext)
        {
            _databaseContext = databaseContext;
        }
        public async Task<IEnumerable<User>> GetUsers()
        {
            return await _databaseContext.Users.Include(u => u.posts).Include(u => u.comments).ToListAsync();
        }
        public async Task<User> CreateUser(User user)
        {
            await _databaseContext.Users.AddAsync(user);
            _databaseContext.SaveChanges();
            return user;
        }
        public async Task<User?> GetUser(int userId)
        {
            return await _databaseContext.Users.FirstOrDefaultAsync(u => u.userId == userId);
        }
        public async Task<User?> UpdateUser(int userId, User user)
        {
            User? userToUpdate = await GetUser(userId);
            if (userToUpdate == null) { return null; }

            userToUpdate.username = user.username ?? userToUpdate.username;
            userToUpdate.firstName = user.firstName ?? userToUpdate.firstName;
            userToUpdate.lastName = user.lastName ?? userToUpdate.lastName;
            userToUpdate.email = user.email ?? userToUpdate.email;
            userToUpdate.profileImg = user.profileImg ?? userToUpdate.profileImg;
            _databaseContext.SaveChanges();
            return userToUpdate;
        }
        public async Task<User?> DeleteUser(int userId)
        {
            User? user = await GetUser(userId);
            if (user == null) { return null; }
            _databaseContext.Users.Remove(user);
            _databaseContext.SaveChanges();
            return user;
        }
    }
}
