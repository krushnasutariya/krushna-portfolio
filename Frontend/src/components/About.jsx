import { motion } from "motion/react";
import { FaReact } from "react-icons/fa";
import {
  HiOutlineCodeBracket,
  HiOutlineCpuChip,
  HiOutlineServerStack,
} from "react-icons/hi2";
import { TbCloudCode } from "react-icons/tb";
import SectionTitle from "./SectionTitle";

function About() {
  const highlights = [
    { number: "3+", label: "Years Frontend" },
    { number: "BMW", label: "Software Internship" },
    { number: "XAI", label: "Master Thesis" },
  ];

  const services = [
    {
      icon: <HiOutlineCodeBracket />,
      title: "Web Development",
      text: "Responsive and modern web applications using React, JavaScript, TypeScript, and Tailwind CSS.",
    },
    {
      icon: <HiOutlineServerStack />,
      title: "Full-Stack Development",
      text: "Frontend interfaces connected with Python APIs, backend logic, WebSockets, and real-world data flows.",
    },
    {
      icon: <TbCloudCode />,
      title: "Cloud & DevOps",
      text: "Cloud-focused projects using AWS, GCP, Docker, Terraform, GitHub Actions, and CI/CD ideas.",
    },
    {
      icon: <HiOutlineCpuChip />,
      title: "AI / XAI Learner",
      text: "LLM concepts, explainable AI, recommender systems, and AI-enabled software from my thesis work.",
    },
  ];

  const skills = [
    {
      name: "React",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      url: "https://react.dev/",
    },
    {
      name: "JavaScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    },
    {
      name: "TypeScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      url: "https://www.typescriptlang.org/",
    },
    {
      name: "Python",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      url: "https://www.python.org/",
    },
    {
      name: "FastAPI",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
      url: "https://fastapi.tiangolo.com/",
    },
    {
      name: "AWS",
      icon: "https://cdn.simpleicons.org/amazonaws/FF9900",
      url: "https://aws.amazon.com/",
    },
    {
      name: "GCP",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
      url: "https://cloud.google.com/",
    },
    {
      name: "Docker",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      url: "https://www.docker.com/",
    },
    {
      name: "Git",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      url: "https://git-scm.com/",
    },
    {
      name: "Figma",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
      url: "https://www.figma.com/",
    },
    {
      name: "Postman",
      icon: "https://cdn.simpleicons.org/postman/FF6C37",
      url: "https://www.postman.com/",
    },
    {
      name: "Mapbox",
      icon: "https://cdn.simpleicons.org/mapbox/ffffff",
      url: "https://www.mapbox.com/",
    },
  ];

  const scrollingSkills = [...skills, ...skills];

  return (
    <section id="about">
      <SectionTitle title="Digital Identity" />

      <div className="mt-8 max-w-4xl space-y-5 text-base leading-8 text-stone-300 md:text-[17px]">
        <p>
          I&apos;m Krushna Sutariya, a Software Engineering master&apos;s
          candidate building practical full-stack and cloud-enabled applications
          with React, TypeScript, Python, and modern DevOps tools.
        </p>

        <p>
          My work connects frontend engineering, geospatial data visualization,
          Python backend communication, and explainable AI. I enjoy creating
          software that is not only functional, but also clear, useful, and easy
          for people to trust.
        </p>
      </div>

      <section className="mt-11">
        <h3 className="flex items-center gap-3 text-2xl font-black text-white">
          <FaReact className="text-cyan-300" />
          Highlights & Successes
        </h3>

        <div className="mt-7 grid gap-6 md:grid-cols-3">
          {highlights.map((item) => (
            <motion.div
              key={item.label}
              whileHover={{ y: -4 }}
              className="border-l-2 border-cyan-300 pl-5"
            >
              <p className="text-3xl font-black text-white md:text-4xl">
                {item.number}
              </p>
              <p className="mt-2 text-xs font-bold uppercase tracking-wide text-stone-400">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h3 className="text-2xl font-black text-white">What I&apos;m Doing</h3>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {services.map((service) => (
            <motion.div
              key={service.title}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              className="group rounded-3xl border border-white/10 bg-gradient-to-br from-[#292929] to-[#202020] p-6 shadow-xl shadow-black/25 transition hover:border-cyan-300/50"
            >
              <div className="flex gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#303030] text-3xl text-cyan-300 transition group-hover:scale-110">
                  {service.icon}
                </div>

                <div>
                  <h4 className="text-xl font-black text-white">
                    {service.title}
                  </h4>
                  <p className="mt-3 leading-7 text-stone-400">
                    {service.text}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </section>
  );
}

export default About;
