"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Lock,
  Play,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Home,
} from "lucide-react";
import courses from "@/data/courses/static-data.json";

const list = courses as any[];

export default function LearnPage({ params }: { params: { id: string } }) {
  const course = list.find((c: any) => c.id === params.id) || null;

  const [purchased] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    const existing = JSON.parse(window.localStorage.getItem("bers_purchases") || "{}");
    return Boolean(existing[params.id]);
  });

  const allLessons = useMemo(() => {
    if (!course) return [];
    return course.modules.flatMap((m: any) =>
      m.lessons.map((l: any) => ({ ...l, moduleTitle: m.title, moduleId: m.id })),
    );
  }, [course]);

  const [activeIndex, setActiveIndex] = useState(0);

  const [completed, setCompleted] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    return JSON.parse(window.localStorage.getItem(`bers_progress_${params.id}`) || "[]");
  });

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

  if (!purchased) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-5 px-4 pt-20 text-center md:pt-32">
        <Lock className="h-12 w-12 text-slate-300" />
        <h1 className="text-2xl font-bold text-slate-800">This course is locked</h1>
        <p className="max-w-md text-slate-500">
          Complete the <span className="font-medium text-slate-700">simulated payment</span> to
          unlock {course.title} and all {allLessons.length} lessons.
        </p>
        <div className="flex gap-3">
          <Link
            href={`/courses/${course.id}/checkout/`}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-700 hover:shadow-lg"
          >
            Go to checkout
          </Link>
          <Link
            href={`/courses/${course.id}/`}
            className="inline-flex items-center gap-2 rounded-lg border-2 border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition-all hover:border-slate-300"
          >
            Back to course
          </Link>
        </div>
      </div>
    );
  }

  const lesson = allLessons[activeIndex];
  const isCompleted = completed.includes(lesson.id);
  const progress = Math.round((completed.length / allLessons.length) * 100);

  function toggleComplete(id: string) {
    setCompleted((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      if (typeof window !== "undefined") {
        window.localStorage.setItem(`bers_progress_${params.id}`, JSON.stringify(next));
      }
      return next;
    });
  }

  function goTo(index: number) {
    if (index >= 0 && index < allLessons.length) setActiveIndex(index);
  }

  return (
    <div className="min-h-screen bg-white pt-20 md:pt-32">
      <div className="section-container py-8">
        {/* Top bar */}
        <div className="flex flex-col gap-3 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/courses"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
              aria-label="Back to courses"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div>
              <h1 className="text-lg font-bold text-slate-800 sm:text-xl">{course.title}</h1>
              <p className="text-xs text-slate-400">Courses</p>
            </div>
          </div>
          <div className="w-full sm:w-64">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Progress</span>
              <span className="font-semibold text-emerald-700">
                {completed.length}/{allLessons.length} · {progress}%
              </span>
            </div>
            <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* Curriculum */}
          <aside className="lg:col-span-1">
            <div className="rounded-xl border border-slate-200">
              <div className="border-b border-slate-100 p-4">
                <h2 className="text-sm font-bold text-slate-800">Course content</h2>
                <p className="mt-0.5 text-xs text-slate-400">
                  {course.modules?.length || 0} modules · {allLessons.length} lessons
                </p>
              </div>
              <div className="max-h-[70vh] overflow-y-auto p-2">
                {course.modules?.map((m: any) => {
                  const moduleLessons = allLessons.filter((l: any) => l.moduleId === m.id);
                  const moduleDone = moduleLessons.filter((l: any) =>
                    completed.includes(l.id),
                  ).length;
                  return (
                    <div key={m.id} className="mb-2 rounded-lg p-2 hover:bg-slate-50">
                      <p className="px-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-700">
                        Module {m.order}
                      </p>
                      <p className="px-1 text-xs font-medium text-slate-600">{m.title}</p>
                      <p className="mt-0.5 px-1 text-[11px] text-slate-400">
                        {moduleDone}/{moduleLessons.length} · {m.description}
                      </p>
                      <ul className="mt-1.5 space-y-0.5">
                        {moduleLessons.map((l: any, li: number) => {
                          const index = allLessons.findIndex((x: any) => x.id === l.id);
                          const done = completed.includes(l.id);
                          return (
                            <li key={l.id}>
                              <button
                                onClick={() => setActiveIndex(index)}
                                className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-xs transition-colors ${
                                  index === activeIndex
                                    ? "bg-emerald-100 text-emerald-800"
                                    : "text-slate-600 hover:bg-slate-50"
                                }`}
                              >
                                <span
                                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                                    done
                                      ? "bg-emerald-500 text-white"
                                      : index === activeIndex
                                        ? "bg-emerald-600 text-white"
                                        : "bg-slate-100 text-slate-500"
                                  }`}
                                >
                                  {done ? <Check className="h-3 w-3" /> : moduleLessons[li].order}
                                </span>
                                <span className="truncate">{l.title}</span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Lesson player */}
          <main className="lg:col-span-2">
            <div className="rounded-xl border border-slate-200">
              <div className="border-b border-slate-100 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                  {lesson.moduleTitle}
                </p>
                <h2 className="mt-1 text-xl font-bold text-slate-800">{lesson.title}</h2>
              </div>

              <div className="min-h-72 p-6">
                <div className="aspect-video rounded-xl bg-gradient-to-br from-emerald-100 to-slate-100 flex items-center justify-center">
                  <div className="text-center">
                    <Play className="mx-auto mb-3 h-14 w-14 text-slate-300" />
                    <p className="text-sm text-slate-400">Video lesson coming soon</p>
                  </div>
                </div>

                <div className="mt-6 space-y-4 leading-relaxed text-slate-600">
                  {(lesson.content || "")
                    .split(". ")
                    .filter(Boolean)
                    .map((sentence: string, i: number) => (
                      <p key={i}>{sentence.trim()}.</p>
                    ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 border-t border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
                <button
                  onClick={() => goTo(Math.max(0, activeIndex - 1))}
                  disabled={activeIndex === 0}
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" /> Previous
                </button>

                <button
                  onClick={() => toggleComplete(lesson.id)}
                  className={`inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all ${
                    isCompleted
                      ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                      : "bg-primary text-white hover:bg-primary-700"
                  }`}
                >
                  {isCompleted ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" /> Completed
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4" /> Mark as complete
                    </>
                  )}
                </button>

                {activeIndex < allLessons.length - 1 && (
                  <button
                    onClick={() => goTo(activeIndex + 1)}
                    className="inline-flex items-center gap-2 rounded-lg border-2 border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:border-slate-300"
                  >
                    Next <ChevronRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {progress === 100 && (
              <div className="mt-6 flex flex-col items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center">
                <CheckCircle2 className="h-10 w-10 text-emerald-500" />
                <h3 className="font-bold text-emerald-800">
                  Congratulations! You completed the course
                </h3>
                <p className="max-w-md text-sm text-emerald-700">
                  You mastered the fundamentals of the Incident Command System. Well done.
                </p>
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-emerald-700"
                >
                  <Home className="h-4 w-4" /> Browse more courses
                </Link>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}