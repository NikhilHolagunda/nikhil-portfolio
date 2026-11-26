// Single source of truth for site content.
// Everything here comes from Nikhil's CV (Nov 2026). Do not add anything that
// isn't on the CV; update the CV first, then mirror it here.

export const profile = {
  name: "Nikhil Holagunda",
  initials: "NH",
  role: "Full Stack Developer",
  location: "Mississauga, ON",
  email: "nikhilholagunda522@gmail.com",
  phone: "+1 (437) 662-1898",
  phoneHref: "tel:+14376621898",
  linkedin: "https://www.linkedin.com/in/nikhilholagunda",
  github: "https://github.com/NikhilHolagunda",
  resume: "/Nikhil-Holagunda-Resume.pdf",
  headshot: "/headshot.png",
  tagline:
    "Full-Stack Software Engineer with 5 years of experience building high-availability digital banking and enterprise platforms across Canada and India.",
  summary: [
    "Full-Stack Software Engineer with 5 years of experience building high-availability digital banking and enterprise platforms across Canada and India.",
    "Strong in Java (Spring Boot), React/TypeScript, Node.js, and event-driven microservices on Kafka, backed by cloud experience on Azure and AWS, CI/CD, and Splunk observability.",
    "Integrates AI-assisted automation and predictive analytics to improve reliability and sustain 99.9% platform uptime.",
  ],
};

export type Experience = {
  role: string;
  company: string;
  client?: string;
  location: string;
  period: string;
  current?: boolean;
  highlights: string[];
};

export const experience: Experience[] = [
  {
    role: "Full Stack Developer",
    company: "Accenture",
    client: "BMW Group",
    location: "Canada",
    period: "Jul 2026 – Present",
    current: true,
    highlights: [
      "Transitioned into a production reliability and cloud operations role, managing enterprise infrastructure and application health for BMW's BOBCAT platform across distributed Microsoft Azure environments.",
      "Engineered advanced observability pipelines using Splunk, authoring complex search queries and integrating AI-driven predictive analytics to proactively detect transaction bottlenecks and application failures before user impact.",
      "Led root cause analysis (RCA) and incident triage for high-severity platform outages, using AI-assisted diagnostic workflows to bridge L1/L2 service desks and senior development squads for long-term code and infrastructure fixes.",
      "Administered secure enterprise access and identity management, configuring VDI via Omnissa Horizon and integrating MFA through NetIQ.",
      "Resolved cloud licensing and environment provisioning conflicts within Microsoft 365 and Azure, reducing recurring access bottlenecks for global software development teams.",
    ],
  },
  {
    role: "Full-Stack Software Developer",
    company: "Fiserv",
    location: "Canada",
    period: "Jun 2025 – May 2026",
    highlights: [
      "Engineered full-stack features for a cloud-native core and digital banking platform (Finxact / DNA ecosystem), delivering real-time account and payment capabilities for Canadian financial institutions.",
      "Developed responsive digital banking portals and internal ledger administration consoles with React.js, TypeScript, HTML5, and CSS3, improving UI responsiveness by 24% while adhering to WCAG 2.1 AA.",
      "Built event-driven RESTful microservices in Java (Spring Boot) and Node.js for real-time balances, multi-currency ledger updates, and automated EFT / Interac e-Transfer / Wire payment workflows.",
      "Integrated asynchronous Apache Kafka streams and PostgreSQL / Redis data layers to support 24/7 in-balance transaction processing, real-time fraud scoring hooks, and sub-second API latency.",
      "Implemented OAuth 2.0, JWT validation, and role-based access control (RBAC) across client and API gateway layers to enforce OSFI cybersecurity and banking compliance standards.",
    ],
  },
  {
    role: "Full-Stack Software Developer",
    company: "Infosys",
    location: "India",
    period: "Aug 2021 – Aug 2023",
    highlights: [
      "Modernised a cloud-native digital banking platform (Infosys Finacle) with cross-functional Agile/Scrum teams, building scalable retail banking modules for 500,000+ active users.",
      "Developed responsive onboarding, account dashboard, and NEFT/IMPS fund-transfer interfaces using React.js, TypeScript, and JavaScript (ES6+), improving page load performance by 22%.",
      "Engineered RESTful microservices in Java (Spring Boot) integrating core banking APIs for real-time balances, beneficiary management, and automated payment workflows.",
      "Designed and optimised Oracle SQL / PostgreSQL queries and stored procedures for high-volume ledger updates and automated account reconciliation.",
      "Participated in CI/CD deployments with Git, Jenkins, and Docker, writing unit and API integration tests that reduced post-release defects by 25%.",
    ],
  },
  {
    role: "Full-Stack Software Developer",
    company: "Paytm",
    location: "India",
    period: "Dec 2019 – Jul 2021",
    highlights: [
      "Architected and delivered end-to-end features for Paytm's UPI AutoPay rollout (2020) and the RBI-compliant recurring payments engine (2021), supporting millions of subscription mandates.",
      "Developed responsive checkout modals and mandate authorisation interfaces in React.js and TypeScript with inline OTP and UPI app-invoke flows, reducing checkout drop-offs by 18%.",
      "Built self-service subscription management views in the merchant dashboard, enabling 10,000+ merchants to track mandate lifecycles and payment retries in real time.",
      "Engineered idempotent RESTful APIs in Java (Spring Boot) and Node.js for mandate registrations, NPCI webhook callbacks, and automated 24-hour pre-debit notifications.",
      "Implemented distributed locking with Redis and event-driven workflows via Apache Kafka alongside MySQL schemas, eliminating duplicate billing and maintaining 99.9% API uptime.",
    ],
  },
];

