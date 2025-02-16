import ProductListing from "./components/ProductListing";


export default function Home() {
  return (
    <div className="container py-8 space-y-8">
      <h1 className="text-2xl font-semibold">Welcome to Car Rental</h1>
      <ProductListing />
    </div>
  )
}

