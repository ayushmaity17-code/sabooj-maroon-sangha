"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  FiArrowDown,
  FiArrowRight,
  FiArrowUpRight,
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
  FiClock,
  FiFacebook,
  FiInstagram,
  FiMail,
  FiMapPin,
  FiMenu,
  FiPhone,
  FiPlay,
  FiPlus,
  FiX,
  FiYoutube,
} from "react-icons/fi";
import {
  FormEvent,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { CustomCursor } from "@/components/custom-cursor";
import { LoadingScreen } from "@/components/loading-screen";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Button } from "@/components/ui/button";
import { contact } from "@/data/contact";
import { events } from "@/data/events";
import {
  galleryItems,
  type GalleryCategory,
  type GalleryItem,
} from "@/data/gallery";
import { members } from "@/data/members";
import { timeline } from "@/data/timeline";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Journey", href: "#journey" },
  { label: "Gallery", href: "#gallery" },
  { label: "Committee", href: "#committee" },
  { label: "Events", href: "#events" },
  { label: "Contact", href: "#contact" },
];

const ease = [0.22, 1, 0.36, 1] as const;

function SectionLabel({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, ease }}
      className={`mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] ${
        light ? "text-gold" : "text-maroon"
      }`}
    >
      <span className={`h-px w-8 ${light ? "bg-gold" : "bg-maroon"}`} />
      {children}
    </motion.div>
  );
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "105%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-8%" }}
        transition={{ duration: 0.9, delay, ease }}
      >
        {children}
      </motion.div>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/10 bg-[#35111b]/90 py-3 shadow-xl shadow-black/5 backdrop-blur-xl"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link
          href="#home"
          aria-label="Sabooj Maroon Club home"
          className="flex items-center gap-3 text-white"
        >
          <Image
            src="/logo-mark.svg"
            alt=""
            width={48}
            height={48}
            priority
            className="size-10 sm:size-12"
          />
          <div className="leading-none">
            <span className="block font-display text-base tracking-[0.08em] sm:text-lg">
              SABOOJ MAROON SANGHA
            </span>
            <span className="mt-1 block text-[8px] font-medium uppercase tracking-[0.32em] text-gold">
              Club · Est. 2019
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="gold-link text-xs font-medium uppercase tracking-[0.16em] text-white/75 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button asChild variant="outline" size="sm">
            <Link href="#contact" data-magnetic>
              Join the circle <FiArrowUpRight />
            </Link>
          </Button>
        </div>

        <button
          type="button"
          className="grid size-11 place-items-center rounded-full border border-white/20 text-xl text-white lg:hidden"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
        >
          <FiMenu />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            data-lenis-prevent
            className="fixed inset-0 z-[60] flex min-h-dvh flex-col bg-maroon p-6 text-ivory lg:hidden"
            initial={{ clipPath: "circle(0% at 92% 5%)" }}
            animate={{ clipPath: "circle(150% at 92% 5%)" }}
            exit={{ clipPath: "circle(0% at 92% 5%)" }}
            transition={{ duration: 0.7, ease }}
          >
            <div className="flex items-center justify-between">
              <Image src="/logo-mark.svg" alt="" width={48} height={48} />
              <button
                type="button"
                className="grid size-12 place-items-center rounded-full border border-white/20 text-2xl"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <FiX />
              </button>
            </div>
            <nav className="my-auto space-y-2" aria-label="Mobile navigation">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + index * 0.06 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between border-b border-white/10 py-4 font-display text-4xl"
                  >
                    {item.label}
                    <span className="font-sans text-[10px] tracking-[0.2em] text-gold">
                      0{index + 1}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>
            <p className="font-accent text-xl italic text-gold">
              Rooted in culture. Growing together.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-charcoal text-white"
    >
      <motion.div className="absolute -inset-y-[12%] inset-x-0" style={{ y: imageY }}>
        <Image
          src="/gallery/image.png"
          alt="Saraswati Thakur idol symbolizing wisdom, learning, music, and the living tradition of Indian culture"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(28,7,13,.88)_0%,rgba(28,7,13,.46)_48%,rgba(15,12,11,.15)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1f090f]/90 via-transparent to-[#1f090f]/45" />
      <div className="grain absolute inset-0 opacity-30" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto w-full max-w-[1440px] px-5 pb-20 pt-32 sm:px-8 sm:pb-24 lg:px-12 lg:pb-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="mb-6 flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-gold sm:text-xs"
        >
          <span className="h-px w-10 bg-gold" />
          Established in 2019
        </motion.div>

        <h1 className="max-w-5xl font-display leading-[0.86] tracking-[-0.055em]">
          <span className="block overflow-hidden">
            <motion.span
              className="block text-[18vw] sm:text-[14vw] lg:text-[9rem]"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ delay: 2.15, duration: 1.05, ease }}
            >
              Sabooj
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block pl-[9vw] font-accent text-[18vw] italic text-gold sm:text-[14vw] lg:pl-32 lg:text-[9rem]"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ delay: 2.28, duration: 1.05, ease }}
            >
              Maroon

              
            </motion.span>
          </span>
          <span className="block overflow-hidden">
  <motion.span
    className="block mt-6 pl-[18vw] text-[4vw] sm:text-[3vw] lg:pl-56 lg:text-[2.5rem] uppercase tracking-[0.35em] text-gold/70"
    initial={{ y: "110%" }}
    animate={{ y: 0 }}
    transition={{ delay: 2.4, duration: 1.05, ease }}
  >
    Sangha
  </motion.span>
