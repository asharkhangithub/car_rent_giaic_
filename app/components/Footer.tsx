"use client"

import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Car Rental</h3>
            <p>Rent your dream car today</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <p>Email: info@carrental.com</p>
            <p>Phone: +1 234 567 8900</p>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2023 Car Rental. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

