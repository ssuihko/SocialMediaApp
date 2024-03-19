﻿using BackEnd.Models;

namespace BackEnd.DTO
{
    class UserDTO
    {
        public int userId {  get; set; }
        public string username { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string email { get; set; }
        public string profileImg { get; set; }
        public UserDTO(User user)
        { 
            userId = user.userId;
            username = user.username;
            firstName = user.firstName;
            lastName = user.lastName;
            email = user.email;
            profileImg = user.profileImg;
        }
    }
    class PostDTO
    {
        public int postId { get; set; }
        public string title { get; set; }
        public string content { get; set; }
        public int likes { get; set; }
        public PostDTO(Post post)
        {
            postId = post.postId;
            title = post.title;
            content = post.content;
            likes = post.likes;
        }
    }
    class CommentDTO
    {
        public int commentId { get; set; }
        public string content { get; set; }
        public int likes { get; set; }
        public CommentDTO(Comment comment)
        {
            commentId = comment.commentId;
            content = comment.content;
            likes = comment.likes;
        }
    }
    class UserResponseDTO
    {
        public int userId { get; set; }
        public string username { get; set; }
        public string firstName {  get; set; }
        public string lastName { get; set; }
        public string email { get; set; }
        public string profileImg { get; set; }
        public List<PostDTO> posts { get; set; } = new List<PostDTO>();
        public List<CommentDTO> comments { get; set; } = new List<CommentDTO>();
        public UserResponseDTO(User user)
        {
            userId = user.userId;
            username = user.username;
            firstName = user.firstName;
            lastName = user.lastName;
            email = user.email;
            profileImg = user.profileImg;
            foreach(Post post in user.posts)
            {
                posts.Add(new PostDTO(post));
            }
            foreach(Comment comment in user.comments)
            {
                comments.Add(new CommentDTO(comment));
            }
        }
    }
}
