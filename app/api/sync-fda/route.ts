import { NextRequest, NextResponse } from 'next/server'
import { syncFDAData } from '@/app/lib/fda-sync'

export const maxDuration = 60 // Allow up to 60 seconds for the sync operation

export async function GET(req: NextRequest) {
  try {
    // Verify the request is coming from Vercel Cron
    const authHeader = req.headers.get('authorization')
    
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    console.log('Starting FDA sync from cron job...')
    const result = await syncFDAData()
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('FDA sync cron job failed:', error)
    return NextResponse.json(
      { 
        status: 'error', 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    )
  }
}

// Also support POST for manual triggers
export async function POST(req: NextRequest) {
  return GET(req)
}
