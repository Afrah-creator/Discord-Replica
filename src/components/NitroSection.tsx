import { motion } from "framer-motion";
import { Sparkles, Upload, SmilePlus, Palette, Crown, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import sectionNitro from "@/assets/section-nitro.jpg";

const perks = [
  { icon: SmilePlus, label: "Custom Emoji Anywhere" },
  { icon: Upload, label: "Bigger File Uploads" },
  { icon: Palette, label: "Special Profile Badge" },
  { icon: Crown, label: "Server Boosts" },
  { icon: Rocket, label: "HD Video Streaming" },
  { icon: Sparkles, label: "Animated Avatars" },
];

const NitroSection = () => {
  return (
    <section id="nitro" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0">
        <img src={sectionNitro} alt="" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-n8-yellow/20 text-n8-yellow text-sm font-bold mb-4">
            <Sparkles size={16} />
            PREMIUM
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-foreground mb-4">
            UNLOCK MORE WITH <span className="text-gradient">N8 NITRO</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Boost your N8 experience with bigger uploads, HD streaming, custom emoji, animated avatars, and special profile badges.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-12">
          {perks.map((perk, i) => (
            <motion.div
              key={perk.label}
              className="glass rounded-xl p-5 text-center hover:border-primary/40 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
            >
              <perk.icon className="mx-auto mb-3 text-n8-yellow" size={28} />
              <p className="text-foreground text-sm font-semibold">{perk.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div className="flex flex-wrap justify-center gap-4" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Link to="/auth" className="px-8 py-3 rounded-full gradient-blurple text-primary-foreground font-medium hover:opacity-90 transition-opacity">
            Subscribe to Nitro
          </Link>
          <Link to="/#features" className="px-8 py-3 rounded-full border border-border text-foreground font-medium hover:bg-secondary transition-colors">
            Learn More
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default NitroSection;
