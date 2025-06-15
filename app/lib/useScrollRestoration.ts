'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

const scrollPositions = new Map<string, number>()

export function ScrollRestoration() {
  const pathname = usePathname()

  // Save scroll on unload or before route changes
  useEffect(() => {
    const saveScroll = () => {
      scrollPositions.set(pathname, window.scrollY)
    }

    window.addEventListener('beforeunload', saveScroll)
    window.addEventListener('pagehide', saveScroll)

    return () => {
      saveScroll()
      window.removeEventListener('beforeunload', saveScroll)
      window.removeEventListener('pagehide', saveScroll)
    }
  }, [pathname])

  // Restore scroll after initial load
  useEffect(() => {
    const y = scrollPositions.get(pathname) ?? 0

    const restoreScroll = () => {
      // Retry multiple times to catch late DOM loads (e.g., streaming)
      let tries = 0
      const maxTries = 10

      const tryScroll = () => {
        if (tries >= maxTries) return
        window.scrollTo(0, y)
        tries++
        requestAnimationFrame(tryScroll)
      }

      tryScroll()
    }

    // Slight delay to let Next.js render complete
    const timeout = setTimeout(restoreScroll, 50)
    return () => clearTimeout(timeout)
  }, [pathname])

  return null
}
