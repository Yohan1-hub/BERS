import { AiCourse, AiCourseStatus } from "@/types/course";
import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "src/data/courses");
const indexFile = path.join(dataDir, "index.json");

function ensureDir() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
}

function readIndex(): string[] {
  ensureDir();
  if (!fs.existsSync(indexFile)) {
    fs.writeFileSync(indexFile, "[]", "utf-8");
    return [];
  }
  return JSON.parse(fs.readFileSync(indexFile, "utf-8"));
}

function writeIndex(ids: string[]) {
  ensureDir();
  fs.writeFileSync(indexFile, JSON.stringify(ids, null, 2), "utf-8");
}

export function getCourses(status?: AiCourseStatus): AiCourse[] {
  const ids = readIndex();
  return ids
    .map((id) => getCourse(id))
    .filter((c): c is AiCourse => c !== null)
    .filter((c) => !status || c.status === status)
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
}

export function getCourse(id: string): AiCourse | null {
  const filePath = path.join(dataDir, `${id}.json`);
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

export function saveCourse(course: AiCourse) {
  const ids = readIndex();
  if (!ids.includes(course.id)) {
    ids.push(course.id);
    writeIndex(ids);
  }
  fs.writeFileSync(path.join(dataDir, `${course.id}.json`), JSON.stringify(course, null, 2), "utf-8");
}

export function deleteCourse(id: string) {
  const ids = readIndex().filter((i) => i !== id);
  writeIndex(ids);
  const filePath = path.join(dataDir, `${id}.json`);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}
