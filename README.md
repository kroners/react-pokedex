# react-pokedex
A react app for pokedex

This repository contains my solution for a small Pokémon app with both **frontend** and **backend**.  
The goal is to build a **mobile-first Pokédex** with login, protected routes, and a backend that talks to the public PokeAPI.

I’ll briefly describe my thought process and the steps I followed.

---

## 1. Initial setup and dependencies

I started by creating a **monorepo-style layout** with two folders: `frontend` and `backend`.

- In the **frontend**, I used **Vite + React** because it gives a very fast DX and a simple setup for a SPA with routing.
- In the **backend**, I used **Node.js + Express** to expose the required endpoints and to act as a proxy to the public [PokeAPI](https://pokeapi.co/).

I installed the minimum required dependencies:

- **Frontend**
  - `react`, `react-dom`
  - `react-router-dom` for routing
  - `axios` for HTTP calls
- **Backend**
  - `express` to build the HTTP server and routes
  - `cors` to allow the frontend to talk to the backend locally
  - `axios` to consume PokeAPI
  - `dotenv` to keep configuration flexible (if needed)

---

## 2. Frontend visual setup – mobile-first

The first concrete step on the frontend side was to **build the visual skeleton**:

- I created the base pages under `src/pages`:
  - `Login`
  - `Home`
  - `Pokemon`
- I also created shared components under `src/components`:
  - `Layout` for the main shell (header + content)
  - `PokemonCard` for the list of Pokémon
  - `SearchBar` and `SortButton` for filters

From the start I treated the UI as **mobile-first**:

- The main container is laid out with a single column, simple spacing and a clean header.
- For larger viewports (desktop), the layout uses **auto margins** to center the main content and constrain the width, so the UI scales nicely without breaking the mobile design.

At this stage, the data was conceptually hardcoded or mocked in my mind, just focusing on the structure, semantics and how the user would move through the views.

---

## 3. Backend – connecting to PokeAPI

Next, I created the **backend** to talk to PokeAPI and provide a clean API surface for the frontend.

I exposed the following endpoints under `/api`:

- `POST /api/login`  
  Hardcoded user with `admin/admin` credentials. This returns a fake token and a user object.
- `GET /api/pokemons`  
  Accepts `page` and `limit` query params, internally calls PokeAPI, enriches each Pokémon with `id`, `name`, `image`, and `number`, and returns a paginated result.
- `GET /api/pokemons/:id`  
  Fetches detailed information for a single Pokémon: types, abilities, moves, forms and basic info like height/weight.

I created a small **service layer** in `services/pokeapiService.js` to keep the HTTP calls to PokeAPI separated from the route handlers.

Once this was in place, I tested the endpoints with tools like curl/Postman to verify that the data shape matched what I wanted to render on the frontend.

---

## 4. Frontend–Backend integration

With both sides in place, I wired them together:

- Configured a `VITE_API_BASE_URL` in the frontend to point to the backend (e.g. `http://localhost:4000/api`).
- Created an `axiosClient` instance that uses that base URL for all HTTP calls.
- Implemented two small client modules:
  - `authApi` for the `/login` endpoint.
  - `pokemonApi` for `/pokemons` and `/pokemons/:id`.

On the `Home` page, I call `GET /api/pokemons` and render the response using `PokemonCard` components, adding client-side filtering (search) and sorting (by name or number) on top of the paginated data that comes from the backend.

On the `Pokemon` page, I call `GET /api/pokemons/:id` and show a richer view with abilities, moves, types, forms and an optional description.

---

## 5. Login and authentication

Once the basic integration was working, I focused on the **login experience**.

- I created an `AuthContext` to hold:
  - the authenticated user
  - the `token` returned from `/api/login`
  - `login` and `logout` helpers
- On successful login:
  - I persist the auth data into `localStorage` so that the session survives page reloads.
- On app startup:
  - I restore auth data from `localStorage` so the user doesn’t have to log in again manually.

The `Login` page wires up the form with the `login` action and shows basic feedback when credentials are invalid.

---

## 6. Frontend and backend guards (protected routes + token)

To make the app consistent and secure at the level required by this exercise, I added **wrappers/handlers on both sides**:

### Frontend – Protected routes

- I introduced a `PrivateRoute` component that:
  - checks the `isAuthenticated` flag from `AuthContext`,
  - redirects unauthenticated users to `/login` if they try to access protected paths.
- I used this guard to protect:
  - `/home`
  - `/pokemon/:id`

If the user is already authenticated and tries to navigate to `/login`, they are redirected back to `/home`.

### Backend – Token validation

- On the backend, I added a simple middleware `requireAuth` that:
  - reads the `Authorization: Bearer <token>` header,
  - verifies it matches the known token returned at login (e.g. `fake-admin-token`),
  - returns `401 Unauthorized` if the token is missing or invalid.

- I applied this middleware to the Pokémon routes:
  - `GET /api/pokemons`
  - `GET /api/pokemons/:id`

Additionally, the frontend `axiosClient` attaches the token automatically to every request (if present in localStorage), so the integration remains transparent once the user logs in successfully.

This ensures that:

- A user cannot access Pokémon info from the frontend UI without being logged in.
- The backend also enforces this rule independently, not trusting the client.

---

## 7. Viewport sizing and desktop adjustments

Finally, I revisited the UI and did a quick pass over the **responsive behavior**:

- I kept the layout **mobile-first**, ensuring:
  - comfortable tap targets
  - vertical scrolling
  - readable font sizes
- For **larger screens** (tablet/desktop), I:
  - limited the main content width,
  - used `margin: 0 auto` to center the content,
  - kept the layout simple so it doesn’t diverge from the mobile design, just breathes a bit more horizontally.

The idea is that the app looks clean and usable on phones (primary target), and still looks decent on wider viewports without having to redesign the entire layout.

---

## What could be improved with more time?

If I had more time, I would consider:

- Adding **unit tests** for the backend routes and some key frontend components/hooks.
- Introducing **React Query (TanStack Query)** to handle caching and background refreshing of Pokémon lists and details.
- Improving loading and error states with better UI feedback.
- Bringing the visual styling even closer to the Figma spec (typography, spacing, colors, and micro-interactions).

---

## How to run the project

### Requirements

- Node.js 18+ (or 20+ LTS recommended)
- npm

### Backend

From the root:

```bash
cd backend
npm install
npm run dev
# Backend will be available at http://localhost:4000
