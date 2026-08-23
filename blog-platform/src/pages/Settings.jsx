import { useState, useEffect } from 'react';
import { useBlog } from '../context/BlogContext';
import { useToast } from '../context/ToastContext';
import { Button, Input, Card, CardHeader, CardTitle, CardContent, Avatar } from '../components/ui';
import { Save, User } from 'lucide-react';

export default function Settings() {
  const { currentUser, updateUser } = useBlog();
  const { success, error } = useToast();

  const [form, setForm] = useState({
    name: '',
    username: '',
    bio: '',
    avatar: ''
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setForm({
        name: currentUser.name || '',
        username: currentUser.username || '',
        bio: currentUser.bio || '',
        avatar: currentUser.avatar || ''
      });
    }
  }, [currentUser]);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.username.trim()) {
      error('Name and username are required.');
      return;
    }

    setSaving(true);
    try {
      updateUser({
        name: form.name.trim(),
        username: form.username.trim(),
        bio: form.bio.trim(),
        avatar: form.avatar.trim()
      });
      success('Profile updated successfully!');
    } catch (err) {
      error('Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-dark-950 transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-dark-900 dark:text-dark-100 flex items-center gap-3">
            <User className="w-8 h-8 text-primary-500" />
            Profile Settings
          </h1>
          <p className="text-dark-600 dark:text-dark-400 mt-2">
            Manage your personal information and profile appearance.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Public Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex items-center gap-6 mb-8">
                <Avatar src={form.avatar} name={form.name} size="2xl" className="ring-4 ring-dark-100 dark:ring-dark-800" />
                <div className="flex-1 space-y-2">
                  <label htmlFor="avatar" className="label text-sm font-medium text-dark-700 dark:text-dark-300 block">Avatar URL</label>
                  <Input
                    id="avatar"
                    type="url"
                    value={form.avatar}
                    onChange={(e) => handleChange('avatar', e.target.value)}
                    placeholder="https://example.com/avatar.jpg"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="label text-sm font-medium text-dark-700 dark:text-dark-300 block">Display Name</label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="Jane Doe"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="username" className="label text-sm font-medium text-dark-700 dark:text-dark-300 block">Username</label>
                  <Input
                    id="username"
                    value={form.username}
                    onChange={(e) => handleChange('username', e.target.value)}
                    placeholder="janedoe"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="bio" className="label text-sm font-medium text-dark-700 dark:text-dark-300 block">Bio</label>
                <textarea
                  id="bio"
                  value={form.bio}
                  onChange={(e) => handleChange('bio', e.target.value)}
                  className="w-full min-h-[120px] p-4 rounded-xl border border-dark-200 dark:border-dark-700 bg-white dark:bg-dark-800 text-dark-900 dark:text-dark-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-y"
                  placeholder="Tell us a little bit about yourself..."
                />
                <p className="text-xs text-dark-500">Brief description for your profile. HTML and Markdown are not supported.</p>
              </div>

              <div className="pt-6 border-t border-dark-200 dark:border-dark-700 flex justify-end">
                <Button 
                  type="submit" 
                  variant="primary" 
                  loading={saving}
                  leftIcon={saving ? undefined : <Save className="w-4 h-4" />}
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
