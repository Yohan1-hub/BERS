"use client";

import { motion } from "framer-motion";
import { Shield, Users, BookOpen, Leaf, Droplets, TreePine } from "lucide-react";

const stats = [
  {
    icon: Shield,
    value: "16+ Years",
    label: "In Risk Management",
    gradient: "from-emerald-500 to-emerald-600",
  },
  {
    icon: Users,
    value: "15,000+",
    label: "Individuals Trained",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: BookOpen,
    value: "30+",
    label: "Time-Tested Techniques",
    gradient: "from-emerald-400 to-amber-500",
  },
];

const highlights = [
  {
    icon: Leaf,
    title: "Biological Expertise",
    description: "Scientific validation of traditional ecological knowledge",
  },
  {
    icon: Droplets,
    title: "Water Security",
    description: "Time-tested harvesting systems for climate resilience",
  },
  {
    icon: TreePine,
    title: "Environmental Stewardship",
    description: "Holistic approaches to ecosystem and community health",
  },
];

export default function About() {
  return (
    <section id="about" className="section-padding bg-white">
      {/* Decorative background */}
      <div className="pointer-events-none absolute left-0 right-0 h-96 bg-gradient-to-b from-emerald-50/50 to-transparent" />

      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-700">
            Our Foundation
          </span>
          <h2 className="section-title">
            Rooted in Humanitarian Principles,{" "}
            <span className="text-emerald-600">Driven by Science</span>.
          </h2>
          <p className="section-subtitle mx-auto">
            Founded by Yohan Mauricio Ariza Aguilar, a biologist with 16+ years of
            experience in risk management trained by the Colombian and American
            Red Cross. Since 2008 in Colombia and now based in Florida, BERS
            Institute operates with strict operational neutrality, focusing on
            technical solutions for climate security, environmental management,
            and occupational safety.
          </p>
        </motion.div>

        {/* Visual highlights row */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="group relative overflow-hidden rounded-2xl border border-emerald-100/60 bg-gradient-to-br from-emerald-50/40 to-white p-8 transition-all duration-300 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-500/5"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-50 shadow-sm ring-1 ring-emerald-200/50">
                <item.icon className="h-7 w-7 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                {item.description}
              </p>
              <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-emerald-500/5 transition-all duration-500 group-hover:scale-150" />
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="card-shadow-hover group relative overflow-hidden rounded-2xl bg-white p-8 card-shadow"
            >
              <div
                className={`mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg`}
              >
                <stat.icon className="h-7 w-7 text-white" />
              </div>
              <p className="text-3xl font-extrabold text-slate-800">
                {stat.value}
              </p>
              <p className="mt-1.5 text-sm font-medium text-slate-400">
                {stat.label}
              </p>
              <div
                className={`absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-gradient-to-br ${stat.gradient} opacity-5`}
              />
            </motion.div>
          ))}
        </div>

        {/* Neutrality banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-800 p-8 text-white shadow-xl sm:p-12"
        >
          <div className="relative">
            <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/5 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-amber-400/10 blur-3xl" />
            <div className="relative grid items-center gap-8 md:grid-cols-2">
              <div>
                <h3 className="text-2xl font-bold">
                  Our Operational Neutrality
                </h3>
                <p className="mt-3 leading-relaxed text-emerald-100">
                  We maintain strict impartiality in all our operations. Our sole
                  focus is delivering technically sound, scientifically validated
                  solutions to the communities that need them most.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-3 md:justify-end">
                {["Neutrality", "Technical Rigor", "Community First"].map(
                  (principle) => (
                    <span
                      key={principle}
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium backdrop-blur-sm transition-all hover:bg-white/20"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
                      {principle}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
