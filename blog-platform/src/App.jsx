import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Header, Footer } from './components/layout';
import { useBlog } from './context/BlogContext';
import { useToast } from './context/ToastContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import CreatePost from './pages/CreatePost';
import AuthorProfile from './pages/AuthorProfile';
import Bookmarks from './pages/Bookmarks';
import Categories from './pages/Categories';
import Trending from './pages/Trending';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white dark:bg-dark-950 flex flex-col">
      <Header />
      <main className="flex-1">
        {children || <Outlet />}
      </main>
      <Footer />
    </div>
  );
}

function ProtectedRoute({ children }) {
  const { currentUser } = useBlog();
  const location = useLocation();
  if (!currentUser) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="post/:id" element={<PostDetail />} />
        <Route path="create" element={<CreatePost />} />
        <Route path="edit/:id" element={<CreatePost isEdit />} />
        <Route path="author/:id" element={<AuthorProfile />} />
        <Route path="bookmarks" element={<Bookmarks />} />
        <Route path="categories" element={<Categories />} />
        <Route path="trending" element={<Trending />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="settings" element={<Settings />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  );
}

function LoginPage() {
  const { setUser, authors } = useBlog();
  const { success } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      const user = authors[0];
      setUser(user);
      success(`Welcome back, ${user.name}!`);
      navigate('/');
      setLoading(false);
    }, 1000);
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-display font-bold text-dark-900 dark:text-dark-100">Welcome Back</h1>
            <p className="text-dark-600 dark:text-dark-400 mt-2">Sign in to your account</p>
          </div>
          <form onSubmit={handleSubmit} className="bg-white/80 dark:bg-dark-900/80 backdrop-blur-xl border border-white/20 dark:border-dark-700/50 rounded-2xl p-8 space-y-6">
            <div>
              <label htmlFor="email" className="label">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-dark-900 dark:text-dark-100 placeholder-dark-400 dark:placeholder-dark-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="you@example.com"
                required
                autoComplete="email"
              />
            </div>
            <button type="submit" className="btn-primary btn-lg w-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          <p className="text-center text-sm text-dark-500 dark:text-dark-400 mt-6">
            Demo mode: Enter any email to sign in as Sarah Chen
          </p>
        </div>
      </div>
    </Layout>
  );
}

function RegisterPage() {
  const { setUser, authors } = useBlog();
  const { success } = useToast();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return;
    setLoading(true);
    setTimeout(() => {
      const user = { ...authors[0], name, email };
      setUser(user);
      success(`Welcome to BlogPlatform, ${name}!`);
      navigate('/');
      setLoading(false);
    }, 1000);
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-display font-bold text-dark-900 dark:text-dark-100">Create Account</h1>
            <p className="text-dark-600 dark:text-dark-400 mt-2">Join the community of writers</p>
          </div>
          <form onSubmit={handleSubmit} className="bg-white/80 dark:bg-dark-900/80 backdrop-blur-xl border border-white/20 dark:border-dark-700/50 rounded-2xl p-8 space-y-6">
            <div>
              <label htmlFor="name" className="label">Full Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-dark-900 dark:text-dark-100 placeholder-dark-400 dark:placeholder-dark-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="John Doe"
                required
                autoComplete="name"
              />
            </div>
            <div>
              <label htmlFor="email" className="label">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-dark-900 dark:text-dark-100 placeholder-dark-400 dark:placeholder-dark-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="you@example.com"
                required
                autoComplete="email"
              />
            </div>
            <button type="submit" className="btn-primary btn-lg w-full" disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
          <p className="text-center text-sm text-dark-500 dark:text-dark-400 mt-6">
            Already have an account? <a href="/login" className="text-primary-600 dark:text-primary-400 hover:underline">Sign in</a>
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}