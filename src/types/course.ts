export type AiCourseStatus = "draft" | "review" | "published" | "archived";

export type AiLesson = {
  id: string;
  title: string;
  description: string;
  order: number;
  content: string;
  videoUrl?: string;
  videoProvider?: "local" | "youtube" | "vimeo";
  duration?: number;
};

export type AiModule = {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: AiLesson[];
};

export type AiCourse = {
  id: string;
  title: string;
  slug: string;
  topic: string;
  description: string;
  image?: string;
  status: AiCourseStatus;
  modules: AiModule[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  language: string;
  category: string;
  duration?: number;
  instructor?: string;
};

export type AiCourseGenRequest = {
  topic: string;
  language?: string;
  modules?: number;
  lessonsPerModule?: number;
};

export type AiCourseGenResult = {
  title: string;
  description: string;
  modules: { title: string; description: string; lessons: { title: string; description: string }[] }[];
};
