import { useEffect, useRef, useState, useCallback } from 'react'

const ranks = [
  {
    id: 'sword',
    name: 'Sword',
    price: '۴۹,۰۰۰ تومان',
    image: '/ranks/sword.jpg',
    description: 'شروع خوب برای بازیکنایی که می‌خوان یه قدم جلوتر باشن.',
    tags: ['کیت روزانه', 'تگ رنکی', '۲ سرور خانگی'],
  },
  {
    id: 'knight',
    name: 'Knight',
    price: '۹۹,۰۰۰ تومان',
    image: '/ranks/knight.jpg',
    description: 'دسترسی به کیت‌های اختصاصی و امکانات ویژه‌ی بیشتر.',
    tags: ['کیت هفتگی', 'رنگ نام اختصاصی', '/fly محدود', '۵ سرور خانگی'],
  },
  {
    id: 'king',
    name: 'King',
    price: '۱۹۹,۰۰۰ تومان',
    image: '/ranks/king.jpg',
    description: 'تجربه کامل ووکسرا با بیشترین امکانات و اولویت‌ها.',
    tags: ['کیت روزانه ویژه', '/fly نامحدود', 'صندوقچه اختصاصی', 'اولویت ورود'],
    popular: true,
  },
  {
    id: 'legend',
    name: 'Legend',
    price: '۳۴۹,۰۰۰ تومان',
    image: '/ranks/legend.jpg',
    description: 'بالاترین سطح دسترسی برای بازیکنای حرفه‌ای ووکسرا.',
    tags: ['همه امکانات King', 'تگ متحرک', 'دسترسی ادمین‌پنل محدود'],
  },
]

const N = ranks.length
const extendedRanks = [...ranks, ...ranks, ...ranks].map((rank, i) => ({ ...rank, extIndex: i }))

const CARD_CLIP = 'polygon(0 0, calc(100% - 26px) 0, 100% 26px, 100% 100%, 0 100%)'
const TAG_CLIP = 'polygon(7px 0, 100% 0, 100% 100%, 0 100%, 0 7px)'
const BTN_CLIP = 'polygon(12px 0, 100% 0, 100% 100%, 0 100%, 0 12px)'

const AUTOPLAY_DELAY = 3800
const RESUME_DELAY = 5000
const SCROLL_DURATION = 650

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3)
}

function Tag({ children }) {
  return (
    <span className="inline-flex items-center bg-white/[0.06] px-2.5 py-1 text-[10px] text-white/65 ring-1 ring-inset ring-white/10 transition-all duration-300 hover:bg-[#397bcc]/20 hover:text-white hover:ring-[#397bcc]/30 sm:text-[11px]" style={{ clipPath: TAG_CLIP }}>
      {children}
    </span>
  )
}

function RankCard({ rank, distance }) {
  const isActive = distance === 0
  const absDistance = Math.abs(distance)

  const opacity = isActive ? 1 : Math.max(1 - absDistance * 0.4, 0.3)
  const scale = isActive ? 1 : absDistance === 1 ? 0.88 : 0.82
  const blur = isActive ? 0 : Math.min(absDistance * 1.2, 3)

  return (
    <div dir="rtl" className="group relative h-[var(--card-h)] w-[var(--card-w)] shrink-0 transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)]" style={{ opacity, transform: `scale(${scale})`, filter: `blur(${blur}px)` }}>

<div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[280px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#397bcc]/10 blur-[90px]" />
      <div className={`absolute inset-0 transition-all duration-700 ${isActive ? 'shadow-[0_0_40px_rgba(57,123,204,0.28)]' : ''}`} style={{ clipPath: CARD_CLIP, background: isActive ? 'linear-gradient(135deg,#397bcc 0%,#397bcc55 40%,#397bcc10 100%)' : 'rgba(255,255,255,0.07)' }} />

      {/* Card */}
      <div className="absolute inset-[2px] overflow-hidden bg-[#071426]" style={{ clipPath: CARD_CLIP }}>

        <img src={rank.image} alt={rank.name} draggable="false" className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out ${isActive ? 'scale-110' : 'scale-100'}`} />

        <div className="absolute inset-0 bg-gradient-to-t from-[#030B18] via-[#030B18]/55 to-[#030B18]/10" />

        <div className={`absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(57,123,204,0.32),transparent_48%)] transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-0'}`} />

        {/* Shine */}
        <div className={`pointer-events-none  absolute -left-1/2 top-0 h-full w-1/2 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-all duration-[1400ms] ${isActive ? 'translate-x-[300%]' : '-translate-x-full'}`} />

        {/* Price */}
        <span dir="ltr" className="absolute left-4 top-4 z-10 rounded-md bg-black/30 px-2 py-1 text-xs font-bold text-white/90 backdrop-blur-md">
          {rank.price}
        </span>

        {/* Popular */}
        {rank.popular && (
          <span className="absolute right-[-34px] top-[18px] z-20 w-32 rotate-45 bg-[#397bcc] py-1 text-center text-[10px] font-bold text-white shadow-[0_0_20px_rgba(57,123,204,0.45)]">
            برترین
          </span>
        )}

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-5">

          <div>
            <div className="mb-1 flex items-center gap-2">
              <span className={`h-1.5 w-1.5 rounded-full bg-[#397bcc] transition-all duration-500 ${isActive ? 'shadow-[0_0_12px_#397bcc]' : ''}`} />
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#397bcc]">VOXERA RANK</span>
            </div>

            <h3 className="font-[Lalezar] text-3xl uppercase leading-none text-white drop-shadow-lg">
              {rank.name}
            </h3>

            <p className="mt-2 text-xs leading-relaxed text-white/60 sm:text-sm">
              {rank.description}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {rank.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>

          {/* Button */}
          <button type="button" className="group/btn relative mt-1 w-full overflow-hidden bg-[#397bcc] py-2.5 text-sm font-bold text-white shadow-[0_5px_20px_rgba(57,123,204,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#4689dc] hover:shadow-[0_8px_30px_rgba(57,123,204,0.4)] active:translate-y-0" style={{ clipPath: BTN_CLIP }}>
            <span className="absolute inset-y-0 -left-10 w-8 rotate-[20deg] bg-white/25 blur-sm transition-all duration-500 group-hover/btn:left-[110%]" />
            <span className="relative">سفارش رنک</span>
          </button>

        </div>
      </div>
    </div>
  )
}

