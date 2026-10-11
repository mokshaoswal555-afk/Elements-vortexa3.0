'use client'

import { useMemo, useState } from 'react'
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Bell,
  Building2,
  Check,
  ChevronDown,
  CircleHelp,
  Clock3,
  Droplets,
  FileText,
  Filter,
  Globe2,
  House,
  Lightbulb,
  ListFilter,
  MapPin,
  Menu,
  MessageSquareText,
  MoreHorizontal,
  Navigation,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  Trash2,
  TrendingUp,
  UserRound,
  X,
  Zap,
} from 'lucide-react'

type Status = 'Submitted' | 'Under review' | 'Assigned' | 'In progress' | 'Resolved'
type Complaint = {
  id: string
  title: string
  category: string
  status: Status
  area: string
  department: string
  age: string
  priority: 'High' | 'Medium' | 'Low'
  icon: typeof Droplets
}

const complaints: Complaint[] = [
  { id: 'GF-24091', title: 'Water leakage on Cedar Avenue', category: 'Water supply', status: 'In progress', area: 'Ward 06 · Riverside', department: 'Water & Utilities', age: '2h ago', priority: 'High', icon: Droplets },
  { id: 'GF-24088', title: 'Streetlight out near Central Park', category: 'Streetlights', status: 'Assigned', area: 'Ward 02 · Downtown', department: 'Public Works', age: '5h ago', priority: 'Medium', icon: Lightbulb },
  { id: 'GF-24083', title: 'Missed collection on Oak Street', category: 'Sanitation', status: 'Under review', area: 'Ward 09 · Eastside', department: 'Sanitation', age: '8h ago', priority: 'Medium', icon: Trash2 },
  { id: 'GF-24079', title: 'Pothole outside Riverside School', category: 'Roads', status: 'Resolved', area: 'Ward 06 · Riverside', department: 'Public Works', age: '1d ago', priority: 'Low', icon: Navigation },
]

const navItems = [
  { label: 'Overview', icon: BarChart3 },
  { label: 'Complaints', icon: FileText },
  { label: 'Map intelligence', icon: MapPin },
  { label: 'Departments', icon: Building2 },
]

function Logo() {
  return <div className="brand"><span className="brand-mark"><ShieldCheck /></span><span>GovFix <em>Civic</em></span></div>
}

function StatusBadge({ status }: { status: Status }) {
  const tone = status === 'Resolved' ? 'success' : status === 'In progress' ? 'info' : status === 'Under review' ? 'warning' : 'neutral'
  return <span className={`status-badge ${tone}`}><span className="status-dot" />{status}</span>
}

