import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { team } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

export default function Team() {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const headingRef = useRef(null);
  const subRef = useRef(null);
  const cardRefs = useRef([]);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(labelRef.current, { opacity: 0, x: -16 });
      gsap.set(headingRef.current, { opacity: 0, y: 28 });
      gsap.set(subRef.current, { opacity: 0, y: 20 });
      gsap.set(cardRefs.current, { opacity: 0, y: 48 });

      // Header scroll reveal
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
          toggleActions: "play none none none",
        },
        defaults: { ease: "power3.out" },
      });

      headerTl
        .to(labelRef.current, { opacity: 1, x: 0, duration: 0.6 })
        .to(headingRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.3")
        .to(subRef.current, { opacity: 1, y: 0, duration: 0.7 }, "-=0.4");

      // Cards stagger reveal
      gsap.to(cardRefs.current, {
        opacity: 1,
        y: 0,
        stagger: {
          each: 0.08,
          from: "start",
        },
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          once: true,
          toggleActions: "play none none none",
        },
      });

      // Scroll-linked parallax on each card image
      cardRefs.current.forEach((card) => {
        if (!card) return;
        const img = card.querySelector("img");
        if (!img) return;
        gsap.to(img, {
          y: -24,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="team"
      className="border-t border-white/5 px-6 py-28 md:px-20 md:py-40"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 grid md:grid-cols-2 md:items-end gap-6">
          <div>
            <p ref={labelRef} className="section-label mb-6">
              People
            </p>
            <h2
              ref={headingRef}
              className="font-display text-[clamp(2.4rem,5vw,4rem)] font-bold leading-[1.08] tracking-tight text-white"
            >
              Meet the Team
            </h2>
          </div>
          <p
            ref={subRef}
            className="text-white/40 text-base leading-relaxed max-w-sm md:ml-auto md:text-right"
          >
            Six makers, one mission.<br />Building systems that make a difference.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member, i) => (
            <article
              key={member.name}
              ref={(el) => (cardRefs.current[i] = el)}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02]"
            >
              {/* Image with overflow for parallax */}
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-[115%] w-full object-cover object-top opacity-75 transition-opacity duration-500 group-hover:opacity-90"
                  loading="lazy"
                />
              </div>

              {/* Gradient overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#06070d] via-transparent to-transparent" />

              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-display text-lg font-semibold text-white">
                  {member.name}
                </h3>
                <p className="mt-0.5 text-xs font-medium uppercase tracking-widest text-blue-400/70">
                  {member.role}
                </p>
                <a
                  href={member.portfolio}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs text-white/35 transition-colors duration-200 hover:text-white/75"
                  aria-label={`Portfolio of ${member.name}`}
                >
                  Portfolio
                  <span className="translate-x-0 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100">
                    →
                  </span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
