"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Shield } from "lucide-react";

const footerLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Operational Neutrality Statement", href: "#" },
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-slate-900 text-slate-300">
      <div className="section-container py-16">
        <div className="grid gap-12 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary text-sm font-bold text-white shadow-md">
                B
              </span>
              <div>
                <span className="text-lg font-bold text-white">
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
            <div className="mt-6 flex items-center gap-2 text-sm text-slate-500">
              <Shield className="h-4 w-4" />
              <span>501(c)(3) aligned organization</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white">
              Contact
            </h3>
            <ul className="mt-6 space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary-300" />
                <span className="text-sm text-slate-400">
                  Orlando, Florida, USA
                </span>
              </li>
              <li>
                <a
                  href="mailto:yohan.ariza@outlook.com"
                  className="flex items-center gap-3 text-sm text-slate-400 transition-colors hover:text-white"
                >
                  <Mail className="h-5 w-5 shrink-0 text-primary-300" />
                  yohan.ariza@outlook.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+14014362753"
                  className="flex items-center gap-3 text-sm text-slate-400 transition-colors hover:text-white"
                >
                  <Phone className="h-5 w-5 shrink-0 text-primary-300" />
                  +1 401 436 2753
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white">
              Links
            </h3>
            <ul className="mt-6 space-y-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="section-container flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
          <p className="text-xs text-slate-500">
            &copy; 2026 BERS Institute LLC. All rights reserved. A Florida-based
            501(c)(3) aligned organization.
          </p>
        </div>
      </div>
    </footer>
  );
}
