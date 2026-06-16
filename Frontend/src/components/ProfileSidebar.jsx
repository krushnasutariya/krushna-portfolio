import { motion } from "motion/react";
import { BsFileEarmarkPerson } from "react-icons/bs";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import {
  HiOutlineBookOpen,
  HiOutlineEnvelope,
  HiOutlineMapPin,
} from "react-icons/hi2";
import { MdEmail } from "react-icons/md";
import profilePhoto from "../assets/profile-photo.jpg";

function ProfileSidebar() {
  const socials = [
    {
      name: "LinkedIn",
      icon: <FaLinkedinIn />,
      href: "https://www.linkedin.com/in/krushna-sutariya-a09080303",
    },
    {
      name: "GitHub",
      icon: <FaGithub />,
      href: "https://github.com/krushnasutariya",
    },
    {
      name: "Email",
      icon: <MdEmail />,
      href: "mailto:krushnasutariya19@gmail.com",
    },
    {
      name: "CV",
      icon: <BsFileEarmarkPerson />,
      href: "/Krushna_Sutariya_CV.pdf",
    },
  ];

  return (
    <motion.aside
      initial={{ opacity: 0, x: -35 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7 }}
      className="premium-glow-card h-fit p-[1px] shadow-2xl shadow-black/40"
    >
      <div className="rounded-[27px] bg-[#1f1f1f] p-7">
        <motion.div
          whileHover={{ scale: 1.04 }}
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
          className="mx-auto h-40 w-40 overflow-hidden rounded-3xl bg-[#2b2b2b] shadow-xl shadow-black/30"
        >
          <img
            src={profilePhoto}
            alt="Krushnaben Sutariya"
            className="h-full w-full object-cover transition duration-500 hover:scale-110"
          />
        </motion.div>

        <h1 className="mt-7 text-center font-serif text-2xl font-bold italic leading-tight text-white">
          Krushna Sutariya
        </h1>

        <div className="mx-auto mt-4 w-fit rounded-lg bg-[#2b2b2b] px-5 py-2 text-xs font-semibold text-stone-200">
          Software Developer
        </div>

        <div className="my-7 h-px bg-white/10" />

        <div className="space-y-5">
          <InfoItem
            icon={<HiOutlineEnvelope />}
            label="EMAIL"
            value="krushnasutariya19@gmail.com"
          />

          <InfoItem
            icon={<HiOutlineMapPin />}
            label="LOCATION"
            value="Leutkirch im Allgäu, Germany"
          />

          <InfoItem
            icon={<HiOutlineBookOpen />}
            label="EDUCATION"
            value="M.Sc. Software Engineering"
          />
        </div>

        <div className="mt-8 flex justify-center gap-4">
          {socials.map((social) => (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -4, scale: 1.08 }}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2b2b2b] text-base text-white transition hover:bg-cyan-300 hover:text-[#111]"
              title={social.name}
            >
              {social.icon}
            </motion.a>
          ))}
        </div>

        <motion.div
          whileHover={{ y: -3 }}
          className="mt-7 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4"
        >
          <p className="text-sm font-black text-cyan-300">We are here!</p>
          <p className="mt-2 text-xs leading-5 text-stone-400">
            Ask about projects, skills, or CV. AI assistant coming next.
          </p>
        </motion.div>
      </div>
    </motion.aside>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <div className="flex gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#292929] text-xl text-cyan-300">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-bold text-stone-500">{label}</p>
        <p
          title={value}
          className="mt-1 overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold text-stone-200"
        >
          {value}
        </p>
      </div>
    </div>
  );
}

export default ProfileSidebar;
