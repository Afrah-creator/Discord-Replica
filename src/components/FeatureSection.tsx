import { motion } from "framer-motion";
import { MessageSquare, Shield, Zap, Users, Gamepad2, Video } from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    title: "Hang out anytime, anywhere",
    description: "Whether it's on your phone, tablet, or PC, you can stay connected with voice, video, and text.",
  },
  {
    icon: Users,
    title: "A place for communities",
    description: "From study groups to gaming clans, N8 servers let everyone find their own space.",
  },
  {
    icon: Gamepad2,
    title: "Built for gamers",
    description: "Low-latency voice, screen sharing, and rich presence — everything you need in one place.",
  },
  {
    icon: Shield,
    title: "Secure & reliable",
    description: "Advanced moderation tools, 2FA, and server verification to keep your community safe.",
  },
  {
    icon: Video,
    title: "Stream & Share",
    description: "Go live with screen share, stream your game, or just watch videos together.",
  },
  {
    icon: Zap,
    title: "Lightning fast",
    description: "Powered by efficient data structures — message queues, hash maps, and priority heaps.",
  },
];

const FeatureSection = () => {
  return (
    <section className="relative py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
            IMAGINE A PLACE...
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            ...where you can belong to a school club, a gaming group, or a worldwide art community. A place that makes it easy to talk every day and hang out more often.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="w-12 h-12 rounded-lg gradient-blurple flex items-center justify-center mb-4 group-hover:glow-blurple transition-shadow">
                <feature.icon className="text-primary-foreground" size={22} />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