function CitizenLanding({ onEmployee }: { onEmployee: () => void }) {
  const [showForm, setShowForm] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  return <div className="citizen-shell">
    <header className="public-header"><Logo /><nav><a href="#how">How it works</a><a href="#issues">Civic issues</a><a href="#contact">Contact</a></nav><div className="header-actions"><button className="text-button" onClick={onEmployee}>Staff portal <ArrowRight /></button><button className="button button-dark small" onClick={() => setShowForm(true)}>Track a complaint</button></div><button className="mobile-menu" aria-label="Open menu"><Menu /></button></header>
    <main>
      <section className="hero-section"><div className="hero-copy"><div className="eyebrow"><span className="pulse" /> The civic service desk for your city</div><h1>Your city.<br /><span>Your voice.</span><br />Your solution.</h1><p>Report local issues, follow every update, and help make our neighborhoods better — together.</p><div className="hero-actions"><button className="button button-primary" onClick={() => setShowForm(true)}>Register a complaint <ArrowRight /></button><button className="button button-ghost" onClick={() => setShowForm(true)}>Track my complaint</button></div><div className="trust-row"><div className="avatar-stack"><span>AK</span><span>RM</span><span>JS</span></div><span><strong>12,480+</strong> residents making a difference</span></div></div><div className="hero-visual"><div className="city-card"><div className="city-card-top"><span className="live-pill"><span /> Live service map</span><span className="map-controls">− &nbsp; +</span></div><div className="map-art"><div className="map-grid" /><div className="road road-a" /><div className="road road-b" /><div className="road road-c" /><span className="map-pin pin-1"><Droplets /></span><span className="map-pin pin-2"><Lightbulb /></span><span className="map-pin pin-3"><Trash2 /></span><span className="map-pin pin-4"><Navigation /></span><div className="map-label label-a">Riverside</div><div className="map-label label-b">Downtown</div></div><div className="map-footer"><span><i className="legend-dot blue" /> 184 active reports</span><span><i className="legend-dot orange" /> 12 need attention</span></div></div><div className="floating-update"><span className="update-icon"><Check /></span><div><strong>Issue resolved</strong><small>Streetlight · Ward 02</small></div><span className="update-time">2m</span></div></div></section>
      <section className="stat-strip"><div><strong>4,286</strong><span>issues resolved</span></div><div><strong>96%</strong><span>response rate</span></div><div><strong>2.4 days</strong><span>average resolution</span></div><div><strong>18</strong><span>departments connected</span></div></section>
      <section className="how-section" id="how"><div className="section-heading"><div><span className="eyebrow">Simple by design</span><h2>From report to resolution.</h2></div><p>Every complaint has a clear owner, a visible status, and a path forward.</p></div><div className="steps"><div className="step-card"><span className="step-number">01</span><span className="step-icon"><MessageSquareText /></span><h3>Submit</h3><p>Tell us what is happening in your neighborhood. Add a photo and location for faster action.</p></div><div className="step-card featured"><span className="step-number">02</span><span className="step-icon"><Clock3 /></span><h3>Track</h3><p>Get a unique tracking ID and see exactly who is handling your request, in real time.</p></div><div className="step-card"><span className="step-number">03</span><span className="step-icon"><ShieldCheck /></span><h3>Resolve</h3><p>Receive updates from your city team and confirm when the issue has been resolved.</p></div></div></section>
      <section className="issues-section" id="issues"><div className="section-heading"><div><span className="eyebrow">What can we help with?</span><h2>Make your neighborhood better.</h2></div><a href="#contact" className="arrow-link">View all services <ArrowRight /></a></div><div className="issue-grid"><IssueCard icon={Trash2} title="Sanitation" count="842 reports" tone="green" /><IssueCard icon={Droplets} title="Water supply" count="614 reports" tone="blue" /><IssueCard icon={Navigation} title="Roads & paths" count="489 reports" tone="orange" /><IssueCard icon={Lightbulb} title="Streetlights" count="357 reports" tone="purple" /></div></section>
      <section className="public-cta" id="contact"><div><span className="eyebrow">Have a question?</span><h2>Need help with a civic issue?</h2><p>Our service desk is here Monday–Friday, 8am–6pm.</p></div><button className="button button-light">Contact the service desk <ArrowRight /></button></section>
    </main>
    <footer className="public-footer"><Logo /><span>© 2025 GovFix Civic · A fictional demo platform</span><div><a href="#contact">Privacy</a><a href="#contact">Accessibility</a></div></footer>
    {showForm && <ComplaintModal onClose={() => { setShowForm(false); setSubmitted(false) }} submitted={submitted} onSubmit={() => setSubmitted(true)} />}
  </div>
}

function IssueCard({ icon: Icon, title, count, tone }: { icon: typeof Trash2; title: string; count: string; tone: string }) { return <button className="issue-card"><span className={`issue-icon ${tone}`}><Icon /></span><span><strong>{title}</strong><small>{count}</small></span><ArrowRight /></button> }

