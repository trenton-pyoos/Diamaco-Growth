import { useEffect, useRef } from 'react'
import styles from './Cursor.module.css'

export default function Cursor() {
  const cursorRef = useRef(null)
  const ringRef   = useRef(null)
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0
  let rafId = null

  useEffect(() => {
    const isFine = window.matchMedia('(pointer: fine)').matches
    if (!isFine) return

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${mouseX - 5}px, ${mouseY - 5}px)`
      }
    }

    const animRing = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`
      }
      rafId = requestAnimationFrame(animRing)
    }
    rafId = requestAnimationFrame(animRing)
    window.addEventListener('mousemove', onMove)

    const addHover = () => {
      document.querySelectorAll('a, button, .card, .blog-card, .testimonial-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
          cursorRef.current?.classList.add(styles.hover)
          ringRef.current?.classList.add(styles.hover)
        })
        el.addEventListener('mouseleave', () => {
          cursorRef.current?.classList.remove(styles.hover)
          ringRef.current?.classList.remove(styles.hover)
        })
      })
    }
    addHover()

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className={styles.cursor} />
      <div ref={ringRef}   className={styles.ring}   />
    </>
  )
}
