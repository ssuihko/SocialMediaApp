using System.ComponentModel.DataAnnotations.Schema;
using System.Net.Sockets;

namespace BackEnd.Models
{
    [Table("posts")]
    public class Post
    {
        [Column("post_id")]
        public int postId { get; set; }
        [Column("user_id")]
        public int userId { get; set; }
        [Column("title")]
        public string title { get; set; }
        [Column("content")]
        public string content { get; set; }
        [Column("likes")]
        public int likes { get; set; }
        public ICollection<Comment> Comments { get; set; } = new List<Comment>();
    }
}
