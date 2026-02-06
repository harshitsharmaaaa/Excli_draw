"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Users, ArrowRight, Sparkles } from "lucide-react";

export default function Home() {
  const [roomId, setRoomId] = useState("");
  const router = useRouter();

  const handleJoin = () => {
    router.push(`/room/${roomId}`);
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#030712] text-white">

      <div className="grid-bg" />
      <div className="noise-bg" />

      {/* Ghost drawing */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none">
        <path d="M100 300 Q 500 50 900 350" className="sketch-path" />
        <path d="M200 100 Q 800 500 1200 200" className="sketch-path delay-2" />
        <path d="M50 500 Q 600 200 1000 600" className="sketch-path delay-4" />
      </svg>

      {/* Ambient glow */}
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-purple-600/20 blur-[120px]" />
      <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]" />

      <div className="relative z-10 w-full max-w-md px-6 text-center">
        <div className="mb-10 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-purple-300 backdrop-blur-md">
            <Sparkles size={14} />
            Real-time Collaborative Canvas
          </div>

          <h1 className="text-6xl font-black tracking-tighter">
            Excli
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Draw
            </span>
          </h1>

          <p className="text-gray-400 font-medium text-lg">
            Sketch, brainstorm, and build together.
          </p>
        </div>

        {/* Card */}
        <div className="group relative">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 opacity-20 blur transition duration-1000 group-hover:opacity-40" />

          <div className="relative flex flex-col gap-5 rounded-2xl border border-white/10 bg-[#0b0f1a]/80 p-8 backdrop-blur-2xl shadow-2xl transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.02]">

            <div className="text-left">
              <label className="mb-2 ml-1 block text-sm font-semibold text-gray-300">
                Join or Create a Room
              </label>

              <div className="relative">
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleJoin()}
                  placeholder="Enter Room ID"
                  className="w-full rounded-xl border border-white/5 bg-black/40 py-4 pl-12 pr-4 text-white placeholder-gray-600 outline-none ring-purple-500/50 focus:ring-2"
                />
              </div>
            </div>

            <button
              onClick={handleJoin}
              disabled={!roomId.trim()}
              className="cta-btn flex w-full items-center justify-center gap-2 rounded-xl py-4 font-bold text-white disabled:opacity-50"
            >
              Join Room
              <Pencil size={18} />
            </button>

            <div className="mt-2 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-gray-500">
              <span className="h-[1px] w-1/4 bg-white/10" />
              <span>No Login Required</span>
              <span className="h-[1px] w-1/4 bg-white/10" />
            </div>
          </div>
        </div>

        <p className="mt-8 flex items-center justify-center gap-1.5 text-sm text-gray-500">
          Share the ID with a friend to draw together
          <ArrowRight size={14} />
        </p>
      </div>
    </div>
  );
}