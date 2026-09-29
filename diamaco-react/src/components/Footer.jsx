import { Link } from 'react-router-dom'

const socials = [
  {
    label: 'LinkedIn', href: '#',
    icon: <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" stroke="currentColor" strokeWidth="1.5"/><rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="1.5"/><circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.5"/></svg>
  },
  {
    label: 'Facebook', href: '#',
    icon: <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
  },
  {
    label: 'Instagram', href: '#',
    icon: <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="1.5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="currentColor" strokeWidth="1.5"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
  },
  {
    label: 'WhatsApp', href: 'https://wa.me/27833270056',
    icon: <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
  },
]

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <img src="/logo.png" alt="Diamaco Growth" className="footer-logo" />
            <p className="footer-brand__text">
              South Africa's premier business growth partner. We systematise, scale, and sustain the businesses of tomorrow — today.
            </p>
            <div className="footer-social">
              {socials.map(({ label, href, icon }) => (
                <a key={label} href={href} aria-label={label} target="_blank" rel="noreferrer">
                  {icon}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-col">
            <h4>Navigation</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/blog">Insights</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              <li><Link to="/services">Workflow Automation</Link></li>
              <li><Link to="/services">CRM Setup</Link></li>
              <li><Link to="/services">Website Development</Link></li>
              <li><Link to="/services">Lead Generation</Link></li>
              <li><Link to="/services">Tender Readiness</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:info@diamacogrowth.co.za">info@diamacogrowth.co.za</a></li>
              <li><a href="tel:+27833270056">+27 (0) 83 327 0056</a></li>
              <li><a href="#">Johannesburg, South Africa</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>© {new Date().getFullYear()} Diamaco Growth. All rights reserved.</p>
          <p>Designed & Built with <span style={{ color: 'var(--red)' }}>♥</span> in South Africa</p>
        </div>
      </div>
    </footer>
  )
}
