import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import FeaturesSection from '@/components/sections/FeaturesSection'
import SoftwareSection from '@/components/sections/SoftwareSection'
import PackagesSection from '@/components/sections/PackagesSection'
import ContactSection from '@/components/sections/ContactSection'

export default function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <SoftwareSection />
      <PackagesSection />
      <ContactSection />
    </motion.div>
  )
} 