"use client";

import { motion } from "framer-motion";
import { Droplets, Radar, GraduationCap, ArrowDown } from "lucide-react";

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
    gradient: "from-sky-500 to-cyan-500",
    bgPattern: "bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sky-50 via-white to-white",
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
    bgPattern: "bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-50 via-white to-white",
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
    gradient: "from-emerald-500 to-teal-500",
    bgPattern: "bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-50 via-white to-white",
  },
];

export default function Methodology() {
  return (
    <section id="methodology" className="section-padding bg-slate-50">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-700">
            How We Work
          </span>
          <h2 className="section-title">
            Bridging Traditional Knowledge and{" "}
            <span className="text-emerald-600">Modern Science</span>.
          </h2>
          <p className="section-subtitle mx-auto">
            We do not impose external solutions. We systematize, optimize, and
            scale time-tested techniques that have functioned for thousands of
            years, validating them with modern scientific protocols.
          </p>
        </motion.div>

        <div className="relative mt-16">
          {/* Connector line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-emerald-200 via-amber-200 to-emerald-200 md:block" />

          <div className="relative grid gap-8 md:grid-cols-3">
            {cards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="card-shadow-hover group relative overflow-hidden rounded-2xl border border-slate-100 bg-white card-shadow"
              >
                {/* Step number */}
                <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-xs font-bold text-slate-300">
                  0{index + 1}
                </div>

                {/* Icon */}
                <div className="p-8 pb-0">
                  <div
                    className={`mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br ${card.gradient} shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl`}
                  >
                    <card.icon className="h-8 w-8 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-800">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-500">
                    {card.description}
                  </p>
                </div>

                {/* Items */}
                <div className="p-8 pt-6">
                  <div className="space-y-3 border-t border-slate-100 pt-6">
                    {card.items.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 text-sm text-slate-600"
                      >
                        <span
                          className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${card.gradient} text-[10px] font-bold text-white`}
                        >
                          ✓
                        </span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Decorative corner */}
                <div className="pointer-events-none absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-gradient-to-br from-slate-100/50 to-transparent transition-all duration-500 group-hover:scale-150" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-6 py-3 text-sm text-emerald-700 shadow-sm">
            <GraduationCap className="h-4 w-4" />
            Each methodology is adapted to local cultural and environmental
            contexts
          </div>
        </motion.div>
      </div>
    </section>
  );
}
