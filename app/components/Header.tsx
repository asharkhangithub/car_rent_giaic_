"use client"

import Link from "next/link"
import { ShoppingCart, Heart, User, ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Header() {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button onClick={handleBack} className="p-2 hover:bg-gray-100 rounded-full" aria-label="Go back">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <Link href="/" className="text-xl font-semibold text-gray-900">
              Car Rental
            </Link>
          </div>
          <nav>
            <ul className="flex items-center gap-6">
              <li>
                <Link href="/orders" className="text-sm text-gray-500 hover:text-gray-900">
                  Orders
                </Link>
              </li>
              <li>
                <Link href="/admin/order" className="text-sm text-gray-500 hover:text-gray-900">
                  Admin Orders
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-gray-500 hover:text-gray-900">
                  <ShoppingCart className="w-5 h-5" />
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="text-gray-500 hover:text-gray-900">
                  <Heart className="w-5 h-5" />
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-gray-500 hover:text-gray-900">
                  <User className="w-5 h-5" />
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

