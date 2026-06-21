import { useState } from "react";
import { HiOutlinePaperAirplane } from "react-icons/hi2";
import SectionTitle from "./SectionTitle";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState({
    type: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleInputChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsSubmitting(true);
    setFormStatus({
      type: "",
      message: "",
    });

    const finalMessage = formData.subject
      ? `Subject: ${formData.subject}\n\n${formData.message}`
      : formData.message;

    try {
      const response = await fetch("http://localhost:8000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: finalMessage,
        }),
      });

      if (!response.ok) {
        throw new Error("Message could not be sent.");
      }

      setFormStatus({
        type: "success",
        message: "Thank you. Your message has been sent successfully.",
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setFormStatus({
        type: "error",
        message:
          "Sorry, something went wrong. Please contact me directly by email.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section>
      <SectionTitle label="Contact" title="Contact" />

      <div className="mt-10">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#252525]">
          <iframe
            title="Leutkirch im Allgäu map"
            src="https://www.google.com/maps?q=Leutkirch%20im%20Allg%C3%A4u%2C%20Germany&output=embed"
            className="h-[400px] w-full border-0 grayscale"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <h3 className="mt-8 text-2xl font-extrabold text-white">
          Contact Form
        </h3>

        <form onSubmit={handleSubmit} className="mt-6">
          <div className="grid gap-5 md:grid-cols-2">
            <input
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Full name"
              className="rounded-2xl border border-white/10 bg-[#1f1f1f] px-6 py-4 text-sm font-semibold text-white outline-none transition placeholder:text-stone-500 focus:border-cyan-300"
            />

            <input
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email address"
              className="rounded-2xl border border-white/10 bg-[#1f1f1f] px-6 py-4 text-sm font-semibold text-white outline-none transition placeholder:text-stone-500 focus:border-cyan-300"
            />
          </div>

          <textarea
            name="message"
            required
            rows="7"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Your message"
            className="mt-5 w-full resize-none rounded-2xl border border-white/10 bg-[#1f1f1f] px-6 py-4 text-sm font-semibold text-white outline-none transition placeholder:text-stone-500 focus:border-cyan-300"
          />

          {formStatus.message && (
            <div
              className={`mt-5 rounded-2xl border px-5 py-4 text-sm font-bold ${
                formStatus.type === "success"
                  ? "border-cyan-300/30 bg-cyan-300/10 text-cyan-300"
                  : "border-red-400/30 bg-red-400/10 text-red-300"
              }`}
            >
              {formStatus.message}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl border border-cyan-300/70 px-5 py-4 text-sm font-extrabold text-cyan-300 transition hover:bg-cyan-300 hover:text-[#111] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <HiOutlinePaperAirplane />
            {isSubmitting ? "Sending..." : "Send message"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
