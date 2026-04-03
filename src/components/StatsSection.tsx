import { motion } from "framer-motion";

const stats = [
  { value: "150M+", label: "Monthly Active Users" },
  { value: "19M+", label: "Active Servers Weekly" },
  { value: "4B+", label: "Daily Messages" },
  { value: "1.3B+", label: "Voice Minutes Daily" },
];

const StatsSection = () => {
  return (
    <section id="stats" className="py-16 bg-card border-y border-border">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <p className="text-3xl md:text-5xl font-black text-gradient mb-2">{stat.value}</p>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
