'use client'

import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function Limit({ defaultLimit }: { defaultLimit: string }) {

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const currentSelection = searchParams.get('limit') || defaultLimit

  function handleChange(limit: string) {
    const params = new URLSearchParams(searchParams)
    params.set("limit", limit)
    replace(`${pathname}?${params.toString()}`)
  }


  return (
    <Select onValueChange={(e) => handleChange(e)} value={currentSelection}>
      <SelectTrigger className="w-[6em]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="10">10</SelectItem>
        <SelectItem value="50">50</SelectItem>
        <SelectItem value="100">100</SelectItem>
      </SelectContent>
    </Select>
  )
}
