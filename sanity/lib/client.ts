import { createClient } from "next-sanity"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-05-03"

if (!projectId) {
  throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID is not set in environment variables")
}

if (!/^[a-z0-9]+$/.test(projectId)) {
  throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID is invalid. It can only contain lowercase letters and numbers.")
}

if (!dataset) {
  throw new Error("NEXT_PUBLIC_SANITY_DATASET is not set in environment variables")
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
})

