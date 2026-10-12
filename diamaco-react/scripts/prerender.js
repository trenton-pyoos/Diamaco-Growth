import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { BLOG_POSTS } from '../src/data/blogPosts.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const distDir = path.resolve(__dirname, '../dist')

const SITE_URL = 'https://www.diamacogrowth.co.za'

const routes = [
  {
    path: '/services',
    title: 'Our Services | Workflow Automation, CRM & Web Development | Diamaco Growth',
    description: "Explore Diamaco Growth's 10 core business services: Workflow Automation, CRM Pipeline Setup, WhatsApp Business Systems, Website Development, Lead Gen, and Tender Readiness. In person in Mpumalanga & Gauteng, digital nationwide.",
    canonical: `${SITE_URL}/services`,
    ogImage: `${SITE_URL}/og-image.jpg`,
    breadcrumbs: [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Our Services', url: `${SITE_URL}/services` }
    ],
    heading: 'Ten Services. One Growth Partner.',
    subheading: 'From workflow automation to CRM pipelines — explore our complete suite of business growth systems.',
    items: [
      'Workflow Automation — Zapier, Make & n8n builds',
      'CRM Setup & Training — HubSpot, Zoho & Pipedrive',
      'Business Website Development — Conversion-focused, fast & SEO-ready',
      'WhatsApp Business Automation — Intelligent qualification & CRM sync',
      'Lead Generation & B2B Outreach — Targeted sales pipelines',
      'Tender Readiness & Compliance — CSD registration & bid documentation'
    ]
  },
  {
    path: '/audit',
    title: 'Free AI Business Growth & Automation Audit | Diamaco Growth',
    description: 'Calculate your business\'s recoverable admin hours and revenue leakage in 2 minutes. Get an instant, personalized automation roadmap for your South African SME.',
    canonical: `${SITE_URL}/audit`,
    ogImage: `${SITE_URL}/og-image.jpg`,
    breadcrumbs: [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'AI Growth Audit', url: `${SITE_URL}/audit` }
    ],
    heading: 'Discover Your Business Automation Potential',
    subheading: 'Interactive 2-minute diagnostic: calculate wasted admin hours and benchmark revenue leakage.',
    items: [
      'Step 1: Company Profile & Monthly Revenue',
      'Step 2: Operational Friction & Repetitive Tasks',
      'Step 3: Lead Capture & Pipeline Tracking',
      'Step 4: Quantify Revenue Leakage & Recoverable Hours',
      'Step 5: Instant Personalized Automation Roadmap'
    ]
  },
  {
    path: '/about',
    title: 'About Us | Built for South African Enterprise Growth | Diamaco Growth',
    description: 'Meet Diamaco Growth. Founded to give growing South African enterprises the operational systems, commercial clarity, and digital infrastructure to scale profitably.',
    canonical: `${SITE_URL}/about`,
    ogImage: `${SITE_URL}/about-partner.jpg`,
    breadcrumbs: [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'About Us', url: `${SITE_URL}/about` }
    ],
    heading: 'Driven by a Passion for Business Growth',
    subheading: 'South Africa\'s premier growth partner: systems, strategy, and relentless execution for SMEs.',
    items: [
      'Integrity Above All — Transparent pricing and honest advice',
      'Relentless Execution — Moving quickly with high technical quality',
      'Long-Term Thinking — Building permanent growth engines',
      'Deep SA Market Expertise — Compliance, B-BBEE, SARS & tender navigation'
    ]
  },
  {
    path: '/contact',
    title: 'Contact Diamaco Growth | Book a Free Automation Consultation',
    description: 'Get in touch with Diamaco Growth. Book a free 30-minute automation consultation, connect via WhatsApp (+27 83 327 0056), or email info@diamacogrowth.co.za.',
    canonical: `${SITE_URL}/contact`,
    ogImage: `${SITE_URL}/og-image.jpg`,
    breadcrumbs: [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Contact Us', url: `${SITE_URL}/contact` }
    ],
    heading: 'Let\'s Discuss Your Business Growth',
    subheading: 'Book a free 30-minute discovery call or connect directly via WhatsApp with our systems architects.',
    items: [
      'Email: info@diamacogrowth.co.za',
      'Phone / WhatsApp: +27 (0) 83 327 0056',
      'Hours: Mon–Fri: 08:00–17:00 · Sat: 09:00–13:00',
      'Service Coverage: On-site in Mpumalanga & Gauteng, digital delivery in all other provinces'
    ]
  },
  {
    path: '/blog',
    title: 'Growth Insights & Business Strategies | Diamaco Growth Knowledge Hub',
    description: 'Actionable insights on scaling South African businesses, automating operations, optimizing CRM sales pipelines, and commercial compliance.',
    canonical: `${SITE_URL}/blog`,
    ogImage: `${SITE_URL}/og-image.jpg`,
    breadcrumbs: [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Growth Insights', url: `${SITE_URL}/blog` }
    ],
    heading: 'Business Insights for Ambitious Entrepreneurs',
    subheading: 'Practical, actionable playbooks on automation, CRM, strategy, and South African market growth.',
    items: BLOG_POSTS.map(p => `${p.title} (${p.cat} · ${p.read})`)
  }
]

