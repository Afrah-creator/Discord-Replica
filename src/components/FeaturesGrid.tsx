import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  MessageSquare, Users, Gamepad2, Video, Shield, Zap,
  Bot, Sticker, Globe, Mic, Hash, Bell
} from "lucide-react";
import sectionMultiplatform from "@/assets/section-multiplatform.jpg";
import heroCommunity from "@/assets/hero-community.jpg";
import sectionGamingChat from "@/assets/section-gaming-chat.jpg";
import sectionVideoCall from "@/assets/section-video-call.jpg";
import sectionRoles from "@/assets/section-roles-permissions.jpg";
import sectionEmoji from "@/assets/section-emoji-stickers.jpg";
import sectionForums from "@/assets/section-forums.jpg";
import sectionBots from "@/assets/section-bots-apps.jpg";
import featureNotifications from "@/assets/feature-notifications.jpg";

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

const featureShowcase = [
  { src: sectionGamingChat, alt: "Text & Gaming Chat", caption: "Rich text channels with reactions, threads, and embedded media" },
  { src: sectionVideoCall, alt: "Voice & Video", caption: "Crystal-clear voice and HD video with screen sharing" },
  { src: sectionRoles, alt: "Roles & Permissions", caption: "Granular control over who can do what in your server" },
  { src: sectionEmoji, alt: "Custom Emoji & Stickers", caption: "Express yourself with hundreds of custom emoji and stickers" },
  { src: sectionForums, alt: "Forum Channels", caption: "Organized discussions with threads, tags, and sorting" },
  { src: sectionBots, alt: "Bots & Integrations", caption: "Extend your server with powerful bots and custom apps" },
  { src: featureNotifications, alt: "Smart Notifications", caption: "Fine-tuned notification controls for every channel" },
];

const FeaturesGrid = () => {
  return (
    <section id="features" className="py-24 bg-card">
      <div className="container mx-auto px-6">
        {/* Hero community image */}
        <motion.div className="max-w-5xl mx-auto mb-14" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <img src={heroCommunity} alt="N8 Community" className="w-full rounded-xl shadow-2xl" loading="lazy" width={1280} height={800} />
        </motion.div>

        <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">PACKED WITH FEATURES</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to run an awesome community — all in one place.
          </p>
        </motion.div>

        {/* Feature cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 max-w-6xl mx-auto mb-16">
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

        {/* Feature showcase gallery */}
        <div className="max-w-5xl mx-auto space-y-12 mb-16">
          {featureShowcase.map((img, i) => (
            <motion.div
              key={img.alt}
              className={`grid lg:grid-cols-5 gap-6 items-center`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className={`lg:col-span-3 ${i % 2 !== 0 ? "lg:order-2" : ""}`}>
                <img src={img.src} alt={img.alt} className="w-full rounded-xl shadow-xl" loading="lazy" width={1280} height={800} />
              </div>
              <div className={`lg:col-span-2 ${i % 2 !== 0 ? "lg:order-1" : ""}`}>
                <h3 className="text-xl font-black text-foreground mb-2">{img.alt.toUpperCase()}</h3>
                <p className="text-muted-foreground leading-relaxed">{img.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Multiplatform image */}
        <motion.div className="max-w-4xl mx-auto" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <img src={sectionMultiplatform} alt="N8 on desktop and mobile" className="w-full rounded-xl shadow-2xl" loading="lazy" width={1280} height={800} />
          <p className="text-center text-muted-foreground mt-4 text-sm">Available on desktop, mobile, and your browser — your chats sync everywhere.</p>
        </motion.div>

        <motion.div className="text-center mt-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <Link
            to="/app"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full gradient-blurple text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            Try It Now — Free
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
