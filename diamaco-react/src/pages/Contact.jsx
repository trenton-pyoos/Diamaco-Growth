import { useState } from 'react'
import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal'
import styles from './Contact.module.css'

const contactItems = [
  {
    label: 'Email',
    value: 'info@diamacogrowth.co.za',
    href: 'mailto:info@diamacogrowth.co.za',
    icon: <svg viewBox="0 0 24 24" fill="none"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.5"/><polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
  },
  {
    label: 'Phone',
    value: '+27 (0) 83 327 0056',
    href: 'tel:+27833270056',
    icon: <svg viewBox="0 0 24 24" fill="none"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.76a16 16 0 0 0 6 6l1.27-.86a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="1.5"/></svg>
  },
  {
    label: 'WhatsApp',
    value: 'Chat with us on WhatsApp',
    href: 'https://wa.me/27833270056',
    icon: <svg viewBox="0 0 24 24" fill="none"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
  },
  {
    label: 'Location',
    value: 'Johannesburg, Gauteng, South Africa',
    href: null,
    icon: <svg viewBox="0 0 24 24" fill="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="1.5"/><circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/></svg>
  },
  {
    label: 'Hours',
    value: 'Mon–Fri: 8:00–17:00 · Sat: 9:00–13:00',
    href: null,
    icon: <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/><polyline points="12 6 12 12 16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
  },
]

const faqs = [
  { q:'How quickly can we get started?',               a:'After your initial consultation and scope agreement, most projects kick off within 5–7 business days. For urgent projects, we can often expedite. We\'ll give you a clear timeline during our discovery call.' },
  { q:'Do you work with businesses outside Johannesburg?', a:'Absolutely. We work with clients across South Africa — Cape Town, Durban, Pretoria, and beyond — and even internationally. Most of our work is delivered remotely via video calls and collaboration tools.' },
  { q:'Can I hire you for just one service?',          a:'You can absolutely start with a single service. Many clients begin with one pain point — like a website or CRM — and expand as they see results. Our pricing is modular.' },
  { q:'What industries do you specialise in?',          a:'We work across industries — construction, professional services, retail, healthcare, hospitality, logistics, and more. Our frameworks are industry-agnostic but we always invest time to understand your specific market.' },
  { q:'How do you measure success?',                   a:'We agree on clear KPIs at the start of every engagement — leads generated, conversion rates, time saved, revenue attributed, ranking improvements — and you receive transparent monthly reports.' },
]

