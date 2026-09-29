import { useCallback, useEffect, useRef, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { getRanks } from '../api/api'

const CARD_CLIP = 'polygon(0 0, calc(100% - 26px) 0, 100% 26px, 100% 100%, 0 100%)'
const TAG_CLIP = 'polygon(7px 0, 100% 0, 100% 100%, 0 100%, 0 7px)'
const BTN_CLIP = 'polygon(12px 0, 100% 0, 100% 100%, 0 100%, 0 12px)'

function circularDistance(index, selected, length) {
  let diff = index - selected
  if (diff > length / 2) diff -= length
  if (diff < -length / 2) diff += length
  return diff
}

function Tag({ children }) {
  return (
    <span
      className="inline-flex items-center bg-white/[0.06] px-2.5 py-1 text-[10px] text-white/65 ring-1 ring-inset ring-white/10 transition-all duration-300 hover:bg-[#397bcc]/20 hover:text-white hover:ring-[#397bcc]/30 sm:text-[11px]"
      style={{ clipPath: TAG_CLIP }}
    >
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
    <div
      dir="rtl"
      className="group relative h-[var(--card-h)] w-[var(--card-w)] shrink-0 transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)]"
      style={{ opacity, transform: `scale(${scale})`, filter: `blur(${blur}px)` }}
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[280px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#397bcc]/10 blur-[90px]" />

      <div
        className={`absolute inset-0 transition-all duration-700 ${isActive ? 'shadow-[0_0_40px_rgba(57,123,204,0.28)]' : ''}`}
        style={{
          clipPath: CARD_CLIP,
          background: isActive ? 'linear-gradient(135deg,#397bcc 0%,#397bcc55 40%,#397bcc10 100%)' : 'rgba(255,255,255,0.07)',
        }}
      />

      <div className="absolute inset-[2px] overflow-hidden bg-[#071426]" style={{ clipPath: CARD_CLIP }}>
        <img
          src={rank.image}
          alt={rank.name}
          draggable="false"
          className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out ${isActive ? 'scale-110' : 'scale-100'}`}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#030B18] via-[#030B18]/55 to-[#030B18]/10" />
        <div
          className={`absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(57,123,204,0.32),transparent_48%)] transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-0'}`}
        />

        <span dir="ltr" className="absolute left-4 top-4 z-10 rounded-md bg-black/30 px-2 py-1 text-xs font-bold text-white/90 backdrop-blur-md">
          {Number(rank.price).toLocaleString('fa-IR')} تومان
        </span>

        {rank.is_popular && (
          <span className="absolute right-[-34px] top-[18px] z-20 w-32 rotate-45 bg-[#397bcc] py-1 text-center text-[10px] font-bold text-white shadow-[0_0_20px_rgba(57,123,204,0.45)]">
            برترین
          </span>
        )}

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

          <div className="flex flex-wrap gap-1.5">
            {rank.tags?.map((tag, index) => (
              <Tag key={`${tag}-${index}`}>{tag}</Tag>
            ))}
          </div>

          <button
            type="button"
            className="group/btn relative mt-1 w-full overflow-hidden bg-[#397bcc] py-2.5 text-sm font-bold text-white shadow-[0_5px_20px_rgba(57,123,204,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#4689dc] hover:shadow-[0_8px_30px_rgba(57,123,204,0.4)] active:translate-y-0"
            style={{ clipPath: BTN_CLIP }}
          >
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

// ── اسکلتون لودینگ: همون قاب کارت اصلی، بدون محتوا، با پالس ملایم ──
function RankCardSkeleton({ delay = 0 }) {
  return (
    <div
      className="relative h-[var(--card-h)] w-[var(--card-w)] shrink-0 animate-pulse"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute inset-0" style={{ clipPath: CARD_CLIP, background: 'rgba(255,255,255,0.06)' }} />
      <div className="absolute inset-[2px] overflow-hidden bg-[#0a1a30]" style={{ clipPath: CARD_CLIP }}>
        <div className="absolute inset-x-4 top-4 h-4 w-16 rounded-md bg-white/10" />
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-5">
          <div className="h-3 w-20 rounded bg-[#397bcc]/20" />
          <div className="h-7 w-28 rounded bg-white/10" />
          <div className="h-3 w-full rounded bg-white/[0.06]" />
          <div className="h-3 w-3/4 rounded bg-white/[0.06]" />
          <div className="flex gap-1.5">
            <div className="h-6 w-16 rounded bg-white/[0.06]" />
            <div className="h-6 w-20 rounded bg-white/[0.06]" />
          </div>
          <div className="mt-1 h-10 w-full rounded bg-[#397bcc]/15" />
        </div>
      </div>
    </div>
  )
}

function LoadingState() {
  return (
    <div className="flex justify-center gap-5 overflow-hidden py-10 sm:py-16">
      {[0, 120, 240].map((delay, i) => (
        <div key={i} className={i === 1 ? '' : 'hidden sm:block'}>
          <RankCardSkeleton delay={delay} />
        </div>
      ))}
    </div>
  )
}

function IconAlert() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
      <path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
    </svg>
  )
}

function IconBox() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
      <path d="M21 8 12 3 3 8l9 5 9-5Z" />
      <path d="M3 8v8l9 5 9-5V8M12 13v8" />
    </svg>
  )
}

