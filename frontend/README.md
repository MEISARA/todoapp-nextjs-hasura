# Todo App

This project is a Todo application built using Next.js with TypeScript, GraphQL (Hasura), and styled with Tailwind CSS. It includes user authentication features such as login and registration.

## Project Structure

```
todo-app
├── backend
│   ├── auth                     # Authentication service (Node.js + Express)
│   │   ├── Dockerfile           # Dockerfile for the auth service
│   │   ├── index.ts             # Main entry point for the auth service
│   │   ├── package.json         # Dependencies and scripts for the auth service
│   │   └── tsconfig.json        # TypeScript configuration for the auth service
│   ├── hasura
│   │   ├── migrations           # Migration files for setting up the database schema
│   │   ├── metadata             # Metadata files for Hasura defining relationships and permissions
│   │   └── seeds                # Seed data files for initializing the database
│   ├── docker-compose.yml       # Defines services for the backend, including Hasura and Postgres
│   └── README.md                # Documentation for the backend setup and usage
├── frontend
│   ├── public                   # Static assets for the frontend
│   ├── src
│   │   ├── components
│   │   │   ├── Auth
│   │   │   │   ├── Login.tsx    # Login form component
│   │   │   │   └── Register.tsx # Registration form component
│   │   │   └── Todo
│   │   │       ├── TodoList.tsx # Component to display the list of todos
│   │   │       ├── TodoItem.tsx # Component for individual todo items
│   │   │       └── TodoModal.tsx # Modal component for adding/editing todos
│   │   ├── graphql
│   │   │   ├── queries
│   │   │   │   └── todos.ts     # GraphQL queries for fetching todos
│   │   │   └── mutations
│   │   │       └── todos.ts     # GraphQL mutations for managing todos
│   │   ├── lib
│   │   │   └── apolloClient.ts  # Apollo Client setup for GraphQL
│   │   ├── pages
│   │   │   ├── _app.tsx         # Custom App component
│   │   │   ├── index.tsx        # Main landing page component
│   │   │   ├── login.tsx        # Login page component
│   │   │   └── register.tsx     # Registration page component
│   │   ├── styles
│   │   │   └── globals.css      # Global CSS styles including Tailwind CSS imports
│   │   └── types
│   │       └── index.ts         # TypeScript types and interfaces
│   ├── postcss.config.mjs       # PostCSS configuration
│   ├── tsconfig.json            # TypeScript configuration
│   ├── package.json             # npm configuration for frontend
│   └── README.md                # Documentation for the frontend setup and usage
└── README.md                    # Overall project documentation
```

## Getting Started

### Prerequisites

- Node.js (version 18.19.1)
- Docker and Docker Compose

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd todo-app
   ```

2. Navigate to the backend directory and set up the Docker containers:
   ```
   cd backend
   docker-compose up -d
   ```

3. Navigate to the frontend directory and install dependencies:
   ```
   cd ../frontend
   npm install
   ```

### Running the Application

1. Start the backend services:
   ```
   cd backend
   docker-compose up
   ```

2. Start the frontend application:
   ```
   cd ../frontend
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000` to view the application.

### Features

- User authentication with login and registration
- Todo list management
- Responsive design using Tailwind CSS

### License

This project is licensed under the MIT License.