export type Project = {
  title: string;
  status?: "In Progress";
  description: string[];
  tech: string[];
  links?: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    title: "Crop Prediction (CropCast)",
    description: [
      "Crop recommendation platform integrating a Random Forest model, achieving ~98% prediction accuracy across 22 crop varieties.",
      "FastAPI backend serving model inferences via RESTful endpoints with efficient data processing and sub-second API latency.",
    ],
    tech: ["React.js", "FastAPI", "Machine Learning (Random Forest)"],
    links: [
      { label: "Live demo", href: "https://cropcast-app-two.vercel.app" },
      { label: "Source", href: "https://github.com/NikhilHolagunda/cropcast" },
    ],
  },
  {
    title: "Personal Portfolio Website",
    description: [
      "Responsive, accessible portfolio built with Next.js and React to showcase professional background and technical projects.",
      "Modern UI/UX with Tailwind CSS, adhering to WCAG 2.1 AA for cross-device compatibility and optimized page load performance.",
    ],
    tech: ["Next.js", "React", "Tailwind CSS", "Vercel"],
    links: [
      {
        label: "Source",
        href: "https://github.com/NikhilHolagunda/nikhil-portfolio",
      },
    ],
  },
  {
    title: "SaugaHome Eats",
    status: "In Progress",
    description: [
      "Scalable full-stack marketplace connecting local home cooks with community buyers for homemade food transactions.",
      "Event-driven Node.js and PostgreSQL microservices managing localized search, user profiles, and secure order processing.",
    ],
    tech: ["React.js", "Node.js", "PostgreSQL", "Microservices"],
  },
  {
    title: "Flight Companion",
    status: "In Progress",
    description: [
      "Event-driven platform pairing vulnerable travelers, such as elderly passengers flying alone, with reliable companions on identical itineraries.",
      "Apache Kafka event streams and Redis data layers for real-time matching, instant notifications, and concurrent itinerary syncing.",
    ],
    tech: ["TypeScript", "React", "Spring Boot", "Apache Kafka", "Redis"],
  },
  {
    title: "Training Log for Fitness Trainers",
    description: [
      "Centralized tracker helping personal trainers log and monitor client workout routines and daily nutritional metrics.",
      "Idempotent Java (Spring Boot) REST APIs for secure CRUD on client profiles, scalable workout plans, and real-time progress analytics.",
    ],
    tech: ["React", "Java (Spring Boot)", "RESTful APIs"],
  },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Programming Languages",
    items: ["Java", "JavaScript (ES6+)", "TypeScript", "SQL (PostgreSQL, MySQL, Oracle)", "HTML5", "CSS3"],
  },
  {
    group: "Frontend Development",
    items: ["React.js", "Angular", "Redux", "Responsive Web Design", "WCAG 2.1 AA Standards"],
  },
  {
    group: "Backend & Architecture",
    items: ["Node.js", "Spring Boot", "RESTful APIs", "Microservices", "Event-Driven Architecture"],
  },
  {
    group: "Databases & Messaging",
    items: ["PostgreSQL", "MySQL", "Oracle SQL", "Redis", "Apache Kafka"],
  },
  {
    group: "Cloud & DevOps",
    items: ["Microsoft Azure", "AWS", "Docker", "Kubernetes", "Jenkins", "Git", "CI/CD Pipelines"],
  },
  {
    group: "Observability & IT Ops",
    items: ["Splunk", "Azure Monitor", "VDI (Omnissa Horizon)", "Microsoft 365 Admin", "Incident Triage", "RCA"],
  },
  {
    group: "Security & Identity (IAM)",
    items: ["OAuth 2.0", "JWT", "Role-Based Access Control (RBAC)", "MFA", "NetIQ"],
  },
  {
    group: "Testing & Domain",
    items: ["Jest", "JUnit", "Postman", "Agile/Scrum", "Canadian Banking Compliance (OSFI)", "Open Banking"],
  },
  {
    group: "AI & Machine Learning",
    items: ["Generative AI", "Large Language Models (LLMs)", "Prompt Engineering", "Machine Learning (Random Forest)", "Predictive Analytics", "AI-Driven Automation"],
  },
];

export const education = [
  {
    credential: "Graduate Certificate — Data Processing & Reporting",
    school: "Conestoga College",
    location: "Kitchener, ON",
    period: "Nov 2024 – May 2025",
  },
  {
    credential: "Graduate Certificate — Information Technology",
    school: "Algoma University",
    location: "Brampton, ON",
    period: "Sep 2023 – Aug 2024",
  },
  {
    credential: "Bachelor of Technology in Computer Science & Engineering",
    school: "Swami Vivekananda Institute of Technology",
    location: "India",
    period: "May 2016 – Aug 2020",
  },
];

export const navItems = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
] as const;
