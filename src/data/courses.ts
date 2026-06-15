export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  price: number;
  stripeLink: string;
  featured?: boolean;
  rating?: number;
  students?: number;
  instructor?: string;
  lectures?: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export const categories: Category[] = [
  {
    id: "ehsq",
    name: "EHSQ",
    description: "Environment, Health, Safety & Quality",
    icon: "Shield",
  },
  {
    id: "biology",
    name: "Biology",
    description: "Biological Sciences & Environmental Stewardship",
    icon: "Leaf",
  },
  {
    id: "risk-management",
    name: "Risk Management",
    description: "Disaster Risk Reduction & Emergency Response",
    icon: "AlertTriangle",
  },
];

export const courses: Course[] = [
  // ===== EHSQ =====
  {
    id: "ics-100",
    title: "Incident Command System (ICS-100)",
    description:
      "Fundamentals of the Incident Command System, chain of command, and unified command principles for emergency response.",
    category: "ehsq",
    duration: "8 hours",
    price: 49,
    stripeLink: "https://buy.stripe.com/placeholder-ehsq-ics100",
    featured: true,
    rating: 4.7,
    students: 3420,
    instructor: "Yohan Ariza",
    lectures: 24,
  },
  {
    id: "first-aid",
    title: "First Aid & Basic Life Support",
    description:
      "Comprehensive first aid training including CPR, wound management, fracture stabilization, and emergency triage.",
    category: "ehsq",
    duration: "16 hours",
    price: 79,
    stripeLink: "https://buy.stripe.com/placeholder-ehsq-firstaid",
    featured: true,
    rating: 4.8,
    students: 5200,
    instructor: "Yohan Ariza",
    lectures: 36,
  },
  {
    id: "fire-safety",
    title: "Fire Safety & Emergency Evacuation",
    description:
      "Fire prevention strategies, extinguisher use, evacuation planning, and building safety protocols.",
    category: "ehsq",
    duration: "4 hours",
    price: 35,
    stripeLink: "https://buy.stripe.com/placeholder-ehsq-fire",
    rating: 4.5,
    students: 1800,
    instructor: "Yohan Ariza",
    lectures: 12,
  },
  {
    id: "hazmat-awareness",
    title: "Hazardous Materials Awareness",
    description:
      "Identification, handling, and emergency response for hazardous materials in workplace and community settings.",
    category: "ehsq",
    duration: "8 hours",
    price: 59,
    stripeLink: "https://buy.stripe.com/placeholder-ehsq-hazmat",
    rating: 4.6,
    students: 2100,
    instructor: "Yohan Ariza",
    lectures: 18,
  },
  {
    id: "workplace-safety",
    title: "Workplace Safety & OSHA Standards",
    description:
      "Occupational safety standards, risk assessment, PPE selection, and workplace hazard identification.",
    category: "ehsq",
    duration: "12 hours",
    price: 69,
    stripeLink: "https://buy.stripe.com/placeholder-ehsq-osha",
    rating: 4.7,
    students: 3800,
    instructor: "Yohan Ariza",
    lectures: 28,
  },
  {
    id: "confined-space",
    title: "Confined Space Entry & Rescue",
    description:
      "Permit-required confined space entry procedures, atmospheric monitoring, and rescue planning.",
    category: "ehsq",
    duration: "8 hours",
    price: 89,
    stripeLink: "https://buy.stripe.com/placeholder-ehsq-confined",
    rating: 4.8,
    students: 1500,
    instructor: "Yohan Ariza",
    lectures: 20,
  },
  {
    id: "environmental-compliance",
    title: "Environmental Compliance & Regulations",
    description:
      "Environmental regulatory frameworks, waste management, emissions control, and sustainability reporting.",
    category: "ehsq",
    duration: "16 hours",
    price: 99,
    stripeLink: "https://buy.stripe.com/placeholder-ehsq-envcomp",
    rating: 4.6,
    students: 2800,
    instructor: "Yohan Ariza",
    lectures: 32,
  },
  {
    id: "quality-management",
    title: "Quality Management Systems (ISO 9001)",
    description:
      "Principles of quality management, process approach, continuous improvement, and audit preparation.",
    category: "ehsq",
    duration: "16 hours",
    price: 119,
    stripeLink: "https://buy.stripe.com/placeholder-ehsq-iso9001",
    rating: 4.5,
    students: 1600,
    instructor: "Yohan Ariza",
    lectures: 30,
  },
  {
    id: "emergency-planning",
    title: "Emergency Action Planning",
    description:
      "Development of emergency action plans, tabletop exercises, drill coordination, and after-action reviews.",
    category: "ehsq",
    duration: "8 hours",
    price: 55,
    stripeLink: "https://buy.stripe.com/placeholder-ehsq-emergency",
    featured: true,
    rating: 4.7,
    students: 2900,
    instructor: "Yohan Ariza",
    lectures: 16,
  },
  {
    id: "industrial-hygiene",
    title: "Industrial Hygiene Fundamentals",
    description:
      "Recognition, evaluation, and control of workplace health hazards including chemical, physical, and biological agents.",
    category: "ehsq",
    duration: "12 hours",
    price: 79,
    stripeLink: "https://buy.stripe.com/placeholder-ehsq-hygiene",
    rating: 4.4,
    students: 1200,
    instructor: "Yohan Ariza",
    lectures: 22,
  },

  // ===== Biology =====
  {
    id: "general-biology",
    title: "General Biology & Ecosystems",
    description:
      "Fundamentals of biology, ecosystem dynamics, biodiversity conservation, and human impact on natural systems.",
    category: "biology",
    duration: "16 hours",
    price: 69,
    stripeLink: "https://buy.stripe.com/placeholder-bio-general",
    featured: true,
    rating: 4.6,
    students: 3100,
    instructor: "Yohan Ariza",
    lectures: 34,
  },
  {
    id: "water-quality",
    title: "Water Quality & Aquatic Ecology",
    description:
      "Water quality parameters, freshwater ecosystems, pollution assessment, and restoration ecology principles.",
    category: "biology",
    duration: "12 hours",
    price: 79,
    stripeLink: "https://buy.stripe.com/placeholder-bio-water",
    rating: 4.5,
    students: 1400,
    instructor: "Yohan Ariza",
    lectures: 20,
  },
  {
    id: "wildlife-conservation",
    title: "Wildlife Conservation & Management",
    description:
      "Principles of wildlife management, habitat conservation, species monitoring, and community-based conservation.",
    category: "biology",
    duration: "16 hours",
    price: 89,
    stripeLink: "https://buy.stripe.com/placeholder-bio-wildlife",
    rating: 4.7,
    students: 2600,
    instructor: "Yohan Ariza",
    lectures: 28,
  },
  {
    id: "climate-biology",
    title: "Climate Change & Biological Systems",
    description:
      "Impacts of climate change on biological systems, adaptation strategies, and nature-based solutions.",
    category: "biology",
    duration: "8 hours",
    price: 59,
    stripeLink: "https://buy.stripe.com/placeholder-bio-climate",
    rating: 4.6,
    students: 1900,
    instructor: "Yohan Ariza",
    lectures: 14,
  },
  {
    id: "environmental-microbiology",
    title: "Environmental Microbiology",
    description:
      "Microbial ecology, bioremediation, waterborne pathogens, and the role of microorganisms in environmental health.",
    category: "biology",
    duration: "12 hours",
    price: 79,
    stripeLink: "https://buy.stripe.com/placeholder-bio-micro",
    rating: 4.5,
    students: 1100,
    instructor: "Yohan Ariza",
    lectures: 22,
  },

  // ===== Risk Management =====
  {
    id: "disaster-risk-reduction",
    title: "Community-Based Disaster Risk Reduction",
    description:
      "Participatory risk assessment, community preparedness planning, early warning systems, and resilience building.",
    category: "risk-management",
    duration: "16 hours",
    price: 89,
    stripeLink: "https://buy.stripe.com/placeholder-risk-drr",
    featured: true,
    rating: 4.8,
    students: 4500,
    instructor: "Yohan Ariza",
    lectures: 30,
  },
  {
    id: "early-warning-systems",
    title: "Early Warning Systems Design",
    description:
      "Design and implementation of multi-hazard early warning systems, community communication protocols, and last-mile connectivity.",
    category: "risk-management",
    duration: "12 hours",
    price: 99,
    stripeLink: "https://buy.stripe.com/placeholder-risk-ews",
    featured: true,
    rating: 4.7,
    students: 2300,
    instructor: "Yohan Ariza",
    lectures: 24,
  },
  {
    id: "risk-assessment",
    title: "Risk Assessment Methodologies",
    description:
      "Qualitative and quantitative risk assessment techniques, vulnerability mapping, and scenario analysis.",
    category: "risk-management",
    duration: "16 hours",
    price: 109,
    stripeLink: "https://buy.stripe.com/placeholder-risk-assessment",
    rating: 4.6,
    students: 3400,
    instructor: "Yohan Ariza",
    lectures: 32,
  },
  {
    id: "climate-risk-analysis",
    title: "Climate Risk Analysis & Adaptation",
    description:
      "Climate scenario planning, vulnerability assessments, adaptation pathway development, and resilience metrics.",
    category: "risk-management",
    duration: "12 hours",
    price: 99,
    stripeLink: "https://buy.stripe.com/placeholder-risk-climate",
    rating: 4.7,
    students: 1800,
    instructor: "Yohan Ariza",
    lectures: 20,
  },
  {
    id: "humanitarian-logistics",
    title: "Humanitarian Logistics & Supply Chain",
    description:
      "Emergency supply chain management, warehouse operations, fleet management, and last-mile distribution in crisis settings.",
    category: "risk-management",
    duration: "16 hours",
    price: 119,
    stripeLink: "https://buy.stripe.com/placeholder-risk-logistics",
    rating: 4.5,
    students: 1600,
    instructor: "Yohan Ariza",
    lectures: 26,
  },
];
