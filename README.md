# AIvory (https://aivory-kappa.vercel.app/)

AIvory is a full-stack web application that provides a suite of AI-powered tools for content creation and enhancement. It leverages various AI APIs to offer services like article writing, image generation, resume analysis, and more, all wrapped in a clean, modern user interface.

## ✨ Features

- **AI Article Writer**: Generate high-quality, engaging articles on any topic, with control over article length.
- **Blog Title Generator**: Create catchy and effective titles for your blog posts across various categories.
- **AI Image Generation**: Produce stunning visuals from text prompts using different artistic styles.
- **Image Background Removal**: Automatically remove the background from any image.
- **Image Object Removal**: Seamlessly erase unwanted objects from your pictures.
- **Resume Reviewer**: Get AI-driven feedback on your PDF resume to improve its quality and impact.
- **Community Hub**: Share your AI-generated images with the community and browse creations from other users.
- **User Authentication**: Secure user management and authentication powered by Clerk.
- **Subscription Tiers**: Supports both free and premium user plans with different usage limits and feature access.

## 🛠️ Technology Stack

The project is a monorepo composed of a React client and an Express.js server.

### Client (Frontend)
- **Framework**: [React](https://reactjs.org/) (with [Vite](https://vitejs.dev/))
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Routing**: [React Router](https://reactrouter.com/)
- **Authentication**: [@clerk/clerk-react](https://clerk.com/docs/references/react/overview)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)

### Server (Backend)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [Neon](https://neon.tech/) (Serverless PostgreSQL)
- **Authentication**: [@clerk/express](https://clerk.com/docs/references/express/overview)
- **AI APIs**:
    - **Text Generation**: Google Gemini (via OpenAI-compatible endpoint)
    - **Image Generation**: ClipDrop API
    - **Image Manipulation**: Cloudinary API (Background & Object Removal)
    - **Media Storage**: Cloudinary
- **File Handling**: [Multer](https://github.com/expressjs/multer) for file uploads, [pdf-parse](https://www.npmjs.com/package/pdf-parse) for reading resumes.

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v18 or higher)
- npm or pnpm

### 1. Clone the Repository

```bash
git clone https://github.com/Syed-Ausaf-Hasib/AIvory.git
cd AIvory
```

### 2. Backend Setup

1.  Navigate to the server directory:
    ```bash
    cd server
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `server` directory and add the following environment variables with your own keys:
    ```env
    DATABASE_URL='YOUR_NEON_DATABASE_URL'
    CLERK_PUBLISHABLE_KEY='YOUR_CLERK_PUBLISHABLE_KEY'
    CLERK_SECRET_KEY='YOUR_CLERK_SECRET_KEY'
    GEMINI_API_KEY='YOUR_GEMINI_API_KEY'
    CLIPDROP_API_KEY='YOUR_CLIPDROP_API_KEY'
    CLOUDINARY_CLOUD_NAME='YOUR_CLOUDINARY_CLOUD_NAME'
    CLOUDINARY_API_KEY='YOUR_CLOUDINARY_API_KEY'
    CLOUDINARY_API_SECRET='YOUR_CLOUDINARY_API_SECRET'
    ```
4.  Start the backend server:
    ```bash
    npm run server
    ```
    The server will be running on `http://localhost:3000`.

### 3. Frontend Setup

1.  Navigate to the client directory from the root folder:
    ```bash
    cd client
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `client` directory and add the following variables:
    ```env
    VITE_CLERK_PUBLISHABLE_KEY='YOUR_CLERK_PUBLISHABLE_KEY'
    VITE_BASE_URL='http://localhost:3000'
    ```
4.  Start the frontend development server:
    ```bash
    npm run dev
    ```
    The application will be accessible at `http://localhost:5173` (or another port specified by Vite).

## 📄 API Endpoints

All API routes require user authentication via Clerk.

### AI Endpoints (`/api/ai`)
- `POST /generate-article`: Generates a text article.
- `POST /generate-blog-title`: Generates blog titles.
- `POST /generate-image`: Generates an image from a prompt.
- `POST /remove-image-background`: Removes background from an uploaded image.
- `POST /remove-image-object`: Removes a specified object from an uploaded image.
- `POST /resume-review`: Reviews an uploaded PDF resume.

### User Endpoints (`/api/user`)
- `GET /get-user-creations`: Fetches all creations for the authenticated user.
- `GET /get-published-creations`: Fetches all publicly shared creations.
- `POST /toggle-like-creation`: Likes or unlikes a creation.
