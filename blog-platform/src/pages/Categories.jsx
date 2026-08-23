import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { useBlog } from '../context/BlogContext';
import { categories } from '../data/mockData';
import { Card, Badge, Avatar, Skeleton } from '../components/ui';

export default function Categories() {
  const { posts, authors } = useBlog();

  const categoryStats = useMemo(() => {
    return categories.map(cat => {
      const catPosts = posts.filter(p => p.category === cat.id && p.status === 'published');
      const topAuthors = [...new Set(catPosts.map(p => p.authorId))]
        .slice(0, 3)
        .map(id => authors.find(a => a.id === id))
        .filter(Boolean);
      const latestPost = catPosts.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))[0];
      return {
        ...cat,
        count: catPosts.length,
        topAuthors,
        latestPost,
      };
    });
  }, [posts, authors]);

  return (
    <div className="min-h-screen bg-white dark:bg-dark-950">
      <header className="bg-gradient-to-b from-primary-50/50 dark:from-primary-900/10 to-transparent py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="primary" className="mb-4 inline-flex">
            Browse by Topic
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-dark-900 dark:text-dark-100 mb-6 leading-tight">
            Explore <span className="gradient-text">Categories</span>
          </h1>
          <p className="text-lg md:text-xl text-dark-600 dark:text-dark-400 max-w-2xl mx-auto">
            Discover articles across technology, design, AI, career, and lifestyle topics from our community of writers.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryStats.map((category, index) => (
            <Link
              key={category.id}
              to={`/?category=${category.id}`}
              className="group glass rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-${category.color}-100 dark:bg-${category.color}-900/30 text-${category.color}-600 dark:text-${category.color}-400`}>
                  <span className="text-2xl font-bold">{category.name[0]}</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {category.count} posts
                </Badge>
              </div>
              
              <h3 className="text-xl font-semibold text-dark-900 dark:text-dark-100 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {category.name}
              </h3>
              <p className="text-dark-600 dark:text-dark-400 mb-4 line-clamp-2">
                Explore the latest articles on {category.name.toLowerCase()}, featuring insights from industry experts and practitioners.
              </p>

              {category.topAuthors.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs text-dark-500 dark:text-dark-400 mb-2">Top contributors</p>
                  <div className="flex -space-x-2">
                    {category.topAuthors.map((author, i) => (
                      <Avatar
                        key={author.id}
                        src={author.avatar}
                        name={author.name}
                        size="sm"
                        className="border-2 border-white dark:border-dark-950"
                      />
                    ))}
                    {category.topAuthors.length >= 3 && (
                      <div className="w-8 h-8 rounded-full bg-dark-100 dark:bg-dark-800 flex items-center justify-center text-xs font-medium text-dark-500 dark:text-dark-400 border-2 border-white dark:border-dark-950 ml-2">
                        +{category.count - 3}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {category.latestPost && (
                <div className="pt-4 border-t border-dark-200 dark:border-dark-700">
                  <p className="text-xs text-dark-500 dark:text-dark-400 mb-1">Latest article</p>
                  <Link to={`/post/${category.latestPost.id}`} className="font-medium text-dark-900 dark:text-dark-100 hover:text-primary-600 dark:hover:text-primary-400 line-clamp-1 block">
                    {category.latestPost.title}
                  </Link>
                </div>
              )}

              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                  View all →
                </span>
                <Badge variant="outline" className={`text-${category.color}-600 dark:text-${category.color}-400 border-${category.color}-200 dark:border-${category.color}-800`}>
                  {category.count}
                </Badge>
              </div>
            </Link>
          ))}
        </div>

        <section className="mt-16">
          <h2 className="text-2xl font-display font-bold text-dark-900 dark:text-dark-100 mb-8 text-center">
            Popular Tags
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {['React', 'TypeScript', 'AI', 'Design Systems', 'Career', 'Productivity', 'Remote Work', 'Accessibility', 'Testing', 'Performance', 'CSS', 'Node.js', 'GraphQL', 'Docker', 'Kubernetes'].map(tag => (
              <Link
                key={tag}
                to={`/?search=${tag.toLowerCase()}`}
                className="badge bg-white dark:bg-dark-800 text-dark-600 dark:text-dark-300 hover:bg-primary-50 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 border border-dark-200 dark:border-dark-700 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}