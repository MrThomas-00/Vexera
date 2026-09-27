import { useEffect, useRef, useState } from 'react'
import BedwarsImg from '/bedwars.jpg'
import PracticeImg from '/practice.jpg'
import RoleplayImg from '/roleplay.jpg'
import SmpImg from '/smp.jpg'

const gameModes = [
  {
    title: 'Bedwars',
    image: BedwarsImg,
    desc: 'تخت حریف رو نابود کن، منابع جمع کن و آخرین تیمی باش که رو نقشه می‌مونه.',
    area: 'large',
  },
  {
    title: 'Practice',
    image: PracticeImg,
    desc: 'مهارتت رو تو محیط تمرینی بسنج و برای رقابت آماده شو.',
    area: 'medium',
    imgPosition: 'sm:object-right',
  },
  {
    title: 'Roleplay',
    image: RoleplayImg,
    desc: 'یه شخصیت بساز و داستان خودت رو بساز.',
    area: 'top',
  },
  {
    title: 'SMP',
    image: SmpImg,
    desc: 'با دوستانت یه دنیای مشترک بساز.',
    area: 'bottom',
  },
]

function useParticles(active, color = '#397bcc') {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const rafRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const spawn = () => {
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: canvas.height + 10,
        r: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.6 + 0.3,
        drift: (Math.random() - 0.5) * 0.4,
        life: 1,
      })
    }

    let spawnTimer = 0

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (active) {
        spawnTimer++
        if (spawnTimer % 12 === 0 && particlesRef.current.length < 18) spawn()
      }

      particlesRef.current.forEach((p) => {
        p.y -= p.speed
        p.x += p.drift
        p.life -= 0.006
      })

      particlesRef.current = particlesRef.current.filter((p) => p.life > 0)

      particlesRef.current.forEach((p) => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.globalAlpha = Math.max(p.life, 0) * 0.6
        ctx.fill()
      })
      ctx.globalAlpha = 1

      rafRef.current = requestAnimationFrame(tick)
    }

    tick()
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      particlesRef.current = []
    }
  }, [active, color])

  return canvasRef
}

function ModeCard({ mode, className = '', style }) {
  const [hovered, setHovered] = useState(false)
  const canvasRef = useParticles(setHovered)

  return (
    <div
      style={style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative overflow-hidden rounded-sm border border-[#397bcc]/20 shadow-[0_0_25px_-5px_#397bcc50] hover:shadow-[0_0_30px_-5px_#397bcc80] transition-shadow duration-500 ${className}`}
    >
      <img
        src={mode.image}
        alt={mode.title}
        className={`absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${mode.imgPosition || ''}`}
      />
      <div className="absolute -inset-5 bg-gradient-to-t from-[#030B18] via-[#030B18]/60 to-transparent" />

      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -inset-y-10 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 transition-all duration-700 group-hover:left-[130%] group-hover:opacity-100" />
      </div>

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 p-4 sm:p-5">
        <h3 className="text-lg font-bold text-white sm:text-xl">{mode.title}</h3>
        <p className="text-xs leading-relaxed text-white/70 line-clamp-2 sm:text-sm">
          {mode.desc}
        </p>
      </div>
    </div>
  )
}

function useAmbientParticles(color = '#397bcc', count = 30) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.4,
      speed: Math.random() * 0.25 + 0.05,
      drift: (Math.random() - 0.5) * 0.15,
      opacity: Math.random() * 0.3 + 0.1,
    }))

    let rafId
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        p.y -= p.speed
        p.x += p.drift

        if (p.y < -10) {
          p.y = canvas.height + 10
          p.x = Math.random() * canvas.width
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.globalAlpha = p.opacity
        ctx.fill()
      })
      ctx.globalAlpha = 1

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

function MainSection() {
  const headerCanvasRef = useAmbientParticles('#397bcc', 30)

  return (
    <section dir="rtl" className="relative bg-[#030B18] px-6 py-20 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="relative mb-10 flex flex-col items-center text-center sm:mb-14">
          <canvas
            ref={headerCanvasRef}
            className="pointer-events-none absolute inset-0 h-full w-full"
          />

          <span className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap font-[Michroma] text-4xl text-white/[0.04] sm:text-6xl md:text-7xl lg:text-8xl">
            GAME MODES
          </span>

          <h2 className="relative font-[Lalezar] text-white text-3xl sm:text-4xl md:text-5xl uppercase">
            گیم مودهای <span className="text-[#397bcc]">وکسرا</span>
          </h2>

          <div className="mt-4 h-0.5 w-12 rounded-full bg-[#397bcc]" />

          <p className="mt-4 font-[Vazirmatn] text-sm text-white/60 sm:text-base max-w-md">
            هر حالت یه تجربه متفاوته؛ همونی که مناسب سبک بازی توئه رو انتخاب کن.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:hidden">
          {gameModes
            .filter((m) => m.area === 'large')
            .map((mode) => (
              <ModeCard key={mode.title} mode={mode} className="col-span-2 h-64" />
            ))}
          {gameModes
            .filter((m) => m.area === 'medium')
            .map((mode) => (
              <ModeCard key={mode.title} mode={mode} className="col-span-2 h-52" />
            ))}
          {gameModes
            .filter((m) => m.area === 'top' || m.area === 'bottom')
            .map((mode) => (
              <ModeCard key={mode.title} mode={mode} className="h-40" />
            ))}
        </div>

        <div
          className="hidden gap-5 sm:grid"
          style={{
            gridTemplateColumns: '1.6fr 1fr 1.1fr',
            gridTemplateRows: '1fr 1fr',
            gridTemplateAreas: `"large medium top" "large medium bottom"`,
            minHeight: '520px',
          }}
        >
          {gameModes.map((mode) => (
            <ModeCard key={mode.title} mode={mode} style={{ gridArea: mode.area }} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default MainSection