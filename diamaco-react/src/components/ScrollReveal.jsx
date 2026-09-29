import { useEffect, useRef } from 'react'

/**
 * Hook — returns a ref; when element enters viewport, adds class 'visible'
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add('visible')
        obs.unobserve(el)
      }
    }, { threshold: 0.05, rootMargin: '0px 0px 0px 0px', ...options })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return ref
}

/**
 * ScrollReveal wrapper component
 */
export default function ScrollReveal({ children, className = '', delay = 0, style = {} }) {
  const ref = useScrollReveal()

  return (
    <div
      ref={ref}
      className={`anim anim-d${delay} ${className}`}
      style={style}
    >
      {children}
    </div>
  )
}
