import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Save, Eye, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { clsx } from 'clsx';
import { useBlog } from '../context/BlogContext';
import { useToast } from '../context/ToastContext';
import { categories } from '../data/mockData';
import { calculateReadingTime, slugify, generateId } from '../utils/helpers';
import { parseMarkdown, extractExcerpt } from '../utils/markdown';
import { Button, Input, Badge, Card, CardHeader, CardTitle, CardDescription, CardContent, Avatar } from '../components/ui';

const INITIAL_FORM = {
  title: '',
  category: 'tech',
  coverImage: '',
  authorId: '',
  content: '',
  tags: '',
  status: 'draft',
};

export default function CreatePost({ isEdit = false }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts, authors, currentUser, createPost, updatePost } = useBlog();
  const { success, error } = useToast();

  const [form, setForm] = useState(INITIAL_FORM);
  const [previewMode, setPreviewMode] = useState('edit');
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [readingTime, setReadingTime] = useState(0);
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    if (isEdit && id) {
      const post = posts.find(p => p.id === id);
      if (post) {
        setForm({
          title: post.title,
          category: post.category,
          coverImage: post.coverImage || '',
          authorId: post.authorId,
          content: post.content,
          tags: post.tags?.join(', ') || '',
          status: post.status,
        });
      }
    } else if (currentUser) {
      setForm(prev => ({ ...prev, authorId: currentUser.id }));
    }
  }, [isEdit, id, posts, currentUser]);

  useEffect(() => {
    const words = form.content.trim().split(/\s+/).filter(Boolean).length;
    setWordCount(words);
    setReadingTime(calculateReadingTime(form.content));
  }, [form.content]);

  const validateForm = useCallback(() => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = 'Title is required';
    if (!form.content.trim()) newErrors.content = 'Content is required';
    if (!form.category) newErrors.category = 'Category is required';
    if (!form.authorId) newErrors.authorId = 'Author is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [form]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSaving(true);
    try {
      const postData = {
        ...form,
        id: isEdit ? id : generateId('post'),
        slug: slugify(form.title),
        excerpt: extractExcerpt(form.content),
        readingTime,
        author: authors.find(a => a.id === form.authorId),
        publishedAt: isEdit ? posts.find(p => p.id === id)?.publishedAt : new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        likes: isEdit ? posts.find(p => p.id === id)?.likes : 0,
        bookmarks: isEdit ? posts.find(p => p.id === id)?.bookmarks : 0,
        views: isEdit ? posts.find(p => p.id === id)?.views : 0,
        comments: [],
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      };

      if (isEdit) {
        updatePost(postData);
        success('Post updated successfully!');
      } else {
        createPost(postData);
        success('Post created successfully!');
      }
      
      navigate('/dashboard');
    } catch (err) {
      error('Failed to save post. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const contentHtml = parseMarkdown(form.content);

  return (
    <div className="min-h-screen bg-white dark:bg-dark-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-dark-500 hover:text-dark-700 dark:hover:text-dark-300 mb-4 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-display font-bold text-dark-900 dark:text-dark-100">
            {isEdit ? 'Edit Post' : 'Create New Post'}
          </h1>
          <p className="text-dark-600 dark:text-dark-400 mt-1">
            {isEdit ? 'Update your article' : 'Share your knowledge with the world'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Post Content</CardTitle>
                  <CardDescription>
                    Write your article using Markdown. Use the preview tab to see how it will look.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="border-b border-dark-200 dark:border-dark-700">
                    <nav className="flex gap-1 px-4" role="tablist" aria-label="Editor modes">
                      <button
                        type="button"
                        onClick={() => setPreviewMode('edit')}
                        className={clsx(
                          'py-3 px-4 text-sm font-medium rounded-t-lg transition-colors',
                          previewMode === 'edit'
                            ? 'bg-white dark:bg-dark-800 text-primary-600 dark:text-primary-400 border-b-2 border-primary-600'
                            : 'text-dark-500 dark:text-dark-400 hover:text-dark-700 dark:hover:text-dark-300'
                        )}
                        role="tab"
                        aria-selected={previewMode === 'edit'}
                        aria-controls="edit-panel"
                      >
                        Write
                      </button>
                      <button
                        type="button"
                        onClick={() => setPreviewMode('preview')}
                        className={clsx(
                          'py-3 px-4 text-sm font-medium rounded-t-lg transition-colors',
                          previewMode === 'preview'
                            ? 'bg-white dark:bg-dark-800 text-primary-600 dark:text-primary-400 border-b-2 border-primary-600'
                            : 'text-dark-500 dark:text-dark-400 hover:text-dark-700 dark:hover:text-dark-300'
                        )}
                        role="tab"
                        aria-selected={previewMode === 'preview'}
                        aria-controls="preview-panel"
                      >
                        <Eye className="w-4 h-4 inline mr-1" /> Preview
                      </button>
                    </nav>
                  </div>

                  {previewMode === 'edit' && (
                    <div id="edit-panel" role="tabpanel" className="p-4">
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="title" className="label">Title</label>
                          <Input
                            id="title"
                            value={form.title}
                            onChange={(e) => handleChange('title', e.target.value)}
                            placeholder="Enter a compelling title..."
                            error={errors.title}
                            maxLength={100}
                          />
                          {errors.title && <p className="mt-1 text-sm text-red-500" role="alert">{errors.title}</p>}
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="category" className="label">Category</label>
                            <select
                              id="category"
                              value={form.category}
                              onChange={(e) => handleChange('category', e.target.value)}
                              className="input appearance-none"
                              error={errors.category}
                            >
                              {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label htmlFor="authorId" className="label">Author</label>
                            <select
                              id="authorId"
                              value={form.authorId}
                              onChange={(e) => handleChange('authorId', e.target.value)}
                              className="input appearance-none"
                              error={errors.authorId}
                            >
                              {authors.map(author => (
                                <option key={author.id} value={author.id}>{author.name}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div>
                          <label htmlFor="coverImage" className="label">Cover Image URL</label>
                          <Input
                            id="coverImage"
                            type="url"
                            value={form.coverImage}
                            onChange={(e) => handleChange('coverImage', e.target.value)}
                            placeholder="https://example.com/image.jpg"
                            hint="Optional: Add a cover image for your post"
                          />
                        </div>

                        <div>
                          <label htmlFor="tags" className="label">Tags (comma separated)</label>
                          <Input
                            id="tags"
                            value={form.tags}
                            onChange={(e) => handleChange('tags', e.target.value)}
                            placeholder="react, typescript, tutorial"
                          />
                        </div>

                        <div>
                          <label htmlFor="content" className="label">Content (Markdown)</label>
                          <div className="relative">
                            <textarea
                              id="content"
                              value={form.content}
                              onChange={(e) => handleChange('content', e.target.value)}
                              className="w-full min-h-[400px] p-4 rounded-xl border border-dark-200 dark:border-dark-700 bg-white dark:bg-dark-800 text-dark-900 dark:text-dark-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-y font-mono text-sm leading-relaxed"
                              placeholder="# Getting Started\n\nWrite your article here using **Markdown** syntax...\n\n## Headings\n\n- Lists\n- Are\n- Supported\n\n```code\nblocks\n```\n\n> Blockquotes\n\n[Links](https://example.com)"
                              aria-describedby="content-hint"
                            />
                            {errors.content && (
                              <p className="mt-1 text-sm text-red-500" role="alert">{errors.content}</p>
                            )}
                          </div>
                          <div id="content-hint" className="mt-2 flex items-center justify-between text-sm text-dark-500 dark:text-dark-400">
                            <span>{wordCount} words · {readingTime} min read</span>
                            <span className="flex items-center gap-4">
                              <kbd className="px-2 py-1 bg-dark-100 dark:bg-dark-700 rounded text-xs">Ctrl+B</kbd> Bold
                              <kbd className="px-2 py-1 bg-dark-100 dark:bg-dark-700 rounded text-xs">Ctrl+I</kbd> Italic
                              <kbd className="px-2 py-1 bg-dark-100 dark:bg-dark-700 rounded text-xs">Ctrl+K</kbd> Link
                            </span>
                          </div>
                        </div>

                        <div>
                          <label className="label">Status</label>
                          <div className="flex gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name="status"
                                value="draft"
                                checked={form.status === 'draft'}
                                onChange={(e) => handleChange('status', e.target.value)}
                                className="w-4 h-4 text-primary-600 border-dark-300 focus:ring-primary-500"
                              />
                              <span className="text-sm text-dark-700 dark:text-dark-300">Draft</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name="status"
                                value="published"
                                checked={form.status === 'published'}
                                onChange={(e) => handleChange('status', e.target.value)}
                                className="w-4 h-4 text-primary-600 border-dark-300 focus:ring-primary-500"
                              />
                              <span className="text-sm text-dark-700 dark:text-dark-300">Published</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {previewMode === 'preview' && (
                    <div id="preview-panel" role="tabpanel" className="p-8">
                      <div className="prose prose-lg dark:prose-invert max-w-none min-h-[400px]">
                        {form.content ? (
                          <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
                        ) : (
                          <div className="text-center text-dark-400 dark:text-dark-500 py-12">
                            <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p>Start writing to see a preview</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-24 space-y-6">
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h3 className="font-semibold text-dark-900 dark:text-dark-100 mb-4">Publish Settings</h3>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-primary-600 border-dark-300 rounded focus:ring-primary-500"
                        />
                        <span className="text-sm text-dark-700 dark:text-dark-300">Feature on homepage</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-primary-600 border-dark-300 rounded focus:ring-primary-500"
                        />
                        <span className="text-sm text-dark-700 dark:text-dark-300">Allow comments</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-primary-600 border-dark-300 rounded focus:ring-primary-500"
                        />
                        <span className="text-sm text-dark-700 dark:text-dark-300">Subscribe to comments</span>
                      </label>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-dark-200 dark:border-dark-700">
                    <h3 className="font-semibold text-dark-900 dark:text-dark-100 mb-4">Post Stats</h3>
                    <dl className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-dark-500 dark:text-dark-400">Words</dt>
                        <dd className="font-medium text-dark-900 dark:text-dark-100">{wordCount}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-dark-500 dark:text-dark-400">Reading time</dt>
                        <dd className="font-medium text-dark-900 dark:text-dark-100">{readingTime} min</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-dark-500 dark:text-dark-400">Characters</dt>
                        <dd className="font-medium text-dark-900 dark:text-dark-100">{form.content.length}</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="pt-6 border-t border-dark-200 dark:border-dark-700">
                    <div className="flex flex-col gap-3">
                      <Button 
                        type="submit" 
                        variant="primary" 
                        fullWidth 
                        disabled={saving}
                        leftIcon={saving ? undefined : <Save className="w-4 h-4" />}
                        loading={saving}
                      >
                        {saving ? 'Saving...' : (isEdit ? 'Update Post' : 'Publish Post')}
                      </Button>
                      <Button 
                        type="button" 
                        variant="secondary" 
                        fullWidth 
                        onClick={() => navigate(-1)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}