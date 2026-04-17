"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const C = {
  bg: "#141414",
  bgCard: "#1A1A1A",
  bgInput: "#2A2A2A",
  bgHover: "#222222",
  red: "#E50914",
  redDark: "#B20710",
  redGlow: "rgba(229,9,20,0.25)",
  green: "#46D369",
  greenDim: "rgba(70,211,105,0.15)",
  white: "#FFFFFF",
  text: "#E5E5E5",
  textMuted: "#AAAAAA",
  textDim: "#6D6D6D",
  border: "rgba(255,255,255,0.08)",
  borderLight: "rgba(255,255,255,0.15)",
  overlay: "rgba(0,0,0,0.65)",
};

const SECTIONS = [
  "home",
  "projects",
  "about",
  "skills",
  "certifications",
  "experience",
  "hire",
  "contact",
];
const NAV = [
  "Home",
  "Projects",
  "About",
  "Skills",
  "Experience",
  "Hire Me",
  "Contact",
];

const PROJECTS: {
  title: string;
  tag: string;
  desc: string;
  tech: string[];
  color: string;
  year: string;
  match: string;
  github: string;
  demo: string;
}[] = [
  {
    title: "Mandara Marketing Solutions",
    tag: "FLAGSHIP",
    desc: "AI-powered marketing automation engine using GPT agents — 50+ workflows in production daily.",
    tech: ["Python", "FastAPI", "LangChain", "GPT", "PostgreSQL", "Docker"],
    color: "#E50914",
    year: "2025",
    match: "99%",
    github: "",
    demo: "#",
  },
  {
    title: "CropCast",
    tag: "ML DEPTH",
    desc: "Crop prediction system with 87% accuracy — full ML pipeline with web UI and visualizations.",
    tech: ["Python", "Scikit-learn", "Pandas", "FastAPI", "Docker"],
    color: "#46D369",
    year: "2024",
    match: "95%",
    github: "",
    demo: "",
  },
  {
    title: "EventHub",
    tag: "ENTERPRISE",
    desc: "Secure event management portal with JWT auth, role-based access, and automated reporting.",
    tech: ["Java", "Spring Boot", "MySQL", "OAuth 2.0", "JUnit"],
    color: "#FFB547",
    year: "2024",
    match: "92%",
    github: "",
    demo: "",
  },
  {
    title: "InsightBoard",
    tag: "DATA VIZ",
    desc: "Interactive analytics dashboard turning raw business data into visual stories with drill-down charts.",
    tech: ["React", "Next.js", "Tailwind", "Recharts", "FastAPI"],
    color: "#00D4FF",
    year: "2026",
    match: "97%",
    github: "",
    demo: "",
  },
  {
    title: "GrowthEngine",
    tag: "AI + MARKETING",
    desc: "Campaign manager where AI writes copy, predicts performance, and forecasts ROI.",
    tech: ["Next.js", "FastAPI", "OpenAI GPT", "PostgreSQL", "Recharts"],
    color: "#E876FF",
    year: "2026",
    match: "96%",
    github: "",
    demo: "",
  },
  {
    title: "This Portfolio",
    tag: "META",
    desc: "Cinematic developer portfolio with Netflix-inspired UI — because the portfolio itself is proof of skill.",
    tech: ["React", "Next.js", "Tailwind", "Framer Motion", "Vercel"],
    color: "#FF6B6B",
    year: "2026",
    match: "94%",
    github: "https://github.com/NikhilHolagunda/nikhil-portfolio",
    demo: "",
  },
];

const SKILLS = [
  {
    title: "Full Stack Engineering",
    quote: "I build the backbone.",
    items: [
      "Java",
      "Spring Boot",
      "Python",
      "FastAPI",
      "Flask",
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "REST APIs",
      "OAuth 2.0",
    ],
  },
  {
    title: "AI & Machine Learning",
    quote: "I teach machines to make decisions.",
    items: [
      "Scikit-learn",
      "TensorFlow",
      "PyTorch",
      "LangChain",
      "OpenAI GPT",
      "NLP",
      "ETL Pipelines",
    ],
  },
  {
    title: "Digital Marketing & Growth",
    quote: "I connect what's built to who needs it.",
    items: [
      "Google Analytics",
      "Power BI",
      "SEO/SEM",
      "A/B Testing",
      "Marketing Automation",
    ],
  },
  {
    title: "Data Engineering",
    quote: "I turn raw data into decisions.",
    items: [
      "Apache Spark",
      "Kafka",
      "Airflow",
      "Snowflake",
      "SQL",
      "dbt",
      "Pandas",
      "Data Warehousing",
      "ETL/ELT",
    ],
  },
  {
    title: "Cloud, DevOps & Ops",
    quote: "I ship it and keep it running.",
    items: [
      "Docker",
      "Kubernetes",
      "AWS",
      "GitHub Actions",
      "Jenkins",
      "CI/CD",
      "JIRA",
      "Agile",
    ],
  },
];

