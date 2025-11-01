import type { PropsWithChildren } from 'react'

export const Layout = ({ children }: PropsWithChildren) => (
  <div className="min-h-screen bg-gray-50">
    <div className="container mx-auto px-4 py-6 lg:px-8">{children}</div>
  </div>
)
