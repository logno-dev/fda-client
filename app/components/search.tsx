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
    <div className="flex grow items-center content-center bg-blue-600 justify-center gap-2  rounded-md mb-2">
      <Input
        className=" shadow-none border-2 border-blue-600 focus-visible:border-green-800/70"
        type="text"
        placeholder="search recalls"
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('search')?.toString()}
      />
      <SearchIcon className="text-neutral-100 scale-110" />
      <div className="w-1"></div>

    </div>
  )
}
