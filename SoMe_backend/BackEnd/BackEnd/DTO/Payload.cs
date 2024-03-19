namespace BackEnd.DTO
{
    public class Payload
    {
        public record CreateUserPayload(string username, string firstName, string lastName, string email, string profileImage);
        public record UpdateUserPayload(string username, string firstName, string lastName, string email, string profileImage);
        public record CreatePostPayload(string title, string content, int userId);
        public record UpdatePostPayload(string title, string content);
    }
}
