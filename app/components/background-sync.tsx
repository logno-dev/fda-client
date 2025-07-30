'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export function BackgroundSync() {
  const [syncStatus, setSyncStatus] = useState<'checking' | 'syncing' | 'complete' | 'error'>('checking')
  const router = useRouter()

  useEffect(() => {
    checkAndSync()
  }, [])

  const checkAndSync = async () => {
    try {
      const response = await fetch('/api/sync-status')
      const { needsSync } = await response.json()
      
      if (needsSync) {
        setSyncStatus('syncing')
        
        // Fetch FSIS data from client
        const fsisResponse = await fetch('https://www.fsis.usda.gov/fsis/api/recall/v/1', {
          headers: {
            'Accept': 'application/json',
          },
        })
        
        if (!fsisResponse.ok) {
          throw new Error(`FSIS API error: ${fsisResponse.status}`)
        }
        
        const fsisData = await fsisResponse.json()
        const reports = fsisData.slice(0, 300)
        
        // Send processed data to server
        const syncResponse = await fetch('/api/background-sync', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ reports })
        })
        
        if (syncResponse.ok) {
          setSyncStatus('complete')
          router.refresh()
        } else {
          setSyncStatus('error')
        }
      } else {
        setSyncStatus('complete')
      }
    } catch (error) {
      console.error('Background sync failed:', error)
      setSyncStatus('error')
    }
  }

  if (syncStatus === 'checking' || syncStatus === 'syncing') {
    return (
      <div className="fixed top-4 right-4 bg-blue-100 border border-blue-300 text-blue-800 px-4 py-2 rounded-md shadow-md z-50">
        <div className="flex items-center gap-2">
          <div className="animate-spin h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
          <span className="text-sm">
            {syncStatus === 'checking' ? 'Checking for updates...' : 'Syncing latest data...'}
          </span>
        </div>
      </div>
    )
  }

  if (syncStatus === 'error') {
    return (
      <div className="fixed top-4 right-4 bg-red-100 border border-red-300 text-red-800 px-4 py-2 rounded-md shadow-md z-50">
        <span className="text-sm">Sync failed - showing cached data</span>
      </div>
    )
  }

  return null
}