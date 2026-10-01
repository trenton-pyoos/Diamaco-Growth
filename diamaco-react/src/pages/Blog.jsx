import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal'
import SEO from '../components/SEO'
import BlogModal from '../components/BlogModal'
import { BLOG_POSTS } from '../data/blogPosts'
import styles from './Blog.module.css'

import imgAutomation from '../assets/blog-automation.jpg'
import imgSales      from '../assets/blog-sales.jpg'
import imgCompliance from '../assets/blog-compliance.jpg'
import imgMarketing  from '../assets/blog-marketing.jpg'
import imgStrategy   from '../assets/blog-strategy.jpg'

const CAT_IMAGES = {
  Automation: imgAutomation,
  Sales:      imgSales,
  Compliance: imgCompliance,
  Marketing:  imgMarketing,
  Strategy:   imgStrategy,
}

const categories = ['All', 'Automation', 'Marketing', 'Strategy', 'Compliance', 'Sales']

function PostCard({ post, onOpen }) {
  return (
    <div
      className={`${styles.card} blog-card`}
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onOpen()
        }
      }}
      aria-label={`Read article: ${post.title}`}
      style={{ cursor: 'pointer' }}
    >
      <div className={styles.cardImg}>
        <img
          src={CAT_IMAGES[post.cat] || imgAutomation}
          alt={post.cat}
          className={styles.cardImgPhoto}
        />
        <div className={styles.cardImgOverlay} />
        <span className={styles.cardImgBadge}>{post.cat}</span>
      </div>
      <div className={styles.cardBody}>

        <h3 className={styles.cardTitle}>{post.title}</h3>
        <p className={styles.cardExcerpt}>{post.excerpt}</p>
        <div className={styles.cardMeta}>
          <span>{post.date} · {post.read}</span>
          <span className={styles.readMore}>Read Full Article →</span>
        </div>
      </div>
    </div>
  )
}

export default function Blog() {
  const [active, setActive] = useState('All')
  const [selectedPost, setSelectedPost] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()

  // Sync with URL query parameter ?article=slug
  useEffect(() => {
    const articleSlug = searchParams.get('article')
    if (articleSlug) {
      const match = BLOG_POSTS.find((p) => p.slug === articleSlug || p.id === articleSlug)
      if (match) setSelectedPost(match)
    }
  }, [searchParams])

  const handleOpenPost = (post) => {
    setSelectedPost(post)
    setSearchParams({ article: post.slug })
  }

  const handleClosePost = () => {
    setSelectedPost(null)
    setSearchParams({})
  }

  const filtered = BLOG_POSTS.filter((p) => active === 'All' || p.cat === active)

  return (
    <>
      <SEO
        title={
          selectedPost
            ? `${selectedPost.title} | Diamaco Growth Insights`
            : "Growth Insights & Business Strategies | Diamaco Growth Knowledge Hub"
        }
        description={
          selectedPost
            ? selectedPost.excerpt
            : "Actionable insights on scaling South African businesses, automating operations, optimizing CRM sales pipelines, and commercial compliance."
        }
        keywords="business insights south africa, sme growth tips, automation workflows guide, tender readiness guide, b-bbee compliance advice"
        canonical="https://www.diamacogrowth.co.za/blog"
      />
      <section className="page-hero">
        <div className="page-hero__bg" />
        <div className="container">
          <div className="page-hero__content">
            <div className="breadcrumb">
              <Link to="/">Home</Link>
              <span className="breadcrumb__sep">/</span>
              <span>Insights</span>
            </div>
            <p className="section-label">Knowledge Hub</p>
            <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem,5vw,4.5rem)', maxWidth: 700 }}>
              Business Insights for<br /><em>Ambitious</em> Entrepreneurs
            </h1>
            <p className="section-subtitle" style={{ marginTop: 20 }}>
              Practical, actionable content from our team — covering automation, strategy, digital marketing, compliance, and everything in between. Click any article below to read the complete breakdown.
            </p>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">

          {/* Filter Bar */}
          <ScrollReveal>
            <div className={styles.filterBar}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`${styles.filterBtn} ${active === cat ? styles.active : ''}`}
                  onClick={() => setActive(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Grid of Articles */}
          <div className={styles.grid}>
            {filtered.map((post, i) => (
              <ScrollReveal key={post.title} delay={(i % 3) + 1}>
                <PostCard post={post} onOpen={() => handleOpenPost(post)} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Article Reading Modal */}
      {selectedPost && (
        <BlogModal
          post={selectedPost}
          onClose={handleClosePost}
          onSelectPost={handleOpenPost}
          allPosts={BLOG_POSTS}
        />
      )}

      {/* Newsletter */}
      <section className={styles.newsletter}>
        <div className="container" style={{ maxWidth: 640, textAlign: 'center' }}>
          <p className="section-label" style={{ justifyContent: 'center' }}>Newsletter</p>
          <h2 className="section-title">Get Growth Insights<br />Delivered to Your <em>Inbox</em></h2>
          <p className="section-subtitle" style={{ margin: '0 auto 36px', maxWidth: 480 }}>
            Join a growing community of South African business owners getting practical, actionable growth strategies every week — no fluff, no spam.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </>
  )
}

function NewsletterForm() {
  const [done, setDone] = useState(false)
  const [email, setEmail] = useState('')
  if (done) return <p style={{ color: '#CC2222', fontWeight: 600 }}>✓ You're subscribed! Welcome to the Diamaco Growth community.</p>
  return (
    <>
      <form onSubmit={(e) => { e.preventDefault(); if (email) setDone(true) }} style={{ display: 'flex', gap: 12, maxWidth: 440, margin: '0 auto' }}>
        <input type="email" placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)} style={{ flex: 1 }} required />
        <button type="submit" className="btn btn--primary" style={{ flexShrink: 0, padding: '14px 24px' }}><span>Subscribe</span></button>
      </form>
      <p style={{ fontSize: '0.72rem', color: '#888', marginTop: 14 }}>No spam. Unsubscribe anytime.</p>
    </>
  )
}
