using System.ComponentModel.DataAnnotations.Schema;
using System.Net.Sockets;

namespace BackEnd.Models
{
    [Table("comments")]
    public class Comment
    {
        [Column("comment_id")]
        public int commentId { get; set; }
        [Column("post_id")]
        public int postId { get; set; }
        public Post post { get; set; }
        [Column("user_id")]
        public int userId { get; set; }
        public User user { get; set; }
        [Column("content")]
        public string content { get; set; }
        [Column("likes")]
        public int likes { get; set; }
    }
}
