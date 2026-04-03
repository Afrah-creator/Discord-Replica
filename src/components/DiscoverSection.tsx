import { motion } from "framer-motion";
import { Compass, Users, Gamepad2, Music, GraduationCap, Film, Palette, Code } from "lucide-react";

const categories = [
  { icon: Gamepad2, name: "Gaming", members: "3.2M+", color: "text-n8-green" },
  { icon: Music, name: "Music", members: "1.8M+", color: "text-n8-pink" },
  { icon: GraduationCap, name: "Education", members: "980K+", color: "text-n8-yellow" },
  { icon: Film, name: "Entertainment", members: "2.1M+", color: "text-primary" },
  { icon: Palette, name: "Art & Design", members: "720K+", color: "text-n8-pink" },
  { icon: Code, name: "Science & Tech", members: "1.5M+", color: "text-n8-green" },
  { icon: Users, name: "Social", members: "4.3M+", color: "text-n8-yellow" },
  { icon: Compass, name: "Explore More", members: "∞", color: "text-primary" },
];

const DiscoverSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
            FIND YOUR COMMUNITY ON N8
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From gaming, to music, to learning, there's a place for you. Browse communities or start your own and invite your friends.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {categories.map((cat, i) => (
            <motion.button
              key={cat.name}
              className="p-5 rounded-xl bg-card border border-border hover:border-primary/40 transition-all text-left group hover:scale-[1.02]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <cat.icon className={`${cat.color} mb-3`} size={28} />
              <p className="text-foreground font-bold text-sm mb-1">{cat.name}</p>
              <p className="text-muted-foreground text-xs">{cat.members} members</p>
            </motion.button>
          ))}
        </div>

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground font-medium hover:bg-secondary transition-colors"
          >
            <Compass size={18} />
            Explore Discoverable Servers
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default DiscoverSection;
