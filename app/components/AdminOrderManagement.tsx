"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

import { getOrders, removeOrder, type OrderWithCar } from "@/sanity/lib/sanity"
import { format } from "date-fns"
import { urlForImage } from "@/sanity/lib/sanity"

export default function AdminOrderManagement() {
  const [orders, setOrders] = useState<OrderWithCar[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

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

  const handleRemoveOrder = async (orderId: string) => {
    try {
      setMessage(null)
      await removeOrder(orderId)
      setMessage("Order removed successfully")
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId))
    } catch (error) {
      console.error("Error removing order:", error)
      setMessage("Failed to remove order. Please try again.")
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

  return (
    <div className="space-y-6">
      {message && <div className="bg-blue-50 border border-blue-200 text-blue-600 px-4 py-2 rounded-md">{message}</div>}

      {orders.length === 0 ? (
        <div className="text-center py-8">No orders found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Car Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Booking Period
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="relative h-10 w-10 flex-shrink-0">
                        <Image
                          src={urlForImage(order.car.image).url() || "/placeholder.svg"}
                          alt={order.car.name}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-900">{order.car.name}</div>
                        <div className="text-gray-500">{order.car.brand}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-900">{order.customerName}</div>
                    <div className="text-gray-500">{order.customerEmail}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>{format(new Date(order.startDate), "PP")}</div>
                    <div>{format(new Date(order.endDate), "PP")}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {format(new Date(order._createdAt), "PP")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button onClick={() => handleRemoveOrder(order._id)} className="text-red-600 hover:text-red-900">
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

