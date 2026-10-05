import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import GrowthAudit from '../components/GrowthAudit'

export default function Audit() {
  return (
    <>
      <SEO
        title="Free AI Growth & Automation Audit | Diamaco Growth"
        description="Run an instant 2-minute diagnostic on your South African business. Identify operational bottlenecks, calculate wasted admin hours and lost revenue, and get an automated growth roadmap."
        keywords="ai business audit south africa, automation audit, business growth diagnostic, workflow automation roi calculator, crm audit south africa, sme automation"
        canonical="https://www.diamacogrowth.co.za/audit"
      />
      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="page-hero__bg" />
        <div className="container">
          <div className="page-hero__content">
            <div className="breadcrumb">
              <Link to="/">Home</Link>
              <span className="breadcrumb__sep">/</span>
              <span>AI Growth Audit</span>
            </div>
            <p className="section-label">Interactive Diagnostic</p>
            <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem,5vw,4.5rem)', maxWidth: 750 }}>
              Discover Your Business<br /><em>Automation Potential</em>
            </h1>
            <p className="section-subtitle" style={{ marginTop: 20 }}>
              Answer 5 quick questions about your daily operations. Our diagnostic engine calculates your wasted admin hours, projected financial leaks, and generates a tailored automation blueprint for your business.
            </p>
          </div>
        </div>
      </section>

      {/* AUDIT ENGINE */}
      <GrowthAudit />
    </>
  )
}
