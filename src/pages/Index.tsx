import { useEffect, useCallback, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LoadingScreen from '../components/LoadingScreen';
import CustomCursor from '../components/CustomCursor';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import ServicesSection from '../components/sections/ServicesSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import TeamSection from '../components/sections/TeamSection';
import CTASection from '../components/sections/CTASection';

gsap.registerPlugin(ScrollTrigger);

export default function Index() {
  const [loaded, setLoaded] = useState(false);

  const onLoadComplete = useCallback(() => setLoaded(true), []);

  useEffect(() => {
    if (!loaded) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, [loaded]);

  return (
    <>
      <LoadingScreen onComplete={onLoadComplete} />
      {loaded && (
        <>
          <CustomCursor />
          <main>
            <HeroSection />
            <AboutSection />
            <ServicesSection />
            <ProjectsSection />
            <TeamSection />
            <CTASection />
          </main>
        </>
      )}
    </>
  );
}
