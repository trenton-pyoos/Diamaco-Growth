import { useState, useEffect, useRef } from 'react'
import ScrollReveal from './ScrollReveal'
import styles from './GrowthAudit.module.css'

const INDUSTRIES = [
  { id: 'professional', label: 'Professional & Advisory', icon: '💼', desc: 'Accounting, Legal, Consulting, Finance' },
  { id: 'logistics', label: 'Logistics & Fleet', icon: '🚚', desc: 'Transport, Courier, Supply Chain, Warehousing' },
  { id: 'construction', label: 'Construction & Mining', icon: '🏗️', desc: 'Contractors, Engineering, Industrial Supply' },
  { id: 'retail', label: 'Retail & E-Commerce', icon: '🛍️', desc: 'Wholesale, B2C/B2B Storefronts, Merchandising' },
  { id: 'healthcare', label: 'Healthcare & Wellness', icon: '🏥', desc: 'Medical Practices, Clinics, Allied Health' },
  { id: 'agency', label: 'Creative & Tech Agency', icon: '⚡', desc: 'Marketing, Software, Design, Media' },
  { id: 'manufacturing', label: 'Manufacturing & Industrial', icon: '🏭', desc: 'Production, Fabricators, Heavy Machinery' },
  { id: 'other', label: 'Other Growing SME', icon: '🏢', desc: 'Commercial Services & Emerging Ventures' },
]

const TEAM_SIZES = [
  { id: 'solo', label: '1 (Solo Founder)', scale: 0.5 },
  { id: '2-5', label: '2 – 5 Staff', scale: 1 },
  { id: '6-15', label: '6 – 15 Staff', scale: 1.8 },
  { id: '16-50', label: '16 – 50 Staff', scale: 3.2 },
  { id: '50+', label: '50+ Enterprise', scale: 5 },
]

const REVENUE_TIERS = [
  { id: 'sub-100k', label: 'Under R100k / mo', mid: 50000 },
  { id: '100k-350k', label: 'R100k – R350k / mo', mid: 225000 },
  { id: '350k-1m', label: 'R350k – R1M / mo', mid: 650000 },
  { id: '1m-3m', label: 'R1M – R3M / mo', mid: 2000000 },
  { id: '3m+', label: 'R3M+ / mo', mid: 4000000 },
]

const BOTTLENECKS = [
  {
    id: 'whatsapp_delay',
    label: 'Slow WhatsApp response times',
    desc: 'Inbound inquiries sit unanswered for hours; prospective clients buy from faster competitors.',
    icon: '💬',
    serviceKey: 'whatsapp',
    hoursLow: 3, hoursHigh: 5, revLow: 0.01, revHigh: 0.02,
  },
  {
    id: 'manual_admin',
    label: 'Manual quotes, invoicing & chasing payments',
    desc: 'Repetitive paperwork, PDF generation, and manual follow-ups drain hours every week.',
    icon: '⏳',
    serviceKey: 'automation',
    hoursLow: 5, hoursHigh: 8, revLow: 0, revHigh: 0,
  },
  {
    id: 'lost_leads',
    label: 'No CRM / Leads falling through the cracks',
    desc: 'Inquiries are scattered across emails, personal phones, and spreadsheets with zero tracking.',
    icon: '📉',
    serviceKey: 'crm',
    hoursLow: 2, hoursHigh: 4, revLow: 0.02, revHigh: 0.03,
  },
  {
    id: 'weak_website',
    label: 'Website is outdated or doesn’t convert visitors',
    desc: 'The site looks basic, doesn’t build enterprise trust, or fails to generate qualified inquiries.',
    icon: '🌐',
    serviceKey: 'website',
    hoursLow: 1, hoursHigh: 2, revLow: 0.01, revHigh: 0.02,
  },
  {
    id: 'tender_compliance',
    label: 'Tender & compliance hurdles (CSD, Tax, B-BBEE)',
    desc: 'Missing corporate or government RFP deadlines due to unorganised compliance paperwork.',
    icon: '📋',
    serviceKey: 'tender',
    hoursLow: 3, hoursHigh: 5, revLow: 0, revHigh: 0,
  },
  {
    id: 'no_outreach',
    label: 'No predictable outbound pipeline',
    desc: 'Relying purely on sporadic word-of-mouth without consistent client acquisition systems.',
    icon: '🎯',
    serviceKey: 'leadgen',
    hoursLow: 4, hoursHigh: 6, revLow: 0.02, revHigh: 0.04,
  },
]

const STACKS = [
  { id: 'sheets', label: 'Manual & Spreadsheets', desc: 'Excel, Google Sheets, personal WhatsApp, paper notes', manualFactor: 1 },
  { id: 'basic', label: 'Basic Disconnected Tools', desc: 'Accounting package (Sage/Xero) + standard email', manualFactor: 0.85 },
  { id: 'partial', label: 'Partial Software Stack', desc: 'Have a basic CRM or form tool, but nothing talks together', manualFactor: 0.7 },
  { id: 'scaling', label: 'Exploring Modern Automation', desc: 'Ready to build automated Zapier/Make/n8n pipelines', manualFactor: 0.55 },
]

