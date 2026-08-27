<p align="center">
  <img src="public/favicon.svg" alt="BlogPlatform Logo" width="80" height="80" />
</p>

<h1 align="center">BlogPlatform</h1>

<p align="center">
  <strong>A modern, feature-rich blogging platform for developers, designers, and creators to share knowledge and build their audience.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-8.2-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite 8" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />
</p>

---

## ✨ Features

| Feature | Description |
|---|---|
| 📝 **Rich Post Editor** | Create and edit blog posts with a full-featured markdown editor, cover images, tags, and category support |
| 🏠 **Dynamic Home Feed** | Browse posts with filtering by category and search functionality |
| 🔥 **Trending Section** | Discover popular and trending content from the community |
| 📂 **Category Browsing** | Explore posts organized by technology categories |
| 🔖 **Bookmarks** | Save posts for later reading with a dedicated bookmarks page |
| 💬 **Comments & Replies** | Engage with posts through threaded comments with like support |
| ❤️ **Like System** | Like/unlike posts and comments |
| 👤 **Author Profiles** | View author profiles with bio, stats, and published posts |
| 📊 **Dashboard** | Personal analytics dashboard with post performance metrics |
| ⚙️ **Settings** | User profile and preference management |
| 🌗 **Dark Mode** | Full light/dark theme toggle with system-level persistence |
| 🔐 **Authentication** | Login and registration flow (demo mode) |
| 💾 **Local Persistence** | All data persists across sessions via `localStorage` |
| 📱 **Responsive Design** | Fully responsive UI optimized for mobile, tablet, and desktop |

---

## 🛠️ Tech Stack

### Core

