"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SmoothScroll() {
  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.innerWidth < 768
    ) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({
      duration: 1.6,
      smoothWheel: true,
      touchMultiplier: 1.1,
    });

    lenis.on("scroll", ScrollTrigger.update);
    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    const parallaxTweens = gsap.utils
      .toArray<HTMLElement>("[data-parallax]")
      .map((element) =>
        gsap.to(element, {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: element.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }),
      );

    return () => {
      parallaxTweens.forEach((tween) => tween.kill());
      gsap.ticker.remove(update);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return null;
}
