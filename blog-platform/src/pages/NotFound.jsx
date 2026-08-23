import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft, BookOpen } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-dark-950 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <span className="text-9xl font-display font-bold text-primary-500/20 dark:text-primary-500/10">404</span>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-display font-bold text-dark-900 dark:text-dark-100 mb-4">
          Page Not Found
        </h1>
        
        <p className="text-lg text-dark-600 dark:text-dark-400 mb-8">
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/" className="btn-primary btn-lg inline-flex items-center gap-2">
            <Home className="w-4 h-4" />
            Go Home
          </Link>
          <Link to="/categories" className="btn-secondary btn-lg inline-flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Browse Categories
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-dark-200 dark:border-dark-700">
          <p className="text-sm text-dark-500 dark:text-dark-400 mb-4">Or explore popular sections:</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/?category=tech" className="badge bg-white dark:bg-dark-800 text-dark-600 dark:text-dark-300 hover:bg-primary-50 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 border border-dark-200 dark:border-dark-700 transition-colors">
              Technology
            </Link>
            <Link to="/?category=design" className="badge bg-white dark:bg-dark-800 text-dark-600 dark:text-dark-300 hover:bg-primary-50 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 border border-dark-200 dark:border-dark-700 transition-colors">
              Design
            </Link>
            <Link to="/?category=ai" className="badge bg-white dark:bg-dark-800 text-dark-600 dark:text-dark-300 hover:bg-primary-50 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 border border-dark-200 dark:border-dark-700 transition-colors">
              AI & ML
            </Link>
            <Link to="/?category=career" className="badge bg-white dark:bg-dark-800 text-dark-600 dark:text-dark-300 hover:bg-primary-50 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 border border-dark-200 dark:border-dark-700 transition-colors">
              Career
            </Link>
            <Link to="/trending" className="badge bg-white dark:bg-dark-800 text-dark-600 dark:text-dark-300 hover:bg-primary-50 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 border border-dark-200 dark:border-dark-700 transition-colors">
              Trending
            </Link>
          </div>
        </div>

        <div className="mt-8">
          <form action="/" className="flex gap-2 max-w-md mx-auto">
            <input
              type="search"
              name="search"
              placeholder="Search articles..."
              className="flex-1 input py-3"
              autoFocus
            />
            <button type="submit" className="btn-primary btn-lg whitespace-nowrap">
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}