function ComplaintModal({ onClose, submitted, onSubmit }: { onClose: () => void; submitted: boolean; onSubmit: () => void }) { return <div className="modal-backdrop" role="presentation"><div className="complaint-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button className="modal-close" onClick={onClose} aria-label="Close"><X /></button>{submitted ? <div className="success-state"><span className="success-icon"><Check /></span><span className="eyebrow">Complaint registered</span><h2>Your voice is on its way.</h2><p>We&apos;ve created a tracking ID for your report. Keep it handy for future updates.</p><div className="tracking-code">GF-24102 <button aria-label="Copy tracking code"><FileText /></button></div><button className="button button-primary" onClick={onClose}>Back to home</button></div> : <><span className="eyebrow">New complaint</span><h2 id="modal-title">What needs attention?</h2><p className="modal-intro">Share the details and your city team will take it from there.</p><label>What is the issue?<select defaultValue=""><option value="" disabled>Select a category</option><option>Water supply and leakage</option><option>Garbage collection and sanitation</option><option>Road damage and potholes</option><option>Streetlight failure</option><option>Drainage and sewage</option></select></label><label>Give it a title<input placeholder="e.g. Water leaking outside my home" /></label><label>Where is it happening?<div className="input-with-icon"><MapPin /><input placeholder="Search an address or landmark" /></div></label><label>Tell us more<textarea placeholder="Add any useful details..." rows={3} /></label><div className="consent"><input type="checkbox" id="consent" /><label htmlFor="consent">I confirm these details are accurate.</label></div><button className="button button-primary full" onClick={onSubmit}>Submit complaint <ArrowRight /></button><small className="demo-note"><Sparkles /> Demo mode · fictional data only</small></>}</div></div> }

function EmployeeDashboard({ onCitizen }: { onCitizen: () => void }) {
  const [activeNav, setActiveNav] = useState('Overview')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<Complaint | null>(null)
  const filtered = useMemo(() => complaints.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()) || item.id.toLowerCase().includes(query.toLowerCase())), [query])
  return <div className="staff-shell"><aside className="sidebar"><div className="sidebar-brand"><Logo /><button className="collapse-button"><ChevronDown /></button></div><div className="demo-label"><span className="live-dot" /> Demo workspace <ChevronDown /></div><nav className="side-nav">{navItems.map(({ label, icon: Icon }) => <button key={label} className={activeNav === label ? 'active' : ''} onClick={() => setActiveNav(label)}><Icon />{label}{label === 'Complaints' && <span className="nav-count">24</span>}</button>)}</nav><div className="sidebar-bottom"><button><CircleHelp /> Help center</button><button><span className="profile-avatar">NR</span><span><strong>Nadia Rao</strong><small>Supervisor</small></span><MoreHorizontal /></button></div></aside><section className="staff-main"><header className="staff-header"><div className="mobile-staff-title"><Logo /></div><div className="breadcrumbs"><span>Workspace</span><ArrowRight /><strong>{activeNav}</strong></div><div className="staff-header-actions"><div className="search-box"><Search /><input placeholder="Search complaints..." value={query} onChange={(e) => setQuery(e.target.value)} /><kbd>⌘ K</kbd></div><button className="icon-button" aria-label="Notifications"><Bell /><span className="notification-dot" /></button><button className="staff-avatar">NR</button></div></header><main className="staff-content"><div className="staff-welcome"><div><span className="eyebrow">Wednesday, 18 June 2025</span><h1>Good morning, Nadia.</h1><p>Here&apos;s what&apos;s happening across your city today.</p></div><button className="button button-primary" onClick={() => setActiveNav('Complaints')}><Plus /> New complaint</button></div><div className="demo-banner"><span><Sparkles /><strong>Demo workspace</strong> You&apos;re viewing fictional municipal data.</span><button>Learn more <ArrowRight /></button></div><div className="kpi-grid"><Kpi title="Total complaints" value="1,248" change="12.8%" icon={FileText} tone="blue" /><Kpi title="Needs attention" value="86" change="8.4%" icon={AlertTriangle} tone="orange" warning /><Kpi title="In progress" value="214" change="4.6%" icon={Clock3} tone="purple" /><Kpi title="Resolved this month" value="392" change="18.2%" icon={Check} tone="green" /></div><div className="dashboard-grid"><div className="panel chart-panel"><div className="panel-header"><div><h2>Complaint volume</h2><p>All departments · Last 30 days</p></div><button className="select-button">Last 30 days <ChevronDown /></button></div><div className="chart-area"><div className="chart-y"><span>120</span><span>80</span><span>40</span><span>0</span></div><div className="chart-lines"><span /><span /><span /><span /><svg viewBox="0 0 600 170" preserveAspectRatio="none" aria-label="Complaint volume trend"><defs><linearGradient id="fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#2264e5" stopOpacity=".16" /><stop offset="100%" stopColor="#2264e5" stopOpacity="0" /></linearGradient></defs><path d="M0,137 C35,128 42,112 70,119 S105,145 135,125 S166,93 195,102 S230,129 258,104 S292,78 320,91 S355,112 383,87 S420,50 445,68 S480,95 510,63 S550,40 600,18 L600,170 L0,170 Z" fill="url(#fill)" /><path d="M0,137 C35,128 42,112 70,119 S105,145 135,125 S166,93 195,102 S230,129 258,104 S292,78 320,91 S355,112 383,87 S420,50 445,68 S480,95 510,63 S550,40 600,18" fill="none" stroke="#2264e5" strokeWidth="3" /></svg><div className="chart-x"><span>May 20</span><span>May 27</span><span>Jun 03</span><span>Jun 10</span><span>Jun 18</span></div></div></div></div><div className="panel breakdown-panel"><div className="panel-header"><div><h2>By category</h2><p>Current open cases</p></div><button className="more-button"><MoreHorizontal /></button></div><div className="donut-wrap"><div className="donut"><div><strong>624</strong><small>open cases</small></div></div><div className="legend-list"><span><i className="legend-swatch blue" />Water supply <b>32%</b></span><span><i className="legend-swatch green" />Sanitation <b>24%</b></span><span><i className="legend-swatch orange" />Roads <b>19%</b></span><span><i className="legend-swatch purple" />Other <b>25%</b></span></div></div></div></div><div className="panel table-panel"><div className="panel-header"><div><h2>Recent complaints</h2><p>Latest activity from across the city</p></div><div className="table-actions"><button className="filter-button"><Filter /> Filters <span>2</span></button><button className="button button-outline small">View all <ArrowRight /></button></div></div><div className="table-wrap"><table><thead><tr><th>Complaint</th><th>Status</th><th>Location</th><th>Department</th><th>Received</th><th /></tr></thead><tbody>{filtered.map((item) => { const Icon = item.icon; return <tr key={item.id} onClick={() => setSelected(item)}><td><div className="complaint-name"><span className="table-icon"><Icon /></span><span><strong>{item.title}</strong><small>{item.id} · {item.category}</small></span></div></td><td><StatusBadge status={item.status} /></td><td>{item.area}</td><td>{item.department}</td><td>{item.age}</td><td><button className="row-more" aria-label={`Open ${item.id}`}><MoreHorizontal /></button></td></tr> })}</tbody></table></div></div><div className="bottom-panels"><div className="panel activity-panel"><div className="panel-header"><div><h2>Recent activity</h2><p>Updates from your team</p></div><button className="more-button"><MoreHorizontal /></button></div><div className="activity-list"><Activity initials="JM" color="blue" text="assigned GF-24091 to Priya Shah" time="12 min ago" /><Activity initials="PS" color="green" text="added a public update to GF-24083" time="34 min ago" /><Activity initials="NR" color="purple" text="approved deadline extension for GF-24072" time="1h ago" /></div></div><div className="panel attention-panel"><div className="attention-head"><span className="attention-icon"><AlertTriangle /></span><div><h2>Needs your attention</h2><p>8 cases are approaching their SLA</p></div></div><div className="attention-row"><span>GF-24072</span><strong>Water supply</strong><span className="due-soon">Due in 42m</span><ArrowRight /></div><div className="attention-row"><span>GF-24065</span><strong>Road damage</strong><span className="overdue">Overdue 2h</span><ArrowRight /></div></div></div></main></section>{selected && <CasePanel complaint={selected} onClose={() => setSelected(null)} />}</div>
}

