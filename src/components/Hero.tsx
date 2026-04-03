import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, UserPlus, ArrowRight, Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import heroCrystals from "@/assets/hero-crystals.jpg";
import mascot from "@/assets/mascot.png";
import appMockup from "@/assets/app-mockup.png";
import logo from "/logo.png";
import ServerModal from "@/components/ServerModal";
import FriendsModal from "@/components/FriendsModal";

const navLinks = [
  { label: "Discover", href: "/#discover" },
  { label: "Safety", href: "/#safety" },
  { label: "Nitro", href: "/#nitro" },
  { label: "Features", href: "/#features" },
  { label: "Support", href: "/#safety" },
];

const Hero = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [serverModalOpen, setServerModalOpen] = useState(false);
  const [friendsModalOpen, setFriendsModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleCreateServer = () => {
    if (!user) { navigate("/auth"); return; }
    setServerModalOpen(true);
  };

  const handleAddFriends = () => {
    if (!user) { navigate("/auth"); return; }
    setFriendsModalOpen(true);
  };

  return (
    <section className="relative min-h-screen overflow-hidden gradient-hero">
      <div className="absolute inset-0 opacity-30">
        <img src={heroCrystals} alt="" className="w-full h-full object-cover" width={1920} height={1080} />
      </div>

      <div className="absolute top-20 left-10 w-16 h-16 rounded-full gradient-blurple opacity-20 animate-float blur-xl" />
      <div className="absolute top-40 right-20 w-24 h-24 rounded-full gradient-blurple opacity-15 animate-float-slow blur-2xl" />
      <div className="absolute bottom-40 left-1/4 w-12 h-12 rounded-full gradient-blurple opacity-25 animate-pulse-glow blur-lg" />

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-10 py-4">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="N8 logo" className="w-10 h-10" width={40} height={40} />
          <span className="font-extrabold text-xl text-foreground tracking-tight">N8</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="hover:text-foreground transition-colors">
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <Link to="/app" className="px-4 py-2 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity">
              Open N8
            </Link>
          ) : (
            <Link to="/auth" className="px-4 py-2 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity">
              Login
            </Link>
          )}
          {/* Mobile menu toggle */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-foreground">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          className="absolute top-16 left-0 right-0 z-20 bg-card border-b border-border md:hidden"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="px-6 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block text-foreground font-medium py-2 hover:text-blurple transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/app"
              className="block text-center py-2.5 rounded-full gradient-blurple text-primary-foreground font-medium mt-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Open N8
            </Link>
          </div>
        </motion.div>
      )}

      {/* Hero content */}
      <div className="relative z-10 container mx-auto px-6 pt-16 md:pt-24 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <h1 className="text-5xl md:text-7xl font-black text-foreground leading-[0.95] tracking-tight mb-6">
              GROUP CHAT
              <br />
              THAT'S ALL
              <br />
              <span className="text-gradient">FUN & GAMES</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mb-8 leading-relaxed">
              N8 is great for playing games and chilling with friends, or even building a worldwide community. Customize your own space to talk, play, and hang out.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleCreateServer}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-medium hover:opacity-90 transition-opacity"
              >
                <Plus size={18} />
                Create a Server
              </button>
              <button
                onClick={handleAddFriends}
                className="flex items-center gap-2 px-6 py-3 rounded-full gradient-blurple text-primary-foreground font-medium hover:opacity-90 transition-opacity"
              >
                <UserPlus size={18} />
                Add Friends
              </button>
            </div>
          </motion.div>

          <motion.div className="relative" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <img src={appMockup} alt="N8 app dashboard preview" className="w-full max-w-lg mx-auto drop-shadow-2xl" width={1280} height={800} />
            <motion.img
              src={mascot}
              alt="N8 mascot"
              className="absolute -bottom-8 -left-8 w-32 h-32 md:w-40 md:h-40 drop-shadow-xl"
              width={512} height={512}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </div>

      <ServerModal isOpen={serverModalOpen} onClose={() => setServerModalOpen(false)} />
      <FriendsModal isOpen={friendsModalOpen} onClose={() => setFriendsModalOpen(false)} />
    </section>
  );
};

export default Hero;