const CERTS = [
  { name: "AWS Cloud Practitioner", issuer: "Amazon Web Services", applied: "Deployed Mandara microservices on AWS", year: "2024" },
  { name: "Python for Data Science", issuer: "IBM / Coursera", applied: "Built CropCast ML pipeline", year: "2023" },
  { name: "Spring Boot Masterclass", issuer: "Udemy", applied: "Enterprise APIs at Infosys", year: "2021" },
  { name: "Google Analytics Certified", issuer: "Google", applied: "Marketing dashboards at Mandara", year: "2024" },
  { name: "Docker & Kubernetes", issuer: "LinkedIn Learning", applied: "Container orchestration in production", year: "2023" },
];

const TIMELINE = [
  {
    year: "2025–Present",
    role: "Founder & AI/ML Engineer",
    co: "Mandara Marketing Solutions",
    loc: "Mississauga, ON",
    pts: [
      "Built AI marketing engine with LangChain + GPT agents",
      "50+ automated workflows in production",
      "Containerized microservices, 99%+ uptime",
      "Full ownership: architecture → code → clients",
    ],
  },
  {
    year: "2021–2022",
    role: "System Engineer",
    co: "Infosys Ltd.",
    loc: "Hyderabad, India",
    pts: [
      "REST APIs processing 10,000+ daily banking transactions",
      "99.85% uptime, 30%+ response time improvement",
      "12 Agile sprints, 95% on-time delivery",
    ],
  },
  {
    year: "2021",
    role: "Software Engineer Trainee",
    co: "Urjith Technologies",
    loc: "Hyderabad, India",
    pts: [
      "Production APIs with ~95% test coverage",
      "Gaming platform supporting 5,000+ concurrent users",
    ],
  },
];

