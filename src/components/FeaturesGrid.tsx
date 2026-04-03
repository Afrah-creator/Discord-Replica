import { motion } from "framer-motion";
import {
  MessageSquare, Users, Gamepad2, Video, Shield, Zap,
  Bot, Sticker, Globe, Mic, Hash, Bell
} from "lucide-react";

const features = [
  { icon: MessageSquare, title: "Text Channels", desc: "Organized conversations by topic. Pin messages, share files, and search history." },
  { icon: Mic, title: "Voice Channels", desc: "Drop-in voice rooms. No ringing, no calling — just hop in and talk." },
  { icon: Video, title: "Video & Screen Share", desc: "Stream your screen or go live. Watch movies, share presentations, or game together." },
  { icon: Users, title: "Roles & Permissions", desc: "Assign custom roles with granular permissions for every channel and feature." },
  { icon: Bot, title: "Bots & Apps", desc: "Automate tasks, play music, moderate, or build your own custom integrations." },
  { icon: Sticker, title: "Emoji & Stickers", desc: "Express yourself with custom server emoji, animated stickers, and soundboard clips." },
  { icon: Hash, title: "Threads & Forums", desc: "Keep discussions focused with threads. Create forum channels for organized Q&A." },
  { icon: Globe, title: "Server Discovery", desc: "Get found by millions. List your server in our public discovery directory." },
  { icon: Gamepad2, title: "Rich Presence", desc: "Show what you're playing, listening to, or working on right in your status." },
  { icon: Bell, title: "Smart Notifications", desc: "Fine-grained notification controls per server, channel, or even per thread." },
  { icon: Shield, title: "AutoMod", desc: "AI-powered content moderation catches spam, slurs, and harmful links automatically." },
  { icon: Zap, title: "Instant Invites", desc: "Share a link and anyone can join. Set expiry and usage limits for safety." },
];

const FeaturesGrid = () => {
  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
            PACKED WITH FEATURES
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to run an awesome community — all in one place.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="p-5 rounded-xl bg-background border border-border hover:border-primary/30 transition-colors group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
            >
              <div className="w-10 h-10 rounded-lg gradient-blurple flex items-center justify-center mb-3 group-hover:glow-blurple transition-shadow">
                <f.icon className="text-primary-foreground" size={18} />
              </div>
              <h3 className="text-foreground font-bold text-sm mb-1.5">{f.title}</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
