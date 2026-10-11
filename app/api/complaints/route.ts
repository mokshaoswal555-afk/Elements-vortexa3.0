import { NextResponse } from 'next/server'

type ComplaintRequest = {
  complaintDomain?: unknown
  category?: unknown
  title?: unknown
  location?: unknown
  details?: unknown
  latitude?: unknown
  longitude?: unknown
}

const complaintDomains = [
  'Roads & Potholes',
  'Streetlights & Electrical',
  'Garbage & Cleanliness',
  'Water Supply',
  'Drainage & Sewage',
  'Public Toilets & Sanitation',
  'Construction & Encroachment',
  'Waterlogging & Flooding',
  'Parks & Public Spaces',
] as const

const complaintSelect = 'id,tracking_id,category,title,location_text,details,status,created_at'

function isMissingDomainColumn(error: { code?: string; message?: string } | null) {
  return error?.code === '42703' && error.message?.includes('complaint_domain')
}

export async function GET() {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_ANON_KEY
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: 'The complaint database is not configured.' }, { status: 503 })
  }

  const response = await fetch(
    `${supabaseUrl.replace(/\/$/, '')}/rest/v1/complaints?select=id,tracking_id,complaint_domain,category,title,location_text,details,status,created_at&order=created_at.desc`,
    { headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` }, cache: 'no-store' },
  )
  if (!response.ok) {
    const upstreamError = await response.json().catch(() => null) as { code?: string; message?: string } | null
    if (isMissingDomainColumn(upstreamError)) {
      const legacyResponse = await fetch(
        `${supabaseUrl.replace(/\/$/, '')}/rest/v1/complaints?select=${complaintSelect}&order=created_at.desc`,
        { headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` }, cache: 'no-store' },
      )
      if (legacyResponse.ok) {
        const records = await legacyResponse.json() as Array<{ category: string } & Record<string, unknown>>
        return NextResponse.json(records.map((record) => ({
          ...record,
          complaint_domain: complaintDomains.includes(record.category as typeof complaintDomains[number]) ? record.category : null,
        })))
      }
    }
    console.error('Supabase complaint read failed', response.status, { code: upstreamError?.code, message: upstreamError?.message })
    return NextResponse.json({ error: 'Complaints could not be loaded. Check the Supabase table and read policy.' }, { status: 502 })
  }
  return NextResponse.json(await response.json())
}

const trackingId = () => `GF-${Math.floor(10000 + Math.random() * 90000)}`

export async function POST(request: Request) {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_ANON_KEY
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: 'The complaint database is not configured. Add SUPABASE_URL and SUPABASE_ANON_KEY.' }, { status: 503 })
  }

  let body: ComplaintRequest
  try {
    body = await request.json() as ComplaintRequest
  } catch {
    return NextResponse.json({ error: 'Invalid complaint payload.' }, { status: 400 })
  }

  const category = typeof body.category === 'string' ? body.category.trim() : ''
  const complaintDomain = typeof body.complaintDomain === 'string' ? body.complaintDomain.trim() : ''
  const title = typeof body.title === 'string' ? body.title.trim() : ''
  const location = typeof body.location === 'string' ? body.location.trim() : ''
  const details = typeof body.details === 'string' ? body.details.trim() : ''
  const latitude = typeof body.latitude === 'number' ? body.latitude : NaN
  const longitude = typeof body.longitude === 'number' ? body.longitude : NaN
  if (!category || !complaintDomains.includes(complaintDomain as typeof complaintDomains[number]) || !title || !Number.isFinite(latitude) || !Number.isFinite(longitude) || latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
    return NextResponse.json({ error: 'Complaint domain, category, title, and a valid live location are required.' }, { status: 400 })
  }

  const id = trackingId()
  const insertUrl = `${supabaseUrl.replace(/\/$/, '')}/rest/v1/complaints`
  const headers = { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}`, 'Content-Type': 'application/json', Prefer: 'return=minimal' }
  const responseBody = { tracking_id: id, complaint_domain: complaintDomain, category: complaintDomain, title, location_text: location || null, details: details || null, latitude, longitude, status: 'Submitted' }
  let response = await fetch(insertUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify(responseBody),
    cache: 'no-store',
  })
  if (!response.ok) {
    const upstreamError = await response.json().catch(() => null) as { code?: string; message?: string } | null
    if (isMissingDomainColumn(upstreamError)) {
      const legacyBody = { tracking_id: id, category: complaintDomain, title, location_text: location || null, details: details || null, latitude, longitude, status: 'Submitted' }
      response = await fetch(insertUrl, { method: 'POST', headers, body: JSON.stringify(legacyBody), cache: 'no-store' })
    }
  }
  if (!response.ok) {
    return NextResponse.json({ error: 'The complaint could not be saved. Check the Supabase table and insert policy.' }, { status: 502 })
  }
  return NextResponse.json({ trackingId: id }, { status: 201 })
}
