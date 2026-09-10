import Link from "next/link";
import {
  ArrowLeft,
  Play,
  Check,
  CheckCircle2,
  Clock,
  GraduationCap,
  Users,
  Award,
  Globe,
  Layers,
  ListChecks,
  BookOpen,
} from "lucide-react";
import courses from "@/data/courses/static-data.json";

const list = courses as any[];

export function generateStaticParams(): { id: string }[] {
  return list.filter((c: any) => c.status === "published").map((c: any) => ({ id: c.id }));
}

function toHoursText(duration: any): string {
  return typeof duration === "string" ? duration : `${duration} hours`;
}

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const course = list.find((c: any) => c.id === params.id) || null;

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

  const allLessons =
    course.modules?.flatMap((m: any) =>
      m.lessons.map((l: any) => ({ ...l, moduleTitle: m.title })),
    ) || [];

  const whatYouLearn: string[] = Array.isArray(course.whatYouLearn)
    ? course.whatYouLearn
    : allLessons.map((l: any) => l.title);

  const includes: { icon: any; label: string }[] = [
    { icon: Clock, label: toHoursText(course.duration) },
    { icon: Layers, label: `${course.modules?.length || 0} modules` },
    { icon: ListChecks, label: `${allLessons.length} lessons` },
    { icon: Award, label: course.ceus || "0.2 CEUs" },
    { icon: Globe, label: course.language?.toUpperCase() === "EN" ? "English" : course.language },
    { icon: GraduationCap, label: course.level || "Beginner" },
  ];

  return (
    <div className="min-h-screen bg-white pt-20 md:pt-32">
      <div className="section-container py-10">
        <Link
          href="/courses"
          className="mb-6 flex items-center gap-1 text-sm font-medium text-emerald-600 hover:text-emerald-700"
        >
          <ArrowLeft className="h-4 w-4" /> Back to courses
        </Link>

        {/* Hero */}
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold uppercase text-emerald-700">
                {course.status}
              </span>
              {course.category && (
                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold uppercase text-primary">
                  {course.category}
                </span>
              )}
              {course.language && (
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-500">
                  {course.language}
                </span>
              )}
            </div>
            <h1 className="text-3xl font-bold text-slate-800 md:text-4xl">{course.title}</h1>

            <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500">
              {course.instructor && (
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="h-4 w-4 text-emerald-600" />
                  Instructor: <span className="font-medium text-slate-700">{course.instructor}</span>
                </span>
              )}
              {typeof course.rating === "number" && (
                <span className="text-amber-600">{course.rating?.toFixed(1)} / 5</span>
              )}
              {typeof course.students === "number" && (
                <span className="flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-slate-400" />
                  {course.students?.toLocaleString("en-US")} enrolled
                </span>
              )}
            </div>

            <p className="mt-4 text-lg leading-relaxed text-slate-500">{course.description}</p>

            {/* Video / lesson player placeholder */}
            <div className="mt-8 aspect-video rounded-xl bg-gradient-to-br from-emerald-100 to-slate-100 flex items-center justify-center">
              <div className="text-center">
                <Play className="mx-auto mb-3 h-16 w-16 text-slate-300" />
                <p className="text-sm text-slate-400">
                  Select a lesson below to begin
                </p>
              </div>
            </div>

            {/* What you'll learn */}
            {whatYouLearn.length > 0 && (
              <div className="mt-8 rounded-xl border border-slate-200 p-6">
                <h2 className="text-lg font-bold text-slate-800">What you&apos;ll learn</h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {whatYouLearn.map((item: any, i: number) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Prerequisites & audience */}
            {(course.prerequisites || course.audience) && (
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {course.prerequisites && (
                  <div className="rounded-xl border border-slate-200 p-6">
                    <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800">
                      <Check className="h-4 w-4 text-emerald-600" /> Prerequisites
                    </h3>
                    <p className="mt-2 text-sm text-slate-500">{course.prerequisites}</p>
                  </div>
                )}
                {course.audience && (
                  <div className="rounded-xl border border-slate-200 p-6">
                    <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800">
                      <Users className="h-4 w-4 text-emerald-600" /> Who this course is for
                    </h3>
                    <p className="mt-2 text-sm text-slate-500">{course.audience}</p>
                  </div>
                )}
              </div>
            )}

            {/* Curriculum */}
            <div className="mt-8">
              <div className="mb-4 flex items-end justify-between gap-4">
                <h2 className="text-lg font-bold text-slate-800">Course content</h2>
                <p className="text-xs text-slate-400">
                  {course.modules?.length || 0} modules &middot; {allLessons.length} lessons
                </p>
              </div>

              <div className="space-y-4">
                {course.modules?.map((module: any) => (
                  <div key={module.id} className="overflow-hidden rounded-xl border border-slate-200">
                    <div className="border-b border-slate-100 bg-slate-50/60 p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                            Module {module.order ?? module.id.replace(/\D/g, "")}
                          </p>
                          <h3 className="mt-0.5 font-semibold text-slate-800">{module.title}</h3>
                          <p className="mt-1 text-sm text-slate-500">{module.description}</p>
                        </div>
                      </div>
                    </div>
                    {module.lessons?.map((lesson: any) => (
                      <div
                        key={lesson.id}
                        className="border-b border-slate-100 p-4 last:border-0 hover:bg-slate-50/50"
                      >
                        <div className="flex items-start gap-3">
                          <span className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                            <Play className="h-3 w-3" />
                          </span>
                          <div>
                            <p className="text-sm font-medium text-slate-700">{lesson.title}</p>
                            <p className="mt-0.5 text-sm text-slate-500">{lesson.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-36 rounded-xl border border-slate-200 shadow-sm">
              <div className="border-b border-slate-100 p-4 pb-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-slate-800">
                    ${typeof course.price === "number" ? course.price : course.price}
                  </span>
                  {typeof course.price === "number" && (
                    <span className="text-xs text-slate-400">one-time</span>
                  )}
                </div>
              </div>

              <div className="space-y-4 p-4">
                <a
                  href={`/courses/${course.id}/checkout/`}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-700 hover:shadow-lg"
                >
                  <Play className="h-4 w-4" /> Start Course
                </a>

                <ul className="space-y-3">
                  {includes.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-slate-600">
                      <item.icon className="h-4 w-4 shrink-0 text-primary" />
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-slate-100 bg-slate-50/60 p-4">
                <p className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <BookOpen className="h-4 w-4 text-emerald-600" />
                  Course content
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {course.modules?.length || 0} modules &middot; {allLessons.length} lessons
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-primary to-emerald-700 p-8 text-center text-white">
          <h2 className="text-xl font-bold">Ready to take the course?</h2>
          <p className="mx-auto mt-1 max-w-xl text-sm text-emerald-50">
            Build a solid foundation in the Incident Command System and respond with confidence.
          </p>
          <a
            href={`/courses/${course.id}/checkout/`}
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3 text-sm font-semibold text-primary transition-all hover:bg-emerald-50 hover:shadow-lg"
          >
            <Play className="h-4 w-4" /> Start Course
          </a>
        </div>
      </div>
    </div>
  );
}