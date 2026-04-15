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
import { ScrollRevealText, ScrollMarquee } from '../components/StorytellingTypography';
import { StoryDivider, ChapterMarker } from '../components/StorytellingElements';

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
            {/* Chapter 1: The Beginning */}
            <HeroSection />

            {/* Transition: Marquee */}
            <ScrollMarquee words={['INNOVATE', 'CREATE', 'BUILD', 'DISRUPT', 'TRANSFORM']} direction="left" />

            {/* Chapter marker */}
            <ChapterMarker number="01" label="Origins" />

            {/* Big reveal text */}
            <ScrollRevealText text="Our Story" subtitle="Every revolution begins with a spark" />

            {/* Chapter 2: Who We Are */}
            <AboutSection />

            <StoryDivider />

            <ScrollMarquee words={['INNOVATION', 'CREATIVITY', 'EXCELLENCE', 'VISION']} direction="right" />

            <ChapterMarker number="02" label="Capabilities" />

            <ScrollRevealText text="Our Craft" subtitle="Where technology meets artistry" />

            {/* Chapter 3: What We Do */}
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

            <ScrollMarquee words={['THUNDER', 'SQUAD', 'FUTURE', 'IMPACT']} direction="left" />

            <ChapterMarker number="05" label="The Future" />

            {/* Chapter 6: CTA */}
            <CTASection />
          </main>
        </>
      )}
    </>
  );
}
