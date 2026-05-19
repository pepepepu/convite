"use client";

import { useState, useEffect } from "react";

export default function InvitePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [particles, setParticles] = useState<
    Array<{
      id: number;
      left: string;
      duration: string;
      delay: string;
      size: string;
      type: string;
    }>
  >([]);

  useEffect(() => {
    const generatedParticles = Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      duration: `${Math.random() * 4 + 3}s`,
      delay: `${Math.random() * 5}s`,
      size: `${Math.random() * 4 + 2}px`,
      type: Math.random() > 0.5 ? "circle" : "rect",
    }));
    setParticles(generatedParticles);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      if (res.ok) {
        setStatus("success");
        setName("");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..600;1,9..144,300..600&family=Great+Vibes&display=swap');
        
        .font-cursive { font-family: 'Great Vibes', cursive; }
        .font-serif { font-family: 'Fraunces', serif; }
        
        @keyframes float {
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
        }
        
        @keyframes glow {
          0%, 100% { text-shadow: 0 0 10px rgba(212,175,55,0.4), 0 0 20px rgba(212,175,55,0.2); }
          50% { text-shadow: 0 0 15px rgba(212,175,55,0.7), 0 0 30px rgba(212,175,55,0.4); }
        }
        
        .gold-glow { animation: glow 3s infinite ease-in-out; }
        
        .particle {
          position: absolute;
          background: linear-gradient(135deg, #FFDF73 0%, #D4AF37 50%, #996515 100%);
          box-shadow: 0 0 6px rgba(212,175,55,0.8);
          top: -20px;
          animation: float linear infinite;
        }

        .input-gold:-webkit-autofill,
        .input-gold:-webkit-autofill:hover, 
        .input-gold:-webkit-autofill:focus, 
        .input-gold:-webkit-autofill:active{
            -webkit-box-shadow: 0 0 0 30px black inset !important;
            -webkit-text-fill-color: #D4AF37 !important;
        }
      `,
        }}
      />
      <main className="min-h-screen bg-[#050505] relative flex items-center justify-center p-4 sm:p-6 overflow-hidden selection:bg-[#D4AF37] selection:text-black">
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {particles.map((p) => (
            <div
              key={p.id}
              className="particle"
              style={{
                left: p.left,
                width: p.size,
                height: p.type === "rect" ? `calc(${p.size} * 1.5)` : p.size,
                borderRadius: p.type === "circle" ? "50%" : "2px",
                animationDuration: p.duration,
                animationDelay: p.delay,
              }}
            />
          ))}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37] opacity-[0.03] rounded-full blur-[100px]"></div>
        </div>

        <div className="relative z-10 w-full max-w-[420px] rounded-2xl p-8 sm:p-10 border border-[#D4AF37]/20 bg-black/40 backdrop-blur-xl shadow-[0_0_40px_rgba(212,175,55,0.05)] flex flex-col items-center">
          <h1 className="text-[#D4AF37] font-cursive text-7xl sm:text-8xl mt-4 mb-2 tracking-wide gold-glow">
            Cléa
          </h1>
          <h2 className="text-[#D4AF37] font-serif text-2xl sm:text-3xl italic mb-12 font-light">
            50 anos
          </h2>

          <p className="text-[#D4AF37] font-serif text-[10px] sm:text-xs uppercase tracking-[0.3em] mb-8 text-center opacity-80">
            Venha comemorar comigo!
          </p>

          <div className="flex items-center justify-center gap-6 text-[#D4AF37] font-serif mb-10">
            <span className="text-5xl sm:text-6xl font-light">25</span>
            <div className="flex flex-col text-sm text-left justify-center uppercase tracking-widest opacity-90">
              <span>Julho</span>
              <span>2026</span>
            </div>
            <div className="w-[1px] h-14 bg-gradient-to-b from-transparent via-[#D4AF37]/50 to-transparent"></div>
            <div className="flex flex-col text-sm text-left justify-center uppercase tracking-widest opacity-90">
              <span>Sábado</span>
              <span>20h00</span>
            </div>
          </div>

          <div className="text-center text-[#D4AF37] font-serif mb-10 tracking-wide">
            <p className="text-base sm:text-lg mb-1">
              Salão de festa Vila Mineira{" "}
            </p>
            <p className="text-xs sm:text-sm opacity-70 uppercase tracking-widest">
              Rua Geny da Silva Dias nº1519 - Bugio
            </p>
          </div>

          <p className="text-[#D4AF37] font-cursive text-3xl sm:text-4xl mb-10 text-center gold-glow">
            Conto com sua presença!
          </p>

          <div className="w-full">
            {status === "success" ? (
              <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 text-[#D4AF37] p-8 rounded-xl text-center backdrop-blur-sm">
                <div className="w-16 h-16 rounded-full border border-[#D4AF37]/30 flex items-center justify-center mx-auto mb-6 bg-[#D4AF37]/10">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-serif tracking-widest mb-3 uppercase">
                  Confirmado
                </h3>
                <p className="text-[#D4AF37]/60 text-xs font-serif leading-relaxed mb-6">
                  Sua presença foi registrada com sucesso. Aguardamos você.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-[10px] text-[#D4AF37]/50 hover:text-[#D4AF37] transition-all font-serif uppercase tracking-[0.2em] border-b border-[#D4AF37]/30 hover:border-[#D4AF37] pb-1"
                >
                  Nova Confirmação
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 w-full">
                <div className="relative">
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome completo"
                    className="input-gold w-full px-0 py-3 bg-transparent border-b border-[#D4AF37]/30 text-[#D4AF37] placeholder-[#D4AF37]/30 focus:outline-none focus:border-[#D4AF37] transition-colors font-serif text-center text-sm tracking-widest"
                  />
                </div>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Seu melhor email"
                    className="input-gold w-full px-0 py-3 bg-transparent border-b border-[#D4AF37]/30 text-[#D4AF37] placeholder-[#D4AF37]/30 focus:outline-none focus:border-[#D4AF37] transition-colors font-serif text-center text-sm tracking-widest"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full group relative overflow-hidden bg-transparent border border-[#D4AF37] hover:bg-[#D4AF37] text-[#D4AF37] hover:text-black font-serif uppercase tracking-[0.2em] py-4 px-4 rounded-none transition-all duration-500 disabled:opacity-50 flex justify-center items-center mt-8 text-xs"
                >
                  {status === "loading" ? (
                    <svg
                      className="animate-spin h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    "Confirmar Presença"
                  )}
                </button>
                {status === "error" && (
                  <p className="text-red-400/80 text-xs text-center mt-4 font-serif tracking-wider">
                    Não foi possível enviar. Tente novamente.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
