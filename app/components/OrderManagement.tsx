"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { urlForImage } from "@/sanity/lib/sanity"
import { getOrders, type OrderWithCar } from "@/sanity/lib/sanity"
import { format } from "date-fns"

export default function OrderManagement() {
  const [orders, setOrders] = useState<OrderWithCar[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const fetchedOrders = await getOrders()
      setOrders(fetchedOrders)
    } catch (error) {
      console.error("Error fetching orders:", error)
      setError("Failed to fetch orders. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <div className="text-center py-8">Loading orders...</div>
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-blue-600 mb-4">{error}</p>
        <button onClick={fetchOrders} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Try Again
        </button>
      </div>
    )
  }

  if (orders.length === 0) {
    return <div className="text-center py-8">No orders found.</div>
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <div key={order._id} className="bg-white rounded-lg shadow-md p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="relative w-24 h-24 flex-shrink-0">
                <Image
                  src={urlForImage(order.car.image).url() || "/placeholder.svg"}
                  alt={order.car.name}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{order.car.name}</h3>
                <p className="text-gray-600">{order.car.brand}</p>
              </div>
            </div>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Booking Period:</span> {format(new Date(order.startDate), "PP")} -{" "}
                {format(new Date(order.endDate), "PP")}
              </p>
              <p>
                <span className="font-medium">Customer:</span> {order.customerName}
              </p>
              <p>
                <span className="font-medium">Email:</span> {order.customerEmail}
              </p>
              <p className="text-sm text-gray-500">Ordered on {format(new Date(order._createdAt), "PP")}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

