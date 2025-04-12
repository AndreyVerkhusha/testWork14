'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="navbar bg-primary" data-bs-theme="dark">
      <div className="container">
        <ul className="navbar-nav mx-auto d-flex flex-row">
          <li className="nav-item me-3">
            <Link
              href="/"
              className={`nav-link ${pathname === '/' ? 'active' : ''}`}
              aria-current="page"
            >
              Поиск
            </Link>
          </li>
          <li className="nav-item me-3">
            <Link
              href="/favorites"
              className={`nav-link ${pathname === '/favorites' ? 'active' : ''}`}
            >
              Избранное
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
