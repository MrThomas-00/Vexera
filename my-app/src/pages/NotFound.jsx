import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="container mx-auto py-16 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-gray-600 mb-6">Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className="inline-block px-4 py-2 bg-indigo-600 text-white rounded">Return Home</Link>
    </main>
  )
}
