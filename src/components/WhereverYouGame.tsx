import { motion } from "framer-motion";
import { Monitor, Smartphone, Gamepad, Tablet } from "lucide-react";
import sectionPlatforms from "@/assets/section-platforms.webp";

const WhereverYouGame = () => {
  return (
    <section className="py-20 lg:py-32 bg-card" id="platforms">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="aspect-video max-w-lg mx-auto rounded-2xl overflow-hidden">
              <img 
                src={sectionPlatforms} 
                alt="Wherever you game" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
              WHEREVER YOU GAME, HANG OUT HERE
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground mb-8">
              On your PC, phone, or console, you can still hang out on Discord. Easily switch between devices and use tools to manage multiple group chats with friends.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-secondary rounded-xl">
                <Monitor className="text-blurple" size={24} />
                <span className="text-foreground font-medium">Windows</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-secondary rounded-xl">
                <Monitor className="text-blurple" size={24} />
                <span className="text-foreground font-medium">macOS</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-secondary rounded-xl">
                <Monitor className="text-blurple" size={24} />
                <span className="text-foreground font-medium">Linux</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-secondary rounded-xl">
                <Smartphone className="text-n8-green" size={24} />
                <span className="text-foreground font-medium">iOS</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-secondary rounded-xl">
                <Smartphone className="text-n8-green" size={24} />
                <span className="text-foreground font-medium">Android</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-secondary rounded-xl">
                <Gamepad className="text-n8-pink" size={24} />
                <span className="text-foreground font-medium">PS5/PS4</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhereverYouGame;
