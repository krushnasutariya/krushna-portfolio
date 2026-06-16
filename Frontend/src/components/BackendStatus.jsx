import { useEffect, useState } from "react";
import { HiOutlineServerStack } from "react-icons/hi2";

function BackendStatus() {
  const [status, setStatus] = useState("checking");
  const [message, setMessage] = useState("Checking backend connection...");

  useEffect(() => {
    async function checkBackend() {
      try {
        const response = await fetch("http://localhost:8000/health");
        const data = await response.json();

        if (data.status === "ok") {
          setStatus("connected");
          setMessage("Backend connected with FastAPI");
        } else {
          setStatus("error");
          setMessage("Backend replied, but status is not OK");
        }
      } catch (error) {
        setStatus("error");
        setMessage("Backend not connected");
      }
    }

    checkBackend();
  }, []);

  return (
    <div className="mt-8 rounded-3xl border border-white/10 bg-[#252525] p-5">
      <div className="flex items-center gap-4">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl text-xl ${
            status === "connected"
              ? "bg-cyan-300/10 text-cyan-300"
              : status === "error"
                ? "bg-red-400/10 text-red-400"
                : "bg-stone-500/10 text-stone-400"
          }`}
        >
          <HiOutlineServerStack />
        </div>

        <div>
          <p className="text-sm font-bold text-white">API Status</p>
          <p
            className={`mt-1 text-sm ${
              status === "connected"
                ? "text-cyan-300"
                : status === "error"
                  ? "text-red-400"
                  : "text-stone-400"
            }`}
          >
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}

export default BackendStatus;
