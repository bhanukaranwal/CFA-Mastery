import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Header: React.FC = () => {
  const location = useLocation();
  const { theme, setTheme, actualTheme } = useTheme();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const cycleTheme = () => {
    const themes = ['light', 'dark', 'system'] as const;
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const getThemeIcon = () => {
    if (theme === 'system') return <Monitor size={18} />;
    if (actualTheme === 'dark') return <Moon size={18} />;
    return <Sun size={18} />;
  };

  return (
    <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-btn-primary-text font-bold text-lg">K</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-primary">Karanwal Capital</h1>
              <p className="text-xs text-text-secondary -mt-1">CFA Mastery Platform</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'text-primary bg-bg-1' 
                  : 'text-text hover:text-primary hover:bg-secondary'
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/quiz"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/quiz') 
                  ? 'text-primary bg-bg-1' 
                  : 'text-text hover:text-primary hover:bg-secondary'
              }`}
            >
              Quiz
            </Link>
            <Link
              to="/study-tools"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/study-tools') 
                  ? 'text-primary bg-bg-1' 
                  : 'text-text hover:text-primary hover:bg-secondary'
              }`}
            >
              Study Tools
            </Link>
            <Link
              to="/analytics"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/analytics') 
                  ? 'text-primary bg-bg-1' 
                  : 'text-text hover:text-primary hover:bg-secondary'
              }`}
            >
              Analytics
            </Link>
            <Link
              to="/community"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/community') 
                  ? 'text-primary bg-bg-1' 
                  : 'text-text hover:text-primary hover:bg-secondary'
              }`}
            >
              Community
            </Link>
          </nav>

          {/* Theme Toggle */}
          <button
            onClick={cycleTheme}
            className="p-2 rounded-lg bg-secondary hover:bg-secondary-hover transition-colors"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'} theme`}
          >
            {getThemeIcon()}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;