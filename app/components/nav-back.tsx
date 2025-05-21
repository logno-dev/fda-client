'use client'
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export function NavBack() {
  const { back } = useRouter()
  return (
    <Button onClick={() => back()}><ChevronLeft /> Back</Button>
  )
}
