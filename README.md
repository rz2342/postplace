# PostPlace

## Overview

PostPlace is a web app that will provide basic social media functionalities such as logging in, creating posts, editing your profile, and commenting on posts. Users must register for an account or log in with a visitor account before being able to see posts.

## Data Model

The application will store Users, Posts, and Comments.

- users can have multiple posts (via references)
- posts can have multiple comments (via references)

An Example User:

```javascript
{
  name: "Ricky Zhang",
  username: "rz2342",
  profilePicUrl: // url to an image
  password: // a password hash,
  posts: // an array of Post ids
}
```

An Example Post:

```javascript
{
  content: "content of the post",
  user: // the _id of the user who created the post,
  timestamp: // the timestamp of when the post was created,
  comments: // an array of Comment ids
}
```

An example Comment:

```javascript
{
  content: "content of the comment",
  user: // the _id of the user who created the comment,
  timestamp: // the timestamp of when the comment was created,
  post: // the id of the post
}
```

## [Link to Commented First Draft Schema](db.mjs)

![schema](db.mjs)

## Wireframes

/ - page for logging in or signing up

![list create](wireframes/home.pdf)

/home - page for showing all posts

![list](wireframes/home.pdf)

/profile and /users/:userId - page for showing a profile page

![list](wireframes/profile.pdf)

## Site map

![list](/flow.pdf)

## User Stories or Use Cases

1. as non-registered user, I can register a new account or log in with the site
2. as non-registered user, I can log in as a visitor
3. as a user, I can create a new post
4. as a user, I can search for other users
5. as a user, I can add a comment to a post
6. as a user, I can edit my profile

## Research Topics

- (2 points) NextAuth.js
- (2 points) TailwindCSS
- (6 points) Next.js

10 points total out of 10 required points

## [Link to Initial Main Project File](app.mjs)

![schema](</app/(signup)/page.js>)

## Annotations / References Used

1. [Next.js docs](https://nextjs.org/docs)
2. [Nextauth docs](https://next-auth.js.org/getting-started/introduction)
3. [Tailwind docs](https://tailwindcss.com/docs/installation)

```

```
