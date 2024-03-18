using System.ComponentModel.DataAnnotations.Schema;
using System.Net.Sockets;

namespace BackEnd.Models
{
    [Table("users")]
    public class User
    {
        [Column("user_id")]
        public int userId { get; set; }
        [Column("username")]
        public string username { get; set; }
        [Column("first_name")]
        public string firstName { get; set; }
        [Column("last_name")]
        public string lastName { get; set; }
        [Column("email")]
        public string email { get; set; }
        [Column("profile_image")]
        public string profileImg { get; set; }
        public ICollection<Post> Posts { get; set; } = new List<Post>();
        public ICollection<Comment> Comments { get; set; } = new List<Comment>();
    }
}
