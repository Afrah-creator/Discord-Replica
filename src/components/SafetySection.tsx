import { motion } from "framer-motion";
import { Shield, Lock, Eye, UserCheck, AlertTriangle, Ban } from "lucide-react";
import { Link } from "react-router-dom";
import safetyImg from "@/assets/section-safety-dashboard.jpg";

const safetyFeatures = [
  { icon: Shield, title: "Advanced Moderation", desc: "AutoMod filters harmful content automatically. Set custom keyword filters and spam protection." },
  { icon: Lock, title: "Two-Factor Authentication", desc: "Keep your account extra secure with 2FA. Require it for your entire server's moderators." },
  { icon: Eye, title: "Privacy Controls", desc: "Control who can DM you, who can add you as a friend, and manage your data privacy settings." },
  { icon: UserCheck, title: "Verification Levels", desc: "Set requirements for new members — verified email, phone, or timed waiting periods." },
  { icon: AlertTriangle, title: "Report & Block", desc: "Report harmful behaviour directly to our Trust & Safety team. Block anyone with a single click." },
  { icon: Ban, title: "Server Bans & Timeouts", desc: "Temporarily timeout or permanently ban disruptive members. Keep your community safe and fun." },
];

const SafetySection = () => {
  return (
    <section id="safety" className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-n8-green/20 text-n8-green text-sm font-bold mb-4">
            <Shield size={16} />
            SAFETY FIRST
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">A SAFE PLACE TO HANG OUT</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We take safety seriously. N8's powerful tools help moderators keep communities welcoming, and give users control over their experience.
          </p>
        </motion.div>

        {/* Large safety image */}
        <motion.div className="max-w-4xl mx-auto mb-14" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <img src={safetyImg} alt="N8 Safety & Moderation Dashboard" className="w-full rounded-xl shadow-2xl" loading="lazy" width={1280} height={800} />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {safetyFeatures.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="p-6 rounded-xl bg-background border border-border hover:border-n8-green/30 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <feature.icon className="text-n8-green mb-4" size={24} />
              <h3 className="text-foreground font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div className="text-center mt-10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <Link
            to="/auth"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full gradient-blurple text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            Get Started — It's Free
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default SafetySection;
