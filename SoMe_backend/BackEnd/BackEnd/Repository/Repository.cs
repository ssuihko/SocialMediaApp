using System.Numerics;
using BackEnd.Data;
using BackEnd.DTO;
using BackEnd.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;

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
            return await _databaseContext.Users.Include(u=> u.posts).Include(u => u.comments).FirstOrDefaultAsync(u => u.userId == userId);
        }
        public async Task<User?> UpdateUser(int userId, User user)
        {
            User? userToUpdate = await GetUser(userId);

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
            var commentsCopy = new List<Comment>(user.comments);
            foreach(Comment comment in commentsCopy)
            {
                await DeleteComment(comment.commentId);
            }
            var postsCopy = new List<Post>(user.posts);
            foreach (Post post in postsCopy)
            {
                await DeletePost(post.postId);
            }
            _databaseContext.Users.Remove(user);
            _databaseContext.SaveChanges();
            return user;
        }
        public async Task<IEnumerable<Post>> GetPosts()
        {
            return await _databaseContext.Posts.Include(p=> p.user).Include(p=>p.comments).ToListAsync();
        }
        public async Task<Post?> CreatePost(Post post, User user)
        {
            try
            {
                await _databaseContext.Posts.AddAsync(post);
                user.posts.Add(post);
            }
            catch (Exception ex)
            {
                return null;
            }
            _databaseContext.SaveChanges();
            return post;
        }
        public async Task<Post?> GetPost(int postId)
        {
            return await _databaseContext.Posts.Include(p => p.user).Include(p => p.comments).FirstOrDefaultAsync(p => p.postId == postId);
        }
        public async Task<Post?> UpdatePost(int postId, Post post)
        {
            Post? postToUpdate = await GetPost(postId);

            postToUpdate.title = post.title ?? postToUpdate.title;
            postToUpdate.content = post.content ?? postToUpdate.content;
            
            _databaseContext.SaveChanges();
            return postToUpdate;
        }
        public async Task<Post?> DeletePost(int postId)
        {
            Post? post = await GetPost(postId);
            if (post == null) { return null; }
            var commentsCopy = new List<Comment>(post.comments);
            foreach (Comment comment in commentsCopy)
            {
                await DeleteComment(comment.commentId);
            }
            _databaseContext.Posts.Remove(post);
            _databaseContext.SaveChanges();
            return post;
        }
        public async Task<IEnumerable<Comment>> GetCommentsByPost(int postId)
        {
            return await _databaseContext.Comments.Include(c => c.user).Where(c => c.postId == postId).ToListAsync();
        }
        public async Task<Comment?> CreateComment(Comment comment, Post post, User user)
        {
            try
            {
                await _databaseContext.Comments.AddAsync(comment);
                post.comments.Add(comment);
                user.comments.Add(comment);
            }
            catch (Exception ex)
            {
                return null;
            }
            _databaseContext.SaveChanges();
            return comment;
        }
        public async Task<Comment?> GetComment(int commentId)
        {
            return await _databaseContext.Comments.Include(c => c.user).Include(c => c.post).FirstOrDefaultAsync(c => c.commentId == commentId);
        }
        public async Task<Comment?> DeleteComment(int commentId)
        {
            Comment? comment = await GetComment(commentId);
            if (comment == null) { return null; }
            _databaseContext.Comments.Remove(comment);
            _databaseContext.SaveChanges();
            return comment;
        }
    }
}
