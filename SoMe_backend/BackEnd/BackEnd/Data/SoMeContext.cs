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
