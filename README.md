# SocialMediaApp

Social media forum application.

Boolean Academy Final Project - 2024

Project Board: https://github.com/users/ssuihko/projects/1

### CORE

- User should be able to create post,
- User should be able to delete posts,
- Home page all the posts,
- User should be bale to click on a post and see details
- User profile page
- User can view the profile of any other user
- User should be able to filter posts

### EXTENSIONS

- User should be able to comment on posts
- User should be able to thumps-up/thumps-down a post/comment
- User should be able to edit a post/comment
- User should be able to see a list of his friends,
- Authentication/login
- CSS

### TECHNOLOGIES

- FE: React/Javascript
- BE: C# .NET
- DB: ElephantSQL

### STRUCTURE

- Homepage
  - PostList
  - Post
    - PostForm
    - CommentList
    - Comment
      - CommentForm
- Profile
  - ProfileForm
- Sidebar
- Header
  - Filter

### API

#### USER

- backend: friendslist: many-to-many relationship

##### frontend calls:

- **GET all users: localhost:4300/users** &rarr; returns Array of User object, status 200 OK
- **GET a user: localhost:4300/users/:userId** &rarr; returns the User, or 404 not found
- **POST: localhost:4300/users**
  payload:

```C#
  {
    username: string,
    email: string,
    firstName: string,
    lastName: string
  }
```

returns: 400 bad request when a field is missing or a wrong field type is provided
returns: 201 created when all the fields were provided correctly
Created User Payload:

```C#
{
  id: integer,
  username: string,
  email: string,
  firstName: string,
  lastName: string
}
```

- **PUT: localhost:4300/users/:userId**
  payload (missing fields will be replaced with the old values)

```C#
  {
    username: string,
    email: string,
    firstName: string,
    lastName: string
  }
```

returns 404 not found when the user was not found by id
returns 400 bad request when an updated field is not in acceptable format (validation error)
returns 200 OK with the correct payload

- **DELETE: localhost:4300/users/:userId**
  returns 200 OK when id was found and deletion was succesful
  returns 404 when user with the id was not found

#### POST

- backend: commentslist: one-to-many

##### frontend calls:

- **GET all users: localhost:4300/posts** &rarr; returns Array of Post objects, status 200 OK
- **GET a user: localhost:4300/posts/:postId** &rarr; returns the Post, or 404 not found
- **POST: localhost:4300/posts**
  payload:

```C#
  {
    userId: string,
    title: string,
    text: string,
  }
```

returns: 400 bad request when a field is missing or a wrong field type is provided
returns: 201 created when all the fields were provided correctly
Created Post Payload:

```C#
{
    id: integer,
    userId: string,
    title: string,
    text: string,
    likes: integer (0)
}
```

- **PUT: localhost:4300/posts/:postId**
  payload (missing fields will be replaced with the old values)

```C#
  {
    userId: string,
    title: string,
    text: string,
    likes: integer
  }
```

returns 404 not found when the post was not found by id
returns 400 bad request when an updated field is not in acceptable format (validation error)
returns 200 OK with the correct payload

- **DELETE: localhost:4300/posts/:postId**
  returns 200 OK when post with the id was found and deletion was succesful
  returns 404 when post with the id was not found

#### COMMENT

##### frontend calls:

- **GET all comments: localhost/4300/posts/:postId/comments/** &rarr; returns Array of Comment objects, status 200 OK
- **GET a comment: localhost/4300/posts/:postId/comments/:commentId** &rarr; returns the Comment, or 404 not found
- **POST: localhost/4300/posts/:postId/comments/**
  payload:

```C#
  {
    postId: integer,
    userId: integer,
    text: string,
  }
```

returns: 400 bad request when a field is missing or a wrong field type is provided
returns: 201 created when all the fields were provided correctly
Created Comment Payload:

```C#
{
    postId: integer,
    userId: integer,
    text: string,
    likes: integer
}
```

- **PUT: localhost:4300/posts/:postId/comments/:commentId**
  payload (missing fields will be replaced with the old values)

```C#
  {
    postId: integer,
    userId: integer,
    text: string,
  }
```

returns 404 not found when the comment was not found by id
returns 400 bad request when an updated field is not in acceptable format (validation error)
returns 200 OK with the correct payload

- **DELETE: localhost:4300/posts/:postId/comments** &rarr; deletes all comments of a post
  returns 200 OK when post with the post with the id was found and deletion was succesful
  returns 404 when post with the id was not found

- **DELETE: localhost:4300/posts/:postId/comments/:commentId** &rarr; deletes one comment of a post
  returns 200 OK when comment with the id was found and deletion was succesful
  returns 404 when post / comment with the id was not found
