import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FaDiscord, FaTelegram, FaYoutube, FaXTwitter, FaInstagram,
  FaHouse, FaStore, FaBlog, FaBookOpen, FaDownload,
  FaUsers, FaServer, FaCube,
} from 'react-icons/fa6'

function useAmbientParticles(color = '#397bcc', count = 35) {
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
      r: Math.random() * 1.3 + 0.4,
      speed: Math.random() * 0.25 + 0.05,
      drift: (Math.random() - 0.5) * 0.15,
      opacity: Math.random() * 0.35 + 0.1,
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

const socials = [
  { label: 'Discord', href: '#', icon: FaDiscord },
  { label: 'Telegram', href: '#', icon: FaTelegram },
  { label: 'YouTube', href: '#', icon: FaYoutube },
  { label: 'X', href: '#', icon: FaXTwitter },
  { label: 'Instagram', href: '#', icon: FaInstagram },
]

const quickLinks = [
  { label: 'خانه', path: '/', icon: FaHouse },
  { label: 'فروشگاه', path: '/store', icon: FaStore },
  { label: 'وبلاگ', path: '/blog', icon: FaBlog },
  { label: 'ویکی', path: '/wiki', icon: FaBookOpen },
  { label: 'دانلود', path: '/download', icon: FaDownload },
]

const contactLinks = [
  { label: 'Discord', href: '#', icon: FaDiscord },
  { label: 'Telegram', href: '#', icon: FaTelegram },
  { label: 'YouTube', href: '#', icon: FaYoutube },
  { label: 'Twitter/X', href: '#', icon: FaXTwitter },
]

const SERVER_IP = 'play.plbe.ir'

function HexLogo({ className = '' }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="#397bcc"
      strokeWidth="1.8"
      strokeLinejoin="round"
      strokeLinecap="round"
      className={className}
    >
      <path d="M16 2l12 7v14l-12 7L4 23V9z" fill="#397bcc22" />
      <path d="M16 16l12-7M16 16L4 9M16 16v14" />
    </svg>
  )
}

function FooterColumn({ title, children }) {
  return (
    <div>
      <h4 className="mb-4 flex items-center gap-2 text-sm font-bold text-white">
        <span className="h-3 w-0.5 rounded-full bg-[#397bcc]" />
        {title}
      </h4>
      <ul className="flex flex-col gap-3">{children}</ul>
    </div>
  )
}

const linkClass =
  'group flex items-center gap-2 text-sm text-white/60 transition-colors duration-300 hover:text-white'
const iconClass =
  'h-3.5 w-3.5 text-[#397bcc]/70 transition-all duration-300 group-hover:scale-125 group-hover:text-[#397bcc]'

function CopyIp() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SERVER_IP)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* clipboard در محیط ناامن کار نمی‌کنه */
    }
  }

  return (
    <button onClick={copy} className={linkClass} title="کپی آدرس سرور">
      <FaServer className={iconClass} />
      <span dir="ltr">{copied ? 'کپی شد ✓' : SERVER_IP}</span>
    </button>
  )
}

