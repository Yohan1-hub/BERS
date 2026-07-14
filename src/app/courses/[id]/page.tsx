import Link from "next/link";
import { ArrowLeft, Play, FileText } from "lucide-react";
import courses from "@/data/courses/static-data.json";

const list = courses as any[];

export function generateStaticParams(): { id: string }[] {
  return list.filter((c: any) => c.status === "published").map((c: any) => ({ id: c.id }));
}

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const course = list.find((c: any) => c.id === params.id) || null;

  if (!course) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 pt-20 md:pt-32">
        <p className="text-lg text-slate-500">Course not found</p>
        <Link href="/courses" className="text-sm text-emerald-600 underline">Browse courses</Link>
      </div>
    );
  }

  const allLessons = course.modules?.flatMap((m: any) =>
    m.lessons.map((l: any) => ({ ...l, moduleTitle: m.title })),
  ) || [];

  return (
    <div className="min-h-screen bg-white pt-20 md:pt-32">
      <div className="section-container py-10">
        <Link href="/courses" className="mb-6 flex items-center gap-1 text-sm font-medium text-emerald-600 hover:text-emerald-700">
          <ArrowLeft className="h-4 w-4" /> Back to courses
        </Link>

        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-2 flex items-center gap-2">
              <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold uppercase text-emerald-700">{course.status}</span>
              {course.language && <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-500">{course.language}</span>}
            </div>
            <h1 className="text-3xl font-bold text-slate-800">{course.title}</h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-500">{course.description}</p>

            <div className="mt-8 aspect-video rounded-xl bg-gradient-to-br from-emerald-100 to-slate-100 flex items-center justify-center">
              <div className="text-center">
                <Play className="mx-auto mb-3 h-16 w-16 text-slate-300" />
                <p className="text-sm text-slate-400">Select a lesson to begin</p>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              {course.modules?.map((module: any) => (
                <div key={module.id} className="rounded-xl border border-slate-200">
                  <div className="border-b border-slate-100 p-4">
                    <h3 className="font-semibold text-slate-800">{module.title}</h3>
                    <p className="mt-1 text-sm text-slate-500">{module.description}</p>
                  </div>
                  {module.lessons?.map((lesson: any) => (
                    <div key={lesson.id} className="border-b border-slate-100 p-4 last:border-0">
                      <div className="flex items-start gap-3">
                        <FileText className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
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

          <div className="lg:col-span-1">
            <div className="sticky top-36 rounded-xl border border-slate-200 p-4">
              <h3 className="font-semibold text-slate-800">Course Content</h3>
              <p className="mt-0.5 text-xs text-slate-400">
                {course.modules?.length || 0} modules &middot; {allLessons.length} lessons
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
