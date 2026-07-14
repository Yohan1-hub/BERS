export interface Service {
  id: number;
  title: string;
  category: ServiceCategory;
}

export type ServiceCategory =
  | "ehsq"
  | "biological"
  | "risk-management"
  | "csr"
  | "animal-health"
  | "training"
  | "sustainability";

export const serviceCategories: {
  id: ServiceCategory;
  name: string;
  description: string;
  icon: string;
}[] = [
  {
    id: "ehsq",
    name: "EHSQ",
    description: "Environment, Health, Safety & Quality",
    icon: "Shield",
  },
  {
    id: "biological",
    name: "Biological & Environmental",
    description: "Biological sciences and environmental stewardship",
    icon: "Leaf",
  },
  {
    id: "risk-management",
    name: "Risk Management",
    description: "Disaster risk reduction and emergency response",
    icon: "AlertTriangle",
  },
  {
    id: "csr",
    name: "CSR & Governance",
    description: "Corporate social responsibility and ethics",
    icon: "Heart",
  },
  {
    id: "animal-health",
    name: "Animal Health & Veterinary",
    description: "Veterinary services and zoonosis control",
    icon: "PawPrint",
  },
  {
    id: "training",
    name: "Training & Capacity Building",
    description: "Professional development and training programs",
    icon: "GraduationCap",
  },
  {
    id: "sustainability",
    name: "Sustainability & Climate",
    description: "Climate action and sustainable solutions",
    icon: "TreePine",
  },
];

