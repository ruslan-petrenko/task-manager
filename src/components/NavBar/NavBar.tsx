import { NavLink } from 'react-router';
import useNavLinks from '@/hooks/useNavLinks';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import styles from './NavBar.module.css';
import UiButton from '@/components/common/UiButton/UiButton';

export default function NavBar() {
  const { links } = useNavLinks();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

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

        <div className={styles.right}>
          {user && <span className={styles.userEmail}>{user.name ?? user.email}</span>}
          <UiButton onClick={toggleTheme} className={styles.themeToggle} aria-label="Toggle theme">
            {theme === 'dark' ? '☀️' : '🌙'}
          </UiButton>
          {user && (
            <UiButton onClick={logout} className={styles.logoutBtn}>
              Sign out
            </UiButton>
          )}
        </div>
      </nav>
    </header>
  );
}
