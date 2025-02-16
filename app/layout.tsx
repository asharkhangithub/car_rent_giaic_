import "./globals.css"
import { Inter } from "next/font/google"

import type { Metadata } from "next"
import type React from "react"
import ClientWrapper from "./components/ClientWrapper"
import Header from "./components/Header"
import Footer from "./components/Footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Car Rental",
  description: "Rent your dream car today",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientWrapper>
          <Header />
          <main className="min-h-screen bg-background">{children}</main>
          <Footer />
        </ClientWrapper>
      </body>
    </html>
  )
}

