import { useEffect, useCallback, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LoadingScreen from '../components/LoadingScreen';
import CustomCursor from '../components/CustomCursor';
import ScrollProgress from '../components/ScrollProgress';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import ServicesSection from '../components/sections/ServicesSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import TeamSection from '../components/sections/TeamSection';
import CTASection from '../components/sections/CTASection';
import { ScrollRevealText, ScrollMarquee } from '../components/StorytellingTypography';
import { StoryDivider, ChapterMarker } from '../components/StorytellingElements';

gsap.registerPlugin(ScrollTrigger);

export default function Index() {
  const [loaded, setLoaded] = useState(false);

  const onLoadComplete = useCallback(() => setLoaded(true), []);

  useEffect(() => {
    if (!loaded) return;

    // Honor reduced-motion preference: skip Lenis entirely (use native scroll).
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      ScrollTrigger.refresh();
      return;
    }

    const isMobile = window.innerWidth < 768;

    const lenis = new Lenis({
      duration: isMobile ? 0.9 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Native touch scroll on mobile feels better and avoids jank
      syncTouch: false,
      touchMultiplier: 1.5,
      wheelMultiplier: 1,
    });

    // Sync Lenis -> ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Make sure ScrollTrigger picks up the new (smooth) scroll position
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, [loaded]);

  return (
    <>
      <LoadingScreen onComplete={onLoadComplete} />
      {loaded && (
        <>
          <CustomCursor />
          <main>
            {/* Chapter 1: Hero */}
            <HeroSection />

            <ScrollMarquee words={['INNOVATE', 'CREATE', 'BUILD', 'DISRUPT', 'TRANSFORM']} direction="left" />

            <ChapterMarker number="01" label="Origins" />
            <ScrollRevealText text="Our Story" subtitle="Every revolution begins with a spark" />

            {/* Chapter 2: About */}
            <AboutSection />

            <StoryDivider />
            <ChapterMarker number="02" label="Capabilities" />
            <ScrollRevealText text="Our Craft" subtitle="Where technology meets artistry" />

            {/* Chapter 3: Services */}
            <ServicesSection />

            <StoryDivider />
            <ScrollMarquee words={['DESIGN', 'DEVELOP', 'DEPLOY', 'ITERATE', 'SCALE']} direction="right" />

            <ChapterMarker number="03" label="Portfolio" />
            <ScrollRevealText text="Our Work" subtitle="Projects that define the future" />

            {/* Chapter 4: Projects */}
            <ProjectsSection />

            <StoryDivider />
            <ChapterMarker number="04" label="People" />
            <ScrollRevealText text="The Team" subtitle="The minds behind the thunder" />

            {/* Chapter 5: Team */}
            <TeamSection />

            <StoryDivider />
            <ChapterMarker number="05" label="The Future" />

            {/* CTA */}
            <CTASection />
          </main>
        </>
      )}
    </>
  );
}
