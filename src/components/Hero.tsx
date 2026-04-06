import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { scrollToSection } from "@/lib/scroll";
import heroCrystals from "@/assets/hero-crystals.jpg";
import heroLeaningGirl from "@/assets/hero-leaning-girl.webp";
import mascot from "@/assets/mascot.png";
import appMockup from "@/assets/app-mockup.png";
import logo from "/logo.png";

export default function Hero() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const openApp = () => {
    if (!user) {
      toast.info("Please sign in to open N8.");
      navigate("/auth");
      return;
    }
    navigate("/app");
  };

  return (
    <section className="relative min-h-screen overflow-hidden" style={{ background: "linear-gradient(180deg, #1a1b1e 0%, #2b2c30 100%)" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.3 }}>
        <img src={heroCrystals} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>

      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 40px", position: "relative", zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img src={logo} alt="N8 logo" style={{ width: 40, height: 40 }} />
          <span style={{ fontSize: 24, fontWeight: 900, color: "#f2f3f5" }}>N8</span>
        </div>
        <div style={{ display: "flex", gap: 32 }}>
          {[
            { label: "Download", id: "download" },
            { label: "Nitro", id: "nitro" },
            { label: "Discover", id: "discover" },
            { label: "Safety", id: "safety" },
            { label: "Support", id: "safety" },
          ].map((link) => (
            <button
              key={link.label}
              type="button"
              onClick={() => scrollToSection(link.id, navigate)}
              style={{ color: "#949ba4", textDecoration: "none", fontSize: 16, background: "transparent", border: "none", cursor: "pointer" }}
            >
              {link.label}
            </button>
          ))}
        </div>
        <button
          onClick={openApp}
          style={{ padding: "10px 20px", borderRadius: 999, background: "#f2f3f5", color: "#1a1b1e", border: "none", fontWeight: 600, cursor: "pointer" }}
        >
          Open N8
        </button>
      </nav>

      <div style={{ position: "relative", zIndex: 10, padding: "80px 24px 120px", textAlign: "center" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
            <div>
              <h1 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 900, lineHeight: 1.1, color: "#f2f3f5", marginBottom: 24 }}>
                GROUP CHAT
                <br />
                <span style={{ background: "linear-gradient(135deg, #5865F2, #9b59b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  THAT&apos;S ALL FUN & GAMES
                </span>
              </h1>
              <p style={{ fontSize: 20, color: "#949ba4", marginBottom: 40, maxWidth: 500 }}>
                N8 is great for playing games and chilling with friends, or even building a worldwide community. Customize your own space to talk, play, and hang out.
              </p>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
                <button style={{ padding: "14px 28px", borderRadius: 999, background: "#f2f3f5", color: "#1a1b1e", border: "none", fontWeight: 600, fontSize: 16, cursor: "pointer" }}>
                  Download our app
                </button>
                <button
                  onClick={openApp}
                  style={{ padding: "14px 28px", borderRadius: 999, background: "#5865F2", color: "white", border: "none", fontWeight: 600, fontSize: 16, cursor: "pointer" }}
                >
                  Open N8 in your browser
                </button>
              </div>
            </div>
            <div style={{ position: "relative" }}>
              <img src={heroLeaningGirl} alt="Leaning girl" style={{ position: "absolute", left: -80, top: -40, width: 320, objectFit: "contain" }} />
              <img src={appMockup} alt="N8 app" style={{ width: "100%", maxWidth: 500, borderRadius: 16, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" }} />
              <img src={mascot} alt="Mascot" style={{ position: "absolute", bottom: -30, left: -30, width: 160, animation: "float 3s ease-in-out infinite" }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
