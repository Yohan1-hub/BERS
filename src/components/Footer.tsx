"use client";

import { motion } from "framer-motion";
import { Shield, Mail, Globe, Heart } from "lucide-react";

const footerLinks = [
  {
    title: "Our Focus",
    links: [
      { label: "Water Security", href: "/#methodology" },
      { label: "Risk Management", href: "/#methodology" },
      { label: "Capacity Building", href: "/#methodology" },
      { label: "Climate Adaptation", href: "/#methodology" },
    ],
  },
  {
    title: "Principles",
    links: [
      { label: "Operational Neutrality", href: "/#about" },
      { label: "Technical Rigor", href: "/#about" },
      { label: "Community First", href: "/#about" },
      { label: "Scientific Validation", href: "/#about" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Partnerships", href: "/contact?service=Partnerships" },
      { label: "Research", href: "/blog" },
      { label: "Careers", href: "/contact?service=Careers" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900">
      <div className="section-container">
        <div className="grid gap-12 py-16 sm:py-20 lg:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 text-sm font-black text-white shadow-md drop-shadow-sm">
                B
              </span>
              <div>
                <span className="text-lg font-extrabold italic tracking-tight text-amber-400 drop-shadow-[0_1px_2px_rgba(251,191,36,0.3)]">
                  BERS Institute LLC
                </span>
                <p className="text-xs text-slate-500">
                  Biological · Environment · Risk Services
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Preventing climate crises through time-tested wisdom and scientific
              validation. A Florida-based technical organization committed to
              holistic disaster risk reduction.
            </p>
            <div className="mt-6 space-y-2">
              <a href="mailto:yohan.ariza@bersinstitute.org" className="flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-primary-300">
                <Mail className="h-4 w-4" /> yohan.ariza@bersinstitute.org
              </a>
            </div>
          </motion.div>

          {footerLinks.map((group, index) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
            >
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                {group.title}
              </h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-400 transition-colors hover:text-primary-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="border-t border-slate-800 py-8">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <p className="text-sm text-slate-500">
              &copy; {new Date().getFullYear()} BERS Institute LLC. All rights
              reserved.
            </p>
            <p className="text-xs text-slate-600">
              Built with scientific rigor and humanitarian purpose.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
