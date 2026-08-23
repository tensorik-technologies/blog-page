import { useState, useRef, useEffect } from 'react';
import { clsx } from 'clsx';

export function Tabs({ value, onChange, children, className = '', defaultValue }) {
  const [activeValue, setActiveValue] = useState(value || defaultValue || '');
  const controlled = value !== undefined;

  const handleChange = (newValue) => {
    if (!controlled) setActiveValue(newValue);
    onChange?.(newValue);
  };

  const contextValue = { activeValue: controlled ? value : activeValue, onChange: handleChange };

  return (
    <TabsContext.Provider value={contextValue}>
      <div className={clsx(className)}>{children}</div>
    </TabsContext.Provider>
  );
}

const TabsContext = createContext(null);

function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within Tabs');
  }
  return context;
}

export function TabList({ children, className = '', ...props }) {
  return (
    <div 
      role="tablist" 
      className={clsx('flex gap-1', className)} 
      {...props}
    >
      {children}
    </div>
  );
}

export function Tab({ value, children, className = '', disabled, ...props }) {
  const { activeValue, onChange } = useTabsContext();
  const isActive = activeValue === value;
  const ref = useRef(null);

  useEffect(() => {
    if (isActive && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [isActive]);

  return (
    <button
      ref={ref}
      role="tab"
      aria-selected={isActive}
      aria-controls={`panel-${value}`}
      id={`tab-${value}`}
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
      onClick={() => !disabled && onChange(value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          !disabled && onChange(value);
        }
      }}
      className={clsx(
        'relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
        disabled 
          ? 'opacity-50 cursor-not-allowed text-dark-400 dark:text-dark-500'
          : isActive
            ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/25'
            : 'text-dark-600 dark:text-dark-300 hover:text-dark-900 dark:hover:text-dark-100 hover:bg-dark-100 dark:hover:bg-dark-800'
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function TabPanels({ className = '', ...props }) {
  return <div className={clsx(className)} {...props} />;
}

export function TabPanel({ value, children, className = '', ...props }) {
  const { activeValue } = useTabsContext();
  const isActive = activeValue === value;

  if (!isActive) return null;

  return (
    <div
      role="tabpanel"
      id={`panel-${value}`}
      aria-labelledby={`tab-${value}`}
      className={clsx('animate-fade-in', className)}
      {...props}
    >
      {children}
    </div>
  );
}

import { createContext, useContext } from 'react';