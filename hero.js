import React, { useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion, AnimatePresence, useInView } from "framer-motion";

const h = React.createElement;
const VIDEO = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260619_191346_9d19d66e-86a4-47f7-8dc6-712c1788c3b2.mp4";
const LINKS = [
  { label: "Garden", href: "#garden" },
  { label: "Today", href: "#today" },
  { label: "Week", href: "#week" },
  { label: "Notes", href: "#log" }
];

// lucide Menu / X，同樣的線條，直接內嵌避免多載一個套件
const Icon = ({ children, size = 22 }) =>
  h("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" }, children);
const MenuIcon = () => h(Icon, null, [h("line", { key: 1, x1: 4, x2: 20, y1: 12, y2: 12 }), h("line", { key: 2, x1: 4, x2: 20, y1: 6, y2: 6 }), h("line", { key: 3, x1: 4, x2: 20, y1: 18, y2: 18 })]);
const XIcon = () => h(Icon, null, [h("path", { key: 1, d: "M18 6 6 18" }), h("path", { key: 2, d: "m6 6 12 12" })]);

function StaggeredFade({ text }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const variants = {
    hidden: { opacity: 0 },
    show: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07 } })
  };
  return h("span", { ref, "aria-label": text, style: { display: "inline-block" } },
    text.split("").map((ch, i) =>
      h(motion.span, { key: i, custom: i, variants, initial: "hidden", animate: inView ? "show" : "hidden", "aria-hidden": "true", style: { display: "inline-block", whiteSpace: "pre" } }, ch)
    )
  );
}

function scrollToId(e, href) {
  const t = document.querySelector(href);
  if (!t) return;
  e.preventDefault();
  t.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
}

function Hero() {
  const [open, setOpen] = useState(false);
  return h("section", { className: "relative min-h-screen w-full overflow-hidden", style: { background: "#010101", height: "100svh" } },
    h("video", { className: "absolute inset-0 h-full w-full object-cover object-center", src: VIDEO, autoPlay: true, muted: true, loop: true, playsInline: true }),

    h("nav", { className: "relative z-20 flex items-center justify-between md:justify-center md:gap-16 px-5 sm:px-8 py-5 sm:py-6" },
      h("span", { className: "text-white uppercase font-light text-sm sm:text-base", style: { letterSpacing: "0.25em" } }, "Little Red Flower"),
      h("div", { className: "hidden md:flex items-center gap-10" },
        LINKS.map((l) => h("a", { key: l.label, href: l.href, onClick: (e) => scrollToId(e, l.href), className: "text-white/80 hover:text-white uppercase text-xs font-light transition-colors duration-300", style: { letterSpacing: "0.2em" } }, l.label))
      ),
      h("button", { className: "md:hidden text-white", onClick: () => setOpen(!open), "aria-label": open ? "Close menu" : "Open menu", "aria-expanded": open }, open ? h(XIcon) : h(MenuIcon))
    ),

    h(AnimatePresence, null,
      open && h(motion.div, {
        key: "menu", className: "mobile-menu-glass fixed top-16 left-4 right-4 z-50 md:hidden rounded-2xl py-8 gap-5 flex flex-col items-center",
        initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 }, transition: { duration: 0.3, ease: "easeOut" }
      },
        LINKS.map((l, i) => h(motion.a, {
          key: l.label, href: l.href, onClick: (e) => { setOpen(false); scrollToId(e, l.href); },
          className: "text-white/90 hover:text-white uppercase text-sm font-light", style: { letterSpacing: "0.25em" },
          initial: { opacity: 0, y: -8 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.05 + i * 0.06 }
        }, l.label))
      )
    ),

    h("div", { className: "relative z-10 flex flex-col items-center justify-center text-center px-5 sm:px-8 pt-12 sm:pt-16 md:pt-24", style: { minHeight: "calc(100svh - 80px)" } },
      h("h1", { className: "font-garamond text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-normal text-white tracking-tight mb-6 sm:mb-8", style: { lineHeight: 1.08 } },
        h("div", null, h(StaggeredFade, { text: "EVERY MEAL" })),
        h("div", null, h(StaggeredFade, { text: "BLOOMS A FLOWER" }))
      ),
      h(motion.p, { className: "text-white/70 font-light leading-relaxed max-w-xs sm:max-w-md mb-8 sm:mb-10 text-sm sm:text-base md:text-lg", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: 1.6 } },
        "A small garden that grows with every meal eaten,", h("br", { className: "hidden sm:block" }), " tended by two, one red flower at a time."
      ),
      h(motion.a, { href: "#today", onClick: (e) => scrollToId(e, "#today"), className: "liquid-glass rounded-full px-7 sm:px-10 py-3.5 sm:py-4 text-white/90 uppercase text-xs sm:text-sm font-light cursor-pointer", style: { letterSpacing: "0.18em" }, initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: 2.0 } }, "Pick Today's Flower")
    )
  );
}

createRoot(document.getElementById("hero-root")).render(h(Hero));
