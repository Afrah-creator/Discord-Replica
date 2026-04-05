import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Plus, UserPlus, ArrowRight, Users, MessageSquare, Shield } from "lucide-react";
import ctaBanner from "@/assets/cta-banner-bg.jpg";
import heroCommunity from "@/assets/hero-community.jpg";

const actions = [
  { icon: Plus, name: "Create a Server", desc: "Start your own community", href: "/auth", primary: true },
  { icon: UserPlus, name: "Add Friends", desc: "Find and connect with people", href: "/auth", primary: false },
  { icon: Users, name: "Join a Server", desc: "Use an invite code", href: "/auth", primary: false },
  { icon: MessageSquare, name: "Start Chatting", desc: "Send your first message", href: "/app", primary: false },
  { icon: Shield, name: "Stay Safe", desc: "Built-in moderation tools", href: "/#safety", primary: false },
  { icon: ArrowRight, name: "Open N8", desc: "Jump right in", href: "/app", primary: true },
];

const DownloadSection = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={ctaBanner} alt="" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/60" />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        {/* Community illustration */}
        <motion.div className="max-w-3xl mx-auto mb-12" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
          <img src={heroCommunity} alt="Join the N8 community" className="w-full rounded-xl shadow-2xl" loading="lazy" width={1280} height={800} />
        </motion.div>

        <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">GET STARTED WITH N8</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Create servers, add friends, and start chatting — all from your browser. No downloads needed.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {actions.map((a, i) => (
            <motion.div key={a.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
              <Link
                to={a.href}
                className={`flex flex-col items-center gap-3 p-6 rounded-xl border transition-all hover:scale-[1.03] ${
                  a.primary
                    ? "gradient-blurple border-transparent glow-blurple text-primary-foreground"
                    : "bg-card border-border hover:border-primary/30 text-foreground"
                }`}
              >
                <a.icon size={32} />
                <span className="font-bold text-sm">{a.name}</span>
                <span className="text-xs opacity-80">{a.desc}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;
