import { createClient } from "next-sanity"
import imageUrlBuilder from "@sanity/image-url"
import type { SanityDocument } from "@sanity/client"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-05-03"
const token = process.env.SANITY_API_TOKEN

if (!projectId) {
  throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID is not set in environment variables")
}

if (!dataset) {
  throw new Error("NEXT_PUBLIC_SANITY_DATASET is not set in environment variables")
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
})

const builder = imageUrlBuilder(client)

export function urlForImage(source: any) {
  return builder.image(source)
}

export interface SanityOrder extends SanityDocument {
  _type: "order"
  car: {
    _type: "reference"
    _ref: string
  }
  startDate: string
  endDate: string
  customerName: string
  customerEmail: string
}

export interface OrderWithCar extends Omit<SanityOrder, "car"> {
  car: {
    _id: string
    name: string
    brand: string
    image: any
  }
}

export async function createOrder(orderData: {
  car: string
  startDate: string
  endDate: string
  customerName: string
  customerEmail: string
}): Promise<SanityOrder> {
  if (!token) {
    throw new Error("SANITY_API_TOKEN is required for creating orders")
  }

  try {
    const sanityOrder: SanityOrder = {
      _type: "order",
      car: {
        _type: "reference",
        _ref: orderData.car,
      },
      startDate: orderData.startDate,
      endDate: orderData.endDate,
      customerName: orderData.customerName,
      customerEmail: orderData.customerEmail,
      _id: "", // Placeholder, Sanity will generate it
      _rev: "", // Placeholder
      _createdAt: new Date().toISOString(), // Placeholder
      _updatedAt: new Date().toISOString(), // Placeholder
    }

    return await client.create(sanityOrder)
  } catch (error) {
    console.error("Error creating order in Sanity:", error)
    throw error
  }
}

export async function getOrders(): Promise<OrderWithCar[]> {
  const query = `*[_type == "order"] {
    _id,
    _createdAt,
    startDate,
    endDate,
    customerName,
    customerEmail,
    "car": *[_type == "car" && _id == ^.car._ref][0] {
      _id,
      name,
      brand,
      image
    }
  } | order(_createdAt desc)`

  try {
    return await client.fetch(query)
  } catch (error) {
    console.error("Error fetching orders:", error)
    throw error
  }
}

export async function removeOrder(orderId: string): Promise<void> {
  if (!token) {
    throw new Error("SANITY_API_TOKEN is required for removing orders")
  }

  try {
    await client.delete(orderId)
  } catch (error) {
    console.error("Error removing order:", error)
    throw error
  }
}
