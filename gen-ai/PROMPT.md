### Prompt used with ChatGPT

Goal: Create a table that handles CRUD operations for Task Management.

Details:
- The table will have 4 columns: `title`, `description`, `status`, `due_date`.
- Each task belongs to a `User` (assume a basic `User` model already exists).
- I want:
  - A minimal REST API in TypeScript using Node.js + Express.
  - Endpoints:
    - `GET /api/tasks` → list paginated tasks for the authenticated user.
    - `POST /api/tasks` → create a task.
    - `PUT /api/tasks/:id` → update a task.
    - `DELETE /api/tasks/:id` → delete a task.
  - The `Task` model should have: `id`, `userId`, `title`, `description`, `status`, `dueDate`, `createdAt`, `updatedAt`.
  - Validation rules:
    - `title` is required (non-empty string).
    - `status` is one of `todo`, `in_progress`, `done`.
    - `dueDate` is an ISO date string or null.
  - Use an in-memory data store (array) or a simple repository abstraction so the code can later be swapped to a real DB.
  - Add a very simple authentication middleware that:
    - reads a fake user id from `req.headers["x-user-id"]`.
    - attaches `{ id: string }` as `req.user`.
  - For the frontend:
    - A React component `<TaskTable />` that:
      - fetches tasks from `/api/tasks`.
      - renders a table with the 4 columns.
      - provides a simple form to create and edit tasks.
      - allows deleting tasks.
    - Use React hooks + `fetch`, no external state management library.

Please:
- Generate idiomatic, production-ready TypeScript code for the API (Express router + types) and a representative React component for the table.
- Keep the code split in small, testable units (e.g. `taskRoutes.ts`, `taskRepository.ts`, `TaskTable.tsx`).
- Add inline comments only when something is non-obvious.