"use client";

import { motion } from "framer-motion";
import { MapPin, BookOpen, ExternalLink, Globe, Droplets } from "lucide-react";

const initiatives = [
  {
    title: "Indus Basin Water Security Pilot",
    subtitle: "Proposed Technical Cooperation",
    description:
      "A proposed technical cooperation program with the Ministry of Jal Shakti (India) to systematize time-tested water harvesting in Rajasthan, preventing resource-based conflicts.",
    icon: Droplets,
    region: "Rajasthan, India",
    tags: ["Water Security", "Conflict Prevention", "Technical Cooperation"],
    color: "from-emerald-500 to-teal-500",
    lightBg: "bg-emerald-50",
  },
  {
    title: "Community Science & Creation Care",
    subtitle: "Educational Programs",
    description:
      "Educational programs in Orlando, FL, empowering the next generation of scientists to address the climate crisis through a lens of environmental stewardship.",
    icon: BookOpen,
    region: "Orlando, Florida",
    tags: ["Education", "Youth Empowerment", "Climate Science"],
    color: "from-amber-500 to-orange-500",
    lightBg: "bg-amber-50",
  },
];

const impactStats = [
  { label: "Active Programs", value: "5" },
  { label: "Countries", value: "2" },
  { label: "Communities", value: "10+" },
  { label: "Technical Partners", value: "5+" },
];

export default function Initiatives() {
  return (
    <section id="initiatives" className="section-padding bg-white">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-700">
            Our Work
          </span>
          <h2 className="section-title">
            Global Impact,{" "}
            <span className="text-amber-500">Local Action</span>.
          </h2>
          <p className="section-subtitle mx-auto">
            Explore our current initiatives spanning international technical
            cooperation and community-based education programs.
          </p>
        </motion.div>

        {/* Impact bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 p-6 shadow-xl shadow-emerald-200/50 sm:p-8"
        >
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {impactStats.map((stat) => (
              <div key={stat.label} className="text-center text-white">
                <p className="text-3xl font-extrabold tracking-tight">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs font-medium text-emerald-100/80 uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Initiative cards */}
        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {initiatives.map((initiative, index) => (
            <motion.div
              key={initiative.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="card-shadow-hover group relative overflow-hidden rounded-2xl border border-slate-100 bg-white transition-all duration-300 hover:border-slate-200 card-shadow"
            >
              {/* Top color bar */}
              <div
                className={`h-2 w-full bg-gradient-to-r ${initiative.color}`}
              />

              <div className="p-8 sm:p-10">
                <div className="flex items-start justify-between">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${initiative.color} shadow-lg transition-all duration-300 group-hover:scale-110`}
                  >
                    <initiative.icon className="h-7 w-7 text-white" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-3.5 py-1.5 text-xs font-medium text-slate-500">
                    <ExternalLink className="h-3 w-3" />
                    {initiative.subtitle}
                  </span>
                </div>

                <h3 className="mt-6 text-2xl font-bold text-slate-800">
                  {initiative.title}
                </h3>

                <div className="mt-2 flex items-center gap-1.5 text-sm text-slate-400">
                  <MapPin className="h-4 w-4" />
                  {initiative.region}
                </div>

                <p className="mt-4 leading-relaxed text-slate-500">
                  {initiative.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {initiative.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`rounded-lg ${initiative.lightBg} px-3.5 py-1.5 text-xs font-medium text-emerald-700`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Decorative globe */}
              <div className="pointer-events-none absolute -bottom-10 -right-10 opacity-[0.03]">
                <Globe className="h-40 w-40" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