function FAQ({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`${styles.faqItem} ${open ? styles.faqOpen : ''}`} onClick={() => setOpen(v => !v)}>
      <div className={styles.faqQ}>
        <p>{q}</p>
        <span className={styles.faqIcon}>{open ? '×' : '+'}</span>
      </div>
      {open && <p className={styles.faqA}>{a}</p>}
    </div>
  )
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [submittedName, setSubmittedName] = useState('')
  const [submittedData, setSubmittedData] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const form = e.target
    const formData = new FormData(form)
    const data = Object.fromEntries(formData.entries())

    // Anti-spam botcheck honeypot
    if (data.botcheck) {
      setLoading(false)
      setSubmitted(true)
      return
    }

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY

    try {
      if (!accessKey || accessKey === 'YOUR_ACCESS_KEY_HERE') {
        console.warn('Web3Forms: VITE_WEB3FORMS_ACCESS_KEY is not configured yet.')
        setSubmittedName(data.firstName || '')
        setSubmittedData(data)
        setSubmitted(true)
        return
      }

      const payload = {
        access_key: accessKey,
        subject: `New Diamaco Growth Consultation Enquiry - ${data.firstName} ${data.lastName} (${data.company || 'Direct'})`,
        from_name: `${data.firstName} ${data.lastName} via Diamaco Website`,
        replyto: data.email,
        ...data,
      }

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      const result = await response.json()

      if (result.success) {
        setSubmittedName(data.firstName || '')
        setSubmittedData(data)
        setSubmitted(true)
      } else {
        setError(result.message || 'Unable to submit enquiry. Please try again or WhatsApp us directly.')
      }
    } catch (err) {
      console.error('Submission error:', err)
      setError('A network error occurred. Please try again or reach out on WhatsApp at 083 327 0056.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <section className="page-hero">
        <div className="page-hero__bg" />
        <div className="container">
          <div className="page-hero__content">
            <div className="breadcrumb">
              <Link to="/">Home</Link>
              <span className="breadcrumb__sep">/</span>
              <span>Contact</span>
            </div>
            <p className="section-label">Let's Talk</p>
            <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem,5vw,4.5rem)', maxWidth: 700 }}>
              Ready to Start<br />Your <em>Growth Journey</em>?
            </h1>
            <p className="section-subtitle" style={{ marginTop: 20 }}>
              Every great partnership starts with a conversation. Tell us about your business and we'll get back to you within one business day.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT SPLIT */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className={styles.contactSplit}>

            {/* LEFT */}
            <ScrollReveal>
              <p className="section-label">Get in Touch</p>
              <h2 className="section-title" style={{ fontSize: '2rem' }}>Multiple Ways to <em>Reach Us</em></h2>
              <p className="section-subtitle" style={{ marginBottom: 0 }}>
                Whether you're ready to start or just exploring your options — we're here to help. No pressure, just genuine conversation.
              </p>
              <div className={styles.infoList}>
                {contactItems.map(({ label, value, href, icon }) => (
                  <div key={label} className={styles.infoItem}>
                    <div className={styles.infoIcon}>{icon}</div>
                    <div>
                      <p className={styles.infoLabel}>{label}</p>
                      {href
                        ? <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className={styles.infoValue}>{value}</a>
                        : <p className={styles.infoValue}>{value}</p>
                      }
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* RIGHT: FORM — always interactive and elevated */}
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div className="card" style={{ padding: 48, position: 'relative' }}>
                <p className="section-label" style={{ marginBottom: 12 }}>Free Consultation</p>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 8 }}>Book a Strategy Session</h2>
                <p style={{ fontSize: '0.85rem', color: '#CCCCCC', marginBottom: 32, lineHeight: 1.6 }}>Fill in the form below and we'll reach out within 1 business day to schedule your free 30-minute session.</p>

                {submitted ? (
                  <div className={styles.successMsg}>
                    <div className={styles.successHeader}>
                      <div className={styles.successIcon}>✓</div>
                      <div>
                        <h3 className={styles.successTitle}>Thank you{submittedName ? `, ${submittedName}` : ''}!</h3>
                        <p className={styles.successText}>Your consultation enquiry has been submitted.</p>
                      </div>
                    </div>
                    <p className={styles.successText}>
                      We will review your requirements and reach out within <strong>1 business day</strong>. If you would like immediate feedback, feel free to connect with Trenton directly on WhatsApp.
                    </p>
                    <div className={styles.successActions}>
                      <a
                        href={submittedData ? `https://wa.me/27833270056?text=${encodeURIComponent(
                          `Hi Trenton, I just submitted a consultation enquiry on the website:\n\nName: ${submittedData.firstName} ${submittedData.lastName}\nEmail: ${submittedData.email}\nPhone: ${submittedData.phone || 'N/A'}\nCompany: ${submittedData.company || 'N/A'}\nService: ${submittedData.service || 'N/A'}\nBudget: ${submittedData.budget || 'N/A'}\nMessage: ${submittedData.message || 'N/A'}`
                        )}` : 'https://wa.me/27833270056'}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn--primary"
                        style={{ padding: '10px 18px', fontSize: '0.85rem' }}
                      >
                        <span>Chat on WhatsApp</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => { setSubmitted(false); setSubmittedData(null); }}
                        className="btn btn--secondary"
                        style={{ padding: '10px 18px', fontSize: '0.85rem' }}
                      >
                        <span>Send Another Enquiry</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <input type="hidden" name="botcheck" style={{ display: 'none' }} />
                    {error && (
                      <div className={styles.errorMsg}>
                        <strong>Notice:</strong> {error}
                      </div>
                    )}
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input id="firstName" name="firstName" type="text" placeholder="John" required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input id="lastName" name="lastName" type="text" placeholder="Smith" required />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input id="email" name="email" type="email" placeholder="john@company.co.za" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input id="phone" name="phone" type="tel" placeholder="+27 83 327 0056" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="company">Company Name</label>
                      <input id="company" name="company" type="text" placeholder="Your Business Name" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="service">Service of Interest</label>
                      <select id="service" name="service" defaultValue="">
                        <option value="" disabled>Select a service</option>
                        <option value="Workflow Automation">Workflow Automation</option>
                        <option value="CRM Setup & Training">CRM Setup & Training</option>
                        <option value="Business Website Development">Business Website Development</option>
                        <option value="WhatsApp Business Automation">WhatsApp Business Automation</option>
                        <option value="Lead Generation & Outreach">Lead Generation & Outreach</option>
                        <option value="Digital Marketing & Content">Digital Marketing & Content</option>
                        <option value="SEO & Local Search">SEO & Local Search</option>
                        <option value="Business Development Strategy">Business Development Strategy</option>
                        <option value="Tender Readiness & Compliance">Tender Readiness & Compliance</option>
                        <option value="Commercial Setup Guidance (CIPC, SARS, B-BBEE)">Commercial Setup Guidance (CIPC, SARS, B-BBEE)</option>
                        <option value="Multiple Services">Multiple Services</option>
                        <option value="Not Sure Yet">Not Sure Yet</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="message">Tell Us About Your Business</label>
                      <textarea id="message" name="message" placeholder="Briefly describe your business, your main challenge, and what you're hoping to achieve..." required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="budget">Approximate Monthly Budget</label>
                      <select id="budget" name="budget" defaultValue="">
                        <option value="" disabled>Select a range</option>
                        <option value="Under R5,000/month">Under R5,000/month</option>
                        <option value="R5,000 – R15,000/month">R5,000 – R15,000/month</option>
                        <option value="R15,000 – R30,000/month">R15,000 – R30,000/month</option>
                        <option value="R30,000 – R60,000/month">R30,000 – R60,000/month</option>
                        <option value="R60,000+/month">R60,000+/month</option>
                      </select>
                    </div>
                    <div className={styles.formFooter}>
                      <p className={styles.formNote}>We respond within 1 business day. All information is kept strictly confidential.</p>
                      <button type="submit" className="btn btn--primary" disabled={loading}>
                        <span>{loading ? 'Sending...' : 'Send Enquiry'}</span>
                        {!loading && (
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path d="M3 9h12M9 3l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <ScrollReveal className="section-header section-header--center">
            <p className="section-label">FAQs</p>
            <h2 className="section-title">Questions We Often <em>Hear</em></h2>
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <div className={styles.faqList}>
              {faqs.map(({ q, a }) => <FAQ key={q} q={q} a={a} />)}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
