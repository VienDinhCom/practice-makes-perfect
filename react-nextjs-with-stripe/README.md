# React Next.js with Stripe

I’ve spent years stumbling through the early stages of new projects, repeating the same setup over and over. Eventually I realized the real bottleneck wasn’t the idea—it was the scaffolding around it. So I built a production-ready SaaS template to clear that path.

In simple terms, it gives you everything a modern app needs on day one: authentication, payments, a database, and a clean developer workflow. Nothing flashy. Just the essentials, wired together so you can focus on the part only you can create.

It’s built on Next.js for the frontend and backend, styled with Tailwind, secured with Better Auth, powered by Stripe for payments, and backed by PostgreSQL with Drizzle handling the ORM layer. ESLint and Prettier keep the code honest.

My hope is that this template shortens the distance between an idea in your head and something real in the world—because that gap is where most dreams fade.


## Features

- ✅ Complete authentication flow (Sign in, Sign up, Sign out)
- ✅ Database integration with Drizzle ORM and PostgreSQL
- ✅ Stripe integration for subscriptions and payments
- ✅ Protected routes and API endpoints
- ✅ Modern UI with Tailwind CSS
- ✅ Code quality with ESLint and Prettier
- ✅ Docker setup for local development

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing
purposes.

### Installation

1.  **Create a new project:**

    ```bash
    npx create-esmate --template react-next
    ```

    Change into the new project directory:

    ```bash
    cd [new-project-name]
    ```

2.  **Install dependencies:**

    ```bash
    npm run install
    ```

3.  **Set up environment variables:**

    Create a `.env` file by copying the `sample.env` file:

    ```bash
    cp sample.env .env
    ```

    Update the `.env` file with your credentials for the database, Stripe, and authentication providers.

4.  **Start the database:**

    Use Docker Compose to start a PostgreSQL instance:

    ```bash
    docker-compose up -d
    ```

5.  **Run database migrations:**

    Apply the database schema to your PostgreSQL instance:

    ```bash
    npm run db:migrate
    ```

6.  **Run the development server:**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Creates a production build of the application.
- `npm run start`: Starts the production server.
- `npm run fix`: Fix the codebase with Prettier & ESLint.
- `npm run check`: Check the codebase using ESLint & Prettier.
- `npm run db:migrate`: Applies database migrations.
- `npm run db:studio`: Opens the Drizzle Studio to manage your database.
