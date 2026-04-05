import { motion } from "framer-motion";
import { Gamepad2, Music, Tv, Images } from "lucide-react";
import sectionActivities from "@/assets/section-activities.webp";

const AlwaysHaveSomething = () => {
  return (
    <section className="py-20 lg:py-32 bg-background" id="activities">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
              ALWAYS HAVE SOMETHING TO DO TOGETHER
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground mb-8">
              Watch videos, play built-in games, listen to music, or just scroll together and spam memes. Seamlessly text, call, video chat, and play games, all in one group chat.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card border border-border rounded-xl p-4 hover:border-blurple transition-colors cursor-pointer">
                <Gamepad2 className="text-blurple mb-2" size={32} />
                <p className="font-medium text-foreground">Built-in Games</p>
                <p className="text-sm text-muted-foreground">Play together</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-4 hover:border-n8-green transition-colors cursor-pointer">
                <Music className="text-n8-green mb-2" size={32} />
                <p className="font-medium text-foreground">Music</p>
                <p className="text-sm text-muted-foreground">Listen together</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-4 hover:border-n8-pink transition-colors cursor-pointer">
                <Tv className="text-n8-pink mb-2" size={32} />
                <p className="font-medium text-foreground">Watch Together</p>
                <p className="text-sm text-muted-foreground">Sync viewing</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-4 hover:border-n8-yellow transition-colors cursor-pointer">
                <Images className="text-n8-yellow mb-2" size={32} />
                <p className="font-medium text-foreground">Media</p>
                <p className="text-sm text-muted-foreground">Share photos</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="aspect-square max-w-lg mx-auto rounded-2xl overflow-hidden">
              <img 
                src={sectionActivities} 
                alt="Activities" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AlwaysHaveSomething;
