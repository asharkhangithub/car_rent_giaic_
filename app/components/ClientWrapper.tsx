"use client"

import type React from "react"
import { usePathname } from "next/navigation"

interface ClientWrapperProps {
  children: React.ReactNode
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  const pathname = usePathname()

  return <div data-pathname={pathname}>{children}</div>
}

