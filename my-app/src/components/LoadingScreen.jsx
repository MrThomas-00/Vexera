import { useEffect, useState } from 'react'

export default function LoadingScreen({ children }) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const handleLoad = () => {
      setIsLoading(false)
    }

    if (document.readyState === 'complete') {
      setIsLoading(false)
    } else {
      window.addEventListener('load', handleLoad)
    }

    return () => {
      window.removeEventListener('load', handleLoad)
    }
  }, [])

  if (!isLoading) {
    return children
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#030B18]">
      <div className="pointer-events-none absolute h-96 w-96 rounded-full bg-[#397bcc]/10 blur-[120px]" />

      <div className="relative flex flex-col items-center gap-8">
        <div className="loader">
          <div className="loader-square"></div>
          <div className="loader-square"></div>
          <div className="loader-square"></div>
          <div className="loader-square"></div>
          <div className="loader-square"></div>
          <div className="loader-square"></div>
          <div className="loader-square"></div>
        </div>

        <div className="text-center">
          <p className="voxera-title text-3xl  tracking-wider text-[#397bcc]">
            V<span className='text-white'>OXERA</span>
          </p>

        </div>
      </div>
    </div>
  )
}