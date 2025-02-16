"use client"

import { useState, useEffect } from "react"

import ProductCard from "./ProductCard"
import { Car } from "./ProductListing"
import { client } from "../../sanity/lib/sanity"


interface RelatedCarsProps {
  currentCarId: string
  carType: string
}

export default function RelatedCars({ currentCarId, carType }: RelatedCarsProps) {
  const [relatedCars, setRelatedCars] = useState<Car[]>([])

  useEffect(() => {
    async function fetchRelatedCars() {
      const query = `*[_type == "car" && type == $carType && _id != $currentCarId][0...4] {
        _id,
        name,
        brand,
        type,
        pricePerDay,
        image
      }`
      const cars = await client.fetch(query, { currentCarId, carType })
      setRelatedCars(cars)
    }

    fetchRelatedCars()
  }, [currentCarId, carType])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {relatedCars.map((car) => (
        <ProductCard key={car._id} car={car} />
      ))}
    </div>
  )
}

