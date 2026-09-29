import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

import Header from './components/Header'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'
import SmoothScroll from './components/SmoothScroll'
import ScrollToTop from './components/ScrollToTop'

import Home from './pages/Home'
import Store from './pages/Store'
import Blog from './pages/Blog'
import Wiki from './pages/Wiki'
import Download from './pages/Download'
import NotFound from './pages/NotFound'

const pageTitles = {
  '/': 'خانه',
  '/store': 'فروشگاه',
  '/blog': 'وبلاگ',
  '/wiki': 'راهنما',
  '/download': 'دانلود',
}

function PageTitle() {
  const { pathname } = useLocation()

  useEffect(() => {
    document.title = `${pageTitles[pathname] || 'صفحه پیدا نشد'} | Voxera`
  }, [pathname])

  return null
}

function AppContent() {
  return (
    <div className="min-h-screen flex flex-col">
      <PageTitle />

      <Header />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/wiki" element={<Wiki />} />
          <Route path="/download" element={<Download />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default function App() {
  return (
<LoadingScreen>
  <BrowserRouter>
    <SmoothScroll />
    <ScrollToTop />
    <AppContent />
  </BrowserRouter>
</LoadingScreen>
  )
}
