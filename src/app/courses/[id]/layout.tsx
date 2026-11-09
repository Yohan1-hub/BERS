import courses from "@/data/courses/static-data.json";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export function generateStaticParams(): { id: string }[] {
  return (courses as any[])
    .filter((course) => course.status === "published")
    .map((course) => ({ id: course.id }));
}

export default function CourseSegmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
