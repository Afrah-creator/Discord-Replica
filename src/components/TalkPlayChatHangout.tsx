import { motion } from "framer-motion";
import { MessageCircle, Gamepad2, Users, Heart } from "lucide-react";

const TalkPlayChatHangout = () => {
  return (
    <section className="py-16 lg:py-24 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-8 lg:gap-16"
        >
          {[
            { icon: MessageCircle, label: "talk", color: "text-blurple" },
            { icon: Gamepad2, label: "play", color: "text-n8-green" },
            { icon: Users, label: "chat", color: "text-n8-pink" },
            { icon: Heart, label: "hang out", color: "text-n8-yellow" },
            { icon: MessageCircle, label: "talk", color: "text-blurple" },
            { icon: Gamepad2, label: "play", color: "text-n8-green" },
            { icon: Users, label: "chat", color: "text-n8-pink" },
            { icon: Heart, label: "hang out", color: "text-n8-yellow" },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <item.icon className={`${item.color}`} size={index % 2 === 0 ? 32 : 28} />
              <span className="text-2xl lg:text-3xl font-bold text-foreground capitalize">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TalkPlayChatHangout;
