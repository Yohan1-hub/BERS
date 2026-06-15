"use client";

import { motion } from "framer-motion";
import { MapPin, BookOpen, ExternalLink } from "lucide-react";

const initiatives = [
  {
    title: "Indus Basin Water Security Pilot",
    subtitle: "Proposed Technical Cooperation",
    description:
      "A proposed technical cooperation program with the Ministry of Jal Shakti (India) to systematize time-tested water harvesting in Rajasthan, preventing resource-based conflicts.",
    icon: MapPin,
    region: "Rajasthan, India",
    tags: ["Water Security", "Conflict Prevention", "Technical Cooperation"],
    gradient: "from-primary to-primary-600",
  },
  {
    title: "Community Science & Creation Care",
    subtitle: "Educational Programs",
    description:
      "Educational programs in Orlando, FL, empowering the next generation of scientists to address the climate crisis through a lens of environmental stewardship.",
    icon: BookOpen,
    region: "Orlando, Florida",
    tags: ["Education", "Youth Empowerment", "Climate Science"],
    gradient: "from-secondary to-amber-600",
  },
];

export default function Initiatives() {
  return (
    <section id="initiatives" className="section-padding bg-slate-50">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-primary-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            Our Work
          </span>
          <h2 className="section-title">
            Global Impact,{" "}
            <span className="gradient-text">Local Action</span>.
          </h2>
          <p className="section-subtitle mx-auto">
            Explore our current initiatives spanning international technical
            cooperation and community-based education programs.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {initiatives.map((initiative, index) => (
            <motion.div
              key={initiative.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="card-shadow-hover group relative overflow-hidden rounded-2xl bg-white card-shadow"
            >
              <div className={`h-2 w-full bg-gradient-to-r ${initiative.gradient}`} />
              <div className="p-8 sm:p-10">
                <div className="flex items-start justify-between">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${initiative.gradient} shadow-md`}
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
                      className="rounded-lg bg-primary-50 px-3.5 py-1.5 text-xs font-medium text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
