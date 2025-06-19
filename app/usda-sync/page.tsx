'use client'

import { useEffect, useState } from 'react'

export default function Page() {
  const [loading, setLoading] = useState(false)

  async function sync() {
    setLoading(true)

    try {
      const res = await fetch('https://www.fsis.usda.gov/fsis/api/recall/v/1', {
        headers: {
          'Accept': 'application/json',
        },
      })
      const data = await res.json()

      const reports = data


      const postRes = await fetch('/api/sync-recalls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reports),
      })

      const result = await postRes.json()
      console.log('Synced:', result)
    } catch (err) {
      console.error('Sync failed:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    sync()
  }, [])

  return (
    <div >
      {loading ? 'Syncing...' : 'Sync Complete'}
    </div>
  )
}

