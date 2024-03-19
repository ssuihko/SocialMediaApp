using BackEnd.DTO;
using BackEnd.Models;
using BackEnd.Repository;
using static BackEnd.DTO.Payload;

namespace BackEnd.Endpoints
{
    public static class PostsEndpoint
    {
        public static void ConfigurePostEndpoint(this WebApplication app)
        {
            app.MapGet("/posts", GetPosts);
            app.MapPost("/posts", CreatePost);
            app.MapGet("/post/{post_id}", GetPost);
            app.MapPut("/post/{post_id}", UpdatePost);
            app.MapDelete("/post/{post_id}", DeletePost);
        }
        public static async Task<IResult> GetPosts(IRepository repository)
        {
            var posts = await repository.GetPosts();
            var postsDTO = new List<PostResponseDTO>();
            foreach (var post in posts)
            {
                postsDTO.Add(new PostResponseDTO(post));
            }
            return TypedResults.Ok(postsDTO);
        }
        public static async Task<IResult> CreatePost(IRepository repository, CreatePostPayload payload)
        {
            User? user = await repository.GetUser(payload.userId);
            if (user == null) { return TypedResults.NotFound(); }
            Post post = new Post { title = payload.title, content = payload.content, userId=payload.userId, likes = 0 };
            var result = await repository.CreatePost(post, user);
            if (result == null)
            {
                return TypedResults.BadRequest();
            }
            return TypedResults.Ok(new PostResponseDTO(result));
        }
        public static async Task<IResult> GetPost(IRepository repository, int postId)
        {
            var post = await repository.GetPost(postId);
            if (post == null) { return TypedResults.NotFound(); }
            return TypedResults.Ok(new PostResponseDTO(post));
        }
        public static async Task<IResult> UpdatePost(IRepository repository, UpdatePostPayload payload, int postId)
        {
            Post? postToUpdate = await repository.GetPost(postId);
            if (postToUpdate == null) { return TypedResults.BadRequest(); }
            Post newInfo = new Post { title = payload.title, content=payload.content };
            var result = await repository.UpdatePost(postId, newInfo);
            if (result == null)
            {
                return TypedResults.NotFound();
            }
            return TypedResults.Ok(new PostResponseDTO(result));
        }
        public static async Task<IResult> DeletePost(IRepository repository, int postId)
        {
            Post? post = await repository.GetPost(postId);
            if (post == null) { return TypedResults.BadRequest(); }
            var result = await repository.DeletePost(postId);
            if (result == null) { return TypedResults.NotFound(); }
            return TypedResults.Ok(new PostResponseDTO(result));
        }
    }
}
