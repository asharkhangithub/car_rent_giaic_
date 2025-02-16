import { Inter } from "next/font/google"
import type { Metadata } from "next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Car Rental",
  description: "Rent your dream car today",
}

export { inter }

