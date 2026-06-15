"use client";

import { motion } from "framer-motion";
import { Droplets, Radar, GraduationCap } from "lucide-react";

const cards = [
  {
    icon: Droplets,
    title: "Time-Tested Water Systems",
    description:
      "Johads, Tankas, Qanats, Check Dams, optimized for modern climate realities.",
    items: [
      "Traditional rainwater harvesting",
      "Subterranean channel systems",
      "Modern hydrological validation",
    ],
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Radar,
    title: "Holistic Risk Management",
    description:
      "Vulnerability assessment, early warning systems, and community-based preparedness aligned with Red Cross standards.",
    items: [
      "Community-based early warning",
      "Vulnerability mapping & assessment",
      "Red Cross aligned protocols",
    ],
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: GraduationCap,
    title: "Capacity Building",
    description:
      "Train-the-trainer programs, technical protocol development, and cross-cultural knowledge transfer.",
    items: [
      "Train-the-trainer programs",
      "Technical protocol development",
      "Cross-cultural knowledge transfer",
    ],
    gradient: "from-primary to-secondary",
  },
];

export default function Methodology() {
  return (
    <section id="methodology" className="section-padding bg-white">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-primary-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            How We Work
          </span>
          <h2 className="section-title">
            Bridging Traditional Knowledge and{" "}
            <span className="gradient-text">Modern Science</span>.
          </h2>
          <p className="section-subtitle mx-auto">
            We do not impose external solutions. We systematize, optimize, and
            scale time-tested techniques that have functioned for thousands of
            years, validating them with modern scientific protocols.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="card-shadow-hover group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-8 card-shadow"
            >
              <div
                className={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${card.gradient} shadow-lg`}
              >
                <card.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">
                {card.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">
                {card.description}
              </p>
              <ul className="mt-6 space-y-3">
                {card.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm text-slate-600"
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${card.gradient}`}
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-slate-100 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
