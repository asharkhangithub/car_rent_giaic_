import type { NextApiRequest, NextApiResponse } from "next"
import { createOrder } from "@/sanity/lib/sanity"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  try {
    const { car, startDate, endDate, customerName, customerEmail } = req.body

    if (!car || !startDate || !endDate || !customerName || !customerEmail) {
      return res.status(400).json({ message: "Missing required fields" })
    }

    const createdOrder = await createOrder({
      car,
      startDate,
      endDate,
      customerName,
      customerEmail,
    })

    res.status(200).json(createdOrder)
  } catch (error) {
    console.error("Error creating order:", error)
    res.status(500).json({
      message: "Error creating order",
      error: error instanceof Error ? error.message : String(error),
    })
  }
}

