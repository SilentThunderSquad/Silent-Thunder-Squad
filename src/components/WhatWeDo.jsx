import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

gsap.registerPlugin(ScrollTrigger);

const items = [
  {
    title: "Build Real-Life Products",
    description: "From idea to deployment, we ship complete products grounded in actual user needs."
  },
  {
    title: "Innovation Mindset",
    description: "We prototype quickly, challenge assumptions, and design better systems through iteration."
  },
  {
    title: "Practical Solutions",
    description: "Every decision balances reliability, usability, and measurable real-world outcomes."
  }
];

export default function WhatWeDo() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(sectionRef.current.querySelectorAll("[data-card]"));
      gsap.set(cards, { y: 70, opacity: 0, willChange: "transform, opacity" });

      gsap.to(cards, {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          end: "bottom 45%",
          scrub: true
        }
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="px-6 py-20 md:px-14 md:py-32">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-4xl font-extrabold tracking-tight md:text-6xl">What We Do</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <Card key={item.title} data-card className="group overflow-hidden bg-gradient-to-b from-white/10 to-white/[0.02]">
              <CardHeader>
                <CardTitle className="text-2xl">{item.title}</CardTitle>
                <CardDescription className="text-white/70">Silent Thunder Squad</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-white/75">{item.description}</p>
                <div className="mt-6 h-1 w-0 rounded-full bg-sky-300 transition-all duration-500 group-hover:w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
