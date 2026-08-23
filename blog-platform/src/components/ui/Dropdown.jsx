import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { clsx } from 'clsx';
import Button from './Button';

export function Dropdown({ 
  trigger, 
  items, 
  align = 'right', 
  className = '',
  onSelect,
  closeOnSelect = true,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleItemClick = (item) => {
    onSelect?.(item);
    if (closeOnSelect) setIsOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') setIsOpen(false);
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  return (
    <div ref={dropdownRef} className={clsx('relative inline-block', className)}>
      <Button
        ref={buttonRef}
        variant="ghost"
        size="sm"
        rightIcon={<ChevronDown className="w-4 h-4" />}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        {trigger}
      </Button>

      {isOpen && (
        <div
          className={clsx(
            'absolute z-50 mt-2 w-48 glass rounded-xl shadow-lg border border-white/20 dark:border-dark-700/50 py-1 animate-slide-down',
            align === 'right' ? 'right-0' : 'left-0'
          )}
          role="menu"
        >
          {items.map((item, index) => (
            <button
              key={item.id || index}
              onClick={() => handleItemClick(item)}
              className={clsx(
                'w-full px-4 py-2 text-left text-sm flex items-center gap-2 transition-colors',
                'hover:bg-dark-100 dark:hover:bg-dark-800',
                'focus:outline-none focus:bg-dark-100 dark:focus:bg-dark-800',
                item.disabled && 'opacity-50 cursor-not-allowed text-dark-400 dark:text-dark-500'
              )}
              role="menuitem"
              disabled={item.disabled}
              tabIndex={-1}
            >
              {item.icon && <span className="w-4 h-4 flex-shrink-0">{item.icon}</span>}
              <span className="flex-1">{item.label}</span>
              {item.shortcut && <span className="text-xs text-dark-400 dark:text-dark-500">{item.shortcut}</span>}
              {item.selected && <Check className="w-4 h-4 text-primary-600 dark:text-primary-400" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function UserMenu({ user, onProfile, onSettings, onLogout, onSwitchAccount }) {
  const items = [
    { id: 'profile', label: 'Profile', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>, onClick: onProfile },
    { id: 'settings', label: 'Settings', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>, onClick: onSettings },
    { id: 'divider', divider: true },
    ...(onSwitchAccount ? [{ id: 'switch', label: 'Switch Account', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>, onClick: onSwitchAccount }] : []),
    { id: 'logout', label: 'Logout', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>, onClick: onLogout, variant: 'danger' },
  ];

  return (
    <Dropdown
      trigger={
        <div className="flex items-center gap-2">
          <span className="hidden sm:block font-medium text-dark-700 dark:text-dark-200">{user?.name}</span>
        </div>
      }
      items={items}
      onSelect={(item) => item.onClick?.()}
    />
  );
}

export default Dropdown;