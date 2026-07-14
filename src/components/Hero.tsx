"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const scrollTo = (id: string) => {
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-20 md:pt-32">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-amber-50" />
      <div className="absolute right-0 top-0 h-[600px] w-[600px] translate-x-1/3 -translate-y-1/4 rounded-full bg-amber-400/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-[400px] w-[400px] -translate-x-1/4 translate-y-1/4 rounded-full bg-emerald-400/10 blur-3xl" />

      <div className="section-container relative z-10 w-full">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-800 sm:text-5xl lg:text-6xl">
              Preventing Climate Crises Through{" "}
              <span className="text-emerald-600">Time-Tested Wisdom</span> and{" "}
              <span className="text-amber-500">Scientific Validation</span>.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-500 sm:text-xl">
              BERS Institute LLC is a Florida-based technical organization
              specializing in environmental safety, climate crisis management,
              and holistic disaster risk reduction. With roots in Colombia since
              2008, we bring 16+ years of experience in risk management and
              environmental consulting.
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
                    className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-emerald-100 to-amber-100 text-xs font-bold text-emerald-700 shadow-sm"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div className="text-sm text-slate-400">
                <span className="font-semibold text-slate-600">16+ years</span>{" "}
                of consulting experience
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <div className="sun-glow absolute -inset-20 rounded-full bg-amber-400/5" />
            <div className="relative aspect-square">
              {/* Decorative sun circles */}
              <div className="absolute inset-0 animate-float">
                <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-amber-300/20 to-orange-400/10 blur-xl" />
              </div>
              <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-amber-400/30 to-orange-500/20 blur-lg" />
              <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-2xl shadow-amber-400/30" />

              {/* Orbiting decorative dots */}
              {[0, 60, 120, 180, 240, 300].map((angle) => (
                <div
                  key={angle}
                  className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/40"
                  style={{
                    transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(100px)`,
                  }}
                />
              ))}

              {/* Stats card */}
              <div className="absolute bottom-0 left-0 right-0 rounded-2xl bg-white/90 p-6 shadow-xl backdrop-blur-md">
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "Countries", value: "2" },
                    { label: "Communities", value: "10+" },
                    { label: "Programs", value: "5+" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p className="text-2xl font-extrabold text-emerald-600">
                        {stat.value}
                      </p>
                      <p className="text-xs text-slate-400">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -right-4 top-8 animate-pulse-slow rounded-xl bg-white p-3 shadow-lg">
                <p className="text-xs font-semibold text-emerald-600">
                  Since 2008
                </p>
                <p className="text-[10px] text-slate-400">Est. in USA 2024</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
