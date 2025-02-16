"use client"

import type React from "react"
import { useState } from "react"
import { Search } from "lucide-react"

interface SearchBarProps {
  onSearch: (term: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  return (
    <form onSubmit={handleSearch} className="relative">
      <input
        type="text"
        placeholder="Search for cars..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="input pr-12"
      />
      <button
        type="submit"
        className="absolute right-0 top-0 h-full px-4 flex items-center justify-center text-muted-foreground hover:text-foreground"
      >
        <Search className="w-5 h-5" />
      </button>
    </form>
  )
}

