'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'


export function FilterBox({ header, items }: { header: string, items: string[] }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  return (
    <div className="rounded-md border p-1 flex flex-col">
      <div className="p-1 text-lg font-bold border-b bg-neutral-50">
        {header}
      </div>
      <ul>
        {items.map((i) => (
          <li key={i}>
            <Checkbox id={i} />
            <label htmlFor={i}>{i}</label>
          </li>
        ))}
      </ul>
    </div>
  )
}
