import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

const navLinks = [
  { label: 'خانه', path: '/' },
  { label: 'فروشگاه', path: '/store' },
  { label: 'وبلاگ', path: '/blog' },
  { label: 'راهنما', path: '/wiki' },
  { label: 'دانلود', path: '/download' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

 
  useEffect(() => {
    const onKeyDown = (e) => e.key === 'Escape' && setIsOpen(false)
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])


  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  return (
    <>
      <header
        dir="rtl"
        className={`fixed left-1/2 top-0 z-40 mt-2 w-[95%] -translate-x-1/2 rounded-lg font-[Lalezar] font-medium transition-all duration-300 ${
          isScrolled
            ? 'md:mt-4 md:w-[85%] md:border md:border-white/10 md:bg-black/20 md:backdrop-blur-md'
            : 'md:bg-transparent'
        }`}
      >
        <nav className="flex items-center justify-between px-6 py-4 text-white">
          <Link to="/" className="text-lg font-bold voxera-title tracking-wider text-white uppercase">
            Voxera
          </Link>

          <ul className="hidden items-center gap-6 text-sm font-bold text-white/85 md:flex">
            {navLinks.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <li
                  key={item.path}
                  className={`relative after:absolute after:-bottom-1 after:right-0 after:h-0.5 after:w-full after:origin-right after:bg-white after:transition-transform after:duration-300 after:content-[''] hover:after:scale-x-100 ${
                    isActive ? 'text-white after:scale-x-100' : 'after:scale-x-0'
                  }`}
                >
                  <Link to={item.path}>{item.label}</Link>
                </li>
              )
            })}
          </ul>

          <div className="hidden items-center gap-4 md:flex">
            <button className="text-sm font-bold text-white/75 transition hover:text-white">
              ورود
            </button>

            <button className="rounded-3xl bg-white px-5 py-1.5 text-sm font-bold tracking-wide text-black transition hover:bg-white/90">
              ثبت نام
            </button>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center justify-center p-2 text-white md:hidden"
            aria-label="باز کردن منو"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16" />
              <path d="M4 12h16" />
              <path d="M4 18h16" />
            </svg>
          </button>
        </nav>
      </header>

      <div
        id="mobile-menu"
        dir="rtl"
        className={`fixed inset-0 z-[999] flex min-h-screen w-full flex-col bg-black px-8 py-8 font-[Lalezar] font-black text-white md:hidden transition-opacity duration-300 ${
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="flex items-center justify-between">
          <Link to="/" onClick={() => setIsOpen(false)} className="text-xl voxera-title text-white uppercase">
            Voxera
          </Link>

          <button
            onClick={() => setIsOpen(false)}
            className="text-3xl leading-none text-white"
            aria-label="بستن منو"
          >
            ×
          </button>
        </div>

        <div className="mt-30 flex flex-col items-center gap-8">
          {navLinks.map((item, i) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`text-2xl text-white transition-all duration-300 ${
                isOpen ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
              }`}
              style={{ transitionDelay: isOpen ? `${i * 50}ms` : '0ms' }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="mx-auto mb-10 mt-auto flex items-center gap-4 pb-8">
          <button className="text-base text-white/80">ورود</button>
          <button className="rounded-full bg-white px-8 py-3 text-sm text-black">ثبت نام</button>
        </div>
      </div>
    </>
  )
}