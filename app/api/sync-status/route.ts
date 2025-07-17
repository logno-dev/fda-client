import { NextResponse } from 'next/server'
import { hasUploadedToday } from '@/app/lib/sync-tracker'

export async function GET() {
  try {
    const hasSync = await hasUploadedToday()
    
    return NextResponse.json({ 
      needsSync: !hasSync,
      lastSync: hasSync ? 'today' : 'not today'
    })
  } catch (error) {
    console.error('Error checking sync status:', error)
    return NextResponse.json({ error: 'Failed to check sync status' }, { status: 500 })
  }
}