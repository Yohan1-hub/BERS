import courses from "@/data/courses/static-data.json";

export function generateStaticParams(): { id: string }[] {
  return (courses as any[]).map((c: any) => ({ id: c.id }));
}

export default function CourseSegmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}