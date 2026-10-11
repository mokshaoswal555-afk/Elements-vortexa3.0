import { NextResponse } from 'next/server'

type ComplaintRequest = {
  category?: unknown
  title?: unknown
  location?: unknown
  details?: unknown
  latitude?: unknown
  longitude?: unknown
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
  const title = typeof body.title === 'string' ? body.title.trim() : ''
  const location = typeof body.location === 'string' ? body.location.trim() : ''
  const details = typeof body.details === 'string' ? body.details.trim() : ''
  const latitude = typeof body.latitude === 'number' ? body.latitude : NaN
  const longitude = typeof body.longitude === 'number' ? body.longitude : NaN
  if (!category || !title || !Number.isFinite(latitude) || !Number.isFinite(longitude) || latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
    return NextResponse.json({ error: 'Category, title, and a valid live location are required.' }, { status: 400 })
  }

  const id = trackingId()
  const response = await fetch(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/complaints`, {
    method: 'POST',
    headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}`, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
    body: JSON.stringify({ tracking_id: id, category, title, location_text: location || null, details: details || null, latitude, longitude, status: 'Submitted' }),
    cache: 'no-store',
  })
  if (!response.ok) {
    return NextResponse.json({ error: 'The complaint could not be saved. Check the Supabase table and insert policy.' }, { status: 502 })
  }
  return NextResponse.json({ trackingId: id }, { status: 201 })
}
