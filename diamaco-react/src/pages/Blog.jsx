import { useState } from 'react'
import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal'
import SEO from '../components/SEO'
import styles from './Blog.module.css'

const categories = ['All', 'Automation', 'Marketing', 'Strategy', 'Compliance', 'Sales']

const posts = [
  { cat:'Automation',  title:'5 Workflows Every South African Business Should Automate in 2025',       excerpt:'Discover the highest-impact processes to automate first and how to get started without technical expertise or a large budget.',    date:'Sep 2025', read:'6 min',  featured: true },
  { cat:'Sales',       title:'How to Build a Consistent Lead Pipeline Without Paid Ads',               excerpt:'Organic lead generation strategies that work for SMEs with modest budgets and ambitious growth targets.',                       date:'Aug 2025', read:'8 min',  featured: true },
  { cat:'Compliance',  title:'The Complete Checklist for Winning Your First Government Tender',        excerpt:'From compliance documentation to proposal strategy — everything you need to compete and win in the public sector.',             date:'Jul 2025', read:'10 min', featured: false },
  { cat:'Marketing',   title:'WhatsApp Marketing for SMEs: A Complete 2025 Guide',                    excerpt:'How to leverage WhatsApp Business to drive sales, improve customer service, and build loyalty at scale.',                      date:'Jun 2025', read:'7 min',  featured: false },
  { cat:'Strategy',    title:'How to Define Your Ideal Client Profile (and Why It Changes Everything)',excerpt:'The single most important exercise any business can do before spending a cent on marketing.',                                  date:'May 2025', read:'5 min',  featured: false },
  { cat:'Compliance',  title:'B-BBEE Explained: What Every Small Business Owner Must Know',            excerpt:'A plain-language breakdown of Broad-Based Black Economic Empowerment and how it affects your business.',                       date:'Apr 2025', read:'9 min',  featured: false },
  { cat:'Automation',  title:'CRM vs. Spreadsheets: When It\'s Time to Make the Switch',             excerpt:'Signs your business has outgrown spreadsheets and the exact steps to transition to a CRM without losing data.',                date:'Mar 2025', read:'6 min',  featured: false },
  { cat:'Marketing',   title:'Local SEO in 2025: How to Dominate Google Maps for Your Area',          excerpt:'The step-by-step local SEO strategy that consistently gets South African businesses to the top of local searches.',           date:'Feb 2025', read:'8 min',  featured: false },
  { cat:'Strategy',    title:'Building Revenue Streams: Why Every Business Needs at Least Three',     excerpt:'How to diversify your income sources, reduce business risk, and create more stable, predictable revenue.',                    date:'Jan 2025', read:'7 min',  featured: false },
]

function PostCard({ post }) {
  return (
    <Link to="/blog" className={`${styles.card} blog-card`}>
      <div className={styles.cardImg}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="rgba(204,34,34,0.5)" strokeWidth="1"/>
        </svg>
      </div>
      <div className={styles.cardBody}>
        <span className={styles.tag}>{post.cat}</span>
        <h3 className={styles.cardTitle}>{post.title}</h3>
        <p className={styles.cardExcerpt}>{post.excerpt}</p>
        <div className={styles.cardMeta}>
          <span>{post.date} · {post.read} read</span>
          <span className={styles.readMore}>Read →</span>
        </div>
      </div>
    </Link>
  )
}

export default function Blog() {
  const [active, setActive] = useState('All')

  const featured = posts.filter(p => p.featured)
  const filtered = posts.filter(p => active === 'All' || p.cat === active)

  return (
    <>
      <SEO
        title="Growth Insights & Business Strategies | Diamaco Growth Knowledge Hub"
        description="Actionable insights on scaling South African businesses, automating operations, optimizing CRM sales pipelines, and commercial compliance."
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
              Practical, actionable content from our team — covering automation, strategy, digital marketing, compliance, and everything in between.
            </p>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">

          {/* Filter */}
          <ScrollReveal>
            <div className={styles.filterBar}>
              {categories.map(cat => (
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

          {/* Uniform grid — all posts, same size */}
          <div className={styles.grid}>
            {filtered.map((post, i) => (
              <ScrollReveal key={post.title} delay={(i % 3) + 1}>
                <PostCard post={post} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

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
      <form onSubmit={e => { e.preventDefault(); if (email) setDone(true) }} style={{ display: 'flex', gap: 12, maxWidth: 440, margin: '0 auto' }}>
        <input type="email" placeholder="Your email address" value={email} onChange={e => setEmail(e.target.value)} style={{ flex: 1 }} required />
        <button type="submit" className="btn btn--primary" style={{ flexShrink: 0, padding: '14px 24px' }}><span>Subscribe</span></button>
      </form>
      <p style={{ fontSize: '0.72rem', color: '#888', marginTop: 14 }}>No spam. Unsubscribe anytime.</p>
    </>
  )
}
