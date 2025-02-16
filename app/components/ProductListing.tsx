"use client"

import { useState, useEffect, useCallback } from "react"

import ProductCard from "./ProductCard"

import CategoryComponent from "./CategoryComponent"
import { client } from "../../sanity/lib/sanity"
import SearchBar from "./search"


async function getCars(): Promise<Car[]> {
  const query = `*[_type == "car"] {
    _id,
    name,
    brand,
    type,
    pricePerDay,
    image
  }`
  return client.fetch(query)
}

export default function ProductListing() {
  const [cars, setCars] = useState<Car[]>([])
  const [filteredCars, setFilteredCars] = useState<Car[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getCars()
      .then((fetchedCars) => {
        setCars(fetchedCars)
        setFilteredCars(fetchedCars)
        setError(null)
      })
      .catch((err) => {
        console.error("Error fetching cars:", err)
        setError("Failed to fetch cars")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const handleSearch = useCallback(
    (searchTerm: string) => {
      const filtered = cars.filter(
        (car) =>
          car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          car.type.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredCars(filtered)
    },
    [cars],
  )

  const handleCategoryChange = useCallback(
    (category: string) => {
      if (category === "All") {
        setFilteredCars(cars)
      } else {
        const filtered = cars.filter((car) => car.type.toLowerCase() === category.toLowerCase())
        setFilteredCars(filtered)
      }
    },
    [cars],
  )

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>
  }

  if (error) {
    return <div className="text-center py-8 text-destructive">{error}</div>
  }

  return (
    <div className="space-y-8">
      <SearchBar onSearch={handleSearch} />
      <CategoryComponent onCategoryChange={handleCategoryChange} />
      {filteredCars.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">No cars found matching your criteria</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCars.map((car) => (
            <ProductCard key={car._id} car={car} />
          ))}
        </div>
      )}
    </div>
  )
}






export interface Car {
  _id: string;
  name: string;
  brand: string;
  type: string;
  fuelCapacity: number;  // ✅ Change string → number
  transmission: string;
  seatingCapacity: number;
  pricePerDay: number;
  originalPrice: number;
  tags: string[];
  image: string;
}



