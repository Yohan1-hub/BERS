"use client";

import { motion } from "framer-motion";
import { ArrowRight, Shield } from "lucide-react";

export default function Hero() {
  const scrollTo = (id: string) => {
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-primary-50" />
      <div className="absolute right-0 top-0 h-[600px] w-[600px] translate-x-1/3 -translate-y-1/4 rounded-full bg-secondary/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-[400px] w-[400px] -translate-x-1/4 translate-y-1/4 rounded-full bg-primary/5 blur-3xl" />

      <div className="section-container relative z-10 w-full">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-50/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              <Shield className="h-3.5 w-3.5" />
              Biological · Environment · Risk Services
            </div>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-800 sm:text-5xl lg:text-6xl">
              Preventing Climate Crises Through{" "}
              <span className="gradient-text">Time-Tested Wisdom</span> and{" "}
              <span className="gradient-text">Scientific Validation</span>.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-500 sm:text-xl">
              BERS Institute LLC is a Florida-based technical organization
              specializing in holistic disaster risk reduction and time-tested
              water management systems, backed by 28 years of humanitarian field
              experience.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo("#methodology")}
                className="btn-primary"
              >
                Explore Our Methodology
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => scrollTo("#initiatives")}
                className="btn-secondary"
              >
                View Current Initiatives
              </button>
            </div>

            <div className="mt-12 flex items-center gap-8 border-t border-slate-100 pt-8">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-primary-100 to-secondary-100 text-xs font-bold text-primary shadow-sm"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div className="text-sm text-slate-400">
                <span className="font-semibold text-slate-600">28+ years</span>{" "}
                of humanitarian field experience
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/10 via-white to-secondary/10 p-8 shadow-sm">
              <div className="flex h-full w-full items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/20">
                    <Shield className="h-12 w-12 text-white" />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium uppercase tracking-widest text-primary">
                        Institute Founded
                      </p>
                      <p className="mt-1 text-6xl font-extrabold text-slate-800">
                        2024
                      </p>
                    </div>
                    <div className="border-t border-slate-100 pt-4">
                      <p className="text-xs font-medium uppercase tracking-widest text-slate-400">
                        Founder's Field Experience
                      </p>
                      <p className="mt-1 text-2xl font-bold text-primary">
                        Since 2008
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 grid grid-cols-3 gap-4">
                    {[
                      { label: "Countries", value: "12+" },
                      { label: "Communities", value: "200+" },
                      { label: "Programs", value: "45+" },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-xl bg-white/80 p-4 text-center shadow-sm"
                      >
                        <p className="text-lg font-bold text-primary">
                          {stat.value}
                        </p>
                        <p className="text-xs text-slate-400">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
