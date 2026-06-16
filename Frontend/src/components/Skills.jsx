import { motion } from "motion/react";
import * as Fa from "react-icons/fa";
import * as Si from "react-icons/si";
import SectionTitle from "./SectionTitle";

function Skills() {
  const primaryTools = [
    {
      name: "React",
      percent: 88,
      icon: Fa.FaReact,
      fallback: "R",
    },
    {
      name: "TypeScript",
      percent: 82,
      icon: Si.SiTypescript,
      fallback: "TS",
    },
    {
      name: "Python",
      percent: 84,
      icon: Fa.FaPython,
      fallback: "Py",
    },
    {
      name: "Tailwind CSS",
      percent: 86,
      icon: Si.SiTailwindcss,
      fallback: "TW",
    },
    {
      name: "Docker",
      percent: 74,
      icon: Fa.FaDocker,
      fallback: "D",
    },
    {
      name: "AWS",
      percent: 72,
      icon: Fa.FaAws,
      fallback: "AWS",
    },
    {
      name: "Git",
      percent: 88,
      icon: Fa.FaGitAlt,
      fallback: "Git",
    },
    {
      name: "FastAPI",
      percent: 76,
      icon: Si.SiFastapi,
      fallback: "API",
    },
  ];

  const groups = [
    {
      title: "Languages",
      items: [
        "JavaScript",
        "TypeScript",
        "Python",
        "Java basics",
        "HTML5",
        "CSS3",
      ],
    },
    {
      title: "Frontend",
      items: [
        "React.js",
        "Tailwind CSS",
        "Mapbox GL JS",
        "React Leaflet",
        "Chart.js",
        "UI/UX",
      ],
    },
    {
      title: "Backend & APIs",
      items: ["Python", "REST APIs", "WebSockets", "SQL Server", "DynamoDB"],
    },
    {
      title: "Cloud & DevOps",
      items: [
        "AWS",
        "GCP Cloud Run",
        "Docker",
        "Terraform",
        "GitHub Actions",
        "GitLab CI/CD",
        "Linux",
        "pytest",
      ],
    },
    {
      title: "AI & Data",
      items: [
        "LLM concepts",
        "Explainable AI",
        "Recommender Systems",
        "Scikit-learn",
        "Pandas",
        "NumPy",
      ],
    },
    {
      title: "Tools",
      items: ["Foxglove Studio", "Figma", "Jira", "Postman", "Google Colab"],
    },
  ];

  return (
    <section id="skills">
      <SectionTitle title="The Tools I Trust" />

      <p className="mt-7 max-w-3xl text-lg leading-8 text-stone-400">
        Languages, frameworks, platforms, and tools I use when building
        frontend, backend, cloud, DevOps, data visualization, and AI-enabled
        applications.
      </p>

      <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
        {primaryTools.map((tool, index) => (
          <SkillRing key={tool.name} tool={tool} index={index} />
        ))}
      </div>

      <div className="mt-14 overflow-hidden rounded-3xl border border-white/10 bg-[#171717]">
        <div className="grid md:grid-cols-2 xl:grid-cols-3">
          {groups.map((group) => (
            <SkillGroup key={group.title} group={group} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillRing({ tool, index }) {
  const Icon = tool.icon;
  const angle = Math.round((tool.percent / 100) * 360);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="rounded-[28px] border border-white/10 bg-[#111318] p-6 shadow-2xl shadow-black/30"
    >
      <div
        className="mx-auto flex h-36 w-36 items-center justify-center rounded-full p-[8px] shadow-[0_0_35px_rgba(103,232,249,0.08)]"
        style={{
          background: `conic-gradient(#67e8f9 ${angle}deg, rgba(255,255,255,0.08) ${angle}deg)`,
        }}
      >
        <div className="flex h-full w-full items-center justify-center rounded-full bg-[#111318]">
          {Icon ? (
            <Icon className="text-5xl text-cyan-300" />
          ) : (
            <span className="text-3xl font-black text-cyan-300">
              {tool.fallback}
            </span>
          )}
        </div>
      </div>

      <h3 className="mt-6 text-center text-sm font-black uppercase tracking-widest text-white">
        {tool.name}
      </h3>

      <p className="mt-2 text-center text-sm font-bold text-stone-400">
        {tool.percent}%
      </p>
    </motion.article>
  );
}

function SkillGroup({ group }) {
  return (
    <motion.div
      whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }}
      className="border-b border-r border-white/10 p-7"
    >
      <h3 className="font-serif text-2xl font-bold italic text-cyan-300">
        {group.title}
      </h3>

      <div className="mt-6 flex flex-wrap gap-3">
        {group.items.map((item) => (
          <span
            key={item}
            className="rounded-full border border-white/10 bg-[#222] px-4 py-2 text-sm font-semibold text-stone-300"
          >
            {item}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default Skills;
