'use client'

import { SearchIcon } from 'lucide-react'
import { Input } from '../../components/ui/input'

import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'



export function Search() {

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSearch = useDebouncedCallback((term) => {

    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set('search', term)
    } else {
      params.delete('search')
    }
    params.set('page', '1')
    replace(`${pathname}?${params.toString()}`)
  }, 300)

  return (
    <div className="flex grow items-center content-center justify-center gap-2 bg-neutral-100 rounded-md">
      <Input
        type="text"
        placeholder="search recalls"
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('search')?.toString()}
      />
      <SearchIcon className="text-neutral-400 scale-110" />
      <div className="w-1"></div>

    </div>
  )
}
