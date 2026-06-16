import { AnimatePresence, motion } from "motion/react";
import About from "./About";
import Contact from "./Contact";
import Portfolio from "./Portfolio";
import Resume from "./Resume";
import SectionNav from "./SectionNav";
import Skills from "./Skills";

function MainContent({ activeSection, setActiveSection }) {
  const renderSection = () => {
    if (activeSection === "about") return <About />;
    if (activeSection === "resume") return <Resume />;
    if (activeSection === "skills") return <Skills />;
    if (activeSection === "portfolio") return <Portfolio />;
    if (activeSection === "contact") return <Contact />;

    return <About />;
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="premium-glow-card relative overflow-hidden p-[1px] shadow-2xl shadow-black/40"
    >
      <div className="relative min-h-[760px] overflow-hidden rounded-[27px] bg-[#1f1f1f]">
        <SectionNav
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        <div className="p-7 pt-22 md:p-10 md:pt-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -22 }}
              transition={{ duration: 0.35 }}
            >
              {renderSection()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}

export default MainContent;
