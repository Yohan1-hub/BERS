"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import Logo from "./Logo";
import LanguageSelector from "./LanguageSelector";

const mainLinks = [
  { label: "Home", href: "#", anchor: true },
  { label: "About", href: "#about", anchor: true },
  { label: "Methodology", href: "#methodology", anchor: true },
  { label: "Services", href: "/services", anchor: false },
  { label: "Training", href: "/training", anchor: false },
];

const moreLinks = [
  { label: "Initiatives", href: "#initiatives", anchor: true },
  { label: "Courses", href: "/courses", anchor: false },
  { label: "Portfolio", href: "/portfolio", anchor: false },
  { label: "Blog", href: "/blog", anchor: false },
  { label: "Contact", href: "/contact", anchor: false },
  { label: "Donate", href: "/donations", anchor: false },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const scrollTo = (id: string) => {
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-slate-100/80 bg-white/95 backdrop-blur-md">
      <div className="section-container flex h-20 items-center justify-between md:h-32">
        <a href="#" className="flex shrink-0 items-center">
          <Logo className="h-10 w-auto sm:h-12 md:h-20" />
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {mainLinks.map((link) =>
            link.anchor ? (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
              >
                {link.label}
              </button>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
              >
                {link.label}
              </a>
            ),
          )}

          {/* More dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowMore(!showMore)}
              className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
            >
              More <ChevronDown className="h-3 w-3" />
            </button>
            <AnimatePresence>
              {showMore && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="absolute right-0 top-full mt-1 w-40 rounded-xl border border-slate-100 bg-white p-1 shadow-lg"
                  onMouseLeave={() => setShowMore(false)}
                >
                  {moreLinks.map((link) =>
                    link.anchor ? (
                      <button
                        key={link.label}
                        onClick={() => { scrollTo(link.href); setShowMore(false); }}
                        className="block w-full rounded-lg px-3 py-2 text-left text-xs font-medium text-slate-600 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <a
                        key={link.label}
                        href={link.href}
                        className="block rounded-lg px-3 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
                      >
                        {link.label}
                      </a>
                    ),
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <LanguageSelector />
        </nav>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100 md:hidden"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-slate-100 bg-white md:hidden"
          >
            <div className="section-container space-y-1 py-4">
              {[...mainLinks, ...moreLinks].map((link) =>
                link.anchor ? (
                  <button
                    key={link.label}
                    onClick={() => scrollTo(link.href)}
                    className="block w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium text-slate-600 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
                  >
                    {link.label}
                  </button>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className="block rounded-lg px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
                  >
                    {link.label}
                  </a>
                ),
              )}
              <div className="border-t border-slate-100 px-4 pt-3">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                  Translate
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    ["en", "English"],
                    ["es", "Español"],
                    ["fr", "Français"],
                    ["pt", "Português"],
                    ["ar", "العربية"],
                    ["zh-CN", "中文"],
                  ].map(([code, name]) => (
                    <button
                      key={code}
                      onClick={() => {
                        const sel = document.querySelector(
                          ".goog-te-combo",
                        ) as HTMLSelectElement;
                        if (sel) {
                          sel.value = code;
                          sel.dispatchEvent(new Event("change"));
                        }
                      }}
                      className="rounded-md bg-slate-50 px-2 py-1 text-xs text-slate-600 transition-colors hover:bg-amber-50 hover:text-amber-700"
                    >
                      {name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
