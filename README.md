# Blog List Application
### This is a blog list application built with Node.js, Express, and MongoDB. Users can add, delete, and update blog posts, as well as create new user accounts and authenticate with tokens.

## Installation
- To run the application, you must have Node.js and MongoDB installed on your system.

- Clone this repository to your local machine.

- Navigate to the root directory of the project in your terminal.

- Run npm install to install the project dependencies.

- Create a .env file in the root directory and add the following variables:

```
PORT=3003
MONGODB_URI=mongodb://localhost/bloglist
TEST_MONGODB_URI =mongodb://localhost/testBlogList
SECRET=your_secret_key
```
- Start the application by running npm start.

## Usage
Once the application is running, you can interact with it through HTTP requests. You can use a tool like 
Postman or the VS Code REST client to make requests to the API.

The available API endpoints are:

- GET /api/blogs: get a list of all blog posts
- POST /api/blogs: create a new blog post
- DELETE /api/blogs/:id: delete a blog post with the given ID
- POST /api/users: create a new user account
- GET /api/users: get a list of all user accounts
- POST /api/login: authenticate a user and get an access token

## Security
This application uses bcrypt to hash user passwords and store them securely in the database. Access tokens are generated using JSON Web Tokens (JWT) and are verified using a secret key that is only known to the server.

