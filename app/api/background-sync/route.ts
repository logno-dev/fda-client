import { NextResponse } from 'next/server'
import { syncFSISData } from '@/app/lib/fsis-sync'

export async function POST(request: Request) {
  try {
    const { reports } = await request.json()
    
    if (!reports || !Array.isArray(reports)) {
      return NextResponse.json({ 
        status: 'error', 
        error: 'Invalid reports data' 
      }, { status: 400 })
    }
    
    const result = await syncFSISData(reports)
    return NextResponse.json(result)
  } catch (error) {
    console.error('Background sync failed:', error)
    return NextResponse.json({ 
      status: 'error', 
      error: error.message 
    }, { status: 500 })
  }
}