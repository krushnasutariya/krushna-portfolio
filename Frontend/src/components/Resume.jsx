import { motion } from "motion/react";
import {
  HiOutlineAcademicCap,
  HiOutlineBriefcase,
  HiOutlineCheckBadge,
} from "react-icons/hi2";
import { MdOutlineVerified } from "react-icons/md";
import SectionTitle from "./SectionTitle";

function Resume() {
  const experience = [
    {
      role: "Software Development Intern",
      company: "BMW Group",
      period: "Feb 2025 – Jul 2025",
      description:
        "Built real-time visualization tools for ADAS and localization data using React, TypeScript, Python, Mapbox GL JS, WebSockets, Chart.js, Plotly, and Foxglove Studio.",
      points: [
        "Redesigned web-based localization and map visualization features using React, TypeScript, and Mapbox GL JS.",
        "Built browser-based dashboards using Python, WebSockets, Plotly, Matplotlib, and Chart.js.",
        "Worked in agile Scrum with Git version control and pull request reviews.",
      ],
    },
    {
      role: "Front-End Developer",
      company: "Techsphere Softwares LLP",
      period: "Jan 2021 – Apr 2023",
      description:
        "Developed responsive web pages and reusable UI components for client-facing web applications.",
      points: [
        "Created responsive frontend pages using HTML, CSS, and JavaScript.",
        "Integrated frontend views with backend APIs.",
        "Supported usability improvements and browser compatibility testing.",
      ],
    },
    {
      role: "Web Designer",
      company: "Savaj Infotech",
      period: "Aug 2016 – Dec 2020",
      description:
        "Designed and implemented website layouts, landing pages, and UI components with focus on usability and visual consistency.",
      points: [
        "Created UI concepts and page structures for client projects.",
        "Built functional and visually clean web solutions.",
      ],
    },
  ];

  const education = [
    {
      role: "Master of Science in Software Engineering",
      company: "Hochschule Heilbronn, Germany",
      period: "Mar 2024 – Expected 2026",
      description:
        "Focused on software engineering, cloud computing, DevOps, UI design, cybersecurity, and explainable LLM-based recommendation systems.",
      note: "Current average grade: 1.7 | Thesis submitted Apr 2026",
    },
    {
      role: "Bachelor of Engineering in Computer Engineering",
      company: "SSASIT, India",
      period: "Jun 2013 – May 2016",
      description:
        "Built a foundation in programming, databases, web technologies, and computer engineering concepts.",
      note: "CGPA: 8.36 / 10",
    },
    {
      role: "Diploma in Computer Engineering",
      company: "Government Polytechnic for Girls, India",
      period: "Jun 2010 – May 2013",
      description:
        "Studied computer engineering fundamentals, programming, and practical software development basics.",
      note: "CGPA: 8.64 / 10",
    },
  ];

  const certifications = [
    {
      role: "Getting Started with AWS IoT",
      company: "AWS Training and Certification",
      period: "Apr 2025",
      icon: <HiOutlineCheckBadge />,
      description:
        "Completed AWS IoT fundamentals course focused on cloud-connected device concepts.",
    },
    {
      role: "Getting Started with DevOps on AWS",
      company: "AWS Training and Certification",
      period: "May 2025",
      icon: <HiOutlineCheckBadge />,
      description:
        "Completed AWS DevOps introduction covering cloud development and DevOps workflow concepts.",
    },
    {
      role: "Fundamentals of Machine Learning and Artificial Intelligence",
      company: "AWS Training and Certification",
      period: "Apr 2025",
      icon: <HiOutlineCheckBadge />,
      description:
        "Completed AWS course covering core machine learning and artificial intelligence concepts.",
    },
    {
      role: "Intro to Machine Learning",
      company: "Kaggle",
      period: "May 2025",
      icon: <HiOutlineCheckBadge />,
      description:
        "Completed Kaggle introductory machine learning course covering basic ML workflow and model building.",
    },
    {
      role: "Intermediate Machine Learning",
      company: "Kaggle",
      period: "Jun 2025",
      icon: <HiOutlineCheckBadge />,
      description:
        "Completed Kaggle intermediate machine learning course focused on stronger model-building concepts.",
    },
  ];

  return (
    <section id="resume">
      <SectionTitle title="Career Snapshot" />

      <div className="mt-10 space-y-14">
        <TimelineGroup
          icon={<HiOutlineBriefcase />}
          title="Experience"
          items={experience}
        />

        <TimelineGroup
          icon={<HiOutlineAcademicCap />}
          title="Education"
          items={education}
        />

        <TimelineGroup
          icon={<HiOutlineCheckBadge />}
          title="Certifications"
          items={certifications}
        />
      </div>
    </section>
  );
}

function TimelineGroup({ icon, title, items }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative"
    >
      {/* Header */}
      <div className="relative mb-6 flex items-center gap-4">
        <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-[#292929] text-2xl text-cyan-300 shadow-lg shadow-black/20">
          {icon}

          {/* line from header icon to first timeline dot */}
          <span className="absolute left-1/2 top-11 h-10 w-px -translate-x-1/2 bg-white/10" />
        </div>

        <h3 className="text-2xl font-black text-white">{title}</h3>
      </div>

      {/* Items */}
      <div className="ml-[10px]">
        {items.map((item, index) => (
          <TimelineItem
            key={`${title}-${item.role}-${index}`}
            item={item}
            isLast={index === items.length - 1}
            delay={index * 0.06}
          />
        ))}
      </div>
    </motion.section>
  );
}

function TimelineItem({ item, isLast, delay }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      className="relative grid grid-cols-[24px_1fr] gap-5"
    >
      <div className="relative flex justify-center">
        {/* cyan dot */}
        <span className="relative z-10 mt-2 h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_0_5px_rgba(103,232,249,0.12)]" />

        {/* line only between this dot and next item dot */}
        {!isLast && (
          <span className="absolute left-1/2 top-6 bottom-0 w-px -translate-x-1/2 bg-white/10" />
        )}
      </div>

      <div className="pb-9">
        <div className="rounded-2xl p-3 transition duration-200 hover:bg-white/[0.025]">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex gap-3">
              {item.icon && (
                <div className="mt-1 text-xl text-cyan-300">{item.icon}</div>
              )}

              <div>
                <h4 className="text-lg font-black text-white">{item.role}</h4>

                <p className="mt-1 text-sm font-semibold text-stone-300">
                  {item.company}
                </p>
              </div>
            </div>

            <p className="text-sm font-black text-cyan-300">{item.period}</p>
          </div>

          {item.note && (
            <p className="mt-3 w-fit rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-bold text-cyan-300">
              {item.note}
            </p>
          )}

          <p className="mt-4 max-w-3xl leading-7 text-stone-400">
            {item.description}
          </p>

          {item.points && (
            <ul className="mt-3 space-y-2 text-sm leading-6 text-stone-400">
              {item.points.map((point) => (
                <li key={point} className="flex gap-2">
                  <MdOutlineVerified className="mt-1 shrink-0 text-cyan-300" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </motion.article>
  );
}
export default Resume;