const SERVICE_SOLUTIONS = {
  whatsapp: {
    serviceNum: '04',
    serviceName: 'WhatsApp Business Automation',
    headline: 'Deploy a 24/7 Intelligent WhatsApp Concierge',
    action: 'Automate instant qualification, interactive service menus, and CRM syncing so hot leads get replies within 3 seconds, day or night.',
  },
  automation: {
    serviceNum: '01',
    serviceName: 'Workflow Automation (Make / n8n / Zapier)',
    headline: 'End Repetitive Paperwork & Manual Admin',
    action: 'Connect your invoicing, contract generation, and client notifications into self-driving workflows that run error-free in the background.',
  },
  crm: {
    serviceNum: '02',
    serviceName: 'CRM Setup & Sales Pipeline Training',
    headline: 'Centralise Every Deal in a High-Velocity Pipeline',
    action: 'Implement HubSpot, Zoho, or Pipedrive with structured stages, automated reminders, and mobile tracking so no deal is ever dropped.',
  },
  website: {
    serviceNum: '03',
    serviceName: 'High-Conversion Web Architecture',
    headline: 'Build a 24/7 Authority Machine',
    action: 'Upgrade to a high-speed, SEO-optimised web presence built to convert cold visitors into pre-qualified sales calls.',
  },
  tender: {
    serviceNum: '09',
    serviceName: 'Tender Readiness & Compliance Systems',
    headline: 'Standardise Tender Compliance & Scoring',
    action: 'Organise your CSD, B-BBEE affidavit, tax compliance, and RFP templates into a rapid-response bidding library.',
  },
  leadgen: {
    serviceNum: '05',
    serviceName: 'Targeted B2B Lead Generation & Outreach',
    headline: 'Install a Predictable Outbound Pipeline',
    action: 'Launch targeted email, LinkedIn, and WhatsApp multi-touch outreach campaigns that consistently put decision-makers on your calendar.',
  },
}

// All call bookings (except WhatsApp) are delivered here via Web3Forms.
// The recipient is bound to the Web3Forms access key — create the key for this address.
const BOOKING_EMAIL = 'info@diamacogrowth.co.za'

// ── Estimation model assumptions (indicative South African SME benchmarks) ──
const WEEKS_PER_MONTH = 4.33
const HOURLY_COST_LOW = 200 // R/hr, fully-loaded cost of admin / management time
const HOURLY_COST_HIGH = 250
const REV_RECOVERY_CAP_LOW = 0.04 // max share of monthly revenue recovered from lead fixes
const REV_RECOVERY_CAP_HIGH = 0.07

function roundTo(n, step) {
  return Math.round(n / step) * step
}

// Round ZAR figures to a credible step (never false precision)
function niceRound(n) {
  const step = n < 20000 ? 500 : n < 100000 ? 1000 : n < 1000000 ? 5000 : 25000
  return roundTo(n, step)
}

// Compact ZAR: 18500 -> R18.5k, 1200000 -> R1.2M
function fmtZar(n) {
  if (n >= 1000000) return `R${(n / 1000000).toFixed(2).replace(/\.?0+$/, '')}M`
  if (n >= 1000) return `R${(n / 1000).toFixed(1).replace(/\.0$/, '')}k`
  return `R${n}`
}

// Next 5 business days (Mon–Fri) available for a call
function getBookingDays() {
  const days = []
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  while (days.length < 5) {
    d.setDate(d.getDate() + 1)
    const dow = d.getDay()
    if (dow === 0 || dow === 6) continue
    days.push(d.toLocaleDateString('en-ZA', { weekday: 'short', day: 'numeric', month: 'short' }))
  }
  return days
}

const TIME_SLOTS = [
  { id: 'morning', label: 'Morning', range: '08:00 – 11:00' },
  { id: 'midday', label: 'Midday', range: '11:00 – 14:00' },
  { id: 'afternoon', label: 'Afternoon', range: '14:00 – 17:00' },
]

