import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CTAQuote from './components/CTAQuote'
import WhoWeAre from './components/WhoWeAre'
import Services from './components/Services'
import OurWorks from './components/OurWorks'
import Footer from './components/Footer'

export default function App() {
  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh' }}>
      <Navbar />
      <Hero />
      <WhoWeAre />
      <Services />
      <OurWorks />
      <CTAQuote />
      <Footer />
    </div>
  )
}
