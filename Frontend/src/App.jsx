import { AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import BrandLogo from "./components/BrandLogo";
import ChatAssistant from "./components/ChatAssistant";
import MainContent from "./components/MainContent";
import ProfileSidebar from "./components/ProfileSidebar";
import SplashScreen from "./components/SplashScreen";

function App() {
  const [activeSection, setActiveSection] = useState("about");
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1700);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>{showSplash && <SplashScreen />}</AnimatePresence>

      <main className="min-h-screen bg-[#111111] px-5 py-9 text-white">
        <div className="mx-auto grid max-w-7xl gap-7 lg:grid-cols-[300px_1fr]">
          <ProfileSidebar />
          <MainContent
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
        </div>

        <footer className="mx-auto mt-6 flex max-w-7xl items-center justify-center gap-3 text-xs font-semibold text-stone-500">
          <BrandLogo size="xs" />
          <span>© 2026 Krushna Sutariya | All Rights Reserved</span>
        </footer>

        <ChatAssistant />
      </main>
    </>
  );
}

export default App;
