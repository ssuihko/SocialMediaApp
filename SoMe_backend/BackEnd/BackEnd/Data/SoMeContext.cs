using System.Diagnostics;
using BackEnd.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;

namespace BackEnd.Data
{
    public class SoMeContext : DbContext
    {
        private string _connectionString;
        public SoMeContext(DbContextOptions<SoMeContext> options) : base(options)
        {
            var configuration = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
            _connectionString = configuration.GetValue<string>("ConnectionStrings:DefaultConnectionString")!;
            this.Database.EnsureCreated();
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<User>().HasData(
                new User { userId = 1, username = "John Doe", firstName = "John", lastName = "Doe",email = "JohnDoe@gmail.com" },
                new User { userId = 2, username = "Jane Doe", firstName = "Jane", lastName = "Doe", email = "JaneJane@Jane.com" },
                new User { userId = 3, username = "Bob Jones", firstName = "Bob", lastName = "Jones", email = "BobJones@gmail.com" }
            );

            modelBuilder.Entity<Post>().HasData(
                new Post { postId = 1, userId = 1, title = "Irem", content = "In Medias Res", likes=8 },
                new Post { postId = 2, userId = 1, title = "Lorem", content = "Interdimensional Rift", likes = 7 }
            );
            modelBuilder.Entity<Comment>().HasData(
                new Comment { commentId = 1, postId = 1, userId = 2, content = "Best experience ever", likes = 8 },
                new Comment { commentId = 2, postId = 2, userId = 3, content = "Worst experience ever", likes = 100 }
            );
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(_connectionString);
            optionsBuilder.LogTo(message => Debug.WriteLine(message));
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Comment> Comments { get; set; }
        
    }
}
