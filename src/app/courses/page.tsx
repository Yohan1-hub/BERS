import Link from "next/link";
import { BookOpen, Play, Sparkles } from "lucide-react";
import courses from "@/data/courses/static-data.json";

const published = (courses as any[]).filter((c: any) => c.status === "published");

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-white pt-20 md:pt-32">
      <div className="section-container py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Courses</h1>
          <p className="mt-2 text-slate-500">
            Explore our training programs designed for practical learning.
          </p>
        </div>

        {published.length === 0 ? (
          <div className="rounded-xl border-2 border-dashed border-slate-200 py-20 text-center text-slate-400">
            <Sparkles className="mx-auto mb-3 h-10 w-10" />
            <p className="text-lg font-medium">No courses published yet</p>
            <p className="mt-1 text-sm">Check back soon for new content</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {published.map((course: any) => {
              const lessons = course.modules?.reduce((a: number, m: any) => a + (m.lessons?.length || 0), 0) || 0;
              return (
                <Link
                  key={course.id}
                  href={`/courses/${course.id}/`}
                  className="group rounded-xl border border-slate-200 p-6 transition-all hover:border-emerald-200 hover:shadow-lg"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-slate-800 group-hover:text-emerald-700">
                    {course.title}
                  </h3>
                  <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-slate-500">
                    {course.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-3.5 w-3.5" />
                      {course.modules?.length || 0} modules
                    </span>
                    <span className="flex items-center gap-1">
                      <Play className="h-3.5 w-3.5" />
                      {lessons} lessons
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
