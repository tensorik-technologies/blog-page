import { Link } from 'react-router-dom';
import { X, Mail, Rss, ArrowUpRight } from 'lucide-react';

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
);

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: 'Features', href: '#' },
      { label: 'Pricing', href: '#' },
      { label: 'Changelog', href: '#' },
      { label: 'Roadmap', href: '#' },
      { label: 'API Docs', href: '#' },
    ],
    company: [
      { label: 'About', href: '#' },
      { label: 'Blog', href: '/' },
      { label: 'Careers', href: '#' },
      { label: 'Press', href: '#' },
      { label: 'Contact', href: '#' },
    ],
    resources: [
      { label: 'Documentation', href: '#' },
      { label: 'Community', href: '#' },
      { label: 'Templates', href: '#' },
      { label: 'Integrations', href: '#' },
      { label: 'Status', href: '#' },
    ],
    legal: [
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
      { label: 'Cookie Policy', href: '#' },
      { label: 'Security', href: '#' },
    ],
  };

  const socialLinks = [
    { label: 'X', href: 'https://x.com', icon: X },
    { label: 'GitHub', href: 'https://github.com', icon: GithubIcon },
    { label: 'LinkedIn', href: 'https://linkedin.com', icon: LinkedinIcon },
    { label: 'Email', href: 'mailto:hello@blogplatform.com', icon: Mail },
    { label: 'RSS', href: '/rss.xml', icon: Rss },
  ];

  return (
    <footer className="bg-white dark:bg-dark-950 border-t border-dark-100 dark:border-dark-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 lg:gap-16">
          <div className="col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6 group" aria-label="BlogPlatform Home">
              <div className="w-8 h-8 rounded-xl bg-dark-900 dark:bg-white flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <span className="text-white dark:text-dark-900 font-display font-bold text-lg">B</span>
              </div>
              <span className="font-display font-bold text-xl text-dark-900 dark:text-white tracking-tight">
                BlogPlatform
              </span>
            </Link>
            <p className="text-dark-500 dark:text-dark-400 text-sm leading-relaxed mb-8 max-w-sm">
              A premium blogging platform designed for creators who want to share their best ideas with the world.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-dark-50 dark:bg-dark-900 text-dark-500 hover:text-dark-900 dark:text-dark-400 dark:hover:text-white hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Product links">
            <h3 className="text-sm font-semibold text-dark-900 dark:text-white mb-6 uppercase tracking-wider">Product</h3>
            <ul className="space-y-4">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm font-medium text-dark-500 dark:text-dark-400 hover:text-dark-900 dark:hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company links">
            <h3 className="text-sm font-semibold text-dark-900 dark:text-white mb-6 uppercase tracking-wider">Company</h3>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm font-medium text-dark-500 dark:text-dark-400 hover:text-dark-900 dark:hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Resources links">
            <h3 className="text-sm font-semibold text-dark-900 dark:text-white mb-6 uppercase tracking-wider">Resources</h3>
            <ul className="space-y-4">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm font-medium text-dark-500 dark:text-dark-400 hover:text-dark-900 dark:hover:text-white transition-colors inline-flex items-center group">
                    {link.label}
                    {link.label === 'API Docs' && <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Legal links">
            <h3 className="text-sm font-semibold text-dark-900 dark:text-white mb-6 uppercase tracking-wider">Legal</h3>
            <ul className="space-y-4">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm font-medium text-dark-500 dark:text-dark-400 hover:text-dark-900 dark:hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-16 pt-8 border-t border-dark-100 dark:border-dark-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-sm font-medium text-dark-500 dark:text-dark-400">
              © {currentYear} BlogPlatform Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-8 text-sm font-medium text-dark-500 dark:text-dark-400">
              <Link to="/privacy" className="hover:text-dark-900 dark:hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-dark-900 dark:hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/cookies" className="hover:text-dark-900 dark:hover:text-white transition-colors">Cookies Settings</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;