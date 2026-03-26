import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card } from "@/components/ui/card";
import { team } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

function handleTilt(event, strength = 10) {
  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const midX = rect.width / 2;
  const midY = rect.height / 2;
  const rotateY = ((x - midX) / midX) * strength;
  const rotateX = -((y - midY) / midY) * strength;
  card.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px)`;
}

export default function Team() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(sectionRef.current.querySelectorAll("[data-member]"));
      gsap.set(cards, { opacity: 0, y: 48, willChange: "transform, opacity" });

      gsap.to(cards, {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 40%",
          scrub: true
        }
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="px-6 py-20 md:px-14 md:py-28">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-display text-4xl font-extrabold tracking-tight md:text-6xl">Team Members</h2>
        <p className="mt-3 text-white/70">Six makers, one mission: build systems that matter.</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <Card
              key={member.name}
              data-member
              className="group overflow-hidden border-white/15 bg-white/[0.03] transition-transform duration-300 will-change-transform"
              onMouseMove={handleTilt}
              onMouseLeave={(event) => {
                event.currentTarget.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
              }}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="space-y-2 p-5">
                <h3 className="font-display text-2xl font-semibold">{member.name}</h3>
                <p className="text-sm text-sky-200/80">{member.role}</p>
                <a
                  href={member.portfolio}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex text-sm font-medium text-white/80 underline-offset-4 hover:text-white hover:underline"
                >
                  Portfolio
                </a>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
