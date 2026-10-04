import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false)
  const [menuOpen, setMenuOpen]     = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const links = [
    { to: '/',        label: 'Home'     },
    { to: '/about',   label: 'About'    },
    { to: '/services',label: 'Services' },
    { to: '/#growth-audit', label: 'AI Audit' },
    { to: '/blog',    label: 'Insights' },
    { to: '/contact', label: 'Contact'  },
  ]

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.inner}>
          <Link to="/" className={styles.logoLink}>
            <img src="/logo.png" alt="Diamaco Growth" className={styles.logo} />
          </Link>

          {/* Desktop links */}
          <ul className={styles.links}>
            {links.map(({ to, label }) => (
              <li key={to}>
                {to.startsWith('/#') ? (
                  <a
                    href={to}
                    className={styles.link}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
                  >
                    <span>{label}</span>
                    <span style={{ fontSize: '0.6rem', background: '#CC2222', color: '#fff', padding: '1px 5px', borderRadius: 3, fontWeight: 700, letterSpacing: '0.05em' }}>AI</span>
                  </a>
                ) : (
                  <NavLink
                    to={to}
                    end={to === '/'}
                    className={({ isActive }) =>
                      `${styles.link} ${isActive ? styles.active : ''}`
                    }
                  >
                    {label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>

          <Link to="/contact" className={styles.cta}>
            <span>Start a Project</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>

          {/* Hamburger */}
          <button
            className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`${styles.mobile} ${menuOpen ? styles.mobileOpen : ''}`}>
        {links.map(({ to, label }) =>
          to.startsWith('/#') ? (
            <a
              key={to}
              href={to}
              className={styles.mobileLink}
              onClick={() => setMenuOpen(false)}
            >
              {label} <span style={{ fontSize: '0.65rem', background: '#CC2222', color: '#fff', padding: '2px 6px', borderRadius: 4, marginLeft: 8 }}>AI</span>
            </a>
          ) : (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) => `${styles.mobileLink} ${isActive ? styles.active : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          )
        )}
        <Link
          to="/contact"
          className={`btn btn--primary ${styles.mobileCta}`}
          onClick={() => setMenuOpen(false)}
        >
          <span>Start a Project</span>
        </Link>
      </div>
    </>
  )
}
