"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

import RelatedCars from "./RelatedCars"
import CarSpecifications from "./CarSpecifications"
import BookingForm from "./BookingForm"
import { Car } from "./ProductListing"
import { urlForImage } from "@/sanity/lib/sanity"


interface CarDetailClientProps {
  car: Car
}

export default function CarDetailClient({ car }: CarDetailClientProps) {
  const [showBookingForm, setShowBookingForm] = useState(false)

  useEffect(() => {
    if (showBookingForm) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [showBookingForm])

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Car Image */}
          <div>
            <div className="rounded-lg overflow-hidden">
              <Image
                src={urlForImage(car.image).url() || "/placeholder.svg"}
                alt={car.name}
                width={600}
                height={400}
                className="w-full object-cover"
              />
            </div>
          </div>

          {/* Right Column - Car Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{car.name}</h1>
              <p className="text-gray-600 text-lg">{car.brand}</p>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold">${car.pricePerDay}</p>
                <p className="text-gray-500">per day</p>
              </div>
              {car.originalPrice && <div className="text-gray-500 line-through">${car.originalPrice}</div>}
            </div>

            <CarSpecifications car={car} />

            <button
              onClick={() => setShowBookingForm(true)}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Book Now
            </button>
          </div>
        </div>

        {/* Related Cars Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Similar Cars</h2>
          <RelatedCars currentCarId={car._id} carType={car.type} />
        </div>
      </div>

      {/* Modal Overlay */}
      {showBookingForm && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowBookingForm(false)
            }
          }}
        >
          <BookingForm car={car} onClose={() => setShowBookingForm(false)} />
        </div>
      )}
    </>
  )
}

