import { NavLink } from 'react-router';
import useNavLinks from '../hooks/useNavLinks';
import { useTheme } from '../context/ThemeContext';

export default function NavBar() {
  const { links } = useNavLinks();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-violet-100 dark:border-gray-700 shadow-sm shadow-violet-100/50 dark:shadow-gray-900/50">
      <nav className="container mx-auto max-w-5xl px-6 md:px-8 h-14 flex items-center gap-6">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${
                isActive
                  ? 'text-violet-600 dark:text-violet-400 border-b-2 border-violet-500 dark:border-violet-400 pb-0.5'
                  : 'text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
        <button
          onClick={toggleTheme}
          className="ml-auto text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors text-lg"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </nav>
    </header>
  );
}
