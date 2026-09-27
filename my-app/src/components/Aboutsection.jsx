import { useEffect, useRef } from 'react'
import TrueFocus from './TrueFocus'

function useAmbientParticles(color = '#397bcc', count = 80) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1

    let width = 0
    let height = 0

    const resize = () => {
      width = canvas.offsetWidth
      height = canvas.offsetHeight

      canvas.width = width * dpr
      canvas.height = height * dpr

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener('resize', resize)

    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.8 + 0.5,
      speed: Math.random() * 0.45 + 0.08,
      drift: (Math.random() - 0.5) * 0.22,
      opacity: Math.random() * 0.55 + 0.15,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.025 + 0.01,
    }))

    let rafId

    const tick = () => {
      ctx.clearRect(0, 0, width, height)

      particles.forEach((p) => {
        p.y -= p.speed
        p.x += p.drift
        p.pulse += p.pulseSpeed

        if (p.y < -15) {
          p.y = height + 15
          p.x = Math.random() * width
        }

        if (p.x < -15) p.x = width + 15
        if (p.x > width + 15) p.x = -15

        const pulse = 0.65 + Math.sin(p.pulse) * 0.35

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.globalAlpha = p.opacity * pulse
        ctx.shadowBlur = 8
        ctx.shadowColor = color
        ctx.fill()
      })

      ctx.globalAlpha = 1
      ctx.shadowBlur = 0
      rafId = requestAnimationFrame(tick)
    }

    tick()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    }
  }, [color, count])

  return canvasRef
}

const features = [
  {
    title: 'پشتیبانی فعال',
    desc: 'همیشه در کنار شما',
    icon: <path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z" />,
  },
  {
    title: 'ضد چیت',
    desc: 'محافظت از تجربه بازی',
    icon: (
      <>
        <path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z" />
        <path d="M9.5 12l1.8 1.8L14.5 10" />
      </>
    ),
  },
  {
    title: 'ایده‌های مداوم',
    desc: 'تجربه‌ای همیشه تازه',
    icon: (
      <>
        <path d="M12 3a5 5 0 0 0-3 9c.6.5 1 1.2 1 2v1h4v-1c0-.8.4-1.5 1-2a5 5 0 0 0-3-9z" />
        <path d="M10 19h4M11 21h2" />
      </>
    ),
  },
  {
    title: 'پینگ پایین',
    desc: 'اتصال سریع و پایدار',
    icon: (
      <>
        <path d="M3 12a9 9 0 0 1 18 0" />
        <path d="M7 12a5 5 0 0 1 10 0" />
        <circle cx="12" cy="15" r="1.2" />
      </>
    ),
  },
  {
    title: 'داستان و اقتصاد',
    desc: 'سیستم اقتصادی و جذاب',
    icon: (
      <>
        <path d="M5 4h11l3 3v13H5z" />
        <path d="M9 9h6M9 13h6M9 17h3" />
      </>
    ),
  },
  {
    title: 'پشتیبان‌گیری منظم',
    desc: 'امنیت و آرامش خاطر',
    icon: (
      <>
        <path d="M4 6a8 4 0 0 1 16 0v10a8 4 0 0 1-16 0z" />
        <path d="M20 6a8 4 0 0 1-16 0" />
      </>
    ),
  },
]

