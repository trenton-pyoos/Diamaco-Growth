import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal'
import styles from './Services.module.css'

const services = [
  {
    num:'01', category:'Automation', title:'Workflow Automation',
    desc:"Stop doing manually what machines can do better. We analyse your business processes, identify bottlenecks, and build automated workflows that run 24/7 — saving you time, reducing errors, and freeing your team for high-value work.",
    features:['Process mapping and bottleneck identification','Zapier, Make, and n8n automation builds','Email, invoice, and reporting automation','Onboarding and follow-up workflow systems','Ongoing monitoring and optimisation'],
    icon:<svg viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1"/></svg>
  },
  {
    num:'02', category:'Customer Relations', title:'CRM Setup & Training',
    desc:'Your customer data is one of your most powerful assets — but only if it\'s organised and actionable. We implement and configure the right CRM for your business and train your team to use it effectively from day one.',
    features:['CRM selection and setup (HubSpot, Zoho, Pipedrive)','Sales pipeline design and configuration','Team training and adoption support','Contact and lead import and organisation','Reporting dashboards and KPI setup'],
    icon:<svg viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/></svg>
  },
  {
    num:'03', category:'Digital Presence', title:'Business Website Development',
    desc:'Your website is your most powerful salesperson — working around the clock, seven days a week. We design and build professional, fast, conversion-optimised websites that generate enquiries and build trust.',
    features:['Custom design aligned with your brand identity','Mobile-first, fast-loading development','SEO-ready structure and on-page optimisation','Contact forms, booking systems, and chatbots','Hosting setup and domain configuration'],
    icon:<svg viewBox="0 0 24 24" fill="none"><rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1"/><path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/></svg>
  },
  {
    num:'04', category:'Messaging', title:'WhatsApp Business Automation',
    desc:'South Africans live on WhatsApp. We set up intelligent automated flows that greet leads, qualify prospects, answer FAQs, send quotes, and follow up — entirely automatically.',
    features:['WhatsApp Business API setup and integration','Automated welcome and qualification flows','FAQ and catalogue broadcasting','CRM integration for lead tracking','Campaign and re-engagement broadcasts'],
    icon:<svg viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/></svg>
  },
  {
    num:'05', category:'Sales Growth', title:'Lead Generation & Outreach',
    desc:'A business without a steady stream of leads is a business at risk. We build and run targeted outreach campaigns that identify, attract, and qualify your ideal clients.',
    features:['Ideal client profile (ICP) development','Email and LinkedIn outreach campaigns','Lead magnet design and landing page creation','Follow-up sequences and nurture campaigns','Lead qualification and handoff to sales'],
    icon:<svg viewBox="0 0 24 24" fill="none"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/></svg>
  },
  {
    num:'06', category:'Marketing', title:'Digital Marketing & Content',
    desc:'Brand visibility isn\'t optional in a digital-first world. We create and execute strategies that build your audience, establish your authority, and convert followers into paying clients.',
    features:['Social media strategy and management','Content creation: graphics, video, and copywriting','Paid advertising (Meta Ads, Google Ads)','Email marketing and newsletter campaigns','Performance reporting and strategy adjustment'],
    icon:<svg viewBox="0 0 24 24" fill="none"><path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/></svg>
  },
  {
    num:'07', category:'Visibility', title:'SEO & Local Search',
    desc:'When potential clients search for what you offer, you need to appear first. We implement SEO strategies that improve your rankings, drive qualified traffic, and build long-term organic visibility.',
    features:['Keyword research and competitive analysis','On-page SEO optimisation','Google Business Profile setup and optimisation','Local citation building and review strategy','Monthly SEO reporting and content guidance'],
    icon:<svg viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1"/><path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/></svg>
  },
  {
    num:'08', category:'Strategy', title:'Business Development Strategy',
    desc:'Growth without direction is just movement. We work with you to define where your business should be in 12, 24, and 36 months — and map a clear, actionable path to get there.',
    features:['Business and market analysis','Revenue diversification planning','Partnership and channel development','Quarterly strategic review sessions','Competitive positioning and pricing strategy'],
    icon:<svg viewBox="0 0 24 24" fill="none"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="1"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1"/></svg>
  },
  {
    num:'09', category:'Government & Corporate', title:'Tender Readiness & Compliance',
    desc:'Government and corporate contracts represent some of the most lucrative opportunities available to South African businesses. We guide you through the preparation process so you enter every tender organised, informed, and competitive.',
    features:['Tender opportunity identification and research','Compliance checklist guidance and document organisation','Proposal structure, writing, and review support','Guidance on CSD registration and portal navigation','Briefing on what evaluators look for and how scoring works'],
    icon:<svg viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="1"/><polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="1"/></svg>
  },
  {
    num:'10', category:'Foundation', title:'Commercial Setup Guidance (CIPC · SARS · B-BBEE)',
    desc:'Getting your business legally and commercially structured from the start sets the foundation for everything that follows. We guide you step-by-step through the registration and compliance processes — so nothing gets missed and you know exactly where to go.',
    features:['CIPC company registration guidance (Pty Ltd, NPC, CC)','SARS registration process walkthrough and referral support','B-BBEE level advisory and verification agency referrals','Business banking account setup guidance','Compliance roadmap so you always know what\'s due and when'],
    icon:<svg viewBox="0 0 24 24" fill="none"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="1"/><polyline points="9 22 9 12 15 12 15 22" stroke="currentColor" strokeWidth="1"/></svg>
  },
]

