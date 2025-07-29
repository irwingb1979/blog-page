# My Blog Page Project

A dynamic and responsive blog application built with Node.js, Express, MongoDB, and EJS, designed to showcase articles and posts in a clean, modern interface. It features user authentication, blog post management, and image uploads.

## 🖥️ Demo

[Link to your live demo, if available. For example: `https://blog-page-9d22.onrender.com`]

## ✨ Features

* **User Authentication:** Secure user registration, login, and session management using `bcrypt` for password hashing and Express sessions.
* **Blog Post Management:**
    * Create new blog posts with titles, content, and associated images.
    * View a list of all published blog posts.
    * (Extendable: Add features for viewing individual posts, editing, or deleting posts.)
* **Image Uploads:** Seamlessly upload images for blog posts using `express-fileupload`.
* **Dynamic Templating:** Utilizes EJS (Embedded JavaScript) for server-side rendering, providing a flexible and dynamic user interface.
* **MongoDB Database:** Stores user data and blog post content securely in a MongoDB database (configured for MongoDB Atlas in this setup).
* **Flash Messaging:** Provides transient messages to users for validation errors or success notifications using `connect-flash`.

## 🛠️ Technologies Used

* **Node.js:** JavaScript runtime environment.
* **Express.js:** Fast, unopinionated, minimalist web framework for Node.js.
* **MongoDB:** NoSQL database for storing application data.
* **Mongoose:** MongoDB object data modeling (ODM) for Node.js, simplifying data interactions.
* **EJS (Embedded JavaScript):** Templating engine for rendering dynamic HTML views.
* **`express-session`:** Middleware for managing user sessions.
* **`bcrypt`:** Library for hashing and comparing passwords securely.
* **`connect-flash`:** Middleware for flash messages (one-time notifications).
* **`express-fileupload`:** Middleware for handling file uploads.
* **`dotenv`:** To load environment variables from a `.env` file, keeping sensitive information out of version control.

## 🚀 Getting Started

Follow these steps to get your project up and running on your local machine.

### Prerequisites

* Node.js (LTS version recommended)
* MongoDB (local instance or a cloud service like MongoDB Atlas)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd projectblog
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
    *Note: If you encounter `ERESOLVE` errors during installation of `mongoose-unique-validator`, you might need to downgrade Mongoose to a `7.x.x` version first, then install the validator.*
    ```bash
    npm uninstall mongoose
    npm install mongoose@^7.0.0
    npm install mongoose-unique-validator
    ```
3.  **Create a `.env` file:**
    In the root of your project directory, create a file named `.env`.
    ```
    DB_CONNECTION_STRING=your_mongodb_atlas_connection_string
    SESSION_SECRET=a_very_long_and_random_string_for_session_secret
    ```
    *Replace `your_mongodb_atlas_connection_string` with your actual MongoDB connection string (including username and password, correctly URL-encoded). If you are using a local MongoDB instance, it might be `mongodb://localhost:27017/my_database`.*
    *Replace `a_very_long_and_random_string_for_session_secret` with a strong, randomly generated string.*

4.  **Update `.gitignore`:**
    Ensure your `.gitignore` file includes `.env` to prevent committing your sensitive information:
    ```
    .env
    node_modules/
    ```

### Running the Application

1.  **Start the MongoDB server** (if running locally).
2.  **Start the Node.js application:**
    ```bash
    npm start
    # or if you have nodemon installed:
    # nodemon index.js
    ```
3.  **Access the application:**
    Open your web browser and navigate to `http://localhost:4000`.

## 🖼️ Rendering / Deployment

This application uses **EJS (Embedded JavaScript)** as its templating engine for server-side rendering. The Node.js Express server renders the dynamic HTML pages before sending them to the client's browser.

To deploy this application:

1.  **Hosting Provider:** Choose a Node.js-compatible hosting platform (e.g., Heroku, Vercel, Render, AWS, Google Cloud, DigitalOcean).
2.  **Environment Variables:** Configure your `DB_CONNECTION_STRING` and `SESSION_SECRET` as environment variables directly on your hosting platform. This is crucial as your `.env` file is not committed to Git.
3.  **Deployment Process:** Follow your chosen hosting provider's specific instructions for deploying a Node.js Express application. This usually involves connecting your GitHub repository and setting up build and deploy commands.

## 📚 Usage

* **Home Page (`/`):** View all published blog posts.
* **Login (`/auth/login`):** Log in to an existing user account.
* **Register (`/auth/register`):** Create a new user account.
* **Create Post (`/posts/new`):** (Assuming you have a route for this) Create and publish a new blog post (requires authentication).
* **Contact (`/contact`):** Access the contact page.
* **About (`/about`):):** Access the about page.

## 🤝 Contributing

Contributions are welcome! If you find a bug or have a feature request, please open an issue.

## 📄 License

This project is licensed under the [MIT License](LICENSE).