function FeatureCard({ title, desc, icon }) {
  return (
    <div className="group flex items-start gap-3 rounded-sm border border-[#397bcc]/15 bg-white/[0.025] p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#397bcc]/50 hover:bg-[#397bcc]/[0.06] hover:shadow-[0_0_30px_-8px_#397bcc]">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-[#397bcc]/10 text-[#397bcc] transition-all duration-300 group-hover:bg-[#397bcc]/20 group-hover:shadow-[0_0_20px_#397bcc55]">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          {icon}
        </svg>
      </div>

      <div>
        <h4 className="text-sm font-bold text-white sm:text-base">{title}</h4>
        <p className="mt-0.5 text-xs text-white/50 sm:text-sm">{desc}</p>
      </div>
    </div>
  )
}

function CutCornerImage({ className = '' }) {
  const clipPath = 'polygon(0 0, calc(100% - 36px) 0, 100% 36px, 100% 100%, 36px 100%, 0 calc(100% - 36px))'

  return (
    <div className={`relative ${className}`}>
      <div className="pointer-events-none absolute -inset-12 rounded-full bg-[#397bcc]/25 blur-[80px] animate-pulse" />
      <div className="pointer-events-none absolute -inset-4 rounded-full bg-[#397bcc]/10 blur-[40px]" />

      <div className="absolute inset-0 bg-gradient-to-br from-[#397bcc]/70 via-[#397bcc]/20 to-[#397bcc]/5" style={{ clipPath }} />

      <div className="absolute inset-[2px] overflow-hidden" style={{ clipPath }}>
        <video autoPlay loop muted playsInline src="./voxera-world.mp4" className="h-full w-full object-cover scale-[1.02] transition-transform duration-700 hover:scale-105" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#030B18]/80 via-[#030B18]/10 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#397bcc]/20 via-transparent to-[#397bcc]/10" />

        <div className="pointer-events-none absolute left-0 top-0 h-px w-full bg-[#397bcc]/60 shadow-[0_0_12px_#397bcc] animate-[scan_5s_linear_infinite]" />
      </div>

      <div className="pointer-events-none absolute right-0 top-0 h-20 w-20 bg-[#397bcc]/30 blur-[35px]" />
    </div>
  )
}

export default function WhyVoxera() {
  const particlesRef = useAmbientParticles('#397bcc', 80)

  return (
    <section dir="rtl" id="why-voxera" className="relative bg-[#030B18] px-6 py-20 sm:px-10 sm:py-28">

      <canvas ref={particlesRef} className="pointer-events-none absolute inset-0 z-10 h-full w-full" />

      <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-[#397bcc]/30 blur-[90px]" />
      <div className="pointer-events-none absolute -top-20 right-0 h-64 w-64 rounded-full bg-[#397bcc]/20 blur-[90px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#397bcc]/[0.04] blur-[120px]" />

      <div className="relative z-20 mx-auto max-w-6xl">

        <div className="lg:hidden">
          <CutCornerImage className="h-64" />

          <div className="mt-6 text-center">
            <span className="inline-block rounded-full border border-[#397bcc]/30 bg-[#397bcc]/10 px-4 py-1 text-xs font-medium text-[#397bcc] shadow-[0_0_20px_-8px_#397bcc]">
              ویژگی‌های سرور
            </span>

            <h2 className="mt-4 font-[Lalezar] text-3xl text-white">
             
<TrueFocus 
sentence="چرا وکــسرا ؟"
manualMode={false}
blurAmount={5}
borderColor="#397bcc"
animationDuration={0.5}
pauseBetweenAnimations={1}
/>
            </h2>

            <p className="mt-3 font-[Vazirmatn] text-sm text-white/60">
              ما فقط یک سرور نیستیم، یک جامعه همیشه.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3">
            {features.map((f) => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden grid-cols-2 items-center gap-10 lg:grid">

          <div>
            <span className="inline-block rounded-full border border-[#397bcc]/30 bg-[#397bcc]/10 px-4 py-1 text-sm font-medium text-[#397bcc] shadow-[0_0_20px_-8px_#397bcc]">
              ویژگی‌های سرور
            </span>

            <h2 className="mt-4 font-[Lalezar] justify-start text-4xl text-start flex text-white md:text-5xl">
                <span className="my-4">
                <TrueFocus 
                sentence="چرا وکــسرا ؟"
                manualMode={false}
                blurAmount={5}
                borderColor="#397bcc"
                animationDuration={0.5}
                pauseBetweenAnimations={1}
                />
                </span>
            </h2>

            <p className="mt-3 max-w-md font-[Vazirmatn] text-base text-white/60">
              ما فقط یک سرور نیستیم، یک جامعه همیشه.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {features.map((f) => (
                <FeatureCard key={f.title} {...f} />
              ))}
            </div>
          </div>

          <CutCornerImage className="h-[480px]" />
        </div>

        {/* Server Status */}
        <div className="relative mt-10 flex flex-col items-center justify-between gap-6 overflow-hidden rounded-2xl border border-[#397bcc]/20 bg-white/[0.025] px-6 py-5 backdrop-blur-md shadow-[0_0_40px_-20px_#397bcc] sm:flex-row sm:px-8">

          <div className="pointer-events-none absolute -right-20 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-emerald-400/10 blur-[50px]" />

          <div className="relative flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399]" />
            </span>

            <div>
              <p className="text-sm font-bold text-white sm:text-base">سرور آنلاین است</p>
              <p className="text-xs text-white/50 sm:text-sm">همین حالا وارد بازی شو</p>
            </div>
          </div>

          <div className="relative flex flex-wrap items-center justify-center gap-6 sm:gap-10">

            <div className="text-center">
              <p className="text-[10px] text-white/40 sm:text-xs">سرور</p>
              <p className="text-sm font-medium text-[#397bcc] sm:text-base">play.plbe.ir</p>
            </div>

            <div className="h-6 w-px bg-white/10" />

            <div className="text-center">
              <p className="text-[10px] text-white/40 sm:text-xs">نسخه</p>
              <p className="text-sm font-medium text-white sm:text-base">1.20.0</p>
            </div>

            <div className="h-6 w-px bg-white/10" />

            <div className="text-center">
              <p className="text-[10px] text-white/40 sm:text-xs">بازیکنان آنلاین</p>
              <p className="text-sm font-medium text-white sm:text-base">--- / 1000</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}