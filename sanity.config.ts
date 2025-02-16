import { defineConfig } from "sanity"
import { deskTool } from "sanity/desk"

import { schemaTypes } from "./sanity/schemaTypes"

const config = defineConfig({
  basePath: "/studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
})

export default config

function visionTool(): any {
  throw new Error("Function not implemented.")
}