// ─── Hooks & Components ───
function FadeIn({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setV(true);
          obs.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    obs.observe(el);
    // Fallback: ensure visible after 1.5s even if observer never fires
    const fallback = setTimeout(() => setV(true), 1500);
    return () => {
      obs.disconnect();
      clearTimeout(fallback);
    };
  }, []);
  return (
    <div
      ref={ref}
      style={{
        opacity: v ? 1 : 0,
        transform: v ? "translateY(0)" : "translateY(30px)",
        transition: `all 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function useTyping(words: string[]) {
  const [d, setD] = useState("");
  const [wi, setWi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const w = words[wi];
    const t = setTimeout(
      () => {
        if (!del) {
          setD(w.slice(0, ci + 1));
          if (ci + 1 === w.length) setTimeout(() => setDel(true), 3500);
          else setCi(ci + 1);
        } else {
          setD(w.slice(0, ci));
          if (ci === 0) {
            setDel(false);
            setWi((wi + 1) % words.length);
          } else setCi(ci - 1);
        }
      },
      del ? 50 : 100
    );
    return () => clearTimeout(t);
  }, [ci, del, wi, words]);
  return d;
}

// ─── Main ───
export default function Portfolio() {
  const [scroll, setScroll] = useState(0);
  const [activeExp, setActiveExp] = useState<number | null>(0);
  const [contactType, setContactType] = useState("Full-Time Hire");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const typed = useTyping([
    "Full Stack Engineer",
    "AI/ML Builder",
    "Startup Founder",
    "Open to Opportunities",
  ]);

  useEffect(() => {
    const fn = () => setScroll(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = useCallback(
    (id: string) =>
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }),
    []
  );

  const handleSubmit = async () => {
    if (!contactName || !contactEmail || !contactMessage) return;
    setSubmitting(true);
    try {
      await fetch("https://script.google.com/macros/s/AKfycbwI-CfhmMhW1-pBZ_kzx51yGwceV1QD1yR7VCRRLntWkF7xuh0r_g8i0IRAsVX0gfvi-w/exec", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          type: contactType,
          message: contactMessage,
          timestamp: new Date().toISOString(),
        }),
      });
      setSubmitted(true);
      setContactName("");
      setContactEmail("");
      setContactMessage("");
    } catch {
      /* silently fail */
    }
    setSubmitting(false);
  };

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => setSubmitted(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [submitted]);

  return (
    <div
      style={{
        background: C.bg,
        color: C.text,
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <style>{`
        ::selection{background:${C.red};color:#fff}
        ::-webkit-scrollbar{width:5px;height:5px}
        ::-webkit-scrollbar-track{background:${C.bg}}
        ::-webkit-scrollbar-thumb{background:#444;border-radius:3px}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.4)}}
        @keyframes slideIn{from{opacity:0;transform:translateX(-20px)}to{opacity:1;transform:translateX(0)}}
        .row-scroll{display:flex;gap:16px;overflow-x:auto;padding:0 48px 16px;scroll-snap-type:x mandatory;-ms-overflow-style:none;scrollbar-width:none}
        .row-scroll::-webkit-scrollbar{display:none}
        .row-scroll>div{scroll-snap-align:start;flex-shrink:0}
        .pcard{width:280px;border-radius:6px;overflow:hidden;background:${C.bgCard};transition:all .3s;cursor:pointer;border:1px solid transparent}
        .pcard:hover{transform:scale(1.05);border-color:${C.borderLight};box-shadow:0 8px 30px rgba(0,0,0,.6);z-index:2}
        .nav-link{color:${C.textMuted};font-size:14px;font-weight:500;cursor:pointer;transition:color .2s;text-decoration:none;padding:4px 8px;border:1px solid transparent;border-radius:3px}
        .nav-link:hover{color:#fff;border-color:${C.borderLight}}
        .badge{display:inline-block;padding:2px 8px;border:1px solid ${C.borderLight};border-radius:3px;font-size:11px;color:${C.textMuted};letter-spacing:1px;font-weight:500}
        .tech-pill{display:inline-block;padding:3px 10px;background:rgba(255,255,255,.06);border-radius:3px;font-size:11px;color:${C.textMuted};letter-spacing:.3px}
        .input-field{width:100%;padding:16px 20px;background:${C.bgInput};border:1px solid ${C.border};border-radius:4px;color:${C.text};font-size:15px;outline:none;font-family:inherit;transition:border-color .3s}
        .input-field:focus{border-color:${C.red}}
        .input-field::placeholder{color:${C.textDim}}
        @media (max-width: 768px) {
          .row-scroll{padding:0 16px 16px;gap:12px}
          .hide-mobile{display:none!important}
          .mobile-nav{display:none!important}
          .about-grid{grid-template-columns:1fr!important}
          .about-intro{flex-direction:column!important;text-align:center!important;gap:16px!important}
          .stats-row{gap:16px!important}
          .hire-grid{grid-template-columns:1fr 1fr!important}
          .edu-grid{grid-template-columns:1fr!important}
          .skills-grid{grid-template-columns:1fr!important}
          .social-row{grid-template-columns:1fr 1fr!important}
          .hero-content{max-width:100%!important;padding:0 16px!important}
          .hero-bg-right{display:none!important}
          .section-pad{padding-left:16px!important;padding-right:16px!important}
          .pcard{width:260px!important}
          .contact-types{flex-direction:column!important;gap:6px!important}
          .hero-title{font-size:52px!important}
          .role-tags{justify-content:center!important}
        }
        @media (max-width: 480px) {
          .hire-grid{grid-template-columns:1fr!important}
          .social-row{grid-template-columns:1fr!important}
          .stats-row{flex-direction:column!important;align-items:center!important}
          .hero-title{font-size:44px!important}
          .hero-cta{flex-direction:column!important;width:100%!important}
          .hero-cta button{width:100%!important;justify-content:center!important}
        }
      `}</style>

      {/* NAV */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "12px 0",
          background:
            scroll > 80
              ? "rgba(20,20,20,.95)"
              : "linear-gradient(180deg, rgba(0,0,0,.7) 0%, transparent 100%)",
          backdropFilter: scroll > 80 ? "blur(12px)" : "none",
          transition: "all .3s",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          className="section-pad"
        >
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <span
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 28,
                color: C.red,
                letterSpacing: 2,
                cursor: "pointer",
              }}
              onClick={() => go("home")}
            >
              NIKHIL
            </span>
            <div
              style={{ display: "flex", gap: 4 }}
              className="hide-mobile mobile-nav"
            >
              {NAV.map((n, i) => (
                <span
                  key={i}
                  className="nav-link"
                  onClick={() => go(SECTIONS[i])}
                >
                  {n}
                </span>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <button
              style={{
                padding: "8px 20px",
                background: C.red,
                color: "#fff",
                border: "none",
                borderRadius: 4,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "background .2s",
              }}
              onClick={() => go("contact")}
              onMouseEnter={(e) =>
                ((e.target as HTMLButtonElement).style.background = C.redDark)
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLButtonElement).style.background = C.red)
              }
            >
              Connect
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section
        id="home"
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "flex-end",
          paddingBottom: 80,
        }}
      >
        <div
          className="hero-bg-right"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "50%",
            height: "100%",
            overflow: "hidden",
            zIndex: 0,
          }}
        >
          {/* Dark background to kill the gray */}
          <div style={{ position: "absolute", inset: 0, background: C.bg, zIndex: 0 }} />
          <img
            src="/avatar.png"
            alt="Nikhil Holagunda"
            style={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              height: "100%",
              objectFit: "contain",
              objectPosition: "center bottom",
            }}
          />
          {/* Overlay to blend avatar into dark theme */}
          <div style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            background: `
              linear-gradient(to right, ${C.bg} 0%, transparent 25%, transparent 75%, ${C.bg} 100%),
              linear-gradient(to bottom, ${C.bg} 0%, transparent 15%, transparent 80%, ${C.bg} 100%)
            `,
          }} />
        </div>
        {/* Left text overlay gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(to right, ${C.bg} 35%, rgba(20,20,20,0.7) 55%, transparent 75%), linear-gradient(to top, ${C.bg} 12%, transparent 40%)`,
            zIndex: 1,
          }}
        />

        <div
          className="hero-content section-pad"
          style={{
            position: "relative",
            zIndex: 2,
            padding: "0 48px",
            maxWidth: 680,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 16,
              animation: "slideIn .6s ease",
            }}
          >
            <span
              style={{
                background: C.red,
                color: "#fff",
                padding: "3px 10px",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 1.5,
                borderRadius: 2,
              }}
            >
              AVAILABLE
            </span>
            <span
              style={{
                color: C.green,
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: 1,
              }}
            >
              READY TO HIRE
            </span>
          </div>

          <h1
            className="hero-title"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(56px, 8vw, 96px)",
              lineHeight: 0.95,
              color: C.white,
              letterSpacing: 2,
              marginBottom: 16,
            }}
          >
            THE
            <br />
            BUILDER
          </h1>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 20,
              flexWrap: "wrap",
            }}
          >
            <span style={{ color: C.green, fontWeight: 700, fontSize: 14 }}>
              98% Match
            </span>
            <span style={{ color: C.textMuted, fontSize: 14 }}>2026</span>
            <span className="badge">4+ YRS EXP</span>
            <span style={{ color: C.textMuted, fontSize: 14 }}>
              Full-Stack Season 4
            </span>
            <span className="badge">AI · ML · DEVOPS</span>
          </div>

          <p
            style={{
              fontSize: 16,
              color: C.text,
              lineHeight: 1.7,
              marginBottom: 8,
              maxWidth: 520,
            }}
          >
            From enterprise banking systems at Infosys to founding Mandara
            Marketing Solutions — an AI-powered automation platform serving real
            clients in production.
          </p>

          <div style={{ height: 28, marginBottom: 28 }}>
            <span
              style={{
                fontSize: 16,
                color: C.textMuted,
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300,
              }}
            >
              Currently:{" "}
              <span style={{ color: C.green }}>{typed}</span>
              <span style={{ animation: "blink 1s infinite", color: C.green }}>
                |
              </span>
            </span>
          </div>

          <div className="hero-cta" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 28px",
                background: "#fff",
                color: "#000",
                border: "none",
                borderRadius: 4,
                fontSize: 16,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "background .2s",
              }}
              onClick={() => go("projects")}
              onMouseEnter={(e) =>
                ((e.target as HTMLButtonElement).style.background = "#ddd")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLButtonElement).style.background = "#fff")
              }
            >
              <span style={{ fontSize: 14 }}>&#9654;</span> View Projects
            </button>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 28px",
                background: "rgba(255,255,255,.15)",
                color: "#fff",
                border: "none",
                borderRadius: 4,
                fontSize: 16,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
                backdropFilter: "blur(4px)",
                transition: "background .2s",
              }}
              onClick={() => go("hire")}
              onMouseEnter={(e) =>
                ((e.target as HTMLButtonElement).style.background =
                  "rgba(255,255,255,.25)")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLButtonElement).style.background =
                  "rgba(255,255,255,.15)")
              }
            >
              <span style={{ fontSize: 14 }}>&#11015;</span> Download CV
            </button>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 120,
            background: `linear-gradient(transparent, ${C.bg})`,
            zIndex: 1,
          }}
        />
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ padding: "40px 0 60px" }}>
        <FadeIn>
          <div
            className="section-pad"
            style={{
              padding: "0 48px",
              marginBottom: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h2 style={{ fontSize: 22, fontWeight: 700, color: C.white }}>
              Featured Projects
            </h2>
            <span
              style={{ fontSize: 13, color: C.textMuted, cursor: "pointer" }}
            >
              Explore All &rarr;
            </span>
          </div>
        </FadeIn>

        <div className="row-scroll">
          {PROJECTS.map((p, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <div className="pcard">
                <div
                  style={{
                    height: 160,
                    background: `linear-gradient(135deg, ${p.color}22, ${C.bgCard}, ${p.color}11)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Bebas Neue'",
                      fontSize: 42,
                      color: `${p.color}33`,
                      letterSpacing: 3,
                    }}
                  >
                    {p.title.split(" ")[0]}
                  </span>
                  <div
                    style={{
                      position: "absolute",
                      top: 10,
                      left: 10,
                      background: p.color,
                      padding: "2px 8px",
                      borderRadius: 2,
                      fontSize: 10,
                      fontWeight: 700,
                      color: "#fff",
                      letterSpacing: 1,
                    }}
                  >
                    {p.tag}
                  </div>
                </div>
                <div style={{ padding: "14px 16px" }}>
                  <h3
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: C.white,
                      marginBottom: 4,
                    }}
                  >
                    {p.title}
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 8,
                    }}
                  >
                    <span
                      style={{
                        color: C.green,
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      {p.match} Match
                    </span>
                    <span style={{ fontSize: 12, color: C.textDim }}>
                      {p.year}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: 13,
                      color: C.textMuted,
                      lineHeight: 1.5,
                      marginBottom: 12,
                    }}
                  >
                    {p.desc}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: (p.demo || p.github) ? 10 : 0 }}>
                    {p.tech.slice(0, 4).map((t, j) => (
                      <span key={j} className="tech-pill">
                        {t}
                      </span>
                    ))}
                    {p.tech.length > 4 && (
                      <span className="tech-pill">+{p.tech.length - 4}</span>
                    )}
                  </div>
                  {(p.demo || p.github) && (
                    <div style={{ display: "flex", gap: 12 }}>
                      {p.demo && (
                        <a
                          href={p.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: C.red,
                            textDecoration: "none",
                            transition: "opacity .2s",
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                        >
                          Demo &rarr;
                        </a>
                      )}
                      {p.github && (
                        <a
                          href={p.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: C.textMuted,
                            textDecoration: "none",
                            transition: "opacity .2s",
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                        >
                          GitHub &rarr;
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="section-pad"
        style={{ padding: "80px 48px", maxWidth: 1280, margin: "0 auto" }}
      >
        <FadeIn>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 24,
            }}
          >
            <span
              style={{
                background: C.red,
                padding: "3px 10px",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 1.5,
                borderRadius: 2,
                color: "#fff",
              }}
            >
              FEATURED
            </span>
            <span
              style={{
                fontSize: 13,
                color: C.textMuted,
                letterSpacing: 2,
                fontWeight: 600,
              }}
            >
              ORIGIN STORY
            </span>
          </div>
          <h2
            style={{
              fontFamily: "'Bebas Neue'",
              fontSize: "clamp(40px, 5vw, 64px)",
              color: C.white,
              letterSpacing: 2,
              marginBottom: 32,
            }}
          >
            THE JOURNEY
          </h2>
          <div className="about-intro" style={{ display: "flex", alignItems: "center", gap: 32, marginBottom: 8 }}>
            <img
              src="/headshot.png"
              alt="Nikhil Holagunda"
              style={{
                width: 140,
                height: 140,
                borderRadius: "50%",
                objectFit: "cover",
                objectPosition: "center 20%",
                border: `3px solid ${C.red}`,
                flexShrink: 0,
              }}
            />
            <p style={{ fontSize: 16, color: C.textMuted, lineHeight: 1.7, maxWidth: 480 }}>
              Engineer by training, founder by choice. I build systems that scale and products that ship — from enterprise banking APIs to AI-powered marketing platforms.
            </p>
          </div>
        </FadeIn>

        <div
          className="about-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 32,
          }}
        >
          {[
            {
              ep: "EP 01",
              title: "The Origin",
              text: "Started writing enterprise Java at Infosys — secure banking APIs, 10,000+ daily transactions, 99.85% uptime. But I wanted to build something of my own.",
            },
            {
              ep: "EP 02",
              title: "The Bet",
              text: "Left India for Canada — not for a job, but for a shot at building something bigger. New country, new ecosystem, new challenges. Every one made me sharper.",
            },
            {
              ep: "EP 03",
              title: "The Reinvention",
              text: "At Conestoga and Algoma, I caught the AI wave early. LangChain, GPT integrations, ML pipelines — I didn't just learn AI. I built a company around it.",
            },
            {
              ep: "EP 04",
              title: "The Present",
              text: "Running Mandara Marketing Solutions — AI marketing automation built from scratch. I design systems, write code, train models, and close deals.",
            },
          ].map((card, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div
                style={{
                  padding: 28,
                  background: C.bgCard,
                  borderRadius: 6,
                  border: `1px solid ${C.border}`,
                  transition: "all .3s",
                  cursor: "default",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = C.borderLight)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = C.border)
                }
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 12,
                  }}
                >
                  <span
                    style={{
                      color: C.red,
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: 2,
                    }}
                  >
                    {card.ep}
                  </span>
                  <span
                    style={{ height: 1, flex: 1, background: C.border }}
                  />
                </div>
                <h3
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: C.white,
                    marginBottom: 10,
                  }}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: C.textMuted,
                    lineHeight: 1.7,
                  }}
                >
                  {card.text}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Stats row */}
        <div
          className="stats-row"
          style={{
            display: "flex",
            gap: 32,
            marginTop: 48,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {[
            { val: "4+", label: "Years Experience" },
            { val: "10K+", label: "Transactions/Day" },
            { val: "50+", label: "AI Workflows" },
            { val: "99.85%", label: "System Uptime" },
            { val: "1", label: "Company Founded" },
          ].map((s, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div style={{ textAlign: "center", minWidth: 120 }}>
                <div
                  style={{
                    fontFamily: "'Bebas Neue'",
                    fontSize: 40,
                    color: C.white,
                    letterSpacing: 1,
                  }}
                >
                  {s.val}
                </div>
                <div
                  style={{ fontSize: 12, color: C.textDim, letterSpacing: 0.5 }}
                >
                  {s.label}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section
        id="skills"
        className="section-pad"
        style={{
          padding: "60px 48px 40px",
          maxWidth: 1280,
          margin: "0 auto",
        }}
      >
        <FadeIn>
          <h2
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: C.white,
              marginBottom: 24,
            }}
          >
            Tech Stack
          </h2>
        </FadeIn>
        <div
          className="skills-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
          }}
        >
          {SKILLS.map((sk, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div
                style={{
                  padding: 24,
                  background: C.bgCard,
                  borderRadius: 6,
                  border: `1px solid ${C.border}`,
                  transition: "border-color .3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = C.borderLight)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = C.border)
                }
              >
                <h3
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: C.white,
                    marginBottom: 4,
                  }}
                >
                  {sk.title}
                </h3>
                <p
                  style={{
                    fontSize: 13,
                    color: C.red,
                    fontStyle: "italic",
                    marginBottom: 14,
                  }}
                >
                  &ldquo;{sk.quote}&rdquo;
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {sk.items.map((t, j) => (
                    <span key={j} className="tech-pill">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section
        id="certifications"
        style={{ padding: "20px 0 40px" }}
      >
        <FadeIn>
          <div
            className="section-pad"
            style={{
              padding: "0 48px",
              marginBottom: 20,
            }}
          >
            <h2 style={{ fontSize: 22, fontWeight: 700, color: C.white }}>
              Certifications
            </h2>
          </div>
        </FadeIn>
        <div className="row-scroll">
          {CERTS.map((cert, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <div
                style={{
                  width: 250,
                  padding: 20,
                  background: C.bgCard,
                  borderRadius: 6,
                  border: `1px solid ${C.border}`,
                  transition: "border-color .3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = C.borderLight)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = C.border)
                }
              >
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: C.red,
                    letterSpacing: 1,
                  }}
                >
                  {cert.year}
                </span>
                <h3
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: C.white,
                    marginTop: 6,
                    marginBottom: 4,
                  }}
                >
                  {cert.name}
                </h3>
                <p
                  style={{
                    fontSize: 12,
                    color: C.textMuted,
                    marginBottom: 10,
                  }}
                >
                  {cert.issuer}
                </p>
                <p
                  style={{
                    fontSize: 12,
                    color: C.textDim,
                    fontStyle: "italic",
                    lineHeight: 1.4,
                  }}
                >
                  Applied: {cert.applied}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* MARKETING PROOF METRICS */}
      <section
        className="section-pad"
        style={{
          padding: "40px 48px 60px",
          maxWidth: 1280,
          margin: "0 auto",
        }}
      >
        <FadeIn>
          <div
            style={{
              display: "flex",
              gap: 32,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {[
              { val: "3x", label: "Client Revenue Growth" },
              { val: "40%", label: "SEO Traffic Increase" },
              { val: "85%", label: "Campaign Open Rate" },
              { val: "12", label: "A/B Tests Run" },
            ].map((m, i) => (
              <div key={i} style={{ textAlign: "center", minWidth: 140 }}>
                <div
                  style={{
                    fontFamily: "'Bebas Neue'",
                    fontSize: 40,
                    color: C.red,
                    letterSpacing: 1,
                  }}
                >
                  {m.val}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: C.textMuted,
                    letterSpacing: 0.5,
                  }}
                >
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* EXPERIENCE */}
      <section
        id="experience"
        className="section-pad"
        style={{
          padding: "60px 48px 80px",
          maxWidth: 1280,
          margin: "0 auto",
        }}
      >
        <FadeIn>
          <h2
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: C.white,
              marginBottom: 32,
            }}
          >
            Career Timeline
          </h2>
        </FadeIn>
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              left: 14,
              top: 0,
              bottom: 0,
              width: 2,
              background: `linear-gradient(to bottom, ${C.red}, ${C.border})`,
            }}
          />
          {TIMELINE.map((t, i) => (
            <FadeIn key={i} delay={i * 0.12}>
              <div
                style={{
                  marginBottom: 28,
                  paddingLeft: 48,
                  position: "relative",
                  cursor: "pointer",
                }}
                onClick={() => setActiveExp(activeExp === i ? null : i)}
              >
                <div
                  style={{
                    position: "absolute",
                    left: 7,
                    top: 6,
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    border: `2px solid ${C.red}`,
                    background: activeExp === i ? C.red : C.bg,
                    transition: "all .3s",
                  }}
                />
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: C.red,
                    letterSpacing: 1,
                  }}
                >
                  {t.year}
                </span>
                <h3
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: C.white,
                    marginTop: 4,
                  }}
                >
                  {t.role}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: C.textMuted,
                    marginBottom: 4,
                  }}
                >
                  {t.co} &middot; {t.loc}
                </p>
                <div
                  style={{
                    maxHeight: activeExp === i ? 200 : 0,
                    overflow: "hidden",
                    transition: "max-height .4s ease",
                  }}
                >
                  {t.pts.map((p, j) => (
                    <div
                      key={j}
                      style={{ display: "flex", gap: 8, marginTop: 6 }}
                    >
                      <span
                        style={{ color: C.red, fontSize: 8, marginTop: 6 }}
                      >
                        &#9679;
                      </span>
                      <span
                        style={{
                          fontSize: 13,
                          color: C.textMuted,
                          lineHeight: 1.5,
                        }}
                      >
                        {p}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Education */}
        <FadeIn>
          <h3
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: C.white,
              marginTop: 48,
              marginBottom: 16,
            }}
          >
            Education
          </h3>
        </FadeIn>
        <div
          className="edu-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
          }}
        >
          {[
            {
              s: "Conestoga College",
              d: "Data Processing & Reporting",
              y: "2025",
              g: "3.8",
            },
            {
              s: "Algoma University",
              d: "Information Technology",
              y: "2024",
              g: "3.7",
            },
            {
              s: "SVIT, India",
              d: "B.Tech Computer Science",
              y: "2020",
              g: "3.6",
            },
          ].map((e, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div
                style={{
                  padding: 20,
                  background: C.bgCard,
                  borderRadius: 6,
                  border: `1px solid ${C.border}`,
                }}
              >
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: C.red,
                    letterSpacing: 1,
                  }}
                >
                  {e.y}
                </span>
                <h4
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: C.white,
                    marginTop: 4,
                  }}
                >
                  {e.d}
                </h4>
                <p
                  style={{ fontSize: 13, color: C.textMuted, marginTop: 2 }}
                >
                  {e.s}
                </p>
                <p
                  style={{ fontSize: 12, color: C.textDim, marginTop: 6 }}
                >
                  GPA: {e.g}/4.0
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* HIRE ME */}
      <section
        id="hire"
        className="section-pad"
        style={{ padding: "80px 48px", maxWidth: 1280, margin: "0 auto" }}
      >
        <FadeIn>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 20,
            }}
          >
            <span
              style={{
                background: C.green,
                color: "#000",
                padding: "3px 10px",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 1.5,
                borderRadius: 2,
              }}
            >
              NOW CASTING
            </span>
            <span
              style={{
                fontSize: 13,
                color: C.textMuted,
                letterSpacing: 2,
                fontWeight: 600,
              }}
            >
              HIRE ME
            </span>
          </div>
          <h2
            style={{
              fontFamily: "'Bebas Neue'",
              fontSize: "clamp(40px, 5vw, 64px)",
              color: C.white,
              letterSpacing: 2,
              marginBottom: 16,
            }}
          >
            READY FOR
            <br />
            THE NEXT ROLE
          </h2>
          <p
            style={{
              fontSize: 16,
              color: C.textMuted,
              lineHeight: 1.7,
              maxWidth: 560,
              marginBottom: 40,
            }}
          >
            I bring enterprise engineering, AI/ML expertise, and a
            founder&apos;s mindset. Looking for a team where I can build
            things that matter.
          </p>
        </FadeIn>

        <div
          className="hire-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
            marginBottom: 40,
          }}
        >
          {[
            {
              l: "LOCATION",
              v: "Mississauga, ON",
              s: "Remote / Hybrid",
            },
            {
              l: "EXPERIENCE",
              v: "4+ Years",
              s: "Enterprise + Startup",
            },
            { l: "AVAILABILITY", v: "Immediate", s: "Ready to start" },
            {
              l: "AUTHORIZATION",
              v: "Open Work Permit",
              s: "Authorized to work",
            },
          ].map((f, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <div
                style={{
                  padding: 20,
                  background: C.bgCard,
                  borderRadius: 6,
                  border: "1px solid rgba(70,211,105,.2)",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    color: C.textDim,
                    letterSpacing: 2,
                    marginBottom: 6,
                  }}
                >
                  {f.l}
                </div>
                <div
                  style={{ fontSize: 20, fontWeight: 700, color: C.green }}
                >
                  {f.v}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: C.textMuted,
                    marginTop: 4,
                  }}
                >
                  {f.s}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <h3
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: C.white,
              marginBottom: 14,
            }}
          >
            Best fit for:
          </h3>
          <div
            className="role-tags"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              marginBottom: 32,
            }}
          >
            {[
              "Software Engineer",
              "Full Stack Developer",
              "Backend Engineer",
              "AI/ML Engineer",
              "Python Developer",
              "Java Developer",
              "Data Engineer",
              "DevOps Engineer",
              "Technical Lead",
            ].map((r, i) => (
              <span
                key={i}
                style={{
                  padding: "6px 16px",
                  background: C.greenDim,
                  border: "1px solid rgba(70,211,105,.3)",
                  borderRadius: 3,
                  fontSize: 13,
                  color: C.green,
                  fontWeight: 500,
                }}
              >
                {r}
              </span>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <button
              style={{
                padding: "14px 32px",
                background: C.red,
                color: "#fff",
                border: "none",
                borderRadius: 4,
                fontSize: 16,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "background .2s",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLButtonElement).style.background = C.redDark)
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLButtonElement).style.background = C.red)
              }
            >
              Download Resume &#11015;
            </button>
            <button
              style={{
                padding: "14px 32px",
                background: "rgba(255,255,255,.1)",
                color: "#fff",
                border: "none",
                borderRadius: 4,
                fontSize: 16,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
              onClick={() => go("contact")}
            >
              Get In Touch &rarr;
            </button>
          </div>
        </FadeIn>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        style={{
          position: "relative",
          padding: "100px 48px",
          minHeight: 700,
        }}
        className="section-pad"
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse at center, rgba(30,30,30,.9) 0%, ${C.bg} 100%)`,
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: 600,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <FadeIn>
            <h2
              style={{
                fontFamily: "'Bebas Neue'",
                fontSize: "clamp(36px, 5vw, 56px)",
                color: C.white,
                letterSpacing: 2,
                marginBottom: 12,
                fontStyle: "italic",
              }}
            >
              Ready to Start a
              <br />
              Production?
            </h2>
            <p
              style={{ fontSize: 15, color: C.textMuted, marginBottom: 40 }}
            >
              Pitch your project or just say hello. I respond faster than a
              binge-watch session.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 14,
                textAlign: "left",
              }}
            >
              <input
                className="input-field"
                placeholder="Your Name"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
              />
              <input
                className="input-field"
                placeholder="Email Address"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
              />
              <div>
                <div
                  style={{
                    fontSize: 11,
                    color: C.textMuted,
                    letterSpacing: 2,
                    fontWeight: 600,
                    marginBottom: 10,
                  }}
                >
                  PROJECT TYPE
                </div>
                <div
                  className="contact-types"
                  style={{
                    display: "flex",
                    gap: 8,
                    flexWrap: "wrap",
                  }}
                >
                  {[
                    "Full-Time Hire",
                    "Freelance",
                    "Consulting",
                    "Just Saying Hi",
                  ].map((t) => (
                    <span
                      key={t}
                      onClick={() => setContactType(t)}
                      style={{
                        padding: "6px 16px",
                        borderRadius: 3,
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: "pointer",
                        transition: "all .2s",
                        background:
                          contactType === t ? C.red : "transparent",
                        color:
                          contactType === t ? "#fff" : C.textMuted,
                        border: `1px solid ${contactType === t ? C.red : C.borderLight}`,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <textarea
                className="input-field"
                placeholder="The Script / Details"
                rows={5}
                style={{ resize: "vertical" }}
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
              />
              <button
                style={{
                  width: "100%",
                  padding: "16px",
                  background: submitted ? C.green : C.red,
                  color: "#fff",
                  border: `2px dashed ${submitted ? C.green : C.red}`,
                  borderRadius: 4,
                  fontSize: 18,
                  fontWeight: 700,
                  cursor: submitting ? "default" : "pointer",
                  fontFamily: "inherit",
                  letterSpacing: 1,
                  transition: "all .2s",
                  opacity: submitting ? 0.7 : 1,
                }}
                onClick={handleSubmit}
                disabled={submitting}
                onMouseEnter={(e) => {
                  if (!submitted && !submitting) {
                    (e.target as HTMLButtonElement).style.background = C.redDark;
                    (e.target as HTMLButtonElement).style.borderColor = C.redDark;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!submitted && !submitting) {
                    (e.target as HTMLButtonElement).style.background = C.red;
                    (e.target as HTMLButtonElement).style.borderColor = C.red;
                  }
                }}
              >
                {submitting
                  ? "Sending..."
                  : submitted
                    ? "Sent! I'll get back to you soon."
                    : "Send Proposal"}
              </button>
            </div>
          </FadeIn>

          {/* Social channels */}
          <FadeIn delay={0.2}>
            <div style={{ marginTop: 48 }}>
              <div
                style={{
                  fontSize: 11,
                  color: C.textDim,
                  letterSpacing: 3,
                  fontWeight: 600,
                  marginBottom: 16,
                }}
              >
                SOCIAL CHANNELS
              </div>
              <div
                className="social-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: 12,
                }}
              >
                {[
                  {
                    label: "Email",
                    val: "nikhilholagunda07@gmail.com",
                  },
                  {
                    label: "LinkedIn",
                    val: "linkedin.com/in/nikhilholagunda",
                  },
                  {
                    label: "GitHub",
                    val: "github.com/nikhilholagunda",
                  },
                  { label: "Phone", val: "437-662-1898" },
                ].map((s, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "12px 14px",
                      background: C.bgCard,
                      borderRadius: 4,
                      border: `1px solid ${C.border}`,
                      cursor: "pointer",
                      transition: "border-color .2s",
                      textAlign: "center",
                      overflow: "hidden",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.borderColor = C.borderLight)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.borderColor = C.border)
                    }
                  >
                    <div
                      style={{
                        fontSize: 10,
                        color: C.textDim,
                        letterSpacing: 1,
                        marginBottom: 2,
                      }}
                    >
                      {s.label}
                    </div>
                    <div style={{ fontSize: 11, color: C.text, wordBreak: "break-all", lineHeight: 1.3 }}>
                      {s.val}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          padding: "40px 48px",
          borderTop: `1px solid ${C.border}`,
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: 13, color: C.textDim }}>
          Designed &amp; Built by Nikhil Holagunda &middot; 2026
        </p>
        <p style={{ fontSize: 13, color: C.textMuted, marginTop: 6 }}>
          Currently reading: Strategy &amp; Human Behavior &middot; Last
          meditation: Today &middot; Cricket stance: Always ready
        </p>
      </footer>
    </div>
  );
}
