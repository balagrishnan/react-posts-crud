import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/posts', label: 'Posts' },
  { to: '/products', label: 'Products' },
]

export default function Navbar() {
  return (
    <nav className="navbar" aria-label="Main navigation">
      <ul className="navbar-list">
        {navItems.map(({ to, label, end }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                isActive ? 'nav-link nav-link-active' : 'nav-link'
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
