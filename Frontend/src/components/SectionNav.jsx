function SectionNav({ activeSection, setActiveSection }) {
  const navItems = [
    { id: "about", name: "About" },
    { id: "resume", name: "Resume" },
    { id: "skills", name: "Skills" },
    { id: "portfolio", name: "Portfolio" },
    { id: "contact", name: "Contact" },
  ];

  return (
    <nav className="absolute right-0 top-0 z-20 hidden overflow-hidden rounded-bl-[22px] border-b border-l border-white/10 bg-[#2a2a2a] md:flex">
      {navItems.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => setActiveSection(item.id)}
          className={`px-5 py-[17px] text-[15px] font-extrabold tracking-tight transition ${
            activeSection === item.id
              ? "text-cyan-300"
              : "text-stone-200 hover:text-cyan-300"
          }`}
        >
          {item.name}
        </button>
      ))}
    </nav>
  );
}

export default SectionNav;
