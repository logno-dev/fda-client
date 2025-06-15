'use client'

import { Button } from '@/components/ui/button'
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

function Arrow({ direction }) {
  switch (direction) {
    case "ASC":
      return <ArrowUp />;
    case "DESC":
      return <ArrowDown />
    default:
      return <ArrowUpDown />;
  }
}



export function DateOrder() {

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const params = new URLSearchParams(searchParams)

  const [direction, setDirection] = useState(params.get("direction"))

  function handleClick() {

    if (!params.get("direction")) {
      params.set('direction', 'ASC')
      setDirection('ASC')

    } else {
      params.delete('direction')
      setDirection('DESC')
    }
    replace(`${pathname}?${params.toString()}`)
  }


  return (
    <Button onClick={handleClick} variant="ghost" size="sm" className="hover:bg-stone-200">Date<Arrow direction={direction} /></Button>
  )
}
