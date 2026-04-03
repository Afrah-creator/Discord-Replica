import { motion } from "framer-motion";
import { Download, ArrowRight } from "lucide-react";
import heroCrystals from "@/assets/hero-crystals.jpg";
import mascot from "@/assets/mascot.png";
import appMockup from "@/assets/app-mockup.png";
import logo from "/logo.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden gradient-hero">
      {/* Background crystal image */}
      <div className="absolute inset-0 opacity-30">
        <img src={heroCrystals} alt="" className="w-full h-full object-cover" width={1920} height={1080} />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-16 h-16 rounded-full gradient-blurple opacity-20 animate-float blur-xl" />
      <div className="absolute top-40 right-20 w-24 h-24 rounded-full gradient-blurple opacity-15 animate-float-slow blur-2xl" />
      <div className="absolute bottom-40 left-1/4 w-12 h-12 rounded-full gradient-blurple opacity-25 animate-pulse-glow blur-lg" />

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-10 py-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-blurple flex items-center justify-center font-bold text-primary-foreground text-sm">
            N8
          </div>
          <span className="font-bold text-lg text-foreground">N8</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">Download</a>
          <a href="#" className="hover:text-foreground transition-colors">Nitro</a>
          <a href="#" className="hover:text-foreground transition-colors">Discover</a>
          <a href="#" className="hover:text-foreground transition-colors">Safety</a>
          <a href="#" className="hover:text-foreground transition-colors">Support</a>
        </div>
        <a
          href="/app"
          className="px-4 py-2 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Open N8 in your browser
        </a>
      </nav>

      {/* Hero content */}
      <div className="relative z-10 container mx-auto px-6 pt-16 md:pt-24 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
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
              <a
                href="#"
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-medium hover:opacity-90 transition-opacity"
              >
                <Download size={18} />
                Download for Windows
              </a>
              <a
                href="/app"
                className="flex items-center gap-2 px-6 py-3 rounded-full gradient-blurple text-primary-foreground font-medium hover:opacity-90 transition-opacity"
              >
                Open N8 in your browser
                <ArrowRight size={18} />
              </a>
            </div>
          </motion.div>

          {/* Right - Mockup + Mascot */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img
              src={appMockup}
              alt="N8 app dashboard preview"
              className="w-full max-w-lg mx-auto drop-shadow-2xl"
              width={1280}
              height={800}
            />
            <motion.img
              src={mascot}
              alt="N8 mascot"
              className="absolute -bottom-8 -left-8 w-32 h-32 md:w-40 md:h-40 drop-shadow-xl"
              width={512}
              height={512}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
