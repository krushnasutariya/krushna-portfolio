import { useState } from "react";
import ChatAssistant from "./components/ChatAssistant";
import MainContent from "./components/MainContent";
import ProfileSidebar from "./components/ProfileSidebar";
function App() {
  const [activeSection, setActiveSection] = useState("about");

  return (
    <main className="min-h-screen bg-[#111111] px-5 py-9 text-white">
      <div className="mx-auto grid max-w-7xl gap-7 lg:grid-cols-[300px_1fr]">
        <ProfileSidebar />

        <MainContent
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      </div>

      <footer className="mt-7 text-center text-xs font-semibold text-stone-500">
        © 2026 Krushnaben Sutariya | All Rights Reserved
      </footer>
      <ChatAssistant />
    </main>
  );
}

export default App;
