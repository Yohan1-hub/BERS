"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, GraduationCap } from "lucide-react";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#methodology", label: "Methodology" },
  { href: "#initiatives", label: "Initiatives" },
  { href: "/training", label: "Training", isPage: true },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-slate-100/80 bg-white/95 backdrop-blur-md">
      <div className="section-container flex h-20 items-center justify-between">
        <a
          href="#"
          className="flex items-center gap-3 text-xl font-bold tracking-tight text-slate-800"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary text-sm font-bold text-white shadow-md">
            B
          </span>
          <span className="hidden sm:inline">BERS Institute LLC</span>
          <span className="sm:hidden">BERS</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) =>
            link.isPage ? (
              <a
                key={link.href}
                href={link.href}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors duration-200 hover:text-primary"
              >
                <GraduationCap className="h-4 w-4" />
                {link.label}
              </a>
            ) : (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium text-slate-500 transition-colors duration-200 hover:text-primary"
              >
                {link.label}
              </a>
            )
          )}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="btn-primary ml-2"
          >
            <Globe className="h-4 w-4" />
            Partner With Us
          </a>
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex items-center justify-center rounded-lg p-2 text-slate-500 transition-colors hover:text-primary md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-slate-100 bg-white md:hidden"
          >
            <div className="section-container flex flex-col gap-2 pb-6 pt-4">
              {navLinks.map((link) =>
                link.isPage ? (
                  <a
                    key={link.href}
                    href={link.href}
                    className="inline-flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-primary"
                  >
                    <GraduationCap className="h-4 w-4" />
                    {link.label}
                  </a>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="rounded-lg px-4 py-3 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-primary"
                  >
                    {link.label}
                  </a>
                )
              )}
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="btn-primary mt-2 justify-center"
              >
                <Globe className="h-4 w-4" />
                Partner With Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
