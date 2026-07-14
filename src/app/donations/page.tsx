"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, TreePine, ExternalLink, ImageIcon } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type GalleryImage = {
  filename: string;
  caption: string;
  date: string;
};

export default function DonationsPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    import("@/data/gallery.json").then((m) => setImages(m.default));
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 md:pt-32">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-600 py-20 text-white sm:py-28">
          <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-amber-400/10 blur-3xl" />
          <div className="section-container relative text-center">
            <Heart className="mx-auto h-12 w-12 text-amber-300" />
            <h1 className="mt-6 text-4xl font-extrabold sm:text-5xl">
              Support Our Mission
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-emerald-100">
              Every contribution goes directly to reforestation and landscape
              restoration programs. Help us restore ecosystems and build
              climate resilience in vulnerable communities.
            </p>
            <motion.a
              href="https://buy.stripe.com/donate"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="btn-primary mt-8 inline-flex items-center gap-2 rounded-xl bg-amber-400 px-8 py-4 text-base font-bold text-emerald-900 shadow-xl shadow-amber-400/30 hover:bg-amber-300"
            >
              <TreePine className="h-5 w-5" />
              Donate Now — Plant a Tree
              <ExternalLink className="h-4 w-4" />
            </motion.a>
          </div>
        </section>

        {/* Gallery */}
        <section className="section-padding bg-white">
          <div className="section-container">
            <div className="text-center">
              <ImageIcon className="mx-auto h-8 w-8 text-emerald-500" />
              <h2 className="mt-4 text-3xl font-bold text-slate-800">
                Our Gallery
              </h2>
              <p className="mx-auto mt-2 max-w-xl text-slate-500">
                Illustrations and moments from our reforestation and
                environmental education programs.
              </p>
            </div>

            {images.length === 0 ? (
              <div className="mt-12 rounded-2xl border-2 border-dashed border-slate-200 p-20 text-center">
                <ImageIcon className="mx-auto h-12 w-12 text-slate-300" />
                <p className="mt-4 text-slate-400">No images yet. Check back soon.</p>
              </div>
            ) : (
              <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {images.map((img, i) => (
                  <motion.div
                    key={img.filename}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setSelectedImage(`/uploads/gallery/${img.filename}`)}
                    className="group cursor-pointer overflow-hidden rounded-xl bg-slate-50 shadow-sm transition-shadow hover:shadow-lg"
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={`/uploads/gallery/${img.filename}`}
                        alt={img.caption}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    {img.caption && (
                      <div className="p-3">
                        <p className="text-sm text-slate-600">{img.caption}</p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}

            {/* Support message */}
            <div className="mt-16 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-8 text-center sm:p-12">
              <TreePine className="mx-auto h-10 w-10 text-emerald-500" />
              <h3 className="mt-4 text-2xl font-bold text-emerald-800">
                Every Donation Plants a Tree
              </h3>
              <p className="mx-auto mt-3 max-w-2xl text-emerald-700">
                Your support goes directly to reforestation initiatives,
                ecosystem restoration, and environmental education programs
                in communities across Colombia and the United States.
              </p>
              <a
                href="https://buy.stripe.com/donate"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-6 inline-flex items-center gap-2"
              >
                <Heart className="h-4 w-4" />
                Make a Donation
              </a>
            </div>
          </div>
        </section>

        {/* Lightbox */}
        {selectedImage && (
          <div
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          >
            <img
              src={selectedImage}
              alt="Gallery"
              className="max-h-full max-w-full rounded-xl object-contain shadow-2xl"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
            >
              ✕
            </button>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
