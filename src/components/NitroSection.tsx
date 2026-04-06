import { motion } from "framer-motion";
import { Sparkles, Upload, SmilePlus, Palette, Crown, Rocket, Zap, Video } from "lucide-react";
import { Link } from "react-router-dom";
import sectionNitro from "@/assets/section-nitro.jpg";
import nitroPromo from "@/assets/section-nitro-promo.jpg";
import nitroAvatar from "@/assets/nitro-avatar-profile.jpg";
import nitroUpload from "@/assets/nitro-file-upload.jpg";
import nitroStreaming from "@/assets/nitro-hd-streaming.jpg";
import nitroEmoji from "@/assets/nitro-custom-emoji.jpg";
import nitroBoost from "@/assets/nitro-server-boost.jpg";

const perks = [
  { icon: SmilePlus, label: "Custom Emoji Anywhere" },
  { icon: Upload, label: "Bigger File Uploads" },
  { icon: Palette, label: "Special Profile Badge" },
  { icon: Crown, label: "Server Boosts" },
  { icon: Rocket, label: "HD Video Streaming" },
  { icon: Sparkles, label: "Animated Avatars" },
  { icon: Zap, label: "Super Reactions" },
  { icon: Video, label: "Custom Video Backgrounds" },
];

const showcaseImages = [
  { src: nitroAvatar, alt: "N8 Nitro Premium Profile & Badges", caption: "Stand out with animated avatars, profile banners, and exclusive badges" },
  { src: nitroEmoji, alt: "N8 Nitro Custom Emoji", caption: "Use custom and animated emoji in every server" },
  { src: nitroUpload, alt: "N8 Nitro File Upload", caption: "Upload files up to 500MB — share videos, images, and more" },
  { src: nitroStreaming, alt: "N8 Nitro HD Streaming", caption: "Stream in HD quality up to 4K at 60fps" },
  { src: nitroBoost, alt: "N8 Nitro Server Boost", caption: "Boost your favourite servers to unlock perks for everyone" },
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

        {/* Large Nitro promo image */}
        <motion.div className="max-w-3xl mx-auto mb-14" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
          <img src={nitroPromo} alt="N8 Nitro Premium Features" className="w-full rounded-xl shadow-2xl" loading="lazy" width={1280} height={800} />
        </motion.div>

        {/* Perks grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16">
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

        {/* Showcase image gallery */}
        <div className="space-y-12 max-w-5xl mx-auto mb-14">
          {showcaseImages.map((img, i) => (
            <motion.div
              key={img.alt}
              className={`grid lg:grid-cols-2 gap-8 items-center ${i % 2 !== 0 ? "direction-rtl" : ""}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className={i % 2 !== 0 ? "lg:order-2" : ""}>
                <img src={img.src} alt={img.alt} className="w-full rounded-xl shadow-2xl" loading="lazy" width={1280} height={800} />
              </div>
              <div className={`${i % 2 !== 0 ? "lg:order-1" : ""} flex items-center`}>
                <div>
                  <h3 className="text-2xl md:text-3xl font-black text-foreground mb-3">{img.alt.replace("N8 Nitro ", "").toUpperCase()}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">{img.caption}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div className="flex flex-wrap justify-center gap-4" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Link to="/auth" className="px-8 py-3 rounded-full gradient-blurple text-primary-foreground font-medium hover:opacity-90 transition-opacity">
            Subscribe to Nitro
          </Link>
          <Link to="#features" className="px-8 py-3 rounded-full border border-border text-foreground font-medium hover:bg-secondary transition-colors">
            Learn More
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default NitroSection;
