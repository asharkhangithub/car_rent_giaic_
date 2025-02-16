"use client"

import Image from "next/image"

import Link from "next/link"
import { Car } from "./ProductListing"
import { urlForImage } from "../../sanity/lib/sanity"

interface ProductCardProps {
  car: Car
}

export default function ProductCard({ car }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative aspect-[4/3]">
        <Image
          src={urlForImage(car.image).url() || "/placeholder.svg"}
          alt={car.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain p-4"
          priority
        />
      </div>
      <div className="p-4 space-y-4">
        <div>
          <h3 className="font-semibold text-gray-900">{car.name}</h3>
          <p className="text-sm text-gray-500">{car.brand}</p>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Price per day</p>
            <p className="text-lg font-semibold text-gray-900">${car.pricePerDay}</p>
          </div>
          <Link
            href={`/car/${car._id}`}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors inline-block text-center"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}

