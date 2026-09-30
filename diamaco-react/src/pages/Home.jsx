import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal'
import SEO from '../components/SEO'
import styles from './Home.module.css'

/* ── Marquee items ── */
const marqueeItems = [
  'Workflow Automation','CRM Setup & Training','Website Development',
  'WhatsApp Business Automation','Lead Generation & Outreach',
  'Digital Marketing & Content','SEO & Local Search',
  'Business Development Strategy','Tender Readiness & Compliance',
  'Commercial Setup Guidance — CIPC · SARS · B-BBEE',
]

/* ── Services ── */
const services = [
  { num:'01', title:'Workflow Automation', desc:'Eliminate manual bottlenecks and build automated systems that run 24/7, saving time and reducing errors at scale.' },
  { num:'02', title:'CRM Setup & Training', desc:'Implement and optimise a CRM that powers your sales pipeline, customer relationships, and follow-up processes.' },
  { num:'03', title:'Business Website Development', desc:'Professional, conversion-optimised websites that represent your brand and drive client enquiries around the clock.' },
  { num:'04', title:'WhatsApp Business Automation', desc:'Set up intelligent WhatsApp flows that engage leads, answer FAQs, and qualify prospects — 24/7, automatically.' },
  { num:'05', title:'Lead Generation & Outreach', desc:'Targeted campaigns that consistently fill your pipeline with qualified, ready-to-buy prospects.' },
  { num:'06', title:'Digital Marketing & Content', desc:'Strategic content and paid campaigns that grow your audience and convert attention into revenue.' },
  { num:'07', title:'SEO & Local Search', desc:'Dominate local and national search results so clients find you at the exact moment they need your services.' },
  { num:'08', title:'Business Development Strategy', desc:'Structured plans that identify new markets, partnerships, and revenue streams aligned with your long-term vision.' },
  { num:'09', title:'Tender Readiness & Compliance', desc:'Prepare to compete for and win government and corporate tenders with compliant documentation and strategy.' },
]

/* ── Process steps ── */
const steps = [
  { n:'01', title:'Discovery Call',       text:'We understand your business, challenges, goals, and existing systems — no assumptions, just clarity.' },
  { n:'02', title:'Strategy Design',      text:'We craft a customised growth roadmap identifying high-impact opportunities and prioritising quick wins.' },
  { n:'03', title:'Execution & Build',    text:'Our team builds systems, automations, digital assets, and campaigns with precision and speed.' },
  { n:'04', title:'Measure & Optimise',   text:'We track performance, report transparently, and continuously optimise — so results compound over time.' },
]

/* ── Why New = Better ── */
const commitments = [
  {
    icon: '🔥',
    title: 'Hungry to Prove Ourselves',
    text: 'Established agencies coast on reputation. We can\'t afford to. Every project we take on is a chance to earn our name — so we bring an intensity and attention to detail that complacent agencies stopped bringing years ago.'
  },
  {
    icon: '🎯',
    title: 'Your Results Are Our Reputation',
    text: 'We don\'t have a long client list to fall back on. What we have is a deep personal stake in making every engagement exceptional — because your success is the only portfolio we\'re building right now.'
  },
  {
    icon: '💬',
    title: 'Radical Transparency, Always',
    text: 'No jargon, no smoke and mirrors. You\'ll always know exactly what we\'re building, why, and what it\'s costing. We\'d rather walk away from a deal than set expectations we can\'t meet.'
  },
  {
    icon: '🔧',
    title: 'Execution Over Advice',
    text: 'We\'re not consultants who hand you a 40-page report and disappear. We roll up our sleeves and build — alongside you — until the work is done and results are visible in your business.'
  },
]

/* ── Blog previews ── */
const posts = [
  { tag:'Automation',    title:'5 Workflows Every South African Business Should Automate in 2025', excerpt:'Discover the highest-impact processes to automate first — no technical expertise required.', date:'Sep 2025', read:'6 min' },
  { tag:'Lead Generation', title:'How to Build a Consistent Lead Pipeline Without Paid Ads',        excerpt:'Organic strategies that work for SMEs with modest budgets and ambitious growth targets.',  date:'Aug 2025', read:'8 min' },
  { tag:'Compliance',    title:'The Complete Checklist for Winning Your First Government Tender',    excerpt:'From compliance documents to proposal strategy — everything you need to compete and win.',   date:'Jul 2025', read:'10 min' },
]

/* ── Animated Counter ── */
function Counter({ target, suffix = '' }) {
  const el = useRef(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      obs.disconnect()
      const duration = 2000, start = performance.now()
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - p, 3)
        if (el.current) el.current.textContent = Math.round(target * eased)
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.5 })
    if (el.current) obs.observe(el.current)
    return () => obs.disconnect()
  }, [target])
  return <span ref={el}>0</span>
}

