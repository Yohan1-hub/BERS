import { AiCourseGenRequest, AiCourseGenResult } from "@/types/course";

type AIProvider = {
  generate(prompt: string): Promise<string>;
};

const providers: Record<string, AIProvider> = {};

export function registerProvider(name: string, provider: AIProvider) {
  providers[name] = provider;
}

function buildPrompt(req: AiCourseGenRequest): string {
  return `Create a detailed course about "${req.topic}" in ${req.language || "English"}.
Structure it into ${req.modules || 4} modules with ${req.lessonsPerModule || 3} lessons each.

Return valid JSON only:
{
  "title": "Course title",
  "description": "Short course description",
  "modules": [
    {
      "title": "Module title",
      "description": "Module description",
      "lessons": [
        { "title": "Lesson title", "description": "Lesson description" }
      ]
    }
  ]
}`;
}

export async function generateCourseContent(
  req: AiCourseGenRequest,
  providerName = "openai",
): Promise<AiCourseGenResult> {
  const provider = providers[providerName];
  if (!provider) {
    return generateFallback(req);
  }

  try {
    const raw = await provider.generate(buildPrompt(req));
    return JSON.parse(raw) as AiCourseGenResult;
  } catch {
    return generateFallback(req);
  }
}

function generateFallback(req: AiCourseGenRequest): AiCourseGenResult {
  const numModules = req.modules || 4;
  const numLessons = req.lessonsPerModule || 3;
  const modules = Array.from({ length: numModules }, (_, mi) => ({
    title: `Module ${mi + 1}: Core Concepts of ${req.topic}`,
    description: `Explore foundational principles and key aspects of ${req.topic}.`,
    lessons: Array.from({ length: numLessons }, (_, li) => ({
      title: `Lesson ${li + 1}: ${["Introduction", "Deep Dive", "Practical Application", "Case Study", "Advanced Topics"][li % 5]}`,
      description: `Comprehensive coverage of essential ${req.topic} concepts and methodologies.`,
    })),
  }));

  return {
    title: `Complete Guide to ${req.topic}`,
    description: `A comprehensive course covering all aspects of ${req.topic}, designed for practical understanding and real-world application.`,
    modules,
  };
}
