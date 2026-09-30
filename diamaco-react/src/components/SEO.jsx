import { useEffect } from 'react'

export default function SEO({
  title,
  description,
  keywords,
  canonical,
  ogType = 'website',
  schema
}) {
  useEffect(() => {
    // 1. Update Title
    const siteTitle = 'Diamaco Growth'
    document.title = title ? `${title}` : `${siteTitle} | Business Growth Partners`

    // Helper to set or create meta tag
    const setMeta = (attr, key, content) => {
      if (!content) return
      let el = document.querySelector(`meta[${attr}="${key}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, key)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    // 2. Standard Meta Tags
    setMeta('name', 'description', description)
    if (keywords) setMeta('name', 'keywords', keywords)

    // 3. Open Graph
    setMeta('property', 'og:title', title || siteTitle)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', ogType)
    if (canonical) setMeta('property', 'og:url', canonical)

    // 4. Twitter
    setMeta('name', 'twitter:title', title || siteTitle)
    setMeta('name', 'twitter:description', description)
    if (canonical) setMeta('name', 'twitter:url', canonical)

    // 5. Canonical link
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]')
      if (!link) {
        link = document.createElement('link')
        link.setAttribute('rel', 'canonical')
        document.head.appendChild(link)
      }
      link.setAttribute('href', canonical)
    }

    // 6. Page-specific Schema (if provided)
    let schemaScript = null
    if (schema) {
      schemaScript = document.createElement('script')
      schemaScript.type = 'application/ld+json'
      schemaScript.id = 'page-schema'
      schemaScript.text = JSON.stringify(schema)
      document.head.appendChild(schemaScript)
    }

    return () => {
      if (schemaScript && schemaScript.parentNode) {
        schemaScript.parentNode.removeChild(schemaScript)
      }
    }
  }, [title, description, keywords, canonical, ogType, schema])

  return null
}
