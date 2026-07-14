"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import projects from "@/data/projects";

const statusColors: Record<string, string> = {
  Active: "bg-emerald-100 text-emerald-700",
  Completed: "bg-blue-100 text-blue-700",
  Proposed: "bg-amber-100 text-amber-700",
};

export default function PortfolioPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 md:pt-32">
        <section className="bg-gradient-to-br from-emerald-600 to-emerald-800 py-16 text-white sm:py-20">
          <div className="section-container text-center">
            <Briefcase className="mx-auto h-10 w-10 text-emerald-300" />
            <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">Our Projects</h1>
            <p className="mx-auto mt-3 max-w-2xl text-emerald-100">
              A selection of our ongoing and completed projects in environmental
              management, risk reduction, education, and animal health.
            </p>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="section-container">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, i) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all hover:shadow-lg"
                >
                  <div className={`h-2 w-full bg-gradient-to-r ${project.gradient}`} />
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusColors[project.status]}`}>
                        {project.status}
                      </span>
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-slate-800">{project.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500">{project.description}</p>
                    <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-400">
                      <MapPin className="h-3.5 w-3.5" />
                      {project.category}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
