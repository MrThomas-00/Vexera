import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'
import Home from './pages/Home'
import Store from './pages/Store'
import Blog from './pages/Blog'
import Wiki from './pages/Wiki'
import Download from './pages/Download'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <LoadingScreen>
          <BrowserRouter>
            <div className="min-h-screen flex flex-col">
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
      </BrowserRouter>
    </LoadingScreen>
  )
}
