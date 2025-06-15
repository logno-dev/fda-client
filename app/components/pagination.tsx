'use client'

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export function Pagination({ current, count }: { current: number, count: number }) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { push } = useRouter()

  function handlePageNavigation(page: number) {
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())
    push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="flex flex-wrap content-center items-center">
      <Button disabled={current === 1} onClick={() => handlePageNavigation(current - 1)}><ChevronLeft />Previous</Button>
      {current > 3 && <Button onClick={() => handlePageNavigation(1)}>1</Button>}
      {current > 4 && <div className="font-bold px-2">...</div>}
      {current > 2 && <Button onClick={() => handlePageNavigation(current - 2)}>{current - 2}</Button>}
      {current > 1 && <Button onClick={() => handlePageNavigation(current - 1)}>{current - 1}</Button>}
      <Button className="bg-blue-600 text-white hover:bg-blue-600 hover:text-white">{current}</Button>
      {current < count - 1 && <Button onClick={() => handlePageNavigation(current + 1)}>{current + 1}</Button>}
      {current < count - 2 && <Button onClick={() => handlePageNavigation(current + 2)}>{current + 2}</Button>}
      {current < count - 3 && <div className="font-bold px-2">...</div>}
      {current !== count && <Button onClick={() => handlePageNavigation(count)}>{count}</Button>}
      <Button disabled={current === count} onClick={() => handlePageNavigation(current + 1)}>Next<ChevronRight /></Button>
    </div>
  )
}
