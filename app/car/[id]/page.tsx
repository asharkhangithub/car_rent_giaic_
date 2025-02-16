import { client } from "../../../sanity/lib/sanity"
import CarDetailClient from "../../components/CarDetailClient"


async function getCar(id: string) {
  const query = `*[_type == "car" && _id == $id][0] {
    _id,
    name,
    brand,
    type,
    fuelCapacity,
    transmission,
    seatingCapacity,
    pricePerDay,
    originalPrice,
    tags,
    image
  }`
  return client.fetch(query, { id })
}

export default async function CarDetailPage({ params }: { params: { id: string } }) {
  const car = await getCar(params.id)

  if (!car) {
    return <div>Car not found</div>
  }

  return <CarDetailClient car={car} />
}

