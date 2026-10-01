import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './StickyBar.module.css'

export default function StickyBar({ onVisibilityChange }) {
  const [show, setShow] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => {
      if (!dismissed && location.pathname !== '/contact') {
        const isVisible = window.scrollY > 500
        setShow(isVisible)
        if (onVisibilityChange) onVisibilityChange(isVisible)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [dismissed, location.pathname, onVisibilityChange])

  const handleDismiss = () => {
    setDismissed(true)
    setShow(false)
    if (onVisibilityChange) onVisibilityChange(false)
  }

  const handleCta = () => {
    setShow(false)
    if (onVisibilityChange) onVisibilityChange(false)
  }

  if (dismissed || location.pathname === '/contact') return null

  return (
    <div className={`${styles.bar} ${show ? styles.visible : ''}`}>
      <p className={styles.text}>
        <span className={styles.dot} />
        Ready to grow your business? Let's talk — no pitch, just a real conversation.
      </p>
      <div className={styles.actions}>
        <Link to="/contact" className={styles.cta} onClick={handleCta}>
          Book a Free Call
        </Link>
        <button className={styles.dismiss} onClick={handleDismiss} aria-label="Dismiss">
          ×
        </button>
      </div>
    </div>
  )
}
