# SocialMediaApp

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

### STRUCTURE

- Homepage
  - PostList
  - Post
    - CommentList
    - Comment
      - CommentForm
    - PostForm
- Profile
  - ProfileForm
- Sidebar
- Header
  - Filter

### API

User
  {
    id: integer,
    username: string,
    email: string,
    firstName: srting,
    lastName: string
  }

- backend: friendslist: many-to-many relationship

frontend calls:

- GET all users: localhost/4300/user
- GET a user: localhost/4300/user/id
- POST: localhost/4300/user
- PUT: localhost/4300/user/id
- DELETE: localhost/4300/user/id

Post
{
id: integer,
userId: string,
title: string,
text: string,
likes: integer
}

- backend: commentslist: one-to-many

frontend calls:

- GET all: localhost/4300/post
- GET one: localhost/4300/post/id
- POST: localhost/4300/post
- PUT: localhost/4300/post/id
- DELETE: localhost/4300/post/id

Comment
  {
    id: integer,
    postId: string,
    text: string,
    likes: integer
  }

frontend calls:

- GET all: localhost/4300/post/id/comment
- GET one: localhost/4300/post/id/comment/id
- POST: localhost/4300/post/id/comment
- PUT: localhost/4300/post/id/comment/id
- DELETE: localhost/4300/post/id/comment/id
- DELETE all: localhost/4300/post/id/comment
