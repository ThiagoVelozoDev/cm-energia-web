import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Authority from '../components/sections/Authority';
import Services from '../components/sections/Services';
import SolarHighlight from '../components/sections/SolarHighlight';
import HowItWorks from '../components/sections/HowItWorks';
import ProjectsPreview from '../components/sections/ProjectsPreview';
import Testimonials from '../components/sections/Testimonials';
import CTASection from '../components/sections/CTASection';
import ContactSection from '../components/sections/ContactSection';

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Authority />
      <Services />
      <SolarHighlight />
      <HowItWorks />
      <ProjectsPreview />
      <Testimonials />
      <CTASection />
      <ContactSection />
    </main>
  );
}
