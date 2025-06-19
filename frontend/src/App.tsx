import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/lib/theme-context'
import { Toaster } from '@/components/ui/toaster'
import Layout from '@/components/layout/Layout'
import HomePage from '@/pages/HomePage'
import AboutPage from '@/pages/AboutPage'
import ContactPage from '@/pages/ContactPage'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Layout>
        <Toaster />
      </Router>
    </ThemeProvider>
  )
}

export default App 