function EmptyOrErrorState({ variant = 'empty', onRetry }) {
  const isError = variant === 'error'
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-full ${
          isError ? 'bg-red-500/10 text-red-400' : 'bg-white/5 text-white/40'
        }`}
      >
        {isError ? <IconAlert /> : <IconBox />}
      </div>
      <p className={`text-sm ${isError ? 'text-red-400' : 'text-white/50'}`}>
        {isError ? 'دریافت رنک‌ها با مشکل مواجه شد.' : 'رنکی برای نمایش وجود ندارد.'}
      </p>
      {isError && onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-1 rounded-full border border-[#397bcc]/30 bg-[#397bcc]/10 px-4 py-1.5 text-xs font-medium text-[#397bcc] transition-colors hover:bg-[#397bcc]/20"
        >
          تلاش دوباره
        </button>
      )}
    </div>
  )
}

export default function RankCarousel() {
  const sectionRef = useRef(null)

  const autoplayRef = useRef(
    Autoplay({ delay: 3800, stopOnInteraction: false, stopOnMouseEnter: true, stopOnFocusIn: true })
  )

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'center', direction: 'rtl', containScroll: false },
    [autoplayRef.current]
  )

  const [ranks, setRanks] = useState([])
  const [selectedExt, setSelectedExt] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const loadRanks = useCallback(async () => {
    try {
      setLoading(true)
      setError(false)
      const data = await getRanks()
      setRanks(data)
    } catch (err) {
      console.error('Failed to load ranks:', err)
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadRanks()
  }, [loadRanks])

  const onSelect = useCallback((api) => {
    setSelectedExt(api.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!emblaApi) return
    onSelect(emblaApi)
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi, onSelect])

  useEffect(() => {
    const section = sectionRef.current
    const autoplay = autoplayRef.current
    if (!section || !autoplay) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) autoplay.play()
        else autoplay.stop()
      },
      { threshold: 0.35 }
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  const N = ranks.length
  const MIN_SLIDES_FOR_LOOP = 8
  const loopMultiplier = N ? Math.max(2, Math.ceil(MIN_SLIDES_FOR_LOOP / N)) : 0

  const loopSlides = N
    ? Array.from({ length: loopMultiplier }, (_, rep) =>
        ranks.map((rank, i) => ({ ...rank, loopKey: `${rank.id}-${rep}-${i}` }))
      ).flat()
    : []

  const logicalIndex = N ? ((selectedExt % N) + N) % N : 0

  const goToLogical = (targetLogical) => {
    if (!emblaApi) return
    const total = loopSlides.length
    let best = targetLogical
    let bestDist = Infinity
    for (let ext = targetLogical; ext < total; ext += N) {
      const dist = Math.abs(circularDistance(ext, selectedExt, total))
      if (dist < bestDist) {
        bestDist = dist
        best = ext
      }
    }
    emblaApi.scrollTo(best)
  }

  return (
    <section ref={sectionRef} dir="rtl" className="relative overflow-hidden bg-[#030B18] px-6 py-20 sm:px-10">
      <style>{`
        :root { --card-w: 240px; --card-h: 400px; }
        @media (min-width: 640px) { :root { --card-w: 300px; --card-h: 460px; } }
      `}</style>

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col items-center text-center sm:mb-14">
          <div className="mb-3 flex items-center gap-3">
            <span className="h-px w-10 bg-[#397bcc]/50" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#397bcc]">VOXERA STORE</span>
            <span className="h-px w-10 bg-[#397bcc]/50" />
          </div>
          <h2 className="font-[Lalezar] text-3xl uppercase text-white sm:text-4xl md:text-5xl">
            رنک‌های وکسرا
          </h2>
          <p className="mt-3 max-w-md font-[Vazirmatn] text-sm text-white/60 sm:text-base">
            رنک مناسب سبک بازیت رو انتخاب کن و امکانات ویژه رو باز کن.
          </p>
        </div>

        {loading && <LoadingState />}
        {!loading && error && <EmptyOrErrorState variant="error" onRetry={loadRanks} />}
        {!loading && !error && ranks.length === 0 && <EmptyOrErrorState variant="empty" />}

        {!loading && !error && ranks.length > 0 && (
          <>
            <div className="relative">
              <button
                type="button"
                onClick={() => emblaApi?.scrollPrev()}
                aria-label="قبلی"
                className="absolute right-0 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 translate-x-5 items-center justify-center rounded-full border border-[#397bcc]/20 bg-[#071426]/90 text-white/60 shadow-[0_0_25px_rgba(57,123,204,0.12)] backdrop-blur-xl transition-all duration-300 hover:translate-x-4 hover:border-[#397bcc]/60 hover:bg-[#397bcc]/20 hover:text-white hover:shadow-[0_0_30px_rgba(57,123,204,0.3)] lg:flex"
              >
                <ArrowIcon />
              </button>
              <button
                type="button"
                onClick={() => emblaApi?.scrollNext()}
                aria-label="بعدی"
                className="absolute left-0 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 -translate-x-5 items-center justify-center rounded-full border border-[#397bcc]/20 bg-[#071426]/90 text-white/60 shadow-[0_0_25px_rgba(57,123,204,0.12)] backdrop-blur-xl transition-all duration-300 hover:-translate-x-4 hover:border-[#397bcc]/60 hover:bg-[#397bcc]/20 hover:text-white hover:shadow-[0_0_30px_rgba(57,123,204,0.3)] lg:flex"
              >
                <ArrowIcon flip />
              </button>

              <div className="overflow-hidden py-10 sm:py-16" ref={emblaRef}>
                <div className="flex gap-5">
                  {loopSlides.map((rank, i) => (
                    <div key={rank.loopKey} className="shrink-0" style={{ flex: '0 0 auto' }}>
                      <RankCard rank={rank} distance={circularDistance(i, selectedExt, loopSlides.length)} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-2 flex items-center justify-center gap-2">
              {ranks.map((rank, i) => (
                <button
                  type="button"
                  key={rank.id}
                  onClick={() => goToLogical(i)}
                  aria-label={`رفتن به ${rank.name}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === logicalIndex ? 'w-6 bg-[#397bcc] shadow-[0_0_10px_rgba(57,123,204,0.6)]' : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}