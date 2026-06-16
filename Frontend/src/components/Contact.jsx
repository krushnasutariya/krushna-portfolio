import { motion } from "motion/react";
import { HiOutlinePaperAirplane } from "react-icons/hi2";
import SectionTitle from "./SectionTitle";

function Contact() {
  return (
    <section id="contact">
      <SectionTitle title="Let's Connect" />

      <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-[#121212]">
        <div className="relative h-80 overflow-hidden bg-[#0b0b0b]">
          <iframe
            title="Leutkirch im Allgäu map"
            src="https://www.openstreetmap.org/export/embed.html?bbox=10.0000%2C47.7800%2C10.0800%2C47.8500&layer=mapnik"
            className="h-full w-full border-0 opacity-60 grayscale invert"
          />

          <div className="absolute left-6 top-6 rounded-2xl bg-black/75 p-5 backdrop-blur">
            <p className="text-sm font-black text-white">Leutkirch im Allgäu</p>
            <p className="mt-1 text-xs text-stone-400">Germany</p>
            <p className="mt-3 text-xs font-bold text-cyan-300">
              Open to remote, hybrid and nearby onsite roles
            </p>
          </div>

          <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-cyan-300/20">
            <div className="h-7 w-7 rounded-full bg-cyan-300 shadow-[0_0_0_12px_rgba(103,232,249,0.12)]" />
          </div>
        </div>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="mt-8 rounded-3xl border border-white/10 bg-[#252525] p-7 shadow-2xl shadow-black/20"
      >
        <h3 className="text-2xl font-extrabold text-white">Contact Form</h3>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <input
            type="text"
            placeholder="Full Name"
            className="rounded-2xl border border-white/10 bg-[#1b1b1b] px-5 py-4 text-sm text-white outline-none transition placeholder:text-stone-600 focus:border-cyan-300"
          />

          <input
            type="email"
            placeholder="Email Address"
            className="rounded-2xl border border-white/10 bg-[#1b1b1b] px-5 py-4 text-sm text-white outline-none transition placeholder:text-stone-600 focus:border-cyan-300"
          />
        </div>

        <textarea
          rows="6"
          placeholder="Your Message"
          className="mt-5 w-full resize-none rounded-2xl border border-white/10 bg-[#1b1b1b] px-5 py-4 text-sm text-white outline-none transition placeholder:text-stone-600 focus:border-cyan-300"
        />

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-stone-500">
            {" "}
            Have a role, project, or collaboration idea in mind? Send me a
            message.
          </p>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-2xl border border-cyan-300/60 px-6 py-3 text-sm font-black text-cyan-300 transition hover:-translate-y-1 hover:bg-cyan-300 hover:text-[#111]"
          >
            <HiOutlinePaperAirplane />
            Send Message
          </button>
        </div>
      </motion.form>
    </section>
  );
}

export default Contact;
