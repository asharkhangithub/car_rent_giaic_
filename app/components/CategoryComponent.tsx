"use client"

import type React from "react"
import { useState } from "react"
import { ChevronLeft } from "lucide-react"

const categories = ["All", "Sport", "Sedan", "SUV", "Electric"]

interface CategoryComponentProps {
  onCategoryChange: (category: string) => void
}

const CategoryComponent: React.FC<CategoryComponentProps> = ({ onCategoryChange }) => {
  const [activeCategory, setActiveCategory] = useState("All")

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category)
    onCategoryChange(category)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        {activeCategory !== "All" && (
          <button onClick={() => handleCategoryClick("All")} className="p-2 hover:bg-secondary rounded-full">
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
        <h2 className="text-xl font-semibold">{activeCategory === "All" ? "All Categories" : activeCategory}</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === category
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  )
}

export default CategoryComponent

