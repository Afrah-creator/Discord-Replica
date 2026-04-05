import { motion } from "framer-motion";
import { Users, Gamepad2, Circle } from "lucide-react";
import sectionStatus from "@/assets/section-status.webp";

const SeeWhosAround = () => {
  return (
    <section className="py-20 lg:py-32 bg-card" id="status">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="aspect-[4/3] max-w-md mx-auto rounded-2xl overflow-hidden">
              <img 
                src={sectionStatus} 
                alt="See who's around" 
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
              SEE WHO'S AROUND TO CHILL
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground mb-8">
              See who's around, playing games, or just hanging out. For supported games, you can see what modes or characters your friends are playing and directly join up.
            </p>
            <div className="flex gap-6">
              <div className="flex items-center gap-3">
                <Users className="text-blurple" size={28} />
                <div>
                  <p className="font-medium text-foreground">See Friends</p>
                  <p className="text-sm text-muted-foreground">Online status</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Gamepad2 className="text-n8-green" size={28} />
                <div>
                  <p className="font-medium text-foreground">Game Activity</p>
                  <p className="text-sm text-muted-foreground">See what they play</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SeeWhosAround;
