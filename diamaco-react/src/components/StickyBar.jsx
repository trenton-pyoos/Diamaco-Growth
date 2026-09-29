import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './StickyBar.module.css'

export default function StickyBar() {
  const [show, setShow] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => {
      if (!dismissed) setShow(window.scrollY > 500)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [dismissed])

  if (dismissed || location.pathname === '/contact') return null

  return (
    <div className={`${styles.bar} ${show ? styles.visible : ''}`}>
      <p className={styles.text}>
        <span className={styles.dot} />
        Ready to grow your business? Let's talk — no pitch, just a real conversation.
      </p>
      <div className={styles.actions}>
        <Link to="/contact" className={styles.cta} onClick={() => setShow(false)}>
          Book a Free Call
        </Link>
        <button className={styles.dismiss} onClick={() => { setDismissed(true); setShow(false) }} aria-label="Dismiss">
          ×
        </button>
      </div>
    </div>
  )
}
