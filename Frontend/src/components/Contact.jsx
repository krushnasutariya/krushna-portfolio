import { motion } from "motion/react";
import { useState } from "react";
import { HiOutlinePaperAirplane } from "react-icons/hi2";
import BackendStatus from "./BackendStatus";
import SectionTitle from "./SectionTitle";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitStatus, setSubmitStatus] = useState("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  function handleInputChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setSubmitStatus("loading");
    setSubmitMessage("Sending message...");

    try {
      const response = await fetch("http://localhost:8000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Something went wrong");
      }

      setSubmitStatus("success");
      setSubmitMessage("Message sent successfully.");

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      setSubmitStatus("error");
      setSubmitMessage("Message could not be sent. Please check backend.");
    }
  }

  return (
    <section id="contact">
      <SectionTitle title="Let's Connect" />

      <BackendStatus />

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
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="mt-8 rounded-3xl border border-white/10 bg-[#252525] p-7 shadow-2xl shadow-black/20"
      >
        <h3 className="text-2xl font-extrabold text-white">Contact Form</h3>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Full Name"
            required
            className="rounded-2xl border border-white/10 bg-[#1b1b1b] px-5 py-4 text-sm text-white outline-none transition placeholder:text-stone-600 focus:border-cyan-300"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email Address"
            required
            className="rounded-2xl border border-white/10 bg-[#1b1b1b] px-5 py-4 text-sm text-white outline-none transition placeholder:text-stone-600 focus:border-cyan-300"
          />
        </div>

        <textarea
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          rows="6"
          placeholder="Your Message"
          required
          className="mt-5 w-full resize-none rounded-2xl border border-white/10 bg-[#1b1b1b] px-5 py-4 text-sm text-white outline-none transition placeholder:text-stone-600 focus:border-cyan-300"
        />

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <p
            className={`text-xs font-semibold ${
              submitStatus === "success"
                ? "text-cyan-300"
                : submitStatus === "error"
                  ? "text-red-400"
                  : "text-stone-500"
            }`}
          >
            {submitMessage || "Your message will be saved through FastAPI."}
          </p>

          <button
            type="submit"
            disabled={submitStatus === "loading"}
            className="inline-flex items-center gap-2 rounded-2xl border border-cyan-300/60 px-6 py-3 text-sm font-black text-cyan-300 transition hover:-translate-y-1 hover:bg-cyan-300 hover:text-[#111] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <HiOutlinePaperAirplane />
            {submitStatus === "loading" ? "Sending..." : "Send Message"}
          </button>
        </div>
      </motion.form>
    </section>
  );
}

export default Contact;
