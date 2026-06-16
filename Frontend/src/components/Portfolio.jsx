import { motion } from "motion/react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import SectionTitle from "./SectionTitle";

function Portfolio() {
  const projects = [
    {
      title: "Portfolio Website",
      urlText: "krushnasutariya.github.io/krushna-portfolio",
      description:
        "Personal portfolio website built with React, Tailwind CSS and Motion. It presents my profile, resume, skills, projects, contact page and future AI assistant idea.",
      stack: ["React", "Tailwind CSS", "Motion", "Responsive UI"],
      status: "In Progress",
      image: "/project-images/portfolio-preview.png",
      liveLink: "#",
      githubLink: "https://github.com/krushnasutariya",
    },
    {
      title: "Sky Map Weather",
      urlText: "krushnasutariya.github.io/sky-map-weather",
      description:
        "Responsive weather map application with city search, interactive map selection, live weather data, forecast details and custom weather UI components.",
      stack: [
        "React",
        "Vite",
        "Tailwind CSS",
        "React Leaflet",
        "OpenWeather API",
      ],
      status: "Live",
      image: "/project-images/sky-map-weather-preview.png",
      liveLink: "https://krushnasutariya.github.io/sky-map-weather/",
      githubLink: "https://github.com/krushnasutariya/sky-map-weather",
    },
  ];

  return (
    <section id="portfolio">
      <SectionTitle title="Creative Showcase" />

      <p className="mt-7 max-w-3xl leading-8 text-stone-400">
        A focused selection of projects I can currently demonstrate with a live
        or GitHub-ready version.
      </p>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="overflow-hidden rounded-3xl border border-white/10 bg-[#252525] shadow-2xl shadow-black/25"
    >
      <div className="relative h-64 overflow-hidden bg-[#111]">
        <img
          src={project.image}
          alt={`${project.title} preview`}
          className="h-full w-full object-cover transition duration-500 hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />

        <div className="absolute right-5 top-5 rounded-full bg-black/70 px-4 py-2 text-xs font-black text-cyan-300 backdrop-blur">
          {project.status}
        </div>
      </div>

      <div className="p-7">
        <p className="text-sm font-semibold text-stone-500">
          URL : {project.urlText}
        </p>

        <h3 className="mt-4 text-2xl font-extrabold text-white">
          {project.title}
        </h3>

        <p className="mt-4 leading-7 text-stone-400">{project.description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-[#1b1b1b] px-3 py-1 text-xs font-bold text-stone-300"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href={project.liveLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-cyan-300/60 px-5 py-2.5 text-sm font-black text-cyan-300 transition hover:-translate-y-1 hover:bg-cyan-300 hover:text-[#111]"
          >
            <FaExternalLinkAlt />
            Live Demo
          </a>

          <a
            href={project.githubLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-sm font-black text-stone-200 transition hover:-translate-y-1 hover:border-cyan-300 hover:text-cyan-300"
          >
            <FaGithub />
            GitHub
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default Portfolio;