</span>
        </h1>

        <div className="mt-8 flex max-w-3xl flex-col gap-7 border-t border-white/20 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <motion.p
            className="max-w-lg text-sm leading-7 text-white/72 sm:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.75, duration: 0.8 }}
          >
            A living circle of culture, care and celebration—where every
            generation finds a place to belong.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.85, duration: 0.6 }}
          >
            <Button asChild variant="gold" size="lg">
              <Link href="#about" data-magnetic>
                Discover our story <FiArrowDown />
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute bottom-8 right-6 z-10 hidden items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-white/60 lg:flex">
        Scroll to enter
        <span className="relative h-14 w-px overflow-hidden bg-white/20">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-gold"
            animate={{ y: ["-100%", "220%"] }}
            transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </div>
    </section>
  );
}

function Marquee() {
  const phrases = [
    "Culture",
    "Community",
    "Service",
    "Togetherness",
    "Heritage",
    "Joy",
  ];
  const allPhrases = [...phrases, ...phrases];

  return (
    <div className="overflow-hidden border-y border-charcoal/10 bg-ivory py-5">
      <div className="marquee-track flex w-max items-center">
        {allPhrases.map((phrase, index) => (
          <div key={`${phrase}-${index}`} className="flex items-center">
            <span className="px-7 font-accent text-3xl italic text-charcoal/75 sm:px-12 sm:text-5xl">
              {phrase}
            </span>
            <span className="size-1.5 rotate-45 bg-gold" />
          </div>
        ))}
      </div>
    </div>
  );
}