function ArrowIcon({ flip = false }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`h-4 w-4 ${flip ? 'rotate-180' : ''}`}>
      <path d="M9 6l6 6-6 6" />
    </svg>
  )
}

export default function RankCarousel() {
  const trackRef = useRef(null)
  const activeExtRef = useRef(N)
  const animRafRef = useRef(null)
  const settleTimerRef = useRef(null)
  const isAnimatingRef = useRef(false)
  const hoverRef = useRef(false)
  const resumeAtRef = useRef(0)

  const [activeExt, setActiveExt] = useState(N)

  const pauseForInteraction = useCallback(() => {
    resumeAtRef.current = Date.now() + RESUME_DELAY
  }, [])

  const isPaused = useCallback(() => {
    return hoverRef.current || Date.now() < resumeAtRef.current
  }, [])

  const getTargetScrollLeft = useCallback((extIndex) => {
    const track = trackRef.current
    if (!track) return null

    const card = track.querySelector(`[data-ext="${extIndex}"]`)
    if (!card) return null

    const target = card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2

    return Math.max(0, Math.min(target, track.scrollWidth - track.clientWidth))
  }, [])

  const animateTo = useCallback((extIndex, { instant = false } = {}) => {
    const track = trackRef.current
    const target = getTargetScrollLeft(extIndex)

    if (!track || target === null) return

    cancelAnimationFrame(animRafRef.current)

    if (instant) {
      track.scrollLeft = target
      activeExtRef.current = extIndex
      setActiveExt(extIndex)
      return
    }

    isAnimatingRef.current = true

    const start = track.scrollLeft
    const change = target - start
    const startTime = performance.now()

    const step = (now) => {
      const t = Math.min((now - startTime) / SCROLL_DURATION, 1)
      track.scrollLeft = start + change * easeOutCubic(t)

      if (t < 1) {
        animRafRef.current = requestAnimationFrame(step)
        return
      }

      isAnimatingRef.current = false
      activeExtRef.current = extIndex
      setActiveExt(extIndex)

      if (extIndex < N || extIndex >= 2 * N) {
        const logical = ((extIndex % N) + N) % N
        const recentered = N + logical

        requestAnimationFrame(() => {
          animateTo(recentered, { instant: true })
        })
      }
    }

    animRafRef.current = requestAnimationFrame(step)
  }, [getTargetScrollLeft])

  const goToExt = useCallback((extIndex) => {
    pauseForInteraction()
    animateTo(extIndex)
  }, [animateTo, pauseForInteraction])

  const goToLogical = useCallback((logicalIndex) => {
    const current = activeExtRef.current

    const candidates = [logicalIndex, logicalIndex + N, logicalIndex + 2 * N]

    const target = candidates.reduce((closest, candidate) => {
      return Math.abs(candidate - current) < Math.abs(closest - current) ? candidate : closest
    })

    goToExt(target)
  }, [goToExt])

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      animateTo(N, { instant: true })
    })

    return () => cancelAnimationFrame(frame)
  }, [animateTo])

  useEffect(() => {
    const timer = setInterval(() => {
      if (isPaused()) return
      if (isAnimatingRef.current) return

      animateTo(activeExtRef.current + 1)
    }, AUTOPLAY_DELAY)

    return () => clearInterval(timer)
  }, [animateTo, isPaused])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const handleScroll = () => {
      if (isAnimatingRef.current) return

      clearTimeout(settleTimerRef.current)

      settleTimerRef.current = setTimeout(() => {
        const trackRect = track.getBoundingClientRect()
        const centerX = trackRect.left + trackRect.width / 2

        let closest = activeExtRef.current
        let closestDistance = Infinity

        track.querySelectorAll('[data-ext]').forEach((child) => {
          const rect = child.getBoundingClientRect()
          const distance = Math.abs(rect.left + rect.width / 2 - centerX)

          if (distance < closestDistance) {
            closestDistance = distance
            closest = Number(child.dataset.ext)
          }
        })

        animateTo(closest, { instant: true })
        pauseForInteraction()
      }, 100)
    }

    track.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      track.removeEventListener('scroll', handleScroll)
      clearTimeout(settleTimerRef.current)
    }
  }, [animateTo, pauseForInteraction])

  useEffect(() => {
    const handleResize = () => {
      requestAnimationFrame(() => {
        animateTo(activeExtRef.current, { instant: true })
      })
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [animateTo])

  useEffect(() => {
    return () => {
      cancelAnimationFrame(animRafRef.current)
      clearTimeout(settleTimerRef.current)
    }
  }, [])

  return (
    <section dir="rtl" className="relative overflow-hidden bg-[#030B18] px-6 py-20 sm:px-10 sm:py-28">

      <style>{`
        :root {
          --card-w: 240px;
          --card-h: 400px;
        }

        @media (min-width: 640px) {
          :root {
            --card-w: 300px;
            --card-h: 460px;
          }
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .no-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
      `}</style>


      <div className="relative mx-auto max-w-6xl">

        <div className="mb-10 flex flex-col items-center text-center sm:mb-14">
          <div className="mb-3 flex items-center gap-3">
            <span className="h-px w-10 bg-[#397bcc]/50" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#397bcc]">VOXERA STORE</span>
            <span className="h-px w-10 bg-[#397bcc]/50" />
          </div>

          <h2 className="font-[Lalezar] text-3xl uppercase text-white sm:text-4xl md:text-5xl">
            رنک‌های ووکسرا
          </h2>

          <p className="mt-3 max-w-md font-[Vazirmatn] text-sm text-white/60 sm:text-base">
            رنک مناسب سبک بازیت رو انتخاب کن و امکانات ویژه رو باز کن.
          </p>
        </div>

        <div className="relative" onMouseEnter={() => { hoverRef.current = true }} onMouseLeave={() => { hoverRef.current = false }}>

          <button type="button" onClick={() => goToExt(activeExtRef.current - 1)} aria-label="قبلی" className="absolute right-0 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 translate-x-5 items-center justify-center rounded-full border border-[#397bcc]/20 bg-[#071426]/90 text-white/60 shadow-[0_0_25px_rgba(57,123,204,0.12)] backdrop-blur-xl transition-all duration-300 hover:translate-x-4 hover:border-[#397bcc]/60 hover:bg-[#397bcc]/20 hover:text-white hover:shadow-[0_0_30px_rgba(57,123,204,0.3)] lg:flex">
            <ArrowIcon />
          </button>

          <button type="button" onClick={() => goToExt(activeExtRef.current + 1)} aria-label="بعدی" className="absolute left-0 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 -translate-x-5 items-center justify-center rounded-full border border-[#397bcc]/20 bg-[#071426]/90 text-white/60 shadow-[0_0_25px_rgba(57,123,204,0.12)] backdrop-blur-xl transition-all duration-300 hover:-translate-x-4 hover:border-[#397bcc]/60 hover:bg-[#397bcc]/20 hover:text-white hover:shadow-[0_0_30px_rgba(57,123,204,0.3)] lg:flex">
            <ArrowIcon flip />
          </button>

          {/* فضای عمودی برای Glow */}
          <div className="relative overflow-visible">

            {/* فقط این لایه اسکرول افقی دارد */}
            <div ref={trackRef} dir="ltr" onPointerDown={pauseForInteraction} className="no-scrollbar flex gap-5 overflow-x-auto overscroll-x-contain px-1 py-20" style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}>

              <div className="shrink-0" style={{ width: 'calc(50% - var(--card-w) / 2)' }} />

              {extendedRanks.map((rank) => (
                <div key={`${rank.id}-${rank.extIndex}`} data-ext={rank.extIndex} className="shrink-0">
                  <RankCard rank={rank} distance={rank.extIndex - activeExt} />
                </div>
              ))}

              <div className="shrink-0" style={{ width: 'calc(50% - var(--card-w) / 2)' }} />

            </div>

          </div>
        </div>

        {/* Dots */}
        <div className="mt-2 flex items-center justify-center gap-2">
          {ranks.map((rank, i) => {
            const isActive = ((activeExt % N) + N) % N === i

            return (
              <button type="button" key={rank.id} onClick={() => goToLogical(i)} aria-label={`رفتن به ${rank.name}`} className={`h-2 rounded-full transition-all duration-300 ${isActive ? 'w-6 bg-[#397bcc] shadow-[0_0_10px_rgba(57,123,204,0.6)]' : 'w-2 bg-white/20 hover:bg-white/40'}`} />
            )
          })}
        </div>

      </div>

    </section>
  )
}