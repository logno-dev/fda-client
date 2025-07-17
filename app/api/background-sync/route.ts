import { NextResponse } from 'next/server'
import { syncFSISData } from '@/app/lib/fsis-sync'

export async function POST() {
  try {
    const result = await syncFSISData()
    return NextResponse.json(result)
  } catch (error) {
    console.error('Background sync failed:', error)
    return NextResponse.json({ 
      status: 'error', 
      error: error.message 
    }, { status: 500 })
  }
}