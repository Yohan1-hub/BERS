"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 md:pt-32">
        <section className="bg-gradient-to-br from-emerald-600 to-emerald-800 py-16 text-white sm:py-20">
          <div className="section-container text-center">
            <BookOpen className="mx-auto h-10 w-10 text-emerald-300" />
            <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">Blog</h1>
            <p className="mx-auto mt-3 max-w-xl text-emerald-100">
              Insights on environmental management, risk reduction, and sustainability.
            </p>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="section-container">
            <div className="rounded-2xl border-2 border-dashed border-slate-200 p-20 text-center">
              <BookOpen className="mx-auto h-12 w-12 text-slate-300" />
              <h3 className="mt-4 text-lg font-bold text-slate-500">Coming Soon</h3>
              <p className="mt-2 text-sm text-slate-400">
                We are preparing articles on climate resilience, EHSQ best practices,
                and field stories from our projects.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