function Kpi({ title, value, change, icon: Icon, tone, warning }: { title: string; value: string; change: string; icon: typeof Check; tone: string; warning?: boolean }) { return <div className="kpi-card"><div className={`kpi-icon ${tone}`}><Icon /></div><div className="kpi-label">{title}<span className={warning ? 'negative' : 'positive'}>{warning ? '↑ ' : '↑ '}{change}</span></div><strong>{value}</strong><small>vs. previous month</small></div> }
function Activity({ initials, color, text, time }: { initials: string; color: string; text: string; time: string }) { return <div className="activity-item"><span className={`activity-avatar ${color}`}>{initials}</span><p><strong>{text.split(' ').slice(0, 2).join(' ')}</strong> {text.split(' ').slice(2).join(' ')}<small>{time}</small></p></div> }
function CasePanel({ complaint, onClose }: { complaint: Complaint; onClose: () => void }) { return <div className="case-overlay"><aside className="case-panel"><div className="case-top"><div><span className="eyebrow">Complaint details</span><h2>{complaint.id}</h2></div><button className="icon-button" onClick={onClose} aria-label="Close details"><X /></button></div><div className="case-status"><StatusBadge status={complaint.status} /><span className="priority-tag"><span /> {complaint.priority} priority</span></div><h3>{complaint.title}</h3><p className="case-description">A resident reported an issue requiring municipal attention. This is a fictional demo record used to show the complete case workflow.</p><div className="case-meta"><span><MapPin /> {complaint.area}</span><span><Building2 /> {complaint.department}</span><span><Clock3 /> Received {complaint.age}</span></div><div className="case-section"><div className="case-section-title">Workflow timeline <span>3 of 5</span></div><div className="timeline"><div className="timeline-item done"><i><Check /></i><div><strong>Complaint submitted</strong><small>Today, 08:42 · Resident portal</small></div></div><div className="timeline-item done"><i><Check /></i><div><strong>Under review</strong><small>Today, 09:10 · Maya Chen</small></div></div><div className="timeline-item current"><i><Clock3 /></i><div><strong>{complaint.status}</strong><small>Action required from assigned team</small></div></div><div className="timeline-item"><i /> <div><strong>Resolved</strong><small>Pending</small></div></div></div></div><div className="ai-callout"><Sparkles /><div><strong>AI suggestion · Needs review</strong><p>Likely category: {complaint.category}. Route to {complaint.department} based on location and issue keywords.</p></div></div><button className="button button-primary full">Open full case <ArrowRight /></button></aside></div> }

export default function Page() { const [portal, setPortal] = useState<'citizen' | 'staff'>('citizen'); return <><div className="portal-switcher"><button className={portal === 'citizen' ? 'selected' : ''} onClick={() => setPortal('citizen')}><House /> Citizen portal</button><button className={portal === 'staff' ? 'selected' : ''} onClick={() => setPortal('staff')}><BarChart3 /> Staff workspace</button></div>{portal === 'citizen' ? <CitizenLanding onEmployee={() => setPortal('staff')} /> : <EmployeeDashboard onCitizen={() => setPortal('citizen')} />}</> }
