# React Posts CRUD

A beginner-friendly React app for learning **CRUD** operations with an external REST API and **Context + useReducer** state management.

## Quick Start

```bash
cd react-posts-crud
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## What This App Does

- **Create** — add a new post via the form
- **Read** — load and display all posts from the API
- **Update** — edit an existing post (form pre-fills on Edit)
- **Delete** — remove a post with confirmation
- **Read products** — load and display products from your local backend

## APIs

### Posts — JSONPlaceholder

Uses [JSONPlaceholder](https://jsonplaceholder.typicode.com/posts):

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/posts` | List all posts |
| GET | `/posts/:id` | Get one post |
| POST | `/posts` | Create post |
| PUT | `/posts/:id` | Update post |
| DELETE | `/posts/:id` | Delete post |

**Note:** JSONPlaceholder is a fake API. Create, update, and delete return success responses but do **not** persist data. The app updates local state so CRUD works during your session. Refresh the page to reload the original 100 posts.

### Products — Local API

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `http://localhost:8081/api/products` | List all products |

Start your backend on port **8080** before testing the products section. If the API is down, the app shows an error with a **Retry** button.

## Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Welcome page with links to Posts and Products |
| `/posts` | Posts | CRUD form and posts list |
| `/products` | Products | Products from local API |

Use the top menu bar to navigate between pages.

## Project Structure

```text
src/
├── pages/
│   ├── Home.jsx              # landing page
│   ├── PostsPage.jsx         # posts route
│   └── ProductsPage.jsx      # products route
├── services/
│   ├── postApi.js            # fetch calls to JSONPlaceholder
│   └── productApi.js         # fetch calls to local products API
├── reducers/
│   ├── postsReducer.js       # posts state transitions
│   └── productsReducer.js    # products state transitions
├── context/
│   ├── PostsContext.jsx      # posts Provider + async actions
│   └── ProductsContext.jsx   # products Provider + fetch
├── hooks/
│   ├── usePosts.js
│   └── useProducts.js
└── components/
    ├── Navbar                # Home / Posts / Products menu
    ├── PostForm, PostList, PostItem
    ├── ProductList, ProductItem
    └── Header, Footer
```

## What You'll Learn

| React concept | Where it's used |
|---------------|-----------------|
| React Router | Page navigation via `Navbar` and routes in `App.jsx` |
| `useState` | Controlled form inputs in `PostForm` |
| `useEffect` | Load posts on mount in `PostsContext` |
| `useReducer` | Central posts state |
| `createContext` | Share state without prop drilling |
| `fetch` / async | API layer + context actions |
| Conditional rendering | Loading, error, empty, and list states |
| Lists & keys | `posts.map(post => <PostItem key={post.id} />)` |

## Manual Test Checklist

1. Page loads → 100 posts appear
2. Fill form → **Add Post** → new post appears at top
3. Click **Edit** → form pre-fills → **Save Changes** → list updates
4. Click **Delete** → confirm → post is removed
5. Refresh browser → list resets to original API data
6. Start backend on port 8080 → products section loads below posts

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run preview` — preview production build
- `npm run lint` — run ESLint
