
import { useEffect, useState } from 'react'

const assetsToLoad = ['/voxera-world.mp4', '/Footer.mp4', '/Heros.png']

const preloadAsset = (src) =>
  new Promise((resolve) => {
    const isVideo = /\.(mp4|webm|ogg|mov)$/i.test(src)
    const media = isVideo ? document.createElement('video') : new Image()

    const complete = () => resolve()

    if (isVideo) {
      media.preload = 'auto'
      media.muted = true
      media.playsInline = true
      media.onloadeddata = complete
      media.onerror = complete
      media.src = src
      return
    }

    media.onload = complete
    media.onerror = complete
    media.src = src
  })

export default function LoadingScreen({ children }) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    const loadAssets = async () => {
      await Promise.all(assetsToLoad.map(preloadAsset))

      if (mounted) {
        setIsLoading(false)
      }
    }

    loadAssets()

    return () => {
      mounted = false
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
          <p className="voxera-title text-3xl tracking-wider text-[#397bcc]">
            V<span className="text-white">OXERA</span>
          </p>
        </div>
      </div>
    </div>
  )
}

