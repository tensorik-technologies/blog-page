import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Search, Plus, Bookmark, LayoutDashboard } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { clsx } from 'clsx';
import { useBlog } from '../../context/BlogContext';
import { useModal } from '../../context/ModalContext';
import { Input, UserMenu } from '../ui';

export function Header() {
  const location = useLocation();
  const { currentUser, theme, setTheme } = useBlog();
  const { openModal } = useModal();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    if (showSearch) {
      setTimeout(() => searchRef.current?.focus(), 100);
    }
  }, [showSearch]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/categories', label: 'Categories' },
    { path: '/trending', label: 'Trending' },
  ];

  const userLinks = currentUser ? [
    { path: '/create', label: 'Write', icon: Plus },
    { path: '/bookmarks', label: 'Bookmarks', icon: Bookmark },
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  ] : [];

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-dark-950/80 backdrop-blur-xl border-b border-dark-200/50 dark:border-dark-800/50 transition-colors duration-300">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-10">
            <Link to="/" className="flex items-center gap-3 group" aria-label="Blog Platform Home">
              <div className="w-10 h-10 rounded-2xl bg-dark-900 dark:bg-white flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <span className="text-white dark:text-dark-900 font-display font-bold text-xl">B</span>
              </div>
              <span className="font-display font-bold text-2xl text-dark-900 dark:text-white hidden sm:block tracking-tight">
                BlogPlatform
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={clsx(
                    'px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200',
                    location.pathname === link.path
                      ? 'bg-dark-100 dark:bg-dark-800 text-dark-900 dark:text-white'
                      : 'text-dark-500 dark:text-dark-400 hover:text-dark-900 dark:hover:text-white hover:bg-dark-50 dark:hover:bg-dark-900'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2.5 rounded-full text-dark-500 hover:text-dark-900 dark:text-dark-400 dark:hover:text-white hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors"
              aria-label="Search"
              aria-expanded={showSearch}
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2.5 rounded-full text-dark-500 hover:text-dark-900 dark:text-dark-400 dark:hover:text-white hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <div className="h-6 w-[1px] bg-dark-200 dark:bg-dark-800 hidden sm:block mx-2" />

            {currentUser ? (
              <UserMenu
                user={currentUser}
                onProfile={() => window.location.href = `/author/${currentUser.id}`}
                onSettings={() => window.location.href = '/settings'}
                onLogout={() => window.location.reload()}
              />
            ) : (
              <div className="hidden sm:flex items-center gap-3">
                <Link to="/login" className="px-5 py-2.5 rounded-full text-sm font-semibold text-dark-600 dark:text-dark-300 hover:text-dark-900 dark:hover:text-white transition-colors">
                  Sign In
                </Link>
                <Link to="/register" className="px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-dark-900 dark:bg-white dark:text-dark-900 hover:bg-dark-800 dark:hover:bg-dark-100 transition-all shadow-md">
                  Get Started
                </Link>
              </div>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-full text-dark-500 hover:text-dark-900 dark:text-dark-400 dark:hover:text-white hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors lg:hidden"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {showSearch && (
          <div className="py-4 animate-slide-down border-t border-dark-100 dark:border-dark-800 absolute top-full left-0 w-full bg-white dark:bg-dark-950 px-4 sm:px-6 lg:px-8 shadow-lg">
            <form onSubmit={handleSearch} className="relative max-w-3xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" aria-hidden="true" />
              <Input
                ref={searchRef}
                type="search"
                placeholder="Search for ideas, tags, authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-3 rounded-full border-dark-200 dark:border-dark-700 bg-dark-50 dark:bg-dark-900"
                autoComplete="off"
                aria-label="Search articles"
              />
            </form>
          </div>
        )}
      </nav>

      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-dark-950/95 backdrop-blur-xl border-b border-dark-200 dark:border-dark-800 py-4 animate-slide-down shadow-xl">
          <div className="flex flex-col gap-1 px-4 sm:px-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={clsx(
                  'px-4 py-3 rounded-xl text-base font-medium transition-colors',
                  location.pathname === link.path
                    ? 'bg-dark-100 dark:bg-dark-800 text-dark-900 dark:text-white'
                    : 'text-dark-600 dark:text-dark-300 hover:bg-dark-50 dark:hover:bg-dark-900'
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="my-2 border-t border-dark-100 dark:border-dark-800" />
            {userLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-dark-600 dark:text-dark-300 hover:bg-dark-50 dark:hover:bg-dark-900 transition-colors"
              >
                <link.icon className="w-5 h-5" />
                {link.label}
              </Link>
            ))}
            {!currentUser && (
              <div className="flex flex-col gap-3 pt-4">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="px-5 py-3 rounded-xl text-center font-semibold text-dark-900 dark:text-white bg-dark-50 dark:bg-dark-900 hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors">
                  Sign In
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="px-5 py-3 rounded-xl text-center font-semibold text-white bg-dark-900 dark:bg-white dark:text-dark-900 hover:bg-dark-800 dark:hover:bg-dark-100 transition-all shadow-md">
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;