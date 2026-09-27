import Button from '../components/Button'
import HeroImg from '/Heros.png'
import MainSection from '../components/mainsection'
import AboutSection from '../components/Aboutsection'

export default function Home() {
  return (
    <main>
      <section className="relative w-full h-dvh overflow-hidden">
        <img
          src={HeroImg}
          alt="پس‌زمینه ووکسرا"
          className="absolute inset-0 w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030B18] via-[#030B18]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030B18] via-[#030B18]/15 to-transparent" />

        <div className="relative z-10 h-full flex items-center">
          <div
            dir="rtl"
            className="max-w-xl px-6 sm:px-10 flex flex-col items-center text-center gap-4"
          >
            <h1 className="voxera-title text-white! text-5xl sm:text-6xl md:text-7xl uppercase leading-tight">
              Vox
              <span className="text-[#397bcc] drop-shadow-[0_0_18px_#397bcc]">
                era
              </span>
            </h1>
            <p className="text-white/95 text-lg sm:text-2xl font-light">
              جایی که ماجراجویی واقعی شروع می‌شه
            </p>
            <p className="text-white/80 text-sm sm:text-base font-light leading-relaxed">
              وارد دنیای VOXERA شو؛ جایی برای ساختن، کشف کردن و رقابت. با
              دوستانت همراه شو، قلمرو خودت رو بساز و داستانت رو در دنیایی
              بی‌مرز رقم بزن.
            </p>
            <div className="flex gap-4">
              <button className="mt-3 px-8 py-3 rounded-full bg-[#397bcc] text-white font-medium hover:bg-[#2d63a3] transition-colors">
                وارد دنیای وکسرا
              </button>
              <button
                onClick={() => {
                  console.log('Scrolling to why-voxera')
                  document.getElementById('why-voxera')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="relative z-40 mt-3 rounded-full border-2 border-[#397bcc] bg-transparent px-8 py-3 font-medium text-[#397bcc] transition-colors hover:bg-[#397bcc]/10 hover:text-white"
              >
                اطلاعات سرور
              </button>
            </div>
          </div>
        </div>



        <div
          dir="rtl"
          className="absolute bottom-4 sm:bottom-10 left-1/2 -translate-x-1/2 z-10 w-[92%] sm:w-auto max-w-md sm:max-w-none"
        >
          <div className="grid grid-cols-3 sm:flex sm:items-center gap-0 sm:gap-8 px-3 sm:px-8 py-2.5 sm:py-3 rounded-2xl sm:rounded-full bg-[#030B18]/70 backdrop-blur-sm border border-[#397bcc]/25 shadow-[0_0_25px_-5px_#397bcc50]">
            
            <div className="flex flex-col sm:flex-row items-center sm:gap-2 gap-0.5 py-1 sm:py-0 border-l sm:border-l-0 border-white/10">
              <span className="text-white text-xs sm:text-base font-medium">1000+</span>
              <span className="text-white/50 text-[10px] sm:text-sm">کل پلیرها</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:gap-2 gap-0.5 py-1 sm:py-0 border-l sm:border-l-0 border-white/10">
              <span className="text-white text-xs sm:text-base font-medium">1K+</span>
              <span className="text-white/50 text-[10px] sm:text-sm">کاربر ثبت‌نامی</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:gap-2 gap-0.5 py-1 sm:py-0">
              <span className="text-white text-xs sm:text-base font-medium">1 سال</span>
              <span className="text-white/50 text-[10px] sm:text-sm">فعالیت سرور</span>
            </div>

          </div>
        </div>
      </section>

      <MainSection />
      <AboutSection />
    </main>
  )
}