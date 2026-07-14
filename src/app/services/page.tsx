"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Shield, Leaf, AlertTriangle, Heart, PawPrint, GraduationCap, TreePine, FileText } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { services, serviceCategories, type ServiceCategory } from "@/data/services";

const categoryIcons: Record<ServiceCategory, typeof Shield> = {
  ehsq: Shield,
  biological: Leaf,
  "risk-management": AlertTriangle,
  csr: Heart,
  "animal-health": PawPrint,
  training: GraduationCap,
  sustainability: TreePine,
};

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | "all">("all");
  const [search, setSearch] = useState("");

  const filtered = services.filter((s) => {
    const matchCategory = activeCategory === "all" || s.category === activeCategory;
    const matchSearch = s.title.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 md:pt-32">
        {/* Hero */}
        <section className="bg-gradient-to-br from-emerald-600 to-emerald-800 py-16 text-white sm:py-20">
          <div className="section-container text-center">
            <FileText className="mx-auto h-10 w-10 text-emerald-300" />
            <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">
              100 Actividades — 100% Efectividad
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-emerald-100">
              Nuestra lista completa de servicios especializados en EHSQ, gestión
              de riesgos, medio ambiente, salud animal, sostenibilidad y más.
            </p>
          </div>
        </section>

        <div className="section-container py-8">
          {/* Search + Category filters */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar servicio..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-10 pr-4 text-sm outline-none transition-colors focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory("all")}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                activeCategory === "all"
                  ? "bg-emerald-600 text-white shadow-md"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              All ({services.length})
            </button>
            {serviceCategories.map((cat) => {
              const Icon = categoryIcons[cat.id];
              const count = services.filter((s) => s.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                    activeCategory === cat.id
                      ? "bg-emerald-600 text-white shadow-md"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>

          {/* Results count */}
          <p className="mt-6 text-sm text-slate-500">
            {filtered.length} service{filtered.length !== 1 && "s"}
          </p>

          {/* Services list */}
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((service, i) => {
              const cat = serviceCategories.find((c) => c.id === service.category);
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (i % 20) * 0.03 }}
                  className="group flex items-start gap-3 rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                >
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-emerald-50 text-[11px] font-bold text-emerald-600">
                    {service.id}
                  </span>
                  <div>
                    <p className="text-sm leading-snug text-slate-700">{service.title}</p>
                    <span className="mt-1 inline-block rounded bg-slate-50 px-2 py-0.5 text-[10px] font-medium text-slate-400">
                      {cat?.name}
                    </span>
                  </div>
                  <a
                    href={`/contact?service=${encodeURIComponent(service.title)}`}
                    className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-[11px] font-bold text-emerald-600 opacity-0 transition-opacity hover:bg-emerald-100 group-hover:opacity-100"
                    title="Request quote"
                  >
                    $
                  </a>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Download / Print section */}
        <section className="border-t border-slate-100 bg-slate-50 py-12">
          <div className="section-container text-center">
            <p className="text-sm text-slate-500">
              Lista completa de servicios BERS Institute — 100 actividades para 100% de efectividad
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
