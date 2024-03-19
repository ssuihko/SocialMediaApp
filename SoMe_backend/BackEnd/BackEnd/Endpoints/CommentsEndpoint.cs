using BackEnd.DTO;
using BackEnd.Models;
using BackEnd.Repository;
using static BackEnd.DTO.Payload;

namespace BackEnd.Endpoints
{
    public static class CommentsEndpoint
    {
        public static void ConfigureCommentEndpoint(this WebApplication app)
        {
            app.MapGet("/posts/{post_id}/comments", GetCommentsByPost);
            app.MapPost("/posts/{post_id}/comments", CreateComment);
            app.MapDelete("/posts/{post_id}/comments/{comment_id}", DeleteComment);
        }
        public static async Task<IResult> GetCommentsByPost(IRepository repository, int postId)
        {
            var comments = await repository.GetCommentsByPost(postId);
            var commentsDTO = new List<CommentResponseDTO>();
            foreach (var comment in comments)
            {
                commentsDTO.Add(new CommentResponseDTO(comment));
            }
            return TypedResults.Ok(commentsDTO);
        }
        public static async Task<IResult> CreateComment(IRepository repository, CreateCommentPayload payload)
        {
            User? user = await repository.GetUser(payload.userId);
            Post? post = await repository.GetPost(payload.postId);
            if (user == null || post == null) { return TypedResults.NotFound(); }

            Comment comment = new Comment { content = payload.content, postId = payload.postId,userId = payload.userId, likes = 0 };
            var result = await repository.CreateComment(comment, post, user);
            if (result == null)
            {
                return TypedResults.BadRequest();
            }
            return TypedResults.Ok(new CommentResponseDTO(result));
        }
        public static async Task<IResult> DeleteComment(IRepository repository, int commentId)
        {
            Comment? comment = await repository.GetComment(commentId);
            if (comment == null) { return TypedResults.BadRequest(); }
            var result = await repository.DeleteComment(commentId);
            if (result == null) { return TypedResults.NotFound(); }
            return TypedResults.Ok(new CommentResponseDTO(result));
        }
    }
}
