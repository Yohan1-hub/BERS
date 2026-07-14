export interface Project {
  title: string;
  status: "Active" | "Completed" | "Proposed";
  description: string;
  category: string;
  gradient: string;
}

const projects: Project[] = [
  {
    title: "Water Security Pilot - Rajasthan, India",
    status: "Proposed",
    description: "Technical cooperation program with Ministry of Jal Shakti to systematize time-tested water harvesting systems (johads, tankas, check dams) in Rajasthan, preventing resource-based conflicts.",
    category: "Water Security",
    gradient: "from-sky-500 to-cyan-500",
  },
  {
    title: "Community Science and Creation Care - Orlando, FL",
    status: "Active",
    description: "Educational programs empowering the next generation of scientists to address the climate crisis through environmental stewardship, field research, and community action.",
    category: "Education",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    title: "EHSQ Audits for Industrial Clients",
    status: "Completed",
    description: "Comprehensive environment, health, safety and quality audits for leading companies. Development of corrective action plans and regulatory compliance frameworks.",
    category: "EHSQ",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    title: "Emergency Preparedness Training - Colombia",
    status: "Completed",
    description: "Community-based disaster risk reduction training, evacuation drills, and early warning system implementation in vulnerable communities across Colombia.",
    category: "Risk Management",
    gradient: "from-red-500 to-rose-500",
  },
  {
    title: "Veterinary Care and Zoonosis Control Programs",
    status: "Active",
    description: "Animal vaccination campaigns, deworming programs, and zoonotic disease prevention in rural communities. Training local veterinarians in best practices.",
    category: "Animal Health",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Reforestation and Landscape Restoration",
    status: "Proposed",
    description: "Ecosystem restoration programs combining traditional knowledge with modern ecological science. Community-led reforestation with native species.",
    category: "Environmental",
    gradient: "from-emerald-600 to-green-700",
  },
];

export default projects;
