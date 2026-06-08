import { NavLink } from 'react-router';
import useNavLinks from '../hooks/useNavLinks';

export default function NavBar() {
  const { links } = useNavLinks();

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-violet-100 shadow-sm shadow-violet-100/50">
      <nav className="container mx-auto max-w-5xl px-6 md:px-8 h-14 flex items-center gap-6">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${
                isActive
                  ? 'text-violet-600 border-b-2 border-violet-500 pb-0.5'
                  : 'text-gray-500 hover:text-violet-600'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