export default function Footer() {
  const particlesRef = useAmbientParticles('#397bcc', 35)
  const year = new Date().getFullYear()

  return (
    <footer dir="rtl" className="relative overflow-hidden bg-[#030B18] text-white">
      <style>{`
        @keyframes vox-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(4deg); }
        }
        @keyframes vox-zoom {
          from { transform: scale(1); }
          to { transform: scale(1.08); }
        }
      `}</style>

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#397bcc]/60 to-transparent" />
      <canvas ref={particlesRef} className="pointer-events-none absolute inset-0 h-full w-full" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-[#397bcc]/15 blur-[100px]" />
      <div className="pointer-events-none absolute -top-24 right-10 h-64 w-64 rounded-full bg-[#397bcc]/10 blur-[100px]" />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-y-10 px-6 pb-8 pt-12 sm:px-10 lg:grid-cols-[1.5fr_1fr] lg:gap-x-10 lg:pt-16">
        {/* عکس با لبه مورب */}
        <div className="relative h-56 sm:h-72 lg:col-start-1 lg:row-start-1 lg:h-[300px]">
          <div
            className="absolute inset-0"
            style={{
              maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
            }}
          >
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: 'polygon(14% 0, 100% 0, 100% 100%, 0 100%)' }}
            >
              <video
                src="./footer.mp4"
                muted
                autoPlay
                loop
                alt=""
                className="h-full w-full object-cover"
                style={{ animation: 'vox-zoom 20s ease-in-out infinite alternate' }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#030B18]/70 via-transparent to-transparent" />
            </div>

            <svg
              className="pointer-events-none absolute inset-0 h-full w-full drop-shadow-[0_0_6px_#397bcc]"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <line
                x1="14" y1="0" x2="0" y2="100"
                stroke="#397bcc"
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
        </div>

        {/* برند */}
        <div className="flex flex-col lg:col-start-2 lg:row-start-1 lg:row-span-2">
          <div className="flex items-center gap-3">
            <HexLogo className="h-10 w-10 drop-shadow-[0_0_10px_#397bcc80]" />
            <span className="voxera-title text-3xl uppercase text-white">
              VOX<span className="text-[#397bcc]">ERA</span>
            </span>
          </div>

          <h3 className="mt-6 font-[Lalezar] text-xl text-white sm:text-2xl">
            جایی که ماجراجویی واقعی شروع میشه
          </h3>

          <p className="mt-4 max-w-sm font-[Vazirmatn] text-sm leading-7 text-white/60">
            وارد دنیای VOXERA شو؛ جایی برای ساختن، کشف کردن و رقابت. با دوستانت همراه شو،
            قلمرو خودت رو بساز و داستانت رو در دنیایی بی‌مرز رقم بزن.
          </p>

          <div className="mt-6 flex gap-3">
            {socials.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-all duration-300 hover:-translate-y-1 hover:border-[#397bcc]/60 hover:bg-[#397bcc]/15 hover:text-white hover:shadow-[0_0_18px_-2px_#397bcc90]"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          <p
            dir="ltr"
            className="mt-8 w-fit origin-left -rotate-6 self-end bg-gradient-to-r from-[#397bcc] to-[#8ec1ff] bg-clip-text font-[Kaushan_Script] text-3xl leading-tight text-transparent drop-shadow-[0_0_14px_#397bcc60]"
          >
            Play together
            <br />
            Build forever
          </p>

          <p dir="ltr" className="mt-auto hidden self-end pt-10 text-xs text-white/40 lg:block">
            © {year} Voxera. All rights reserved.
          </p>
        </div>

        {/* ستون‌ها */}
        <div className="relative lg:col-start-1 lg:row-start-2">
          <div className="grid grid-cols-2 gap-8 border-t border-white/5 pt-8 sm:grid-cols-3 lg:pr-28">
            <div className="col-span-2 sm:col-span-1">
              <FooterColumn title="وضعیت سرور">
                <li className="flex items-center gap-2 text-sm text-emerald-400">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </span>
                  آنلاین
                </li>
                <li className="flex items-center gap-2 text-sm text-white/60">
                  <FaUsers className="h-3.5 w-3.5 text-[#397bcc]/70" />
                  <span dir="ltr">--- / 1000</span>
                </li>
                <li><CopyIp /></li>
                <li className="flex items-center gap-2 text-sm text-white/60">
                  <FaCube className="h-3.5 w-3.5 text-[#397bcc]/70" />
                  نسخه 1.20.0
                </li>
              </FooterColumn>
            </div>

            <FooterColumn title="ارتباط با ما">
              {contactLinks.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a href={href} className={linkClass}>
                    <Icon className={iconClass} />
                    {label}
                  </a>
                </li>
              ))}
            </FooterColumn>

            <FooterColumn title="دسترسی سریع">
              {quickLinks.map(({ label, path, icon: Icon }) => (
                <li key={path}>
                  <Link to={path} className={linkClass}>
                    <Icon className={iconClass} />
                    {label}
                  </Link>
                </li>
              ))}
            </FooterColumn>
          </div>

          {/* مکعب دکوری */}
          <HexLogo
            className="pointer-events-none absolute -bottom-2 right-0 hidden h-24 w-24 opacity-30 drop-shadow-[0_0_20px_#397bcc] lg:block"
          />
          <div
            className="pointer-events-none absolute -bottom-2 right-0 hidden h-24 w-24 lg:block"
            style={{ animation: 'vox-float 6s ease-in-out infinite' }}
          />
        </div>
      </div>

      {/* کپی‌رایت موبایل */}
      <p dir="ltr" className="relative pb-6 text-center text-xs text-white/40 lg:hidden">
        © {year} Voxera. All rights reserved.
      </p>
    </footer>
  )
}