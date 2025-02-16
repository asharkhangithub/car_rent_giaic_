"use client"

import type React from "react"
import { useState } from "react"
import { DayPicker } from "react-day-picker"
import { format } from "date-fns"
import { X } from "lucide-react"
import { Car } from "./ProductListing"


interface BookingFormProps {
  car: Car
  onClose: () => void
}

export default function BookingForm({ car, onClose }: BookingFormProps) {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage("")

    try {
      if (!car._id || !startDate || !endDate || !name || !email) {
        throw new Error("All fields are required")
      }

      const orderData = {
        car: car._id,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        customerName: name,
        customerEmail: email,
      }

      const response = await fetch("/api/createOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to create order")
      }

      setMessage("Booking successful!")
      setTimeout(() => {
        onClose()
      }, 2000)
    } catch (error) {
      console.error("Error creating order:", error)
      setMessage(error instanceof Error ? error.message : "Error creating booking. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative bg-white p-6 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
      <button
        onClick={onClose}
        className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Close modal"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Book {car.name}</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <DayPicker
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                disabled={{ before: new Date() }}
                footer={startDate ? `You picked ${format(startDate, "PP")}.` : "Please pick a start date."}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <DayPicker
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                disabled={{ before: startDate || new Date() }}
                footer={endDate ? `You picked ${format(endDate, "PP")}.` : "Please pick an end date."}
              />
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {message && (
            <div className="text-sm font-medium text-center">
              {message.includes("success") ? (
                <p className="text-green-600">{message}</p>
              ) : (
                <p className="text-red-600">{message}</p>
              )}
            </div>
          )}

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isSubmitting ? "Booking..." : "Book Now"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

