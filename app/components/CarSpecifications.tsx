"use client"

import { Fuel, Settings, Users } from "lucide-react"
import { Car } from "./ProductListing"


interface CarSpecificationsProps {
  car: Car
}

export default function CarSpecifications({ car }: CarSpecificationsProps) {
  const specs = [
    {
      icon: Fuel,
      label: "Fuel Capacity",
      value: car.fuelCapacity,
    },
    {
      icon: Settings,
      label: "Transmission",
      value: car.transmission,
    },
    {
      icon: Users,
      label: "Seating Capacity",
      value: car.seatingCapacity,
    },
  ]

  return (
    <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
      {specs.map((spec) => (
        <div key={spec.label} className="text-center">
          <spec.icon className="w-6 h-6 mx-auto mb-2 text-blue-500" />
          <p className="text-sm text-gray-600">{spec.label}</p>
          <p className="font-semibold">{spec.value}</p>
        </div>
      ))}
    </div>
  )
}

