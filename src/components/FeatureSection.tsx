import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import sectionInvite from "@/assets/section-invite.jpg";
import sectionHangout from "@/assets/section-hangout.jpg";
import sectionCommunity from "@/assets/section-community.jpg";
import sectionVoice from "@/assets/section-voice.jpg";

interface AlternatingSection {
  title: string;
  description: string;
  image: string;
  reversed?: boolean;
  bgClass?: string;
  cta: { label: string; href: string };
}

const sections: AlternatingSection[] = [
  {
    title: "Create an invite-only place where you belong",
    description: "N8 servers are organized into topic-based channels where you can collaborate, share, and just talk about your day without clogging up a group chat.",
    image: sectionInvite,
    cta: { label: "Create Your Server", href: "/auth" },
  },
  {
    title: "Where hanging out is easy",
    description: "Grab a seat in a voice channel when you're free. Friends in your server can see you're around and instantly pop in to talk without having to call.",
    image: sectionHangout,
    reversed: true,
    bgClass: "bg-card",
    cta: { label: "Start Hanging Out", href: "/app" },
  },
  {
    title: "From few to a fandom",
    description: "Get any community running with moderation tools and custom member access. Give members special powers, set up private channels, and more.",
    image: sectionCommunity,
    cta: { label: "Build Your Community", href: "/auth" },
  },
  {
    title: "RELIABLE TECH FOR STAYING CLOSE",
    description: "Low-latency voice and video feels like you're in the same room. Wave hello over video, watch friends stream their games, or gather up and have a drawing session with screen share.",
    image: sectionVoice,
    reversed: true,
    bgClass: "bg-card",
    cta: { label: "Try It Free", href: "/app" },
  },
];

const FeatureSection = () => {
  return (
    <>
      {sections.map((section, i) => (
        <section key={i} className={`relative py-20 md:py-28 overflow-hidden ${section.bgClass || "bg-background"}`}>
          <div className="container mx-auto px-6">
            <div className={`grid lg:grid-cols-2 gap-12 items-center ${section.reversed ? "lg:direction-rtl" : ""}`}>
              <motion.div
                className={`${section.reversed ? "lg:order-2" : ""}`}
                initial={{ opacity: 0, x: section.reversed ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-5xl font-black text-foreground leading-tight mb-6 uppercase">{section.title}</h2>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-lg mb-6">{section.description}</p>
                <Link
                  to={section.cta.href}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full gradient-blurple text-primary-foreground font-medium hover:opacity-90 transition-opacity"
                >
                  {section.cta.label}
                </Link>
              </motion.div>

              <motion.div
                className={`${section.reversed ? "lg:order-1" : ""}`}
                initial={{ opacity: 0, x: section.reversed ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                <img src={section.image} alt={section.title} className="w-full rounded-xl shadow-2xl" loading="lazy" width={1280} height={800} />
              </motion.div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
};

export default FeatureSection;
