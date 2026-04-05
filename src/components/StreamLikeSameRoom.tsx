import { motion } from "framer-motion";
import { Video, Monitor, Users } from "lucide-react";
import sectionSameroom from "@/assets/section-sameroom.webp";
import clydeCube from "@/assets/clyde-cube.webp";

const StreamLikeSameRoom = () => {
  return (
    <section className="py-20 lg:py-32 bg-card" id="streaming">
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
                src={sectionSameroom} 
                alt="Stream like in the same room" 
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
              STREAM LIKE YOU'RE IN THE SAME ROOM
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground mb-8">
              High quality and low latency streaming makes it feel like you're hanging out on the couch with friends while playing a game, watching shows, looking at photos, or idk doing homework or something.
            </p>
            <div className="flex gap-6">
              <div className="flex items-center gap-3">
                <Monitor className="text-blurple" size={28} />
                <div>
                  <p className="font-medium text-foreground">HD Streaming</p>
                  <p className="text-sm text-muted-foreground">60fps quality</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Video className="text-blurple" size={28} />
                <div>
                  <p className="font-medium text-foreground">Low Latency</p>
                  <p className="text-sm text-muted-foreground">Real-time feel</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StreamLikeSameRoom;
