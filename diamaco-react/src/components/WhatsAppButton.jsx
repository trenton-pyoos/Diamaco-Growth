import { useState, useEffect } from 'react'
import styles from './WhatsAppButton.module.css'

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false)
  const [tooltip, setTooltip] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1500)
    const tooltipTimer = setTimeout(() => setTooltip(false), 6000)
    return () => { clearTimeout(timer); clearTimeout(tooltipTimer) }
  }, [])

  return (
    <a
      href="https://wa.me/27833270056?text=Hi%2C%20I%27d%20like%20to%20find%20out%20more%20about%20Diamaco%20Growth%27s%20services."
      target="_blank"
      rel="noreferrer"
      className={`${styles.btn} ${visible ? styles.visible : ''}`}
      aria-label="Chat on WhatsApp"
    >
      {tooltip && (
        <div className={styles.tooltip}>
          <span>Chat with us</span>
          <div className={styles.tooltipArrow} />
        </div>
      )}
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.icon}>
        <path
          d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
          fill="white"
          stroke="white"
          strokeWidth="0.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className={styles.pulse} />
    </a>
  )
}