const marqueeItems = ['Workflow Automation','CRM Setup & Training','Website Development','WhatsApp Business Automation','Lead Generation & Outreach','Digital Marketing & Content','SEO & Local Search','Business Development Strategy','Tender Readiness','Commercial Setup Guidance']

export default function Services() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero__bg" />
        <div className="container">
          <div className="page-hero__content">
            <div className="breadcrumb">
              <Link to="/">Home</Link>
              <span className="breadcrumb__sep">/</span>
              <span>Services</span>
            </div>
            <p className="section-label">What We Offer</p>
            <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem,5vw,4.5rem)', maxWidth: 700 }}>
              Ten Services.<br />One <em>Growth Partner</em>.
            </h1>
            <p className="section-subtitle" style={{ marginTop: 20 }}>
              From your first CIPC registration to automated lead generation — every service is designed to compound and work together for exponential business growth.
            </p>
          </div>
        </div>
      </section>

      <div className="marquee-track">
        <div className="marquee-inner">
          {[...marqueeItems,...marqueeItems].map((item,i) => (
            <div key={i} className="marquee-item">{item}<span className="marquee-dot"/></div>
          ))}
        </div>
      </div>

      <section className="section">
        <div className="container">
          {services.map(({ num, category, title, desc, features, icon }, i) => (
            <ScrollReveal key={num}>
              <div className={`${styles.serviceDetail} ${i % 2 !== 0 ? styles.reverse : ''}`}>
                <div className={styles.visual}>
                  <div className={styles.visualBg} />
                  <div className={styles.visualIcon}>{icon}</div>
                </div>
                <div className={styles.meta}>
                  <div className={styles.detailNum}>{num}</div>
                  <p className="section-label">{category}</p>
                  <h2 className={styles.detailTitle}>{title}</h2>
                  <p className={styles.detailDesc}>{desc}</p>
                  <ul className={styles.features}>
                    {features.map(f => (
                      <li key={f} className={styles.feature}>
                        <span className={styles.featureDot} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <div className="cta-banner">
        <div className="container">
          <div className="cta-banner__inner">
            <div>
              <h2 className="cta-banner__title">Not Sure Which Services You Need?</h2>
              <p className="cta-banner__sub">Book a free strategy session and we'll map out the exact path to growth for your business.</p>
            </div>
            <Link to="/contact" className="btn--white">Free Consultation</Link>
          </div>
        </div>
      </div>
    </>
  )
}
