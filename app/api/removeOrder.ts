import { removeOrder } from "../../sanity/lib/sanity"
import type { NextApiRequest, NextApiResponse } from "next"


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  const { orderId } = req.query

  if (!orderId || typeof orderId !== "string") {
    return res.status(400).json({ message: "Invalid order ID" })
  }

  try {
    await removeOrder(orderId)
    res.status(200).json({ message: "Order removed successfully" })
  } catch (error) {
    console.error("Error removing order:", error)
    res
      .status(500)
      .json({ message: "Error removing order", error: error instanceof Error ? error.message : String(error) })
  }
}

