"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle, AlertTriangle, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CONTACT_EMAIL = "yohan.ariza@bersinstitute.org";
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;

type Status = "idle" | "sending" | "success" | "error";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const serviceParam = params.get("service");
    if (serviceParam) setForm((f) => ({ ...f, service: serviceParam }));
  }, []);

  const mailtoFallback = () => {
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      `Service: ${form.service}`,
      "",
      form.message,
    ].join("\n");
    return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      `Quote request${form.service ? ` — ${form.service}` : ""}`,
    )}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          service: form.service,
          message: form.message,
          _subject: `New quote request${form.service ? ` — ${form.service}` : ""}`,
          _template: "table",
          _captcha: "false",
        }),
      });

      const data = await res.json().catch(() => ({}));
      const ok = data?.success === true || data?.success === "true";
      if (res.ok && ok) {
        setStatus("success");
      } else {
        setErrorMessage(
          "The online form is temporarily unavailable. Please send your request using the direct email link below — it reaches the same inbox.",
        );
        setStatus("error");
      }
    } catch {
      setErrorMessage(
        "We could not reach the server. Please use the direct email link below.",
      );
      setStatus("error");
    }
  };

  const reset = () => {
    setForm({ name: "", email: "", phone: "", service: "", message: "" });
    setStatus("idle");
    setErrorMessage("");
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
                {status === "success" ? (
                  <div className="flex flex-col items-center justify-center rounded-2xl bg-emerald-50 p-12 text-center">
                    <CheckCircle className="h-12 w-12 text-emerald-500" />
                    <h3 className="mt-4 text-xl font-bold text-emerald-800">Message sent!</h3>
                    <p className="mt-2 text-emerald-600">
                      Thanks {form.name.split(" ")[0] || "for reaching out"}. We received your
                      request and will reply within 24 hours.
                    </p>
                    <button onClick={reset} className="btn-primary mt-6">
                      Send another
                    </button>
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

                    {status === "error" && (
                      <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                        <div>
                          <p>{errorMessage}</p>
                          <a href={mailtoFallback()} className="mt-1 inline-block font-semibold text-amber-900 underline">
                            Send it from your email app instead
                          </a>
                        </div>
                      </div>
                    )}

                    <button type="submit" disabled={status === "sending"}
                      className="btn-primary w-full justify-center disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto">
                      {status === "sending" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" /> Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" /> Send Message
                        </>
                      )}
                    </button>
                    <p className="text-xs text-slate-400">
                      Your message goes straight to {CONTACT_EMAIL}.
                    </p>
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
                    and we&apos;ll get back to you within 24 hours.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">
                      <Mail className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700">Email</p>
                      <a href={`mailto:${CONTACT_EMAIL}`} className="text-sm text-slate-500 hover:text-emerald-600">
                        {CONTACT_EMAIL}
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
