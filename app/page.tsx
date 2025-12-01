import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import ContentSection from '@/components/ContentSection'
import StatsSection from '@/components/StatsSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <StatsSection />
      <ContentSection />
      <TestimonialsSection />
      <Footer />
    </main>
  )
}

