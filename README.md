# Bookstore Project

## Overview
This project is a full-stack web application built using the MEAN stack (MongoDB, Express.js, Angular, Node.js). It allows users to browse, rate, and purchase books. The backend is fully implemented, while some features are still being integrated into the frontend.

## Features

### Anonymous Users
- **Login/Register**: Create an account or log in.
- **View all books**: Browse the entire collection of books.
- **View book details, ratings, and comments**: See detailed information about each book, including user ratings and comments.

### Authenticated Users
- **Buy books**: Purchase books.
- **Rate books**: Leave ratings for books.
- **Comment on books**: Leave comments on books.
- **View user profiles**: (Not yet implemented in frontend) View profiles of other users.
- **View purchase history**: See a history of their own purchases.
- **Create favorite books list**: (Not yet implemented in frontend) Create a list of favorite books.
- **Change avatar**: Update their profile picture.

### Admin Users
- **Add books to the store**: Add new books to the collection.
- **Edit books**: Update book details.
- **Delete books**: Remove books from the collection.
- **Edit/Delete offensive user comments**: (Not yet implemented in frontend) Manage user comments.
- **Block/Unblock users from commenting**: (Not yet implemented in frontend) Control user commenting privileges.
- **Change inappropriate user avatars**: (Not yet implemented in frontend) Update user profile pictures.

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/rawan-radwan/Bookstore-MEAN.git
    cd bookstore
    ```

2. **Install backend dependencies**:
    ```bash
    cd backend
    npm install
    ```

3. **Install frontend dependencies**:
    ```bash
    cd ../frontend
    npm install
    ```

4. **Set up environment variables**:
    Create a `.env` file in the `backend` directory and add your MongoDB URI and other necessary environment variables.

5. **Run the backend server**:
    ```bash
    cd backend
    npm start
    ```

6. **Run the frontend server**:
    ```bash
    cd ../frontend
    ng serve
    ```

## Usage
- Navigate to `http://localhost:4200` in your web browser to access the application.

## Contributing
Feel free to fork this repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the MIT License.
