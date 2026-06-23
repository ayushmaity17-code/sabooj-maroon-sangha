"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let x = -100;
    let y = -100;
    let ringX = -100;
    let ringY = -100;
    let frame = 0;

    const render = () => {
      ringX += (x - ringX) * 0.16;
      ringY += (y - ringY) * 0.16;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      frame = requestAnimationFrame(render);
    };

    const onMove = (event: MouseEvent) => {
      x = event.clientX;
      y = event.clientY;
      setVisible(true);
    };

    const onOver = (event: MouseEvent) => {
      const target = (event.target as HTMLElement).closest(
        "a, button, [data-cursor]",
      );
      setActive(Boolean(target));
    };

    const onOut = (event: MouseEvent) => {
      const target = (event.target as HTMLElement).closest(
        "a, button, [data-cursor]",
      );
      if (target) setActive(false);
    };

    const onMagneticMove = (event: MouseEvent) => {
      const target = (event.target as HTMLElement).closest<HTMLElement>(
        "[data-magnetic]",
      );
      if (!target) return;
      const rect = target.getBoundingClientRect();
      const moveX = (event.clientX - rect.left - rect.width / 2) * 0.14;
      const moveY = (event.clientY - rect.top - rect.height / 2) * 0.14;
      target.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    };

    const resetMagnetic = (event: MouseEvent) => {
      const target = (event.target as HTMLElement).closest<HTMLElement>(
        "[data-magnetic]",
      );
      if (target) target.style.transform = "";
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    document.addEventListener("mousemove", onMagneticMove);
    document.addEventListener("mouseleave", () => setVisible(false));
    document.addEventListener("mouseout", resetMagnetic);
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("mousemove", onMagneticMove);
      document.removeEventListener("mouseout", resetMagnetic);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className={`pointer-events-none fixed left-0 top-0 z-[100] hidden size-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-2x1 transition-[width,height,opacity,background-color] duration-300 md:block ${
         active
  ? "size-28 bg-gold/20 shadow-[0_0_140px_rgba(198,161,91,.55)]"
  : ""
        } ${visible ? "opacity-100" : "opacity-0"}`}
      />
      <div
  ref={dotRef}
  aria-hidden="true"
  className={`pointer-events-none fixed left-0 top-0 z-[101] hidden -translate-x-1/2 -translate-y-1/2 transition-opacity md:block ${
    visible ? "opacity-100" : "opacity-0"
  }`}
>
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="drop-shadow-[0_0_10px_rgba(198,161,91,0.8)]"
  >
    <path
      d="M12 5C10.8 7.5 8.5 9 6 10.5C7.8 11 9.5 12.5 10.5 14.5C11 13.2 11.5 12.2 12 11.5C12.5 12.2 13 13.2 13.5 14.5C14.5 12.5 16.2 11 18 10.5C15.5 9 13.2 7.5 12 5Z"
      stroke="#C6A15B"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 7V19"
      stroke="#C6A15B"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
</div>
    </>
  );
}
