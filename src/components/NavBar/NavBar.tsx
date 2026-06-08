import { NavLink } from 'react-router';
import useNavLinks from '@/hooks/useNavLinks';
import { useTheme } from '@/context/ThemeContext';
import styles from './NavBar.module.css';

export default function NavBar() {
  const { links } = useNavLinks();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => (isActive ? styles.linkActive : styles.linkInactive)}
          >
            {link.label}
          </NavLink>
        ))}
        <button onClick={toggleTheme} className={styles.themeToggle} aria-label="Toggle theme">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </nav>
    </header>
  );
}
