using System.Net.Sockets;
using System.Runtime.CompilerServices;
using BackEnd.DTO;
using BackEnd.Models;
using BackEnd.Repository;
using static BackEnd.DTO.Payload;

namespace BackEnd.Endpoints
{
    public static class UsersEndpoint
    {

        public static void ConfigureUserEndpoint(this WebApplication app)
        {
            app.MapGet("/users", GetUsers);
            app.MapPost("/users", CreateUser);
            app.MapGet("/user/{user_id}", GetUser);
            app.MapPut("/user/{user_id}", UpdateUser);
            app.MapDelete("/user/{user_id}", DeleteUser);
        }
        public static async Task<IResult> GetUsers(IRepository repository)
        {
            var users = await repository.GetUsers();
            var usersDTO = new List<UserResponseDTO>();
            Console.WriteLine(users.Count());
            foreach(var user in users)
            {
                usersDTO.Add(new UserResponseDTO(user));
            }
            return TypedResults.Ok(usersDTO);
        }
        public static async Task<IResult> CreateUser(IRepository repository, CreateUserPayload payload)
        {
            if (!payload.email.Contains('@')) { return TypedResults.BadRequest("Not a valid email."); }
            User user = new User { username = payload.username, lastName=payload.lastName, firstName=payload.firstName,profileImg=payload.profileImage, email = payload.email };
            var result = await repository.CreateUser(user);
            if (result == null)
            {
                return TypedResults.BadRequest();
            }
            return TypedResults.Ok(result);
        }

        public static async Task<IResult> GetUser(IRepository repository, int userId)
        {
            var result = await repository.GetUser(userId);
            if (result == null)
            {
                return TypedResults.BadRequest();
            }
            return TypedResults.Ok(result);
        }

        public static async Task<IResult> UpdateUser(IRepository repository, UpdateUserPayload payload, int userId)
        {
            User? userToUpdate = await repository.GetUser(userId);
            if (userToUpdate == null) { return TypedResults.BadRequest(); }
            User newInfo = new User { username = payload.username, lastName = payload.lastName, firstName = payload.firstName, profileImg = payload.profileImage, email = payload.email };
            var result = await repository.UpdateUser(userId, newInfo);
            if (result == null)
            {
                return TypedResults.NotFound();
            }
            return TypedResults.Ok(result);
        }
        public static async Task<IResult> DeleteUser(IRepository repository, int userId)
        {
            User? user = await repository.GetUser(userId);
            if (user == null) { return TypedResults.BadRequest(); }
            var result = await repository.DeleteUser(userId);
            if (result == null) { return TypedResults.NotFound(); }
            return TypedResults.Ok(result);
        }

    }
}