- **[React 19](https://react.dev/)** — UI framework with hooks, context, and functional components
- **[Vite 8](https://vite.dev/)** — Next-generation frontend build tool for blazing-fast dev experience
- **[React Router v7](https://reactrouter.com/)** — Client-side routing and navigation

### Styling & UI

- **[Tailwind CSS 4](https://tailwindcss.com/)** — Utility-first CSS framework with custom design tokens
- **[Lucide React](https://lucide.dev/)** — Beautiful and consistent open-source icon set
- **[Outfit & Plus Jakarta Sans](https://fonts.google.com/)** — Modern Google Fonts for typography
- **Glassmorphism** — Frosted glass effects with `backdrop-blur` and transparency

### Developer Tooling

- **[PostCSS](https://postcss.org/)** — CSS transformations with Autoprefixer
- **[OxLint](https://oxc-project.github.io/)** — High-performance JavaScript/TypeScript linter
- **[clsx](https://github.com/lukeed/clsx)** — Utility for conditional classNames

---

## 📁 Project Structure

```
blog-platform/
├── public/
│   ├── favicon.svg              # App favicon
│   └── icons.svg                # SVG icon sprite
├── src/
│   ├── components/
│   │   ├── blog/
│   │   │   └── BlogCard.jsx     # Blog post card component
│   │   ├── layout/
│   │   │   ├── Header.jsx       # App header with navigation
│   │   │   └── Footer.jsx       # App footer
│   │   └── ui/
│   │       ├── Avatar.jsx       # User avatar component
│   │       ├── Badge.jsx        # Status/category badges
│   │       ├── Button.jsx       # Reusable button component
│   │       ├── Card.jsx         # Card container component
│   │       ├── Dropdown.jsx     # Dropdown menu component
│   │       ├── Input.jsx        # Form input component
│   │       ├── Modal.jsx        # Dialog/modal component
│   │       ├── Skeleton.jsx     # Loading skeleton placeholders
│   │       ├── Tabs.jsx         # Tab navigation component
│   │       └── Toast.jsx        # Toast notification component
│   ├── context/
│   │   ├── BlogContext.jsx      # Global blog state (posts, users, etc.)
│   │   ├── ModalContext.jsx     # Modal dialog state management
│   │   └── ToastContext.jsx     # Toast notification state management
│   ├── data/
│   │   └── mockData.js          # Seed data for demo content
│   ├── hooks/
│   │   └── useIndex.js          # Custom composable hooks
│   ├── pages/
│   │   ├── Home.jsx             # Home feed page
│   │   ├── PostDetail.jsx       # Full post view with comments
│   │   ├── CreatePost.jsx       # Post creation & editing page
│   │   ├── AuthorProfile.jsx    # Author profile page
│   │   ├── Bookmarks.jsx        # Saved bookmarks page
│   │   ├── Categories.jsx       # Category browsing page
│   │   ├── Trending.jsx         # Trending posts page
│   │   ├── Dashboard.jsx        # User analytics dashboard
│   │   ├── Settings.jsx         # User settings page
│   │   └── NotFound.jsx         # 404 error page
│   ├── utils/
│   │   ├── helpers.js           # Utility functions (storage, IDs, etc.)
│   │   └── markdown.js          # Markdown parsing utilities
│   ├── App.jsx                  # Root app component with routing
│   ├── App.css                  # App-level styles
│   ├── main.jsx                 # Application entry point
│   └── index.css                # Global styles and Tailwind base
├── index.html                   # HTML entry point
├── vite.config.js               # Vite configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── postcss.config.js            # PostCSS configuration
├── package.json                 # Dependencies and scripts
└── README.md                    # This file
```

---

## 🏗️ Architecture

The application follows a **component-driven architecture** with centralized state management:

```
┌─────────────────────────────────────────────────┐
│                   main.jsx                      │
│  ┌───────────────────────────────────────────┐  │
│  │            Context Providers              │  │
│  │  ┌─────────┐ ┌─────────┐ ┌────────────┐  │  │
│  │  │  Blog   │ │  Toast  │ │   Modal    │  │  │
│  │  │ Context │ │ Context │ │  Context   │  │  │
│  │  └─────────┘ └─────────┘ └────────────┘  │  │
│  │         ┌──────────────────┐              │  │
│  │         │  App (Router)    │              │  │
│  │         │  ┌────────────┐  │              │  │
│  │         │  │   Layout   │  │              │  │
│  │         │  │ ┌────────┐ │  │              │  │
│  │         │  │ │ Pages  │ │  │              │  │
│  │         │  │ └────────┘ │  │              │  │
│  │         │  └────────────┘  │              │  │
│  │         └──────────────────┘              │  │
│  └───────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

### State Management

- **BlogContext** — Manages the core application state using `useReducer`: posts, authors, comments, bookmarks, likes, current user, and theme. All state changes are persisted to `localStorage` automatically.
- **ToastContext** — Provides a global toast notification system with `success`, `error`, and `info` variants.
- **ModalContext** — Manages modal dialog open/close state across the app.

### Routing

| Route | Page | Description |
|---|---|---|
| `/` | Home | Main feed with featured and latest posts |
| `/post/:id` | PostDetail | Full article view with comments |
| `/create` | CreatePost | New post editor |
| `/edit/:id` | CreatePost | Edit existing post |
| `/author/:id` | AuthorProfile | Author bio and published posts |
| `/bookmarks` | Bookmarks | User's saved posts |
| `/categories` | Categories | Browse by category |
| `/trending` | Trending | Popular posts |
| `/dashboard` | Dashboard | User analytics |
| `/settings` | Settings | Profile and preferences |
| `/login` | Login | Authentication (demo) |
| `/register` | Register | Account creation (demo) |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.0
- **npm** ≥ 9.0

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/MAANIK579/blog-page.git
   cd blog-page/blog-platform
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**

   Navigate to `http://localhost:5173` (or the port shown in terminal)

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite development server with HMR |
| `npm run build` | Build the production bundle to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run OxLint for code quality checks |

---

## 🎨 Design System

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| `primary-500` | `#0ea5e9` | Primary brand color (sky blue) |
| `primary-600` | `#0284c7` | Interactive hover states |
| `dark-900` | `#0f172a` | Dark mode background |
| `dark-950` | `#020617` | Deepest dark surface |

### Typography

- **Display Font** — Outfit (headings, hero text)
- **Body Font** — Plus Jakarta Sans (body text, UI elements)

### Animations

The app ships with 6 custom animations for micro-interactions:

- `fade-in` — Smooth opacity entrance
- `slide-up` / `slide-down` — Directional slide transitions
- `scale-in` — Subtle scale entrance
- `pulse-soft` — Gentle pulsing effect
- `shimmer` — Loading skeleton shimmer

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Built with ❤️ using React, Vite & Tailwind CSS
</p>
