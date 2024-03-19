using System.ComponentModel.DataAnnotations;
using System.Net.Sockets;
using System.Runtime.CompilerServices;
using BackEnd.DTO;
using BackEnd.Models;
using BackEnd.Repository;
using Newtonsoft.Json;
using static BackEnd.DTO.Payload;

namespace BackEnd.Endpoints
{
    public static class UsersEndpoint
    {

        public static void ConfigureUserEndpoint(this WebApplication app)
        {
            app.MapGet("/users", GetUsers);
            app.MapPost("/users", CreateUser);
            app.MapGet("/users/{user_id}", GetUser);
            app.MapPut("/users/{user_id}", UpdateUser);
            app.MapDelete("/users/{user_id}", DeleteUser);
        }
        public static async Task<IResult> GetUsers(IRepository repository)
        {
            var users = await repository.GetUsers();
            var usersDTO = new List<UserResponseDTO>();
            foreach(var user in users)
            {
                usersDTO.Add(new UserResponseDTO(user));
            }
            return TypedResults.Ok(usersDTO);
        }
        public static async Task<IResult> CreateUser(IRepository repository, CreateUserPayload payload)
        {
            if(payload.username== null || payload.email == null || payload.firstName == null || payload.lastName == null || payload.profileImage == null)
            {
                return TypedResults.BadRequest(new { error = "Username, email, firstName, lastName and profileImg are required, and must be of type string. Id must be a number." });
            }
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
                return TypedResults.NotFound(new { error = "User not found." });
            }
            return TypedResults.Ok(new UserResponseDTO(result));
        }

        public static async Task<IResult> UpdateUser(IRepository repository, UpdateUserPayload payload, int userId)
        {
            User? userToUpdate = await repository.GetUser(userId);
            if (userToUpdate == null) { return TypedResults.NotFound(new { error = "User not found." }); }

            
            if(ValidatePayload(payload)==false)
            {
                return TypedResults.BadRequest(new { error = "Username, email, firstName, lastName and profileImg should be strings. Id must be a number." });
            }
            User newInfo = new User { username = payload.username, lastName = payload.lastName, firstName = payload.firstName, profileImg = payload.profileImage, email = payload.email };
            var result = await repository.UpdateUser(userId, newInfo);
            if (result == null)
            {
                return TypedResults.NotFound();
            }
            return TypedResults.Ok(new UserResponseDTO(result));
        }
        public static async Task<IResult> DeleteUser(IRepository repository, int userId)
        {
            User? user = await repository.GetUser(userId);
            if (user == null) { return TypedResults.NotFound(new {error="User not found."}); }
            var result = await repository.DeleteUser(userId);
            return TypedResults.Ok(new UserResponseDTO(result));
        }
        public static Boolean ValidatePayload(UpdateUserPayload payload)
        {
            bool validPayload = true;
            if (!(payload.username is string))
            {
                if (!(payload.username == null))
                {
                    validPayload = false;
                }
            }
            if (!(payload.firstName is string))
            {
                if (!(payload.firstName == null))
                {
                    validPayload = false;
                }
            }
            if (!(payload.lastName is string))
            {
                if (!(payload.lastName == null))
                {
                    validPayload = false;
                }
            }
            if (!(payload.email is string))
            {
                if (!(payload.email == null))
                {
                    validPayload = false;
                }
            }
            if (!(payload.profileImage is string))
            {
                if (!(payload.profileImage == null))
                {
                    validPayload = false;
                }
            }
            return validPayload;
        }
    }
}
