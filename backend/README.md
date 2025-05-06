# Backend Setup and Usage

This document provides instructions for setting up and using the backend of the Todo application, which utilizes Hasura for GraphQL API management.

## Prerequisites

- Docker Compose installed on your machine.
- Basic knowledge of GraphQL and Hasura.

## Project Structure

The backend consists of the following components:

```
backend
├── auth                     # Authentication service (Node.js + Express)
│   ├── Dockerfile           # Dockerfile for the auth service
│   ├── index.ts             # Main entry point for the auth service
│   ├── package.json         # Dependencies and scripts for the auth service
│   └── tsconfig.json        # TypeScript configuration for the auth service
├── hasura
│   ├── metadata             # Metadata files that define relationships and permissions in Hasura
│   ├── migrations           # Migration files for setting up the database schema in Hasura
│   └── seeds                # Seed data files for initializing the database
├── docker-compose.yml       # Defines the services for the backend, including Hasura, Postgres, and Auth
└── README.md                # Documentation for the backend setup and usage
```

## Getting Started

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd todo-app/backend
   ```

2. **Build and start the services**:
   ```bash
   docker-compose up --build
   ```

3. **Access Hasura Console**:
   Once the services are running, you can access the Hasura console at `http://localhost:8080` to manage your database and GraphQL API.

## Migrations and Metadata

- To apply migrations, run:
   ```bash
   hasura migrate apply
   ```

- To apply metadata, run:
   ```bash
   hasura metadata apply
   ```

- To apply seeds, run:
   ```bash
   hasura seed apply --database-name default
   ```

## Migrations and Metadata (Init from server)

- To initialize Hasura, run:
   ```bash
   hasura init hasura --endpoint http://localhost:8080 --admin-secret adminsecretkey
   ```

- To export a metadata, use the Hasura CLI:
   ```bash
   hasura metadata export
   ```

- To create a new migration, use the Hasura CLI:
   ```bash
   hasura migrate create "init" --from-server
   ```

- To create a new seed, use the Hasura CLI:
   ```bash
   hasura seed create users_seed --from-table users
   hasura seed create todos_seed --from-table todos
   ```

## Environment Variables

Make sure to configure any necessary environment variables in your `docker-compose.yml` file, such as:

- `HASURA_GRAPHQL_DATABASE_URL`: The connection string for the Postgres database.
- `HASURA_GRAPHQL_ADMIN_SECRET`: The admin secret for securing the Hasura console.

## Conclusion

This backend setup provides a robust foundation for building a Todo application with Next.js and GraphQL. For further customization and features, refer to the [Hasura documentation](https://hasura.io/docs/).