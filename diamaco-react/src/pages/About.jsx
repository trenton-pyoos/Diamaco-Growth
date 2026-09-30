import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal'
import SEO from '../components/SEO'
import styles from './About.module.css'

const values = [
  { n:'01', icon:<svg viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>, title:'Integrity Above All', text:"We operate with full transparency. No hidden fees, no empty promises. What we commit to, we deliver — or we don't take the project." },
  { n:'02', icon:<svg viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>, title:'Relentless Execution', text:'Strategy without execution is worthless. We bias toward action, moving quickly and decisively while maintaining quality at every step.' },
  { n:'03', icon:<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/><path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>, title:'Long-Term Thinking', text:'We optimise for your long-term success, not short-term metrics. Our goal is to become a permanent growth engine for your business.' },
  { n:'04', icon:<svg viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>, title:'Client-First Culture', text:"Every decision we make is filtered through a single question: does this serve our client's best interests? Your growth is our success metric." },
]

const whyPoints = [
  { t:'Full-Spectrum Capability',   d:'From legal setup to SEO — we cover every growth lever under one roof, eliminating the cost and chaos of multiple agencies.' },
  { t:'Deep SA Market Expertise',   d:'We understand South African compliance, B-BBEE, SARS, and the tender landscape — nuances most agencies miss entirely.' },
  { t:'Transparent Reporting',      d:'You always know exactly what we\'re doing, why, and what results it\'s producing — in plain language.' },
  { t:'Scalable Engagements',       d:'Start with a single service and scale as you grow. Our model flexes with your budget and ambitions.' },
]

const stats = [
  { num:'10',   label:'Core Services',     red: false },
  { num:'SA',   label:'Market Focused',    red: true  },
  { num:'100%', label:'Skin in the Game',  red: true  },
  { num:'0',    label:'Lock-In Contracts', red: false },
]

export default function About() {
  return (
    <>
      <SEO
        title="About Us | Built for South African Enterprise Growth | Diamaco Growth"
        description="Meet Diamaco Growth. Founded to give growing South African enterprises the operational systems, commercial clarity, and digital infrastructure to scale profitably."
        keywords="about diamaco growth, south african business consultants, business growth partners gauteng, enterprise scaling south africa"
        canonical="https://www.diamacogrowth.co.za/about"
      />
      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="page-hero__bg" />
        <div className="container">
          <div className="page-hero__content">
            <div className="breadcrumb">
              <Link to="/">Home</Link>
              <span className="breadcrumb__sep">/</span>
              <span>About Us</span>
            </div>
            <p className="section-label">Our Story</p>
            <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem,5vw,4.5rem)', maxWidth: 700 }}>
              Driven by a Passion<br />for <em>Business Growth</em>
            </h1>
            <p className="section-subtitle" style={{ marginTop: 20 }}>
              We built Diamaco Growth to solve a real problem: most South African businesses can't access affordable, high-quality growth support. That changes now.
            </p>
          </div>
        </div>
      </section>

      {/* MISSION / VISION / APPROACH */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <ScrollReveal>
            <div className={styles.mvgGrid}>
              {[
                { label:'Our Mission', text:'To empower South African businesses with world-class tools, strategies, and systems that drive sustainable, measurable growth.' },
                { label:'Our Vision',  text:'To be the most trusted business growth partner on the African continent — building enterprises that create jobs, wealth, and impact.' },
                { label:'Our Approach',text:'We embed alongside our clients — thinking, building, and executing as partners — not just consultants who leave a report behind.' },
              ].map(({ label, text }) => (
                <div key={label} className={styles.mvgItem}>
                  <p className="section-label">{label}</p>
                  <p className={styles.mvgText}>{text}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* VALUES */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <ScrollReveal className="section-header">
            <p className="section-label">Core Values</p>
            <h2 className="section-title">The Principles That<br />Guide <em>Everything</em> We Do</h2>
          </ScrollReveal>
          <div className={styles.valuesGrid}>
            {values.map(({ n, icon, title, text }, i) => (
              <ScrollReveal key={n} delay={i + 1}>
                <div className="card">
                  <div className={styles.cardIcon}>{icon}</div>
                  <p className={styles.cardNum}>{n}</p>
                  <h3 className={styles.cardTitle}>{title}</h3>
                  <p className={styles.cardText}>{text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY DIAMACO */}
      <section className={styles.whySect}>
        <div className="container">
          <div className={styles.whyGrid}>
            <ScrollReveal>
              <p className="section-label">Why Choose Us</p>
              <h2 className="section-title">What Makes Diamaco Growth <em>Different</em></h2>
              <p className="section-subtitle" style={{ marginBottom: 36 }}>
                Being new to the market isn't a weakness — it's our edge. Established companies compete on legacy. We compete on effort. We're building our reputation one client at a time, which means you'll never be deprioritised, passed off to a junior, or treated like a number on an invoice.
              </p>
              <div className={styles.whyPoints}>
                {whyPoints.map(({ t, d }) => (
                  <div key={t} className={styles.whyPoint}>
                    <div className={styles.whyTick}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <div>
                      <p className={styles.whyPointTitle}>{t}</p>
                      <p className={styles.whyPointText}>{d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
            <ScrollReveal delay={2}>
              <div className={styles.statsGrid}>
                {stats.map(({ num, label, red }) => (
                  <div key={label} className={`${styles.statBox} ${red ? styles.statBoxRed : ''}`}>
                    <div className={styles.statBoxNum}>{num}</div>
                    <div className={styles.statBoxLabel}>{label}</div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="cta-banner">
        <div className="container">
          <div className="cta-banner__inner">
            <div>
              <h2 className="cta-banner__title">Let's Build Something Great Together.</h2>
              <p className="cta-banner__sub">Book a free 30-minute strategy session — no obligation, pure value.</p>
            </div>
            <Link to="/contact" className="btn--white">Book Now</Link>
          </div>
        </div>
      </div>
    </>
  )
}
