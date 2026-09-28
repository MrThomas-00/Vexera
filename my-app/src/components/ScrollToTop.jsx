import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.history.scrollRestoration = 'manual'

    const scroll = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      })
    }

    scroll()

    const timer = setTimeout(scroll, 100)

    return () => clearTimeout(timer)
  }, [pathname])

  return null
}