// Add blog posts to prerender routes
BLOG_POSTS.forEach(post => {
  const postRoute = {
    path: `/blog/${post.slug}`,
    title: `${post.title} | Diamaco Growth Insights`,
    description: post.excerpt,
    canonical: `${SITE_URL}/blog/${post.slug}`,
    ogImage: `${SITE_URL}/og-image.jpg`,
    breadcrumbs: [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Growth Insights', url: `${SITE_URL}/blog` },
      { name: post.title, url: `${SITE_URL}/blog/${post.slug}` }
    ],
    heading: post.title,
    subheading: `${post.cat} · ${post.date} · ${post.read} read`,
    items: post.takeaways || [],
    isPost: true,
    post
  }
  routes.push(postRoute)

  if (post.aliases && Array.isArray(post.aliases)) {
    post.aliases.forEach(alias => {
      routes.push({
        ...postRoute,
        path: `/blog/${alias}`,
        canonical: `${SITE_URL}/blog/${post.slug}`
      })
    })
  }
})

function prerender() {
  const indexHtmlPath = path.join(distDir, 'index.html')
  if (!fs.existsSync(indexHtmlPath)) {
    console.error('dist/index.html not found. Please run vite build first.')
    process.exit(1)
  }

  const baseHtml = fs.readFileSync(indexHtmlPath, 'utf8')

  console.log(`Starting pre-render generation for ${routes.length} SEO routes...`)

  routes.forEach(route => {
    let html = baseHtml

    // 1. Replace Title
    html = html.replace(/<title>.*?<\/title>/i, `<title>${route.title}</title>`)
    html = html.replace(/<meta name="title" content=".*?" \/>/i, `<meta name="title" content="${route.title}" />`)

    // 2. Replace Description
    html = html.replace(/<meta name="description" content=".*?" \/>/i, `<meta name="description" content="${route.description}" />`)

    // 3. Replace Canonical
    html = html.replace(/<link rel="canonical" href=".*?" \/>/i, `<link rel="canonical" href="${route.canonical}" />`)

    // 4. Replace Open Graph
    html = html.replace(/<meta property="og:title" content=".*?" \/>/i, `<meta property="og:title" content="${route.title}" />`)
    html = html.replace(/<meta property="og:description" content=".*?" \/>/i, `<meta property="og:description" content="${route.description}" />`)
    html = html.replace(/<meta property="og:url" content=".*?" \/>/i, `<meta property="og:url" content="${route.canonical}" />`)

    // 5. Replace Twitter
    html = html.replace(/<meta name="twitter:title" content=".*?" \/>/i, `<meta name="twitter:title" content="${route.title}" />`)
    html = html.replace(/<meta name="twitter:description" content=".*?" \/>/i, `<meta name="twitter:description" content="${route.description}" />`)
    html = html.replace(/<meta name="twitter:url" content=".*?" \/>/i, `<meta name="twitter:url" content="${route.canonical}" />`)

    // 6. Build Breadcrumb Schema
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': route.breadcrumbs.map((b, i) => ({
        '@type': 'ListItem',
        'position': i + 1,
        'name': b.name,
        'item': b.url
      }))
    }

    let extraSchemas = [breadcrumbSchema]

    if (route.isPost && route.post) {
      extraSchemas.push({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': route.post.title,
        'description': route.post.excerpt,
        'image': route.ogImage,
        'datePublished': '2025-09-01T08:00:00+02:00',
        'dateModified': '2026-10-12T08:00:00+02:00',
        'author': {
          '@type': 'Organization',
          'name': 'Diamaco Growth'
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'Diamaco Growth',
          'logo': {
            '@type': 'ImageObject',
            'url': `${SITE_URL}/logo.png`
          }
        },
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': route.canonical
        }
      })
    }

    const schemaHtml = `\n    <!-- Page Specific Structured Data -->\n    <script type="application/ld+json">\n    ${JSON.stringify(extraSchemas, null, 2)}\n    </script>\n  </head>`
    html = html.replace('</head>', schemaHtml)

    // 7. Inject Semantic Pre-rendered Content into <div id="root">
    const semanticContent = `
    <div id="root">
      <header style="padding: 20px; border-bottom: 1px solid rgba(255,255,255,0.1); max-width: 1200px; margin: 0 auto;">
        <nav aria-label="Breadcrumb Navigation" style="font-size: 14px; margin-bottom: 15px;">
          ${route.breadcrumbs.map((b, idx) => `<a href="${b.url}" style="color: #CC2222; text-decoration: none;">${b.name}</a>${idx < route.breadcrumbs.length - 1 ? ' / ' : ''}`).join('')}
        </nav>
        <h1 style="font-size: 2.2rem; font-weight: 800; color: #fff; margin-bottom: 10px;">${route.heading}</h1>
        <p style="font-size: 1.1rem; color: #999; max-width: 800px; margin-bottom: 20px;">${route.subheading}</p>
        <ul style="list-style: none; padding: 0;">
          ${route.items.map(item => `<li style="padding: 8px 0; color: #ccc; border-bottom: 1px solid rgba(255,255,255,0.05);">${item}</li>`).join('')}
        </ul>
        <div style="margin-top: 25px;">
          <a href="/contact" style="display: inline-block; background: #CC2222; color: #fff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600;">Start a Project / Book a Call</a>
          <a href="https://wa.me/27833270056" style="display: inline-block; margin-left: 15px; color: #25D366; text-decoration: none; font-weight: 600;">WhatsApp Us: +27 83 327 0056</a>
        </div>
      </header>
    </div>`

    html = html.replace('<div id="root"></div>', semanticContent)

    // 8. Write to target directory as index.html and [name].html
    const relPath = route.path.replace(/^\//, '')
    const targetDir = path.join(distDir, relPath)
    fs.mkdirSync(targetDir, { recursive: true })
    fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf8')
    fs.writeFileSync(path.join(distDir, `${relPath}.html`), html, 'utf8')
  })

  // Ensure fresh sitemap.xml and robots.txt in dist
  const publicSitemap = path.resolve(__dirname, '../public/sitemap.xml')
  const distSitemap = path.join(distDir, 'sitemap.xml')
  if (fs.existsSync(publicSitemap)) {
    fs.copyFileSync(publicSitemap, distSitemap)
  }

  const publicRobots = path.resolve(__dirname, '../public/robots.txt')
  const distRobots = path.join(distDir, 'robots.txt')
  if (fs.existsSync(publicRobots)) {
    fs.copyFileSync(publicRobots, distRobots)
  }

  console.log(`Pre-rendering complete! Generated ${routes.length} static entrypoints with full SEO & Schema markup.`)
}

prerender()
