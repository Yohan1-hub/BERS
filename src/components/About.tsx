"use client";

import { motion } from "framer-motion";
import { Shield, Users, BookOpen } from "lucide-react";

const stats = [
  {
    icon: Shield,
    value: "28+ Years",
    label: "In Risk Management",
    color: "from-primary-500 to-primary-600",
    bgColor: "bg-primary-50",
  },
  {
    icon: Users,
    value: "15,000+",
    label: "Individuals Trained",
    color: "from-secondary-500 to-secondary-600",
    bgColor: "bg-secondary-50",
  },
  {
    icon: BookOpen,
    value: "30+",
    label: "Time-Tested Techniques Documented",
    color: "from-primary-400 to-secondary-500",
    bgColor: "bg-primary-50/60",
  },
];

export default function About() {
  return (
    <section id="about" className="section-padding bg-slate-50">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-primary-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            Our Foundation
          </span>
          <h2 className="section-title">
            Rooted in Humanitarian Principles,{" "}
            <span className="gradient-text">Driven by Science</span>.
          </h2>
          <p className="section-subtitle mx-auto">
            Founded by Yohan Mauricio Ariza Agui, a biologist with 28 years of
            experience in risk management trained by the Colombian and American
            Red Cross. BERS Institute operates with strict operational
            neutrality, focusing exclusively on technical solutions for climate
            and water security. We believe that preventing disasters before they
            occur is the most effective form of humanitarian aid.
          </p>
        </motion.div>

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
                className={`mb-5 flex h-14 w-14 items-center justify-center rounded-xl ${stat.bgColor}`}
              >
                <stat.icon className="h-7 w-7 text-primary" />
              </div>
              <p className="text-3xl font-extrabold text-slate-800">
                {stat.value}
              </p>
              <p className="mt-1.5 text-sm font-medium text-slate-400">
                {stat.label}
              </p>
              <div
                className={`absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-gradient-to-br ${stat.color} opacity-5`}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 rounded-2xl bg-gradient-to-br from-primary to-primary-600 p-8 text-white shadow-xl sm:p-12"
        >
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-2xl font-bold">Our Operational Neutrality</h3>
              <p className="mt-3 leading-relaxed text-primary-100">
                We maintain strict impartiality in all our operations. Our sole
                focus is delivering technically sound, scientifically validated
                solutions to the communities that need them most, regardless of
                political or economic considerations.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-6 md:justify-end">
              {["Neutrality", "Technical Rigor", "Community First"].map(
                (principle) => (
                  <span
                    key={principle}
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium backdrop-blur-sm"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-secondary-300" />
                    {principle}
                  </span>
                )
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
