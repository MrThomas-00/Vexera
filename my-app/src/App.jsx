
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, lazy, Suspense } from 'react'

import Header from './components/Header'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'
import SmoothScroll from './components/SmoothScroll'
import ScrollToTop from './components/ScrollToTop'

const Home = lazy(() => import('./pages/Home'))
const Store = lazy(() => import('./pages/Store'))
const Blog = lazy(() => import('./pages/Blog'))
const Wiki = lazy(() => import('./pages/Wiki'))
const Download = lazy(() => import('./pages/Download'))
const NotFound = lazy(() => import('./pages/NotFound'))

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
        <Suspense fallback={<div className="min-h-screen" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<Store />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/wiki" element={<Wiki />} />
            <Route path="/download" element={<Download />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <LoadingScreen>
      <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <SmoothScroll />
        <ScrollToTop />
        <AppContent />
      </BrowserRouter>
    </LoadingScreen>
  )
}

