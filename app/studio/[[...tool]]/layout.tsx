

export const metadata = {
  title: "Sanity Studio",
  description: "Admin dashboard for managing car rental content",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