export default function Home() {
  /* Hero entrance */
  const heroContent = useRef(null)
  useEffect(() => {
    const el = heroContent.current
    if (!el) return
    el.style.opacity = '0'; el.style.transform = 'translateY(32px)'
    el.style.transition = 'opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s'
    requestAnimationFrame(() => { el.style.opacity = '1'; el.style.transform = 'translateY(0)' })
  }, [])

  return (
    <>
      <SEO
        title="Diamaco Growth | Business Growth Partners | Johannesburg, South Africa"
        description="South Africa's premier business growth partner. We build automated workflows, CRM sales pipelines, high-converting websites, and commercial growth strategies."
        keywords="business growth partners south africa, workflow automation johannesburg, crm setup gauteng, business development, digital marketing, website development gauteng, B-BBEE compliance guidance, Diamaco Growth"
        canonical="https://www.diamacogrowth.co.za/"
      />
      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroGrid} />
        <div className={styles.orb1} />
        <div className={styles.orb2} />
        <div className="container">
          <div ref={heroContent} className={styles.heroContent}>
            <p className={styles.heroEyebrow}>Business Growth Partners · South Africa</p>
            <h1 className={styles.heroTitle}>
              Systems. Strategy.<br />
              <em>Serious Growth.</em>
            </h1>
            <p className={styles.heroSubtitle}>
              Diamaco Growth helps South African businesses automate operations, build a powerful digital presence, and win more clients — with the hunger and focus that only a new company can bring.
            </p>
            <div className={styles.heroActions}>
              <Link to="/contact" className="btn btn--primary"><span>Book a Free Strategy Call</span>
                <svg className={styles.arrow} viewBox="0 0 18 18" fill="none"><path d="M3 9h12M9 3l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
              <Link to="/services" className="btn btn--ghost"><span>See What We Do</span></Link>
            </div>
          </div>
        </div>
        <div className={styles.heroStats}>
          {[{n:'10',l:'Core Services'},{n:'SA',l:'Based & Focused'},{n:'∞',l:'Growth Potential'}].map(s => (
            <div key={s.l} className={styles.heroStat}>
              <span className={styles.heroStatNum}>{s.n}</span>
              <span className={styles.heroStatLabel}>{s.l}</span>
            </div>
          ))}
        </div>
        <div className={styles.heroScroll}>
          <div className={styles.heroScrollLine} />
          <span>Scroll</span>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="marquee-track">
        <div className="marquee-inner">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <div key={i} className="marquee-item">{item}<span className="marquee-dot"/></div>
          ))}
        </div>
      </div>

      {/* ── COMMITMENT PILLARS ── */}
      <ScrollReveal>
        <div className="stats-bar">
          {[
            { icon: '⚡', label: 'Fast Implementation', sub: 'We move quickly so you see results sooner' },
            { icon: '🎯', label: 'Results-Focused',      sub: 'Every action is tied to a measurable outcome' },
            { icon: '🇿🇦', label: 'SA-Market Experts',   sub: 'Built for the South African business landscape' },
            { icon: '🔒', label: 'No Lock-In Contracts', sub: 'Earn your trust every month — no lock-ins' },
          ].map(({ icon, label, sub }) => (
            <div key={label} className="stat-item">
              <div style={{ fontSize: '2rem', marginBottom: 12 }}>{icon}</div>
              <div className="stat-label" style={{ color: '#fff', marginBottom: 6 }}>{label}</div>
              <div style={{ fontSize: '0.78rem', color: '#888', lineHeight: 1.5, maxWidth: 160, margin: '0 auto' }}>{sub}</div>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* ── ABOUT INTRO ── */}
      <section className="section">
        <div className="container">
          <div className={styles.aboutSplit}>
            <ScrollReveal className={styles.aboutVisual}>
              <div className={styles.aboutVisualMain}>
                <img
                  src="/about-partner.jpg"
                  alt="Diamaco Growth Strategic Partner"
                  className={styles.aboutImg}
                  loading="lazy"
                />
                <div className={styles.aboutImgOverlay} />
              </div>
              <div className={styles.aboutAccent} />
              <div className={styles.aboutBadge}>
                <span className={styles.aboutBadgeNum}>10</span>
                <span className={styles.aboutBadgeText}>Core<br/>Services</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={2} className={styles.aboutContent}>
              <p className="section-label">Who We Are</p>
              <h2 className="section-title">Your Strategic <em>Growth</em> Partner</h2>
              <p className="section-subtitle" style={{ marginBottom: 40 }}>
                Diamaco Growth is a business built to solve a real problem: quality growth support has always been out of reach for most South African SMEs. We’re changing that — with full-service capability at a fair price.
              </p>
              <div className={styles.pillars}>
                {[
                  { t:'Results-Driven Execution', d:"We don't just advise — we implement. Every engagement is tied to measurable outcomes that move your business forward." },
                  { t:'Tailored Strategies',       d:"No cookie-cutter solutions. Every business is unique, and we build strategies that fit your specific context and goals." },
                  { t:'End-to-End Support',        d:"From commercial registration to digital marketing — we're with you at every stage of your growth journey." },
                ].map(({ t, d }) => (
                  <div key={t} className={styles.pillar}>
                    <div className={styles.pillarDot} />
                    <div>
                      <p className={styles.pillarTitle}>{t}</p>
                      <p className={styles.pillarText}>{d}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/about" className="btn btn--primary">
                <span>Learn More About Us</span>
                <svg className={styles.arrow} viewBox="0 0 18 18" fill="none"><path d="M3 9h12M9 3l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <ScrollReveal className="section-header section-header--center">
            <p className="section-label">What We Do</p>
            <h2 className="section-title">Services Built for <em>Real Growth</em></h2>
            <p className="section-subtitle">Ten integrated services designed to transform every dimension of your business — from the ground up.</p>
          </ScrollReveal>
          <ScrollReveal delay={2}>
            <div className={styles.servicesGrid}>
              {services.map(({ num, title, desc }) => (
                <div key={num} className={styles.serviceItem}>
                  <div className={styles.serviceNum}>{num}</div>
                  <h3 className={styles.serviceTitle}>{title}</h3>
                  <p className={styles.serviceDesc}>{desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link to="/services" className="btn btn--ghost"><span>View All Services</span></Link>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className={styles.processBg}>
        <div className="container">
          <ScrollReveal className="section-header section-header--center">
            <p className="section-label">How We Work</p>
            <h2 className="section-title">A Process Built for <em>Results</em></h2>
          </ScrollReveal>
          <ScrollReveal delay={2}>
            <div className={styles.processSteps}>
              {steps.map(({ n, title, text }) => (
                <div key={n} className={styles.step}>
                  <div className={styles.stepNum}>{n}</div>
                  <h3 className={styles.stepTitle}>{title}</h3>
                  <p className={styles.stepText}>{text}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── OUR COMMITMENT ── */}
      <section className="section">
        <div className="container">
          <ScrollReveal className="section-header section-header--center">
            <p className="section-label">Why Work With Us</p>
            <h2 className="section-title">New to the Market.<br /><em>Not New to the Work.</em></h2>
            <p className="section-subtitle">
              We’re breaking into the industry with something established firms rarely have anymore: genuine hunger. We’re building our credibility from the ground up — and that means every client gets our absolute best, every single time. No shortcuts, no junior handoffs, no coasting.
            </p>
          </ScrollReveal>
          <div className={styles.testimonialGrid}>
            {commitments.map(({ icon, title, text }, i) => (
              <ScrollReveal key={title} delay={i + 1}>
                <div className={`${styles.testimonialCard} testimonial-card`}>
                  <div style={{ fontSize: '2.5rem', marginBottom: 20 }}>{icon}</div>
                  <h3 className={styles.authorName} style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 12 }}>{title}</h3>
                  <p className={styles.quote} style={{ fontStyle: 'normal' }}>{text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 56 }}>
            <Link to="/contact" className="btn btn--primary"><span>Start a Conversation</span>
              <svg className={styles.arrow} viewBox="0 0 18 18" fill="none"><path d="M3 9h12M9 3l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
            <p style={{ marginTop: 16, fontSize: '0.8rem', color: '#888', letterSpacing: '0.05em' }}>
              No pressure. No pitch deck. Just a genuine conversation about your business.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <div className="cta-banner">
        <div className="container">
          <div className="cta-banner__inner">
            <div>
              <h2 className="cta-banner__title">Ready to Grow Your Business?</h2>
              <p className="cta-banner__sub">Let's have a no-obligation discovery call and map out your growth strategy.</p>
            </div>
            <Link to="/contact" className="btn--white">Book a Free Consultation</Link>
          </div>
        </div>
      </div>

      {/* ── BLOG PREVIEW ── */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className={styles.blogHeader}>
              <div>
                <p className="section-label">Insights</p>
                <h2 className="section-title">Fresh from the <em>Blog</em></h2>
              </div>
              <Link to="/blog" className="btn btn--ghost"><span>All Articles</span></Link>
            </div>
          </ScrollReveal>
          <div className={styles.blogGrid}>
            {posts.map(({ tag, title, excerpt, date, read }, i) => (
              <ScrollReveal key={title} delay={i + 1}>
                <Link to="/blog" className={`${styles.blogCard} blog-card`}>
                  <div className={styles.blogImg}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="rgba(204,34,34,0.5)" strokeWidth="1"/>
                    </svg>
                  </div>
                  <div className={styles.blogBody}>
                    <span className={styles.blogTag}>{tag}</span>
                    <h3 className={styles.blogTitle}>{title}</h3>
                    <p className={styles.blogExcerpt}>{excerpt}</p>
                    <div className={styles.blogMeta}>
                      <span>{date} · {read} read</span>
                      <span className={styles.blogRead}>Read →</span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
