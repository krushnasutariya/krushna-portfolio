import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlinePaperAirplane,
  HiOutlineSparkles,
  HiOutlineUser,
  HiOutlineXMark,
} from "react-icons/hi2";
import BrandLogo from "./BrandLogo";

function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("closed");
  const [messages, setMessages] = useState([
    {
      sender: "assistant",
      message:
        "Hi, I am Krushna's AI assistant. Ask me about skills, projects, BMW internship, cloud work, thesis, or contact details.",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const socket = new WebSocket("ws://localhost:8000/ws/chat");
    socketRef.current = socket;

    setConnectionStatus("connecting");

    socket.onopen = () => {
      setConnectionStatus("connected");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          sender: data.sender,
          message: data.message,
        },
      ]);
    };

    socket.onerror = () => {
      setConnectionStatus("error");
    };

    socket.onclose = () => {
      setConnectionStatus("closed");
    };

    return () => {
      socket.close();
    };
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSendMessage(event) {
    event.preventDefault();

    const cleanMessage = inputMessage.trim();

    if (!cleanMessage || connectionStatus !== "connected") {
      return;
    }

    const userMessage = {
      sender: "user",
      message: cleanMessage,
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);

    socketRef.current.send(
      JSON.stringify({
        message: cleanMessage,
        history: updatedMessages.slice(-8),
      }),
    );

    setInputMessage("");
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-6 z-50 w-[calc(100vw-48px)] max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-[#1f1f1f] shadow-2xl shadow-black/50"
          >
            <div className="flex items-center justify-between border-b border-white/10 bg-[#252525] p-5">
              <div className="flex items-center gap-3">
                <BrandLogo size="xs" />

                <div>
                  <h3 className="text-sm font-extrabold text-white">
                    Krushna AI Assistant
                  </h3>
                  <p className="mt-1 text-xs font-semibold text-stone-400">
                    Ask about skills, projects, experience
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-stone-300 transition hover:border-cyan-300 hover:text-cyan-300"
              >
                <HiOutlineXMark />
              </button>
            </div>

            {connectionStatus === "error" && (
              <div className="border-b border-red-400/20 bg-red-400/10 px-5 py-3 text-xs font-semibold text-red-300">
                Assistant is temporarily unavailable.
              </div>
            )}

            <div className="h-80 space-y-4 overflow-y-auto p-5">
              {messages.map((chatMessage, index) => (
                <div
                  key={`${chatMessage.sender}-${index}`}
                  className={`flex items-end gap-2 ${
                    chatMessage.sender === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  {chatMessage.sender === "assistant" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-300/10 text-sm text-cyan-300">
                      <HiOutlineSparkles />
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                      chatMessage.sender === "user"
                        ? "bg-cyan-300 text-[#111]"
                        : "bg-[#121212] text-stone-200"
                    }`}
                  >
                    {chatMessage.message}
                  </div>

                  {chatMessage.sender === "user" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm text-stone-300">
                      <HiOutlineUser />
                    </div>
                  )}
                </div>
              ))}

              <div ref={messagesEndRef} />
            </div>

            <form
              onSubmit={handleSendMessage}
              className="flex gap-3 border-t border-white/10 p-4"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(event) => setInputMessage(event.target.value)}
                placeholder="Ask about Krushna..."
                className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-[#121212] px-4 py-3 text-sm text-white outline-none transition placeholder:text-stone-600 focus:border-cyan-300"
              />

              <button
                type="submit"
                disabled={connectionStatus !== "connected"}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/60 text-cyan-300 transition hover:bg-cyan-300 hover:text-[#111] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <HiOutlinePaperAirplane />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setIsOpen((previousValue) => !previousValue)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-3xl border border-cyan-300/50 bg-[#1f1f1f] text-3xl text-cyan-300 shadow-2xl shadow-black/50 transition hover:bg-cyan-300 hover:text-[#111]"
      >
        <HiOutlineChatBubbleLeftRight />
      </motion.button>
    </>
  );
}

export default ChatAssistant;
