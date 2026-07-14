"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const serviceParam = params.get("service");
    if (serviceParam) setForm((f) => ({ ...f, service: serviceParam }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const body = `Name: ${form.name}%0D%0AEmail: ${form.email}%0D%0APhone: ${form.phone}%0D%0AService: ${form.service}%0D%0A%0D%0A${form.message}`;
    const mailto = `mailto:yohan.ariza@bersinstitue.org?subject=${encodeURIComponent("Contact from bersinstitute.org")}&body=${body}`;

    window.location.href = mailto;
    setSent(true);
    setLoading(false);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 md:pt-32">
        <section className="bg-gradient-to-br from-emerald-600 to-emerald-800 py-16 text-white sm:py-20">
          <div className="section-container text-center">
            <h1 className="text-3xl font-extrabold sm:text-4xl">Contact Us</h1>
            <p className="mx-auto mt-3 max-w-xl text-emerald-100">
              Request a quote, ask about our services, or start a project with us.
            </p>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="section-container">
            <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                {sent ? (
                  <div className="flex flex-col items-center justify-center rounded-2xl bg-emerald-50 p-12 text-center">
                    <CheckCircle className="h-12 w-12 text-emerald-500" />
                    <h3 className="mt-4 text-xl font-bold text-emerald-800">Email Opened!</h3>
                    <p className="mt-2 text-emerald-600">Check your email client to send the message.</p>
                    <button onClick={() => { setSent(false); setForm({ name: "", email: "", phone: "", service: "", message: "" }); }}
                      className="btn-primary mt-6">Send another</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="text-sm font-medium text-slate-700">Name *</label>
                        <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-emerald-500" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700">Email *</label>
                        <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-emerald-500" />
                      </div>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="text-sm font-medium text-slate-700">Phone</label>
                        <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-emerald-500" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700">Service of Interest</label>
                        <input value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}
                          placeholder="Type a service name or select..."
                          className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-emerald-500" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700">Message *</label>
                      <textarea rows={5} required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-emerald-500" />
                    </div>
                    <button type="submit" disabled={loading}
                      className="btn-primary w-full justify-center sm:w-auto">
                      <Send className="h-4 w-4" /> {loading ? "Opening email..." : "Send Message"}
                    </button>
                    <p className="text-xs text-slate-400">Opens your email client with the form data. Click send from there.</p>
                  </form>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Get in Touch</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    Ready to start a project or need more information? Fill out the form
                    and we'll get back to you within 24 hours.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">
                      <Mail className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700">Email</p>
                      <a href="mailto:yohan.ariza@bersinstitue.org" className="text-sm text-slate-500 hover:text-emerald-600">
                        yohan.ariza@bersinstitue.org
                      </a>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-50 p-6">
                  <h4 className="font-bold text-slate-700">Our Service Areas</h4>
                  <ul className="mt-3 space-y-2">
                    {["EHSQ", "Biological & Environmental", "Risk Management", "CSR & Governance", "Animal Health & Veterinary", "Training & Capacity Building", "Sustainability & Climate"].map((cat) => (
                      <li key={cat} className="flex items-center gap-2 text-sm text-slate-500">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        {cat}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
