"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Leaf,
  AlertTriangle,
  Star,
  Users,
  ExternalLink,
  Search,
  BookOpen,
} from "lucide-react";
import { courses, categories } from "@/data/courses";

const categoryIcons: Record<string, typeof Shield> = {
  ehsq: Shield,
  biology: Leaf,
  "risk-management": AlertTriangle,
};

const thumbnailGradients: Record<string, string> = {
  ehsq: "from-orange-600 to-amber-500",
  biology: "from-emerald-600 to-teal-500",
  "risk-management": "from-primary to-secondary",
};

export default function TrainingPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = courses.filter((c) => {
    const matchCategory = activeCategory === "all" || c.category === activeCategory;
    const matchSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="border-b border-slate-200 bg-white">
        <div className="section-container py-6 sm:py-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-800 sm:text-3xl">
                EHSQ &amp; Biology Training
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Professional certification courses in Environment, Health,
                Safety &amp; Quality, Biological Sciences, and Risk Management
              </p>
            </div>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-10 pr-4 text-sm outline-none transition-colors focus:border-slate-500"
              />
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveCategory("all")}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                activeCategory === "all"
                  ? "bg-slate-800 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              All
            </button>
            {categories.map((cat) => {
              const Icon = categoryIcons[cat.id];
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                    activeCategory === cat.id
                      ? "bg-slate-800 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="section-container py-8">
        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <BookOpen className="mx-auto h-12 w-12 text-slate-300" />
            <p className="mt-4 text-lg font-medium text-slate-500">
              No courses match your search.
            </p>
          </div>
        ) : (
          <>
            <p className="mb-6 text-sm text-slate-500">
              {filtered.length} result{filtered.length !== 1 && "s"}
            </p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((course, index) => (
                <CourseCard key={course.id} course={course} index={index} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function CourseCard({
  course,
  index,
}: {
  course: (typeof courses)[0];
  index: number;
}) {
  const Icon = categoryIcons[course.category] || Shield;
  const thumbGrad = thumbnailGradients[course.category];

  return (
    <motion.a
      href={course.stripeLink}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.3, delay: (index % 8) * 0.04 }}
      className="group flex cursor-pointer flex-col rounded-lg border border-slate-200 bg-white transition-shadow hover:shadow-lg"
    >
      <div
        className={`flex h-36 items-center justify-center rounded-t-lg bg-gradient-to-br ${thumbGrad}`}
      >
        <Icon className="h-14 w-14 text-white/40" />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <span className="truncate rounded bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500">
            {categories.find((c) => c.id === course.category)?.name}
          </span>
          {course.featured && (
            <span className="shrink-0 rounded bg-amber-100 px-2 py-0.5 text-[11px] font-bold text-amber-700">
              Bestseller
            </span>
          )}
        </div>

        <h3 className="mt-2 text-sm font-bold leading-snug text-slate-800 line-clamp-2">
          {course.title}
        </h3>

        <p className="mt-1 text-xs text-slate-400">{course.instructor}</p>

        <div className="mt-1.5 flex items-center gap-2">
          <span className="text-sm font-bold text-amber-600">
            {course.rating?.toFixed(1)}
          </span>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className={`h-3 w-3 ${
                  s <= Math.round(course.rating || 0)
                    ? "fill-amber-400 text-amber-400"
                    : "text-slate-200"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-slate-400">
            ({course.students?.toLocaleString("en-US")})
          </span>
        </div>

        <div className="mt-1 text-xs text-slate-400">
          {course.lectures} lectures &bull; {course.duration}
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
          <span className="text-lg font-bold text-slate-800">
            ${course.price}
          </span>
          <span className="flex items-center gap-1 text-xs font-semibold text-primary transition-colors group-hover:text-secondary">
            Enroll
            <ExternalLink className="h-3 w-3" />
          </span>
        </div>
      </div>
    </motion.a>
  );
}
