import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './BlogModal.module.css'

export default function BlogModal({ post, onClose, onSelectPost, allPosts = [] }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [onClose])

  if (!post) return null

  const currentIndex = allPosts.findIndex((p) => p.id === post.id)
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null

  const whatsappMessage = encodeURIComponent(
    `Hi Trenton, I just read your article "${post.title}" on the Diamaco website. I'd like to discuss how to implement this for my business.`
  )

  return (
    <div className={styles.backdrop} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Top Header Bar */}
        <div className={styles.topBar}>
          <button className={styles.backBtn} onClick={onClose}>
            ← Back to all Insights
          </button>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close article">
            ×
          </button>
        </div>

        {/* Scrollable Article Area */}
        <div className={styles.scrollArea}>
          <span className={styles.badge}>{post.cat}</span>
          <h1 className={styles.title}>{post.title}</h1>

          {/* Author / Date Bar */}
          <div className={styles.authorBar}>
            <div className={styles.authorInfo}>
              <div className={styles.authorDot}>DG</div>
              <div>
                <strong style={{ color: '#fff' }}>Trenton Pyoos & Diamaco Strategy Team</strong>
                <div style={{ fontSize: '0.78rem', color: '#888' }}>Diamaco Growth · Business Growth Partners</div>
              </div>
            </div>
            <span>•</span>
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.read} read</span>
          </div>

          {/* Article Hero Image */}
          {post.image && (
            <div className={styles.heroImgWrap}>
              <img src={post.image} alt={post.title} className={styles.heroImg} />
            </div>
          )}

          {/* Key Takeaways */}
          {post.takeaways && post.takeaways.length > 0 && (
            <div className={styles.takeawaysBox}>
              <div className={styles.takeawaysTitle}>
                <span>⚡</span> Key Executive Takeaways
              </div>
              <ul className={styles.takeawaysList}>
                {post.takeaways.map((item, idx) => (
                  <li key={idx} className={styles.takeawayItem}>
                    <span className={styles.checkIcon}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Interactive Free Growth Audit Banner */}
          <div className={styles.auditBanner}>
            <div className={styles.auditBannerContent}>
              <span className={styles.auditBadge}>⚡ 2-Minute Diagnostic · Free Audit</span>
              <h3 className={styles.auditTitle}>Calculate Your Business's Recoverable Admin Hours</h3>
              <p className={styles.auditDesc}>
                Discover exactly where your operations are leaking revenue and time. Receive an instant, personalized automation roadmap for your South African business.
              </p>
            </div>
            <div className={styles.auditActions}>
              <Link to="/audit" className="btn btn--primary" onClick={onClose}>
                <span>Launch Free Audit →</span>
              </Link>
            </div>
          </div>

          {/* Article Sections */}
          {post.sections &&
            post.sections.map((sec, idx) => (
              <div key={idx} className={styles.bodySection}>
                <h2 className={styles.sectionHeading}>{sec.heading}</h2>
                <div className={styles.sectionContent}>{sec.content}</div>
              </div>
            ))}

          {/* Contextual Service Callout */}
          {post.serviceCta && (
            <div className={styles.serviceBox}>
              <div className={styles.serviceHeader}>
                <span className={styles.serviceBadge}>Diamaco Implementation Service</span>
                <span className={styles.serviceTag}>{post.serviceName || post.cat}</span>
              </div>
              <h3 className={styles.serviceTitle}>{post.serviceCta.heading}</h3>
              <p className={styles.serviceDesc}>{post.serviceCta.desc}</p>
              <div className={styles.serviceActions}>
                <Link to={post.serviceCta.link || '/services'} className="btn btn--primary" onClick={onClose}>
                  <span>{post.serviceCta.btnText || 'Explore Service'} →</span>
                </Link>
                <a
                  href={`https://wa.me/27833270056?text=${encodeURIComponent(
                    `Hi Trenton, I read your article "${post.title}" and would like to discuss ${post.serviceName || post.cat} for my business.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn--ghost"
                >
                  <span>Chat on WhatsApp (083 327 0056)</span>
                </a>
              </div>
            </div>
          )}

          {/* Summary Box */}
          {post.summary && (
            <div className={styles.summaryBox}>
              <strong style={{ color: '#fff', display: 'block', marginBottom: 6 }}>
                The Bottom Line:
              </strong>
              {post.summary}
            </div>
          )}

          {/* Previous / Next Switcher */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: 16,
              marginTop: 40,
              paddingTop: 24,
              borderTop: '1px solid #1E222B',
              flexWrap: 'wrap'
            }}
          >
            {prevPost ? (
              <button
                className={styles.backBtn}
                style={{ textAlign: 'left', maxWidth: 320 }}
                onClick={() => onSelectPost(prevPost)}
              >
                ← <strong>Previous:</strong> {prevPost.title}
              </button>
            ) : <div />}

            {nextPost ? (
              <button
                className={styles.backBtn}
                style={{ textAlign: 'right', maxWidth: 320, marginLeft: 'auto' }}
                onClick={() => onSelectPost(nextPost)}
              >
                <strong>Next:</strong> {nextPost.title} →
              </button>
            ) : <div />}
          </div>

          {/* Bottom Call To Action Card */}
          <div className={styles.ctaCard}>
            <p className="section-label" style={{ marginBottom: 0 }}>Next Steps</p>
            <h3 className={styles.ctaTitle}>Ready to Implement This in Your Business?</h3>
            <p className={styles.ctaSubtitle}>
              Whether you need automated operational workflows, tender readiness guidance, or high-converting CRM pipelines, our team embeds alongside you to drive tangible revenue growth.
            </p>
            <div className={styles.ctaActions}>
              <Link to="/contact" className="btn btn--primary" onClick={onClose}>
                <span>Book a Free Strategy Session</span>
              </Link>
              <Link to="/audit" className="btn btn--secondary" onClick={onClose}>
                <span>Take 2-Min Growth Audit</span>
              </Link>
              <a
                href={`https://wa.me/27833270056?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn--ghost"
              >
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
