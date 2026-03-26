import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const heading = sectionRef.current.querySelector("[data-heading]");
      const paragraphs = gsap.utils.toArray(sectionRef.current.querySelectorAll("[data-reveal]"));
      const split = new SplitType(heading, { types: "words,chars" });

      gsap.set(split.chars, { opacity: 0, yPercent: 90, willChange: "transform, opacity" });
      gsap.set(paragraphs, { opacity: 0, y: 40, willChange: "transform, opacity" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 30%",
          scrub: true
        }
      });

      tl.to(split.chars, { opacity: 1, yPercent: 0, stagger: 0.015, duration: 0.4 }, 0)
        .to(paragraphs, { opacity: 1, y: 0, stagger: 0.12, duration: 0.42 }, 0.14);

      return () => split.revert();
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden px-6 py-28 md:px-14 md:py-36">
      <div className="absolute inset-0 -z-10 opacity-50">
        <div className="absolute left-1/4 top-1/4 h-52 w-52 rounded-full bg-cyan-500/20 blur-3xl" />
      </div>
      <div className="mx-auto max-w-5xl">
        <h2 data-heading className="font-display text-4xl font-extrabold tracking-tight md:text-6xl">
          Who We Are
        </h2>
        <div className="mt-8 space-y-5 text-lg leading-relaxed text-white/75">
          <p data-reveal>
            We are Computer Science students obsessed with creating elegant systems under real constraints.
          </p>
          <p data-reveal>
            As a squad of tech enthusiasts, we turn experimentation into production-grade experiences.
          </p>
          <p data-reveal>
            Our work is built around practical impact, solving authentic problems through thoughtful engineering.
          </p>
        </div>
      </div>
    </section>
  );
}