export default function GrowthAudit() {
  const [step, setStep] = useState(1)
  const [industry, setIndustry] = useState(null)
  const [teamSize, setTeamSize] = useState(null)
  const [revenue, setRevenue] = useState(null)
  const [selectedBottlenecks, setSelectedBottlenecks] = useState([])
  const [stack, setStack] = useState(null)

  // Simulation State
  const [simStep, setSimStep] = useState(0)
  const [isSimulating, setIsSimulating] = useState(false)

  // Lead Capture State
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    whatsapp: '',
    email: '',
  })
  const [submitted, setSubmitted] = useState(false)

  // Booking Gate State — results stay locked until a call is booked
  const [unlocked, setUnlocked] = useState(false)
  const [slotDay, setSlotDay] = useState(null)
  const [slotTime, setSlotTime] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [honeypot, setHoneypot] = useState('')
  const cardRef = useRef(null)

  const [bookingDays] = useState(getBookingDays)

  const auditSectionRef = useRef(null)

  // Handle Bottleneck Multi-select (up to 3)
  const toggleBottleneck = (id) => {
    if (selectedBottlenecks.includes(id)) {
      setSelectedBottlenecks(selectedBottlenecks.filter((item) => item !== id))
    } else {
      if (selectedBottlenecks.length < 3) {
        setSelectedBottlenecks([...selectedBottlenecks, id])
      }
    }
  }

  // Trigger AI Computation Simulation
  const handleStartAnalysis = () => {
    setStep(4)
    setIsSimulating(true)
    setSimStep(0)
  }

  useEffect(() => {
    if (step === 4 && isSimulating) {
      const timers = [
        setTimeout(() => setSimStep(1), 400),
        setTimeout(() => setSimStep(2), 1000),
        setTimeout(() => setSimStep(3), 1600),
        setTimeout(() => setSimStep(4), 2200),
        setTimeout(() => {
          setIsSimulating(false)
          setStep(5)
        }, 2800),
      ]
      return () => timers.forEach(clearTimeout)
    }
  }, [step, isSimulating])

  // Calculation Results
  const teamObj = TEAM_SIZES.find((t) => t.id === teamSize) || TEAM_SIZES[1]
  const revObj = REVENUE_TIERS.find((r) => r.id === revenue) || REVENUE_TIERS[1]

  const chosenBottlenecks = selectedBottlenecks
    .map((id) => BOTTLENECKS.find((item) => item.id === id))
    .filter(Boolean)
  const stackFactor = STACKS.find((s) => s.id === stack)?.manualFactor ?? 0.85
  const sumOf = (key) => chosenBottlenecks.reduce((acc, b) => acc + b[key], 0)

  // Recoverable hours per week (range) — scaled by team size and how manual the current stack is
  const weeklyHoursLow = Math.max(1, Math.round(sumOf('hoursLow') * teamObj.scale * stackFactor))
  const weeklyHoursHigh = Math.max(
    weeklyHoursLow + 1,
    Math.round(sumOf('hoursHigh') * teamObj.scale * stackFactor)
  )
  const monthlyHoursLow = roundTo(weeklyHoursLow * WEEKS_PER_MONTH, 5)
  const monthlyHoursHigh = roundTo(weeklyHoursHigh * WEEKS_PER_MONTH, 5)

  // Estimated monthly value (range) = time value of recovered hours + revenue recovered from lead-flow fixes
  const revenueUpliftLow = Math.min(sumOf('revLow'), REV_RECOVERY_CAP_LOW)
  const revenueUpliftHigh = Math.min(sumOf('revHigh'), REV_RECOVERY_CAP_HIGH)
  const monthlyValueLow = niceRound(
    weeklyHoursLow * WEEKS_PER_MONTH * HOURLY_COST_LOW + revObj.mid * revenueUpliftLow
  )
  const monthlyValueHigh = niceRound(
    weeklyHoursHigh * WEEKS_PER_MONTH * HOURLY_COST_HIGH + revObj.mid * revenueUpliftHigh
  )
  const annualValueLow = niceRound(monthlyValueLow * 12)
  const annualValueHigh = niceRound(monthlyValueHigh * 12)

  const weeklyHoursRange = `${weeklyHoursLow} – ${weeklyHoursHigh}`
  const monthlyHoursRange = `${monthlyHoursLow} – ${monthlyHoursHigh}`
  const monthlyValueRange = `${fmtZar(monthlyValueLow)} – ${fmtZar(monthlyValueHigh)}`
  const annualValueRange = `${fmtZar(annualValueLow)} – ${fmtZar(annualValueHigh)}`

  // ── Dynamic Growth Readiness Score (0 to 100) ──
  // Evaluates tech stack foundation, bottleneck severity, team coordination friction, and revenue scale
  const stackScoreMap = { sheets: -14, basic: -4, partial: 10, scaling: 24 }
  const stackAdjustment = stackScoreMap[stack] ?? 0

  const bottleneckWeights = {
    lost_leads: 8,
    whatsapp_delay: 8,
    no_outreach: 7,
    manual_admin: 6,
    weak_website: 6,
    tender_compliance: 5,
  }
  const bottleneckPenalty = selectedBottlenecks.reduce(
    (sum, bId) => sum + (bottleneckWeights[bId] || 6),
    0
  )

  const teamScoreMap = { solo: 6, '2-5': 2, '6-15': -4, '16-50': -8, '50+': -12 }
  const teamAdjustment = teamScoreMap[teamSize] ?? 0

  const revScoreMap = {
    'sub-100k': -3,
    '100k-350k': 2,
    '350k-1m': 6,
    '1m-3m': 10,
    '3m+': 14,
  }
  const revAdjustment = revScoreMap[revenue] ?? 0

  const rawScore = 52 + stackAdjustment - bottleneckPenalty + teamAdjustment + revAdjustment
  const growthReadinessScore = Math.min(Math.max(rawScore, 22), 92)

  // Primary bottleneck label for personalized contextual copy
  const primaryBottleneckObj = chosenBottlenecks[0]
  const primaryBottleneckName = primaryBottleneckObj ? primaryBottleneckObj.label : 'manual administrative friction'

  // Map chosen bottlenecks to Diamaco Solutions
  const recommendedSolutions = selectedBottlenecks.map((bId) => {
    const b = BOTTLENECKS.find((item) => item.id === bId)
    return SERVICE_SOLUTIONS[b?.serviceKey] || SERVICE_SOLUTIONS.automation
  })

  // Fallback solutions if fewer than 2 selected
  if (recommendedSolutions.length === 0) {
    recommendedSolutions.push(SERVICE_SOLUTIONS.automation, SERVICE_SOLUTIONS.crm, SERVICE_SOLUTIONS.whatsapp)
  } else if (recommendedSolutions.length === 1) {
    recommendedSolutions.push(
      recommendedSolutions[0].serviceNum === '04' ? SERVICE_SOLUTIONS.automation : SERVICE_SOLUTIONS.whatsapp
    )
  }

  const chosenIndustryLabel = INDUSTRIES.find((i) => i.id === industry)?.label || 'Our Business'

  // Dynamic Diagnosis based on score and business profile
  const getAuditDiagnosis = () => {
    if (growthReadinessScore < 40) {
      return {
        tierPill: '🚨 Critical Manual Friction Detected',
        heading: (
          <>
            Your Operations Are Constrained by <em>Severe Manual Drag</em>
          </>
        ),
        text: (
          <>
            Based on your profile in <strong>{chosenIndustryLabel}</strong> with{' '}
            <strong>{teamObj.label}</strong>, disjointed systems and {primaryBottleneckName.toLowerCase()} are causing substantial operational overhead. Recovering an estimated{' '}
            <strong>{weeklyHoursRange} hours per week</strong> through automated workflows is your highest-leverage growth unlock.
          </>
        ),
      }
    } else if (growthReadinessScore < 58) {
      return {
        tierPill: '⚡ High Quick-Win Yield Potential',
        heading: (
          <>
            Your Business Has Significant <em>Uncaptured Capacity</em>
          </>
        ),
        text: (
          <>
            Your business in <strong>{chosenIndustryLabel}</strong> has established commercial traction, but{' '}
            {primaryBottleneckName.toLowerCase()} is capping your team&apos;s delivery speed. By centralising your pipeline and deploying automated triggers, you can eliminate low-value friction within weeks.
          </>
        ),
      }
    } else if (growthReadinessScore < 75) {
      return {
        tierPill: '📈 Scale-Ready Acceleration Stage',
        heading: (
          <>
            Your Systems Are Primed for <em>Compounding Scale</em>
          </>
        ),
        text: (
          <>
            With <strong>{teamObj.label}</strong> active in <strong>{chosenIndustryLabel}</strong>, your business has strong baseline discipline. Connecting your remaining manual steps into automated Make/Zapier pipelines will enable double the output without adding payroll.
          </>
        ),
      }
    } else {
      return {
        tierPill: '🚀 High-Velocity Automation Tier',
        heading: (
          <>
            Your Business Is Ready for <em>Autonomous Operations</em>
          </>
        ),
        text: (
          <>
            Your operational maturity in <strong>{chosenIndustryLabel}</strong> is ahead of industry peers. The next strategic frontier is deploying intelligent multi-touch workflow orchestration and predictive pipeline management to dominate market share.
          </>
        ),
      }
    }
  }

  const diagnosis = getAuditDiagnosis()

  // Pre-filled WhatsApp direct booking link
  const waMessage = encodeURIComponent(
    `Hi Trenton & Diamaco Team! 👋 I just completed the AI Growth & Automation Audit for ${
      formData.company || 'my business'
    } (${chosenIndustryLabel}).\n\n` +
      `📊 Our Results:\n` +
      `• Growth Readiness Score: ${growthReadinessScore}%\n` +
      `• Diagnosis: ${diagnosis.tierPill.replace(/[^\w\s-]/g, '').trim()}\n` +
      `• Potential Hours Saved: approx. ${weeklyHoursRange} hrs/week\n` +
      `• Projected Value: approx. ${monthlyValueRange} per month (${annualValueRange} p.a.)\n` +
      `• Key Bottlenecks: ${selectedBottlenecks.map((id) => BOTTLENECKS.find((b) => b.id === id)?.label).join(', ')}\n\n` +
      `We'd love to discuss our custom implementation blueprint on a free 30-min discovery call.`
  )
  const waUrl = `https://wa.me/27833270056?text=${waMessage}`

  const slotTimeObj = TIME_SLOTS.find((t) => t.id === slotTime)
  const slotSummary = slotDay && slotTimeObj ? `${slotDay}, ${slotTimeObj.label} (${slotTimeObj.range})` : null

  // Pre-unlock WhatsApp booking link — intentionally contains NO audit results
  const waBookUrl = `https://wa.me/27833270056?text=${encodeURIComponent(
    `Hi Trenton & Diamaco Team! 👋 I'd like to book my free strategy call to unlock my AI Growth & Automation Audit results for ${
      formData.company || 'my business'
    } (${chosenIndustryLabel}).` +
      (slotSummary ? `\n\nPreferred slot: ${slotSummary}` : '')
  )}`

  const handleBookingSubmit = async (e) => {
    e.preventDefault()
    if (!slotDay || !slotTime) {
      setSubmitError('Please choose a preferred day and time for your call.')
      return
    }
    setSubmitError(null)

    // Anti-spam honeypot
    if (honeypot) {
      setSubmitted(true)
      setUnlocked(true)
      return
    }

    setSubmitting(true)
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY
    const hasKey = accessKey && accessKey !== 'YOUR_ACCESS_KEY_HERE'

    // Never unlock without delivering the lead in production
    if (!hasKey && import.meta.env.PROD) {
      console.error('Web3Forms: VITE_WEB3FORMS_ACCESS_KEY is not configured — booking not delivered.')
      setSubmitError(
        `Booking is temporarily unavailable. Please WhatsApp us on 083 327 0056 or email ${BOOKING_EMAIL}.`
      )
      setSubmitting(false)
      return
    }

    try {
      if (hasKey) {
        const payload = {
          access_key: accessKey,
          subject: `AI Growth Audit Call Booking - ${formData.name} (${formData.company})`,
          from_name: `${formData.name} via Diamaco AI Growth Audit`,
          replyto: formData.email,
          name: formData.name,
          company: formData.company,
          whatsapp: formData.whatsapp,
          email: formData.email,
          preferred_day: slotDay,
          preferred_time: slotTimeObj ? `${slotTimeObj.label} (${slotTimeObj.range})` : '',
          industry: chosenIndustryLabel,
          team_size: teamObj.label,
          monthly_revenue: revObj.label,
          bottlenecks: selectedBottlenecks
            .map((id) => BOTTLENECKS.find((b) => b.id === id)?.label)
            .join(' | '),
          tech_stack: STACKS.find((s) => s.id === stack)?.label || '',
          growth_readiness_score: `${growthReadinessScore}%`,
          audit_tier: diagnosis.tierPill,
          recoverable_hours_per_week: weeklyHoursRange,
          projected_value_per_month_zar: monthlyValueRange,
          projected_value_per_annum_zar: annualValueRange,
        }
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        })
        const result = await response.json()
        if (!result.success) {
          setSubmitError(
            result.message ||
              `Unable to book your call. Please try again, WhatsApp us or email ${BOOKING_EMAIL}.`
          )
          return
        }
      } else {
        console.warn('Web3Forms: VITE_WEB3FORMS_ACCESS_KEY is not configured yet.')
      }
      setSubmitted(true)
      setUnlocked(true)
    } catch (err) {
      console.error('Booking submission error:', err)
      setSubmitError(
        `A network error occurred. Please try again, WhatsApp us on 083 327 0056 or email ${BOOKING_EMAIL}.`
      )
    } finally {
      setSubmitting(false)
    }
  }

  // Bring the card back into view when results unlock
  useEffect(() => {
    if (unlocked && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [unlocked])

  const resetAudit = () => {
    setStep(1)
    setIndustry(null)
    setTeamSize(null)
    setRevenue(null)
    setSelectedBottlenecks([])
    setStack(null)
    if (auditSectionRef.current) {
      auditSectionRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="growth-audit" ref={auditSectionRef} className={styles.auditSection}>
      <div className={styles.radialGlow} />
      <div className={styles.gridOverlay} />

      <div className="container">
        {/* Section Header */}
        <ScrollReveal className="section-header section-header--center">
          <div className={styles.liveBadge}>
            <span className={styles.liveDot} />
            <span>Interactive Diagnostic Engine</span>
          </div>
          <h2 className="section-title">
            AI Business Growth &<br />
            <em>Automation Audit</em>
          </h2>
          <p className="section-subtitle">
            Diagnose operational friction, calculate recoverable team hours, and unlock a custom-tailored
            automation roadmap with a free strategy call.
          </p>
        </ScrollReveal>

        {/* Audit Tool Card */}
        <div className={styles.auditCard} ref={cardRef}>
          {/* Top Progress Bar */}
          <div className={styles.stepperHeader}>
            <div className={styles.stepInfo}>
              <span className={styles.stepCount}>
                {step < 4 ? `Step 0${step} of 03` : step === 4 ? 'Processing' : unlocked ? 'Executive Blueprint' : 'Final Step · Blueprint Ready'}
              </span>
              <span className={styles.stepTitle}>
                {step === 1 && 'Company Profile & Sector'}
                {step === 2 && 'Operational Bottlenecks (Pick up to 3)'}
                {step === 3 && 'Current Systems & Stack'}
                {step === 4 && 'AI Synthesis in Progress...'}
                {step === 5 && (unlocked ? 'Your Custom Growth & Automation Matrix' : 'Book Your Strategy Call to Unlock Results')}
              </span>
            </div>
            <div className={styles.progressTrack}>
              <div
                className={styles.progressBar}
                style={{
                  width: `${step === 1 ? 25 : step === 2 ? 50 : step === 3 ? 75 : step === 4 ? 90 : unlocked ? 100 : 94}%`,
                }}
              />
            </div>
          </div>

          {/* STEP 1: Profile & Industry */}
          {step === 1 && (
            <div className={styles.stepBody}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  <span className={styles.labelNum}>1.1</span> Which industry best describes your business?
                </label>
                <div className={styles.industryGrid}>
                  {INDUSTRIES.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setIndustry(item.id)}
                      className={`${styles.selectCard} ${industry === item.id ? styles.activeCard : ''}`}
                    >
                      <div className={styles.cardIcon}>{item.icon}</div>
                      <div className={styles.cardContent}>
                        <span className={styles.cardTitle}>{item.label}</span>
                        <span className={styles.cardDesc}>{item.desc}</span>
                      </div>
                      <div className={styles.radioDot} />
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.splitRow}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>
                    <span className={styles.labelNum}>1.2</span> Team Size
                  </label>
                  <div className={styles.pillGroup}>
                    {TEAM_SIZES.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setTeamSize(item.id)}
                        className={`${styles.pillBtn} ${teamSize === item.id ? styles.activePill : ''}`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>
                    <span className={styles.labelNum}>1.3</span> Estimated Monthly Revenue
                  </label>
                  <div className={styles.pillGroup}>
                    {REVENUE_TIERS.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setRevenue(item.id)}
                        className={`${styles.pillBtn} ${revenue === item.id ? styles.activePill : ''}`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className={styles.footerNav}>
                <span className={styles.hint}>
                  {!industry || !teamSize || !revenue
                    ? 'Please select your industry, team size, and revenue tier to proceed'
                    : 'Profile complete. Ready to diagnose bottlenecks.'}
                </span>
                <button
                  type="button"
                  disabled={!industry || !teamSize || !revenue}
                  onClick={() => setStep(2)}
                  className={`btn btn--primary ${styles.nextBtn}`}
                >
                  <span>Continue to Step 2</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Bottlenecks */}
          {step === 2 && (
            <div className={styles.stepBody}>
              <div className={styles.stepPrompt}>
                <h3 className={styles.promptHeading}>Where is friction slowing down your growth?</h3>
                <p className={styles.promptSub}>
                  Select 1 to 3 areas where manual labour, unresponsiveness, or operational leaks occur most.
                </p>
              </div>

              <div className={styles.bottlenecksGrid}>
                {BOTTLENECKS.map((b) => {
                  const isSelected = selectedBottlenecks.includes(b.id)
                  const isMax = selectedBottlenecks.length >= 3 && !isSelected
                  return (
                    <button
                      key={b.id}
                      type="button"
                      disabled={isMax}
                      onClick={() => toggleBottleneck(b.id)}
                      className={`${styles.bottleneckCard} ${isSelected ? styles.activeBottleneck : ''} ${
                        isMax ? styles.disabledCard : ''
                      }`}
                    >
                      <div className={styles.bCardTop}>
                        <span className={styles.bIcon}>{b.icon}</span>
                        <span className={`${styles.checkCircle} ${isSelected ? styles.checked : ''}`}>
                          {isSelected && '✓'}
                        </span>
                      </div>
                      <h4 className={styles.bTitle}>{b.label}</h4>
                      <p className={styles.bDesc}>{b.desc}</p>
                    </button>
                  )
                })}
              </div>

              <div className={styles.footerNav}>
                <button type="button" onClick={() => setStep(1)} className="btn btn--ghost">
                  <span>← Back</span>
                </button>
                <div className={styles.navRight}>
                  <span className={styles.counterBadge}>
                    {selectedBottlenecks.length} of 3 selected
                  </span>
                  <button
                    type="button"
                    disabled={selectedBottlenecks.length === 0}
                    onClick={() => setStep(3)}
                    className="btn btn--primary"
                  >
                    <span>Proceed to Tech Stack</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M3 8h10M9 4l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Tech Stack */}
          {step === 3 && (
            <div className={styles.stepBody}>
              <div className={styles.stepPrompt}>
                <h3 className={styles.promptHeading}>What powers your operational workflow today?</h3>
                <p className={styles.promptSub}>
                  This helps our engine calculate integration feasibility and quick-win automation paths.
                </p>
              </div>

              <div className={styles.stackGrid}>
                {STACKS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setStack(item.id)}
                    className={`${styles.stackCard} ${stack === item.id ? styles.activeStack : ''}`}
                  >
                    <div className={styles.radioDot} />
                    <div className={styles.stackContent}>
                      <span className={styles.stackTitle}>{item.label}</span>
                      <span className={styles.stackDesc}>{item.desc}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className={styles.footerNav}>
                <button type="button" onClick={() => setStep(2)} className="btn btn--ghost">
                  <span>← Back</span>
                </button>
                <button
                  type="button"
                  disabled={!stack}
                  onClick={handleStartAnalysis}
                  className="btn btn--primary"
                >
                  <span>Generate AI Growth Blueprint</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M8 2v12M2 8l6 6 6-6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: AI Computation Simulation */}
          {step === 4 && (
            <div className={styles.simulationContainer}>
              <div className={styles.scannerRing}>
                <div className={styles.pulseInner} />
                <div className={styles.pulseGlow} />
                <span className={styles.simPercent}>{simStep * 25}%</span>
              </div>

              <h3 className={styles.simTitle}>Synthesizing Growth & Automation Architecture...</h3>

              <div className={styles.simLogs}>
                <div className={`${styles.logLine} ${simStep >= 0 ? styles.logActive : ''}`}>
                  <span className={styles.logTag}>[DATA INGEST]</span> Mapping SME operational parameters for{' '}
                  <span className={styles.highlight}>{chosenIndustryLabel}</span>
                </div>
                <div className={`${styles.logLine} ${simStep >= 1 ? styles.logActive : ''}`}>
                  <span className={styles.logTag}>[BOTTLENECK]</span> Quantifying weekly friction overhead across{' '}
                  <span className={styles.highlight}>{selectedBottlenecks.length} chosen choke-points</span>
                </div>
                <div className={`${styles.logLine} ${simStep >= 2 ? styles.logActive : ''}`}>
                  <span className={styles.logTag}>[ESTIMATION]</span> Benchmarking recoverable hours & ZAR revenue leakage
                </div>
                <div className={`${styles.logLine} ${simStep >= 3 ? styles.logActive : ''}`}>
                  <span className={styles.logTag}>[DIAMACO MATCH]</span> Routing priority solutions to Services #01, #02, #04 & #05
                </div>
                <div className={`${styles.logLine} ${simStep >= 4 ? styles.logActive : ''}`}>
                  <span className={styles.logTag}>[COMPLETE]</span> Generating executive roadmap...
                </div>
              </div>
            </div>
          )}

          {/* STEP 5a: LOCKED — book a strategy call to unlock the blueprint */}
          {step === 5 && !unlocked && (
            <div className={styles.gateContainer}>
              {/* Obscured preview — placeholders only, no real values rendered */}
              <div className={styles.gatePreview} aria-hidden="true">
                <div className={styles.gateLockBadge}>🔒 Locked</div>
                <div className={styles.gatePreviewHeader}>
                  <div className={styles.gateGauge}>
                    <span className={styles.gateGaugeNum}>??%</span>
                    <span className={styles.scoreSub}>Your Score</span>
                  </div>
                  <div>
                    <div className={styles.tierPill}>Blueprint Generated</div>
                    <p className={styles.gatePreviewText}>
                      Your readiness score, recoverable hours and projected ZAR value have been calculated.
                    </p>
                  </div>
                </div>
                <div className={styles.gateMetrics}>
                  {[
                    { icon: '⏱️', label: 'Recoverable Time', val: '•• – •• hrs / week' },
                    { icon: '💰', label: 'Projected Value', val: 'R•• – R•• / month' },
                    { icon: '⚡', label: 'Deployment', val: '• – • weeks' },
                  ].map((m) => (
                    <div key={m.label} className={styles.gateMetric}>
                      <span className={styles.metricLabel}>{m.icon} {m.label}</span>
                      <span className={styles.gateBlurValue}>{m.val}</span>
                    </div>
                  ))}
                </div>
                <div className={styles.gateSolutions}>
                  {recommendedSolutions.map((_, idx) => (
                    <div key={idx} className={styles.gateSolutionRow}>
                      <span className={styles.solBadge}>Tier 0{idx + 1} · Service #••</span>
                      <span className={styles.gateBar} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Booking form */}
              <form onSubmit={handleBookingSubmit} className={styles.gateForm}>
                <div className={styles.convBadge}>Your Blueprint Is Ready</div>
                <h3 className={styles.gateTitle}>Book a Free Strategy Call to Unlock Your Results</h3>
                <p className={styles.gateSub}>
                  Pick a time that suits you. We unlock your full blueprint the moment you book — then walk you
                  through it live. 30 minutes, no obligation.
                </p>
                <ul className={styles.gateList}>
                  <li>Your Growth Readiness Score &amp; ZAR value</li>
                  <li>Service-by-service automation roadmap</li>
                  <li>Live walkthrough with a Diamaco strategist</li>
                </ul>

                <span className={styles.gateFieldLabel}>1. Preferred day</span>
                <div className={styles.pillGroup}>
                  {bookingDays.map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => setSlotDay(day)}
                      className={`${styles.pillBtn} ${slotDay === day ? styles.activePill : ''}`}
                    >
                      {day}
                    </button>
                  ))}
                </div>

                <span className={styles.gateFieldLabel}>2. Preferred time (SAST)</span>
                <div className={styles.pillGroup}>
                  {TIME_SLOTS.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setSlotTime(t.id)}
                      className={`${styles.pillBtn} ${slotTime === t.id ? styles.activePill : ''}`}
                    >
                      {t.label} · {t.range}
                    </button>
                  ))}
                </div>

                <span className={styles.gateFieldLabel}>3. Your details</span>
                <div className={styles.formGrid}>
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={styles.textInput}
                  />
                  <input
                    type="text"
                    required
                    placeholder="Company Name"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className={styles.textInput}
                  />
                  <input
                    type="tel"
                    required
                    placeholder="WhatsApp Number (+27...)"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className={styles.textInput}
                  />
                  <input
                    type="email"
                    required
                    placeholder="Business Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={styles.textInput}
                  />
                </div>

                {/* Honeypot */}
                <input
                  type="text"
                  name="botcheck"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  className={styles.honeypot}
                  aria-hidden="true"
                />

                {submitError && <p className={styles.formError}>{submitError}</p>}

                <button
                  type="submit"
                  disabled={submitting}
                  className={`btn btn--primary ${styles.submitBtn}`}
                >
                  <span>{submitting ? 'Booking your call…' : 'Book My Call & Unlock Results'}</span>
                </button>

                <a
                  href={waBookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setUnlocked(true)}
                  className={styles.gateAltLink}
                >
                  Prefer WhatsApp? Book directly with Trenton →
                </a>
                <p className={styles.formDisclaimer}>
                  🔒 Zero spam. Your details are only used to arrange your call.
                </p>
              </form>
            </div>
          )}

          {/* STEP 5b: UNLOCKED — Executive Results & Tailored Roadmap */}
          {step === 5 && unlocked && (
            <div className={styles.resultsContainer}>
              <div className={styles.unlockBanner}>
                <span className={styles.unlockIcon}>✓</span>
                <p>
                  {submitted ? (
                    <>
                      <strong>Call requested{slotSummary ? ` · ${slotSummary}` : ''}.</strong> Trenton will confirm
                      your slot on WhatsApp shortly. Your full blueprint is unlocked below.
                    </>
                  ) : (
                    <>
                      <strong>Blueprint unlocked.</strong> Finish booking your slot in the WhatsApp chat with
                      Trenton to lock in your call.
                    </>
                  )}
                </p>
              </div>

              {/* Executive Summary Header */}
              <div className={styles.resultsHeader}>
                <div className={styles.scoreGauge}>
                  <div className={styles.scoreCircle}>
                    <svg viewBox="0 0 100 100" className={styles.gaugeSvg}>
                      <circle cx="50" cy="50" r="42" className={styles.gaugeBg} />
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        className={styles.gaugeFill}
                        style={{
                          strokeDashoffset: 264 - (264 * growthReadinessScore) / 100,
                        }}
                      />
                    </svg>
                    <div className={styles.scoreNumberBox}>
                      <span className={styles.scoreNum}>{growthReadinessScore}%</span>
                      <span className={styles.scoreSub}>Readiness</span>
                    </div>
                  </div>
                </div>

                <div className={styles.headerDetails}>
                  <div className={styles.tierPill}>
                    {diagnosis.tierPill}
                  </div>
                  <h3 className={styles.resultsHeading}>
                    {diagnosis.heading}
                  </h3>
                  <p className={styles.resultsText}>
                    {diagnosis.text}
                  </p>
                </div>
              </div>

              {/* 3 Key Impact Metric Cards */}
              <div className={styles.metricsGrid}>
                <div className={styles.metricCard}>
                  <div className={styles.metricHeader}>
                    <span className={styles.metricIcon}>⏱️</span>
                    <span className={styles.metricLabel}>Recoverable Time</span>
                  </div>
                  <div className={`${styles.metricValue} ${styles.metricValueRange}`}>
                    {weeklyHoursRange} <span className={styles.metricUnit}>hrs / week</span>
                  </div>
                  <div className={styles.metricSub}>≈ {monthlyHoursRange} hours per month</div>
                  <div className={styles.metricDesc}>
                    Estimated time freed from manual quoting, invoicing, follow-ups and repetitive admin.
                  </div>
                </div>

                <div className={styles.metricCard}>
                  <div className={styles.metricHeader}>
                    <span className={styles.metricIcon}>💰</span>
                    <span className={styles.metricLabel}>Projected Value</span>
                  </div>
                  <div className={`${styles.metricValue} ${styles.metricValueRange}`}>
                    {monthlyValueRange} <span className={styles.metricUnit}>per month</span>
                  </div>
                  <div className={styles.metricSub}>≈ {annualValueRange} per annum (p.a.)</div>
                  <div className={styles.metricDesc}>
                    Value of recovered team time plus revenue protected from slow or lost lead follow-up.
                  </div>
                </div>

                <div className={styles.metricCard}>
                  <div className={styles.metricHeader}>
                    <span className={styles.metricIcon}>⚡</span>
                    <span className={styles.metricLabel}>Deployment Speed</span>
                  </div>
                  <div className={`${styles.metricValue} ${styles.metricValueRange}`}>
                    2 – 4 <span className={styles.metricUnit}>weeks</span>
                  </div>
                  <div className={styles.metricSub}>to your first live workflow</div>
                  <div className={styles.metricDesc}>
                    From project kick-off. Larger builds are delivered in phases so value starts early.
                  </div>
                </div>
              </div>

              <p className={styles.estimateNote}>
                <strong>How we estimate this:</strong> indicative figures — not a guarantee — based on typical
                South African SME benchmarks. Recovered time is valued at R{HOURLY_COST_LOW}–R{HOURLY_COST_HIGH} per
                hour (fully-loaded cost), and lead-related fixes are assumed to recover an estimated{' '}
                1–{Math.round(REV_RECOVERY_CAP_HIGH * 100)}% of monthly revenue. Your strategy call refines
                these using your real numbers.
              </p>

              {/* Tailored Solution Architecture */}
              <div className={styles.solutionsSection}>
                <div className={styles.solutionsHeader}>
                  <p className="section-label">Tailored Implementation Blueprint</p>
                  <h4 className={styles.solutionsTitle}>
                    Recommended Diamaco Systems for Your Business
                  </h4>
                </div>

                <div className={styles.solutionsList}>
                  {recommendedSolutions.map((sol, idx) => (
                    <div key={sol.serviceNum + idx} className={styles.solutionItem}>
                      <div className={styles.solutionTop}>
                        <span className={styles.solBadge}>
                          Tier 0{idx + 1} · Service #{sol.serviceNum}
                        </span>
                        <span className={styles.solService}>{sol.serviceName}</span>
                      </div>
                      <h5 className={styles.solHeadline}>{sol.headline}</h5>
                      <p className={styles.solAction}>{sol.action}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Conversion & Action Box */}
              <div className={styles.conversionBox}>
                <div className={styles.convLeft}>
                  <div className={styles.convBadge}>{submitted ? "You're Booked In" : 'Almost There'}</div>
                  <h4 className={styles.convTitle}>Turn This Audit Into a Live Working System</h4>
                  <p className={styles.convSub}>
                    On your free 30-minute strategy call we'll review your exact setup, demo these automations
                    live, and calculate your real ROI — no obligation.
                  </p>

                  <div className={styles.instantWaGroup}>
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`btn btn--primary ${styles.waActionBtn}`}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>Send Audit to Trenton on WhatsApp</span>
                    </a>
                    <button
                      type="button"
                      onClick={resetAudit}
                      className="btn btn--ghost"
                    >
                      <span>Adjust Audit Parameters ↺</span>
                    </button>
                  </div>
                </div>

                <div className={styles.convRight}>
                  <div className={styles.submittedBox}>
                    <div className={styles.checkIcon}>✓</div>
                    <h4>{submitted ? 'Call Requested' : 'Blueprint Unlocked'}</h4>
                    {submitted && slotSummary && (
                      <p className={styles.slotLine}>
                        {slotSummary}
                      </p>
                    )}
                    <ol className={styles.nextSteps}>
                      <li>
                        <strong>Trenton confirms your slot</strong>
                        <span>on WhatsApp{formData.whatsapp ? ` (${formData.whatsapp})` : ''} within 4 business hours.</span>
                      </li>
                      <li>
                        <strong>We review your audit</strong>
                        <span>so the call is tailored to your bottlenecks.</span>
                      </li>
                      <li>
                        <strong>30-minute live walkthrough</strong>
                        <span>of your blueprint — no obligation.</span>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
