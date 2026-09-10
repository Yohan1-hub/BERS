"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ShieldCheck,
  CreditCard,
  Lock,
  CheckCircle2,
  Loader2,
  BookOpen,
  Clock,
  Layers,
  ListChecks,
  Award,
} from "lucide-react";
import courses from "@/data/courses/static-data.json";

const list = courses as any[];

function formatCardNumber(value: string): string {
  return value
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, "$1 ");
}

function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export default function CheckoutPage({ params }: { params: { id: string } }) {
  const course = list.find((c: any) => c.id === params.id) || null;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "processing" | "success">("idle");

  if (!course) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 pt-20 md:pt-32">
        <p className="text-lg text-slate-500">Course not found</p>
        <Link href="/courses" className="text-sm text-emerald-600 underline">
          Browse courses
        </Link>
      </div>
    );
  }

  const coursePrice = `$${typeof course.price === "number" ? course.price : course.price}`;

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (name.trim().length < 3) next.name = "Enter the cardholder name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = "Enter a valid email";
    if (cardNumber.replace(/\D/g, "").length !== 16) next.cardNumber = "Card number must have 16 digits";
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) next.expiry = "Use MM/YY format";
    if (cvc.replace(/\D/g, "").length < 3) next.cvc = "Invalid CVC";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handlePay() {
    if (status !== "idle" || !validate()) return;
    setStatus("processing");
    setTimeout(() => {
      if (typeof window !== "undefined") {
        const key = "bers_purchases";
        const existing = JSON.parse(window.localStorage.getItem(key) || "{}");
        existing[course.id] = { purchasedAt: new Date().toISOString(), email: email.trim() };
        window.localStorage.setItem(key, JSON.stringify(existing));
      }
      setStatus("success");
    }, 1800);
  }

  if (status === "success") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-5 px-4 pt-20 text-center md:pt-32">
        <CheckCircle2 className="h-16 w-16 text-emerald-500" />
        <h1 className="text-2xl font-bold text-slate-800">Payment successful</h1>
        <p className="max-w-md text-slate-500">
          You now have access to <span className="font-medium text-slate-700">{course.title}</span>.
          A receipt was sent to {email.trim()}.
        </p>
        <Link
          href={`/courses/${course.id}/learn/`}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-700 hover:shadow-lg"
        >
          <BookOpen className="h-4 w-4" /> Go to your course
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-20 md:pt-32">
      <div className="section-container py-10">
        <Link
          href={`/courses/${course.id}/`}
          className="mb-6 flex items-center gap-1 text-sm font-medium text-emerald-600 hover:text-emerald-700"
        >
          <ArrowLeft className="h-4 w-4" /> Back to course
        </Link>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Order summary */}
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Checkout</h1>
            <p className="mt-1 text-sm text-slate-500">
              This checkout is a simulation for demonstration purposes. No real payment occurs.
            </p>

            <div className="mt-6 rounded-xl border border-slate-200 p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-semibold text-slate-800">{course.title}</h2>
                  <p className="mt-1 text-sm text-slate-500">by {course.instructor}</p>
                </div>
                <span className="text-xl font-bold text-slate-800">{coursePrice}</span>
              </div>

              <ul className="mt-4 space-y-2.5 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" /> {course.duration}
                </li>
                <li className="flex items-center gap-2">
                  <Layers className="h-4 w-4 text-primary" /> {course.modules?.length || 0} modules
                </li>
                <li className="flex items-center gap-2">
                  <ListChecks className="h-4 w-4 text-primary" /> {course.lectures || 0} lessons
                </li>
                <li className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-primary" /> {course.ceus || "0.2 CEUs"}
                </li>
              </ul>

              <div className="mt-5 border-t border-slate-100 pt-4">
                <div className="flex items-center justify-between text-sm font-medium text-slate-600">
                  <span>Total</span>
                  <span className="text-lg font-bold text-slate-800">{coursePrice}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment form */}
          <div>
            <div className="flex items-center gap-2 rounded-t-xl border border-slate-200 bg-slate-50 p-4">
              <CreditCard className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold text-slate-700">Payment details</span>
              <span className="ml-auto flex items-center gap-1 text-xs text-slate-400">
                <Lock className="h-3 w-3" /> Simulated
              </span>
            </div>

            <form
              className="space-y-4 rounded-b-xl border border-t-0 border-slate-200 p-6"
              onSubmit={(e) => {
                e.preventDefault();
                handlePay();
              }}
            >
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600">
                  Cardholder name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Yohan M. Ariza"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                />
                {errors.name && <p className="mt-1 text-xs text-rose-500">{errors.name}</p>}
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600">Email</label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                />
                {errors.email && <p className="mt-1 text-xs text-rose-500">{errors.email}</p>}
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600">Card number</label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  placeholder="4242 4242 4242 4242"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                />
                {errors.cardNumber && (
                  <p className="mt-1 text-xs text-rose-500">{errors.cardNumber}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-600">Expiry</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={expiry}
                    onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                    placeholder="MM/YY"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                  />
                  {errors.expiry && <p className="mt-1 text-xs text-rose-500">{errors.expiry}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-600">CVC</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
                    placeholder="123"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                  />
                  {errors.cvc && <p className="mt-1 text-xs text-rose-500">{errors.cvc}</p>}
                </div>
              </div>

              <button
                type="submit"
                disabled={status === "processing"}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "processing" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Processing payment...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="h-4 w-4" /> Pay {coursePrice} and start
                  </>
                )}
              </button>

              <p className="flex items-center justify-center gap-1.5 pt-1 text-center text-[11px] text-slate-400">
                <Lock className="h-3 w-3" /> Simulated checkout · No real charge is made
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}