function About() {
  const values = [
    ["01", "Belonging", "A place where every voice and every generation matters."],
    ["02", "Culture", "Traditions carried forward with curiosity and imagination."],
    ["03", "Service", "Care made visible through consistent, local action."],
    ["04", "Joy", "Celebration as a way of strengthening the ties between us."],
  ];

  return (
    <section id="about" className="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-20">
      <div className="absolute right-0 top-12 font-display text-[30vw] leading-none text-maroon/[0.025]">
        2019
      </div>
      <div className="relative mx-auto max-w-[1340px]">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          <motion.div
  initial={{ opacity: 0, x: -40 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
  className="relative overflow-hidden rounded-[2rem] shadow-premium"
>
  <img
    src="/about/club-gate.png"
    alt="Sabooj Maroon Sangha"
    className="h-full w-full object-cover transition duration-700 hover:scale-105"
  />

  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

  <div className="absolute bottom-8 left-8">
    <p className="text-xs uppercase tracking-[0.35em] text-gold">
      Since 2019
    </p>

    <h3 className="mt-2 font-display text-4xl text-white">
      Our Beginning
    </h3>

    <p className="mt-2 max-w-xs text-sm text-white/80">
      The place where Sabooj Maroon Sangha first brought people together.
    </p>
  </div>
</motion.div>
          <div>
  <SectionLabel>Our story</SectionLabel>

  <Reveal>
    <h2 className="max-w-xl font-display text-5xl leading-[0.98] tracking-[-0.045em] sm:text-7xl">
      Every journey begins with a{" "}
      <span className="font-accent italic text-maroon">
        place
      </span>
      .
    </h2>
  </Reveal>
</div>
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12%" }}
            transition={{ duration: 0.9, delay: 0.15, ease }}
            className=""
          >
            <p className="max-w-2xl text-lg leading-9 text-charcoal/72 sm:text-xl">
              Sabooj Maroon Sangha was founded in 2019 with a belief that
              community is something we make, together. Through cultural
              expression, neighbourhood service and everyday companionship, we
              create reasons to gather—and reasons to care.
            </p>
            <div className="mt-10 grid gap-6 border-t border-charcoal/10 pt-7 sm:grid-cols-2">
              <div>
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-maroon">
                  Our mission
                </p>
                <p className="leading-7 text-charcoal/62">
                  To nurture connection through meaningful cultural and
                  community experiences.
                </p>
              </div>
              <div>
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-maroon">
                  Our vision
                </p>
                <p className="leading-7 text-charcoal/62">
                  A generous, creative community where heritage and new ideas
                  grow side by side.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-20 grid gap-5 sm:grid-cols-2 lg:mt-28 lg:grid-cols-4">
          {values.map(([number, title, description], index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: index * 0.08, ease }}
              whileHover={{ y: -8, rotate: index % 2 ? 0.5 : -0.5 }}
              className="group min-h-64 border border-charcoal/10 bg-white/55 p-7 transition-shadow hover:shadow-premium"
              data-cursor
            >
              <div className="flex items-start justify-between">
                <span className="text-[10px] tracking-[0.2em] text-maroon/60">
                  {number}
                </span>
                <FiPlus className="text-gold transition-transform duration-500 group-hover:rotate-90" />
              </div>
              <h3 className="mt-20 font-display text-3xl">{title}</h3>
              <p className="mt-4 text-sm leading-6 text-charcoal/58">
                {description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function StoryImage() {
  return (
    <section className="px-5 pb-24 sm:px-8 sm:pb-32 lg:px-12 lg:pb-40">
      <div className="relative mx-auto h-[72vh] min-h-[560px] max-w-[1340px] overflow-hidden rounded-[2rem] bg-charcoal">
        <div data-parallax className="absolute -inset-y-[12%] inset-x-0">
          <Image
            src="/gallery/thakur.png"
            alt="Maa Saraswati enlighting our club"
            fill
            sizes="(max-width: 1340px) 100vw, 1340px"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/75 via-charcoal/20 to-transparent" />
        <div className="grain absolute inset-0 opacity-25" />
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.9, ease }}
          className="absolute inset-x-6 bottom-8 max-w-xl text-white sm:inset-x-12 sm:bottom-12"
        >
          <p className="font-accent text-2xl italic text-gold sm:text-3xl">
            “Tradition is not a museum piece.”
          </p>
          <p className="mt-3 max-w-md text-sm leading-7 text-white/72">
            It lives when people gather, teach, listen, reinterpret and pass it
            forward.
          </p>
        </motion.div>
        <button
          type="button"
          aria-label="Play our story"
          className="absolute right-7 top-7 grid size-16 place-items-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur transition hover:scale-105 hover:bg-white hover:text-maroon sm:right-12 sm:top-12 sm:size-20"
          data-magnetic
        >
          <FiPlay className="ml-1" />
        </button>
      </div>
    </section>
  );
}

function Journey() {
  return (
    <section id="journey" className="overflow-hidden bg-forest px-5 py-24 text-ivory sm:px-8 sm:py-32 lg:px-12 lg:py-40">
      <div className="mx-auto max-w-[1340px]">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <SectionLabel light>The journey</SectionLabel>
            <Reveal>
              <h2 className="max-w-3xl font-display text-5xl leading-none tracking-[-0.045em] sm:text-7xl">
                The years have shaped{" "}
                <span className="font-accent italic text-gold">our rhythm.</span>
              </h2>
            </Reveal>
          </div>
          <p className="max-w-sm text-sm leading-7 text-white/60">
            From a shared idea in 2019 to a growing circle of culture and
            service—each chapter belongs to everyone who showed up.
          </p>
        </div>

        <div className="relative mt-20 lg:mt-28">
          <div className="absolute bottom-0 left-[6px] top-0 w-px bg-white/15 lg:left-0 lg:right-0 lg:top-7 lg:h-px lg:w-auto" />
          <motion.div
            className="absolute left-[5px] top-0 w-[3px] origin-top bg-gold lg:left-0 lg:top-[26px] lg:h-[3px] lg:w-full lg:origin-left"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-18%" }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          />
          <div className="grid gap-12 pl-10 lg:grid-cols-7 lg:gap-5 lg:pl-0">
            {timeline.map((item, index) => (
              <motion.article
                key={item.year}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.7, delay: index * 0.09, ease }}
                className="relative lg:pt-16"
              >
                <span className="absolute -left-[39px] top-2 size-3 rounded-full border-2 border-forest bg-gold shadow-[0_0_0_5px_rgba(198,161,91,.18)] lg:left-0 lg:top-[21px]" />
                <p className="font-accent text-4xl italic text-gold">
                  {item.year}
                </p>
                <p className="mt-4 text-[9px] font-semibold uppercase tracking-[0.22em] text-white/35">
                  {item.type}
                </p>
                <h3 className="mt-3 font-display text-xl leading-snug">
                  {item.title}
                </h3>
                <p className="mt-3 text-xs leading-6 text-white/52">
                  {item.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function GalleryCard({
  item,
  onOpen,
  index,
}: {
  item: GalleryItem;
  onOpen: () => void;
  index: number;
}) {
  const heights = {
    portrait: "h-[30rem] sm:h-[34rem]",
    landscape: "h-[22rem] sm:h-[25rem]",
    wide: "h-[20rem] sm:h-[23rem]",
  };

  return (
    <motion.button
      type="button"
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.55, delay: index * 0.04, ease }}
      onClick={onOpen}
      className={`group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-[1.25rem] text-left ${heights[item.aspect]}`}
      data-cursor
      aria-label={`Open ${item.title} in lightbox`}
    >
      <Image
        src={item.image}
        alt={item.alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition duration-700 ease-out group-hover:scale-105"
        style={{ objectPosition: item.position }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-transparent to-transparent opacity-80 transition group-hover:opacity-100" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-white">
        <div>
          <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-gold">
            {item.category}
          </p>
          <h3 className="font-display text-2xl">{item.title}</h3>
        </div>
        <span className="grid size-11 translate-y-3 place-items-center rounded-full border border-white/35 bg-white/10 opacity-0 backdrop-blur transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <FiPlus />
        </span>
      </div>
    </motion.button>
  );
}

function Gallery() {
  const [filter, setFilter] = useState<"All" | GalleryCategory>("All");
  const [selected, setSelected] = useState<number | null>(null);
  const categories: Array<"All" | GalleryCategory> = [
    "All",
    "Culture",
    "Community",
    "Celebrations",
  ];
  const visible = useMemo(
    () =>
      filter === "All"
        ? galleryItems
        : galleryItems.filter((item) => item.category === filter),
    [filter],
  );
  const selectedItem =
    selected === null ? null : galleryItems.find((item) => item.id === selected);

  const changeSelected = (direction: number) => {
    if (selected === null) return;
    const index = galleryItems.findIndex((item) => item.id === selected);
    const next =
      (index + direction + galleryItems.length) % galleryItems.length;
    setSelected(galleryItems[next].id);
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (selected === null) return;
      if (event.key === "Escape") setSelected(null);
      if (event.key === "ArrowRight") changeSelected(1);
      if (event.key === "ArrowLeft") changeSelected(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <section id="gallery" className="px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
      <div className="mx-auto max-w-[1340px]">
        <div className="flex flex-col justify-between gap-9 lg:flex-row lg:items-end">
          <div>
            <SectionLabel>In pictures</SectionLabel>
            <Reveal>
              <h2 className="font-display text-5xl leading-none tracking-[-0.045em] sm:text-7xl">
                Moments that{" "}
                <span className="font-accent italic text-maroon">stay.</span>
              </h2>
            </Reveal>
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Gallery filters">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setFilter(category)}
                className={`rounded-full border px-5 py-2.5 text-xs transition ${
                  filter === category
                    ? "border-maroon bg-maroon text-white"
                    : "border-charcoal/12 hover:border-maroon"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="gallery-columns mt-14 sm:mt-20">
          <AnimatePresence mode="popLayout">
            {visible.map((item, index) => (
              <GalleryCard
                key={item.id}
                item={item}
                index={index}
                onOpen={() => setSelected(item.id)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            data-lenis-prevent
            className="fixed inset-0 z-[120] grid place-items-center bg-[#13070b]/95 p-4 backdrop-blur-md sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={selectedItem.title}
            onClick={() => setSelected(null)}
          >
            <button
              type="button"
              className="absolute right-5 top-5 z-20 grid size-12 place-items-center rounded-full border border-white/20 text-xl text-white"
              onClick={() => setSelected(null)}
              aria-label="Close lightbox"
            >
              <FiX />
            </button>
            <button
              type="button"
              className="absolute left-4 z-20 grid size-12 place-items-center rounded-full border border-white/20 text-white sm:left-8"
              onClick={(event) => {
                event.stopPropagation();
                changeSelected(-1);
              }}
              aria-label="Previous image"
            >
              <FiChevronLeft />
            </button>
            <button
              type="button"
              className="absolute right-4 z-20 grid size-12 place-items-center rounded-full border border-white/20 text-white sm:right-8"
              onClick={(event) => {
                event.stopPropagation();
                changeSelected(1);
              }}
              aria-label="Next image"
            >
              <FiChevronRight />
            </button>
            <motion.div
              key={selectedItem.id}
              className="relative h-[78vh] w-[88vw] max-w-6xl overflow-hidden rounded-xl"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.45, ease }}
              onClick={(event) => event.stopPropagation()}
            >
              <Image
                src={selectedItem.image}
                alt={selectedItem.alt}
                fill
                sizes="90vw"
                className="object-contain"
              />
              <div className="absolute bottom-0 left-0 p-5 text-white sm:p-8">
                <p className="text-[9px] uppercase tracking-[0.22em] text-gold">
                  {selectedItem.category}
                </p>
                <p className="mt-2 font-display text-2xl sm:text-3xl">
                  {selectedItem.title}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Committee() {
  return (
    <section id="committee" className="relative overflow-hidden bg-[#efe9df] px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
      <div className="absolute inset-0 opacity-30 grain" />
      <div className="relative mx-auto max-w-[1340px]">
        <div className="grid gap-8 lg:grid-cols-[1fr_.65fr] lg:items-end">
          <div>
            <SectionLabel>Executive committee</SectionLabel>
            <Reveal>
              <h2 className="max-w-3xl font-display text-5xl leading-none tracking-[-0.045em] sm:text-7xl">
                People who turn care{" "}
                <span className="font-accent italic text-maroon">into action.</span>
              </h2>
            </Reveal>
          </div>
          <p className="max-w-md text-sm leading-7 text-charcoal/58">
            Meet the team entrusted with listening, building and keeping the
            club moving forward.
          </p>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {members.map((member, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, delay: index * 0.08, ease }}
              whileHover={{ y: -10, rotate: index % 2 ? 0.5 : -0.5 }}
              className="glass-card group overflow-hidden rounded-[1.5rem]"
              data-cursor
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={member.image}
                  alt={`${member.name}, ${member.designation}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/45 via-transparent to-transparent" />
                <span className="absolute right-4 top-4 rounded-full bg-ivory/80 px-3 py-1.5 text-[9px] uppercase tracking-[0.18em] text-maroon backdrop-blur">
                  0{index + 1}
                </span>
              </div>
              <div className="p-6">
                <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-maroon">
                  {member.designation}
                </p>
                <h3 className="mt-2 font-display text-2xl">{member.name}</h3>
                <div className="mt-5 space-y-3 border-t border-charcoal/10 pt-5 text-xs text-charcoal/62">
                  <a
                    href={`tel:${member.phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-2 transition hover:text-maroon"
                  >
                    <FiPhone className="text-gold" /> {member.phone}
                  </a>
                  <a
                    href={`mailto:${member.email}`}
                    className="flex items-center gap-2 truncate transition hover:text-maroon"
                  >
                    <FiMail className="shrink-0 text-gold" /> {member.email}
                  </a>
                </div>
                {member.instagram && (
                  <a
                    href={member.instagram}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${member.name} on Instagram`}
                    className="mt-5 grid size-10 place-items-center rounded-full border border-charcoal/10 transition hover:border-maroon hover:bg-maroon hover:text-white"
                  >
                    <FiInstagram />
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Events() {
  return (
    <section id="events" className="bg-maroon px-5 py-24 text-ivory sm:px-8 sm:py-32 lg:px-12 lg:py-40">
      <div className="mx-auto max-w-[1340px]">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <SectionLabel light>The Festival That Brings Us Together</SectionLabel>
            <Reveal>
              <h2 className="font-display text-5xl leading-none tracking-[-0.045em] sm:text-7xl">
                Come, be part of{" "}
                <span className="font-accent italic text-gold">the next memory.</span>
              </h2>
            </Reveal>
          </div>
          <Button asChild variant="outline">
            <Link href="#contact" data-magnetic>
              Join Our Celebration <FiArrowUpRight />
            </Link>
          </Button>
        </div>

        <div className="mt-14 grid gap-5 lg:mt-20 lg:grid-cols-3">
          {events.map((event, index) => (
            <motion.article
              key={event.title}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.75, delay: index * 0.1, ease }}
              className={`group overflow-hidden rounded-[1.5rem] border border-white/12 bg-white/[0.06] ${
                event.featured ? "lg:col-span-2 lg:grid lg:grid-cols-[1.25fr_.75fr]" : ""
              }`}
              data-cursor
            >
              <div
                className={`relative overflow-hidden ${
                  event.featured ? "h-72 lg:h-full lg:min-h-[34rem]" : "h-72"
                }`}
              >
                <Image
                  src={event.image}
                  alt=""
                  fill
                  sizes={event.featured ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 100vw, 33vw"}
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/55 to-transparent" />
              </div>
              <div className="flex flex-col p-7 sm:p-8">
                <div className="flex flex-wrap gap-4 text-[10px] uppercase tracking-[0.14em] text-gold">
                  <span className="flex items-center gap-2">
                    <FiCalendar /> {event.date}
                  </span>
                  <span className="flex items-center gap-2">
                    <FiMapPin /> {event.location}
                  </span>
                </div>
                <h3 className={`mt-7 font-display ${event.featured ? "text-4xl sm:text-5xl" : "text-3xl"}`}>
                  {event.title}
                </h3>
                <p className="mt-5 text-sm leading-7 text-white/60">
                  {event.description}
                </p>
                <div className="mt-auto pt-8">
                  <Link
                    href="#contact"
                    className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.16em] text-gold"
                  >
                    Event details{" "}
                    <FiArrowRight className="transition group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Counter({
  value,
  suffix,
  label,
  index,
}: {
  value: number;
  suffix: string;
  label: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.8,
      delay: index * 0.08,
      ease: "easeOut",
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, index, value]);

  return (
    <div ref={ref} className="border-l border-charcoal/12 pl-5 sm:pl-7">
      <p className="font-display text-5xl tracking-[-0.05em] text-maroon sm:text-6xl">
        {display}
        <span className="font-accent italic text-gold">{suffix}</span>
      </p>
      <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.19em] text-charcoal/52">
        {label}
      </p>
    </div>
  );
}

function Achievements() {
  const stats = [
    { value: 250, suffix: "+", label: "Members" },
    { value: 48, suffix: "+", label: "Events hosted" },
    { value: 18, suffix: "+", label: "Community programs" },
    { value: 6, suffix: "", label: "Recognitions" },
    { value: 6, suffix: "", label: "Years of service" },
  ];

  return (
    <section className="px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-36">
      <div className="mx-auto max-w-[1340px]">
        <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:items-end">
          <div>
            <SectionLabel>In numbers</SectionLabel>
            <h2 className="font-display text-4xl leading-tight sm:text-5xl">
              Small actions. A growing{" "}
              <span className="font-accent italic text-maroon">impact.</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
            {stats.map((stat, index) => (
              <Counter key={stat.label} {...stat} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="bg-[#e9e2d6] px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
      <div className="mx-auto max-w-[1340px]">
        <div className="grid overflow-hidden rounded-[2rem] bg-ivory shadow-premium lg:grid-cols-[.9fr_1.1fr]">
          <div className="relative min-h-[34rem] overflow-hidden bg-forest p-8 text-white sm:p-12 lg:p-16">
            <Image
              src="/gallery/classical-dance.png"
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover opacity-25 mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-forest via-forest/92 to-maroon/80" />
            <div className="grain absolute inset-0 opacity-20" />
            <div className="relative flex h-full flex-col">
              <SectionLabel light>Say hello</SectionLabel>
              <h2 className="font-display text-5xl leading-none tracking-[-0.045em] sm:text-6xl">
                There is always{" "}
                <span className="font-accent italic text-gold">room in the circle.</span>
              </h2>
              <p className="mt-7 max-w-md text-sm leading-7 text-white/65">
                Ask a question, share an idea, volunteer, or simply come by.
                Community begins with a conversation.
              </p>
              <div className="mt-auto space-y-5 pt-12 text-sm">
                <a href={`mailto:${contact.email}`} className="flex items-center gap-4">
                  <span className="grid size-11 place-items-center rounded-full border border-white/15 text-gold">
                    <FiMail />
                  </span>
                  {contact.email}
                </a>
                <a
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-4"
                >
                  <span className="grid size-11 place-items-center rounded-full border border-white/15 text-gold">
                    <FiPhone />
                  </span>
                  {contact.phone}
                </a>
                <p className="flex items-center gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full border border-white/15 text-gold">
                    <FiMapPin />
                  </span>
                  {contact.address}
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 sm:p-12 lg:p-16">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-maroon">
              Send us a note
            </p>
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex min-h-[27rem] flex-col justify-center"
                >
                  <span className="mb-6 grid size-16 place-items-center rounded-full bg-forest text-2xl text-gold">
                    <FiArrowUpRight />
                  </span>
                  <h3 className="font-display text-4xl">Thank you.</h3>
                  <p className="mt-4 max-w-sm leading-7 text-charcoal/58">
                    The form experience is ready. Connect it to your preferred
                    email service before launch to deliver submissions.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="mt-8 w-fit text-xs font-semibold uppercase tracking-[0.18em] text-maroon"
                  >
                    Write another note
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={onSubmit}
                  className="mt-8 grid gap-x-7 gap-y-4 sm:grid-cols-2"
                >
                  <label className="block">
                    <span className="text-[10px] uppercase tracking-[0.18em] text-charcoal/52">
                      Your name
                    </span>
                    <input className="field" name="name" type="text" required placeholder="Full name" />
                  </label>
                  <label className="block">
                    <span className="text-[10px] uppercase tracking-[0.18em] text-charcoal/52">
                      Email
                    </span>
                    <input className="field" name="email" type="email" required placeholder="you@example.com" />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="text-[10px] uppercase tracking-[0.18em] text-charcoal/52">
                      Phone
                    </span>
                    <input className="field" name="phone" type="tel" placeholder="+91" />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="text-[10px] uppercase tracking-[0.18em] text-charcoal/52">
                      Your message
                    </span>
                    <textarea
                      className="field min-h-28 resize-y"
                      name="message"
                      required
                      placeholder="Tell us what you have in mind..."
                    />
                  </label>
                  <div className="mt-6 sm:col-span-2">
                    <Button type="submit" size="lg" data-magnetic>
                      Send message <FiArrowUpRight />
                    </Button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-[2rem] border border-charcoal/10 bg-ivory p-2">
          <iframe
            title="Club location map"
            src={`https://www.google.com/maps?q=${encodeURIComponent(contact.mapQuery)}&output=embed`}
            width="100%"
            height="360"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-[1.5rem] grayscale-[.75] transition duration-500 hover:grayscale-0"
          />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#230b12] px-5 pb-8 pt-20 text-white sm:px-8 lg:px-12 lg:pt-28">
      <div className="mx-auto max-w-[1340px]">
        <div className="grid gap-14 border-b border-white/10 pb-16 lg:grid-cols-[1.35fr_.65fr_.65fr]">
          <div>
            <Image src="/logo-mark.svg" alt="" width={72} height={72} />
            <h2 className="mt-7 max-w-xl font-display text-4xl leading-tight sm:text-5xl">
              Rooted in culture.{" "}
              <span className="font-accent italic text-gold">Growing together.</span>
            </h2>
          </div>
          <div>
            <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.24em] text-gold">
              Explore
            </p>
            <div className="space-y-4 text-sm text-white/60">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="block w-fit transition hover:text-white">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.24em] text-gold">
              Follow along
            </p>
            <div className="flex gap-3">
              {[
                [contact.instagram, <FiInstagram key="instagram" />, "Instagram"],
                [contact.facebook, <FiFacebook key="facebook" />, "Facebook"],
                [contact.youtube, <FiYoutube key="youtube" />, "YouTube"],
              ].map(([href, icon, label]) => (
                <a
                  key={label as string}
                  href={href as string}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label as string}
                  className="grid size-11 place-items-center rounded-full border border-white/15 text-white/70 transition hover:border-gold hover:bg-gold hover:text-charcoal"
                >
                  {icon}
                </a>
              ))}
            </div>
            <p className="mt-8 text-sm leading-7 text-white/50">
              {contact.address}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-8 text-[10px] uppercase tracking-[0.16em] text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Sabooj Maroon Club. All rights reserved.</p>
          <p>Established 2019 · Built for community</p>
        </div>
      </div>
    </footer>
  );
}

export function HomeExperience() {
  return (
    <>
      <LoadingScreen />
      <SmoothScroll />
      <CustomCursor />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <About />
        <StoryImage />
        <Journey />
        <Gallery />
        <Committee />
        <Events />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