export const services: Service[] = [
  // ===== EHSQ (1-25) =====
  { id: 1, title: "Carrying out occupational health and safety audits.", category: "ehsq" },
  { id: 2, title: "Development of occupational accident prevention programs.", category: "ehsq" },
  { id: 3, title: "Implementation of environmental management systems (ISO 14001).", category: "ehsq" },
  { id: 8, title: "Training in emergency management and drills.", category: "ehsq" },
  { id: 9, title: "Planning and execution of evacuation drills.", category: "ehsq" },
  { id: 13, title: "Development of health and safety policies at work.", category: "ehsq" },
  { id: 14, title: "Risk analysis and evaluation of occupational risks.", category: "ehsq" },
  { id: 15, title: "Implementation of work ergonomics programs.", category: "ehsq" },
  { id: 18, title: "Health and safety legal compliance audits.", category: "ehsq" },
  { id: 19, title: "Training in the safe use of chemicals.", category: "ehsq" },
  { id: 20, title: "Implementation of waste management programs.", category: "ehsq" },
  { id: 23, title: "Implementation of quality management systems (ISO 9001).", category: "ehsq" },
  { id: 24, title: "Development of quality policies and procedures.", category: "ehsq" },
  { id: 25, title: "Training in continuous improvement and lean manufacturing.", category: "ehsq" },
  { id: 26, title: "Internal and external quality audits.", category: "ehsq" },
  { id: 27, title: "Development of key performance indicators (KPIs).", category: "ehsq" },
  { id: 30, title: "Supplier evaluation from an EHSQ perspective.", category: "ehsq" },
  { id: 33, title: "Implementation of public health programs.", category: "ehsq" },
  { id: 34, title: "Consulting on food safety policies.", category: "ehsq" },
  { id: 97, title: "Radon test, gas detection for homes and businesses.", category: "ehsq" },

  // ===== Risk Management (26-40) =====
  { id: 4, title: "Training in natural risk management.", category: "risk-management" },
  { id: 5, title: "Advice on climate crisis management.", category: "risk-management" },
  { id: 6, title: "Environmental impact assessment for industrial projects.", category: "risk-management" },
  { id: 7, title: "Development of environmental impact mitigation strategies.", category: "risk-management" },
  { id: 10, title: "Assessment of vulnerabilities and disaster risks.", category: "risk-management" },
  { id: 35, title: "Evaluation of social and economic impact of projects.", category: "risk-management" },
  { id: 38, title: "Training in reputation crisis management.", category: "risk-management" },
  { id: 64, title: "Consulting in financial risk management and investments.", category: "risk-management" },
  { id: 69, title: "Training in cybersecurity and digital risk management.", category: "risk-management" },
  { id: 91, title: "Implementation of early warning systems for natural disasters.", category: "risk-management" },
  { id: 92, title: "Training in managing climate crises and extreme events.", category: "risk-management" },
  { id: 96, title: "Carrying out disease prevention and control programs in communities.", category: "risk-management" },

  // ===== Biological & Environmental (41-60) =====
  { id: 11, title: "Consulting on sustainability and corporate social responsibility.", category: "biological" },
  { id: 21, title: "Consulting in efficient management of natural resources.", category: "biological" },
  { id: 22, title: "Energy efficiency evaluation and recommendations.", category: "biological" },
  { id: 40, title: "Carbon footprint evaluation and reduction strategies.", category: "biological" },
  { id: 41, title: "Development of corporate climate action plans.", category: "biological" },
  { id: 42, title: "Carbon audits and emissions compensation.", category: "biological" },
  { id: 44, title: "Advice on sustainable design and construction.", category: "biological" },
  { id: 45, title: "Consulting in water management and water resources.", category: "biological" },
  { id: 46, title: "Development of biodiversity conservation programs.", category: "biological" },
  { id: 47, title: "Assessment of socio-environmental impact of projects.", category: "biological" },
  { id: 48, title: "Implementation of environmental education programs.", category: "biological" },
  { id: 49, title: "Consulting in management of protected areas.", category: "biological" },
  { id: 51, title: "Advice on environmental certifications (LEED, BREEAM).", category: "biological" },
  { id: 52, title: "Consulting in ecosystem management and restoration.", category: "biological" },
  { id: 54, title: "Cultural and heritage impact evaluation.", category: "biological" },
  { id: 55, title: "Development of cultural resources management programs.", category: "biological" },
  { id: 95, title: "Development of reforestation and landscape restoration programs.", category: "biological" },
  { id: 98, title: "Training in first aid and public health.", category: "biological" },

  // ===== CSR & Governance (61-75) =====
  { id: 12, title: "Consulting on sustainability and social responsibility corporate.", category: "csr" },
  { id: 31, title: "Training in leadership and organizational development.", category: "csr" },
  { id: 32, title: "Development of organizational change management programs.", category: "csr" },
  { id: 36, title: "Development of corporate communication strategies.", category: "csr" },
  { id: 56, title: "Implementation of inclusion and diversity policies.", category: "csr" },
  { id: 57, title: "Training in inclusive leadership and management of diverse teams.", category: "csr" },
  { id: 58, title: "Consulting in human and labor rights management.", category: "csr" },
  { id: 59, title: "Impact evaluation in local communities.", category: "csr" },
  { id: 60, title: "Development of socially responsible investment strategies.", category: "csr" },
  { id: 61, title: "Implementation of community empowerment programs.", category: "csr" },
  { id: 62, title: "Consulting in community relations management.", category: "csr" },
  { id: 63, title: "Assessment of social risks and human rights in supply chains.", category: "csr" },
  { id: 65, title: "Development of local economic development strategies.", category: "csr" },
  { id: 66, title: "Training in conflict management and mediation.", category: "csr" },
  { id: 67, title: "Advice on corporate social responsibility (CSR).", category: "csr" },
  { id: 68, title: "Consulting on business ethics and corporate governance.", category: "csr" },
  { id: 69, title: "Implementation of transparency and anti-corruption programs.", category: "csr" },
  { id: 70, title: "Development of business integrity programs.", category: "csr" },

  // ===== Sustainability & Climate (76-90) =====
  { id: 43, title: "Training in environmental project management.", category: "sustainability" },
  { id: 50, title: "Development of sustainable tourism strategies.", category: "sustainability" },
  { id: 71, title: "Evaluation of economic impact of projects and policies.", category: "sustainability" },
  { id: 72, title: "Consulting in innovation and sustainable technology.", category: "sustainability" },
  { id: 73, title: "Development of sustainable financing strategies.", category: "sustainability" },
  { id: 74, title: "Implementation of financial inclusion programs.", category: "sustainability" },
  { id: 75, title: "Advice on development of sustainable markets.", category: "sustainability" },
  { id: 76, title: "Assessment of the impact of technology on the environment.", category: "sustainability" },
  { id: 80, title: "Consulting in circular economy and electronic waste management.", category: "sustainability" },
  { id: 81, title: "Environmental impact assessment of emerging technologies.", category: "sustainability" },
  { id: 82, title: "Development of sustainable digitalization strategies.", category: "sustainability" },
  { id: 83, title: "Advice on the design of eco-efficient products.", category: "sustainability" },
  { id: 84, title: "Consulting on artificial intelligence for sustainability.", category: "sustainability" },
  { id: 85, title: "Implementation of renewable energy solutions.", category: "sustainability" },
  { id: 86, title: "Training in design and management of smart buildings.", category: "sustainability" },
  { id: 87, title: "Development of sustainable transportation systems.", category: "sustainability" },
  { id: 88, title: "Environmental impact assessment of transportation infrastructure.", category: "sustainability" },
  { id: 89, title: "Consulting in urban mobility and planning of sustainable cities.", category: "sustainability" },
  { id: 93, title: "Advice on management of renewable natural resources.", category: "sustainability" },
  { id: 94, title: "Consulting in biodiversity and ecosystem conservation.", category: "sustainability" },

  // ===== Animal Health & Veterinary (91-105) =====
  { id: 99, title: "Advice on management of zoonoses and communicable diseases.", category: "animal-health" },
  { id: 100, title: "Implementation of animal vaccination and deworming programs.", category: "animal-health" },
  { id: 101, title: "Consulting in animal welfare and clinical case management.", category: "animal-health" },
  { id: 102, title: "Development of pest and animal disease control strategies.", category: "animal-health" },
  { id: 103, title: "Environmental impact assessment on human and animal health.", category: "animal-health" },
  { id: 104, title: "Training in safe food handling and food safety.", category: "animal-health" },
  { id: 105, title: "Advice on medical and biological waste management.", category: "animal-health" },
  { id: 106, title: "Consulting in design and construction of veterinary facilities.", category: "animal-health" },
  { id: 107, title: "Implementation of quality management systems in animal health services.", category: "animal-health" },
  { id: 108, title: "Development of workplace welfare policies in veterinary clinics.", category: "animal-health" },
  { id: 109, title: "Evaluation of hygiene and cleaning conditions in animal health facilities.", category: "animal-health" },
  { id: 110, title: "Training in animal grooming and aesthetic care techniques.", category: "animal-health" },
  { id: 111, title: "Advice on animal nutrition and personalized diets.", category: "animal-health" },
  { id: 112, title: "Consulting in veterinary laboratory management and quality control.", category: "animal-health" },
  { id: 113, title: "Implementation of animal emotional and behavioral well-being programs.", category: "animal-health" },
  { id: 114, title: "Development of crisis management strategies in veterinary emergencies.", category: "animal-health" },
  { id: 115, title: "Environmental impact assessment of veterinary and human health practices.", category: "animal-health" },
  { id: 116, title: "Training in handling medical equipment and advanced veterinary technology.", category: "animal-health" },

  // ===== Training & Capacity Building (106-121) =====
  { id: 16, title: "Development of wellness programs at work.", category: "training" },
  { id: 17, title: "Health and safety legal compliance audits.", category: "training" },
  { id: 28, title: "Advice on innovation and product development.", category: "training" },
  { id: 29, title: "Sustainable supply chain management consulting.", category: "training" },
  { id: 37, title: "Training in financial analysis and risk management.", category: "training" },
  { id: 39, title: "Implementation of information management programs.", category: "training" },
  { id: 53, title: "Training in ecotourism crisis management.", category: "training" },
  { id: 77, title: "Development of privacy and data protection policies.", category: "training" },
  { id: 78, title: "Implementation of environmental information management systems.", category: "training" },
  { id: 90, title: "Implementation of responsible consumption policies.", category: "training" },
  { id: 91, title: "Training in sustainable consumption habits.", category: "training" },
  { id: 92, title: "Development of environmental education and awareness programs.", category: "training" },
  { id: 93, title: "Advice on green marketing and sustainable communication.", category: "training" },
  { id: 94, title: "Consulting on adaptation to climate change.", category: "training" },
  { id: 95, title: "Climate risk assessment for specific sectors.", category: "training" },
];
