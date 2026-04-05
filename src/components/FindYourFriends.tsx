import { motion } from "framer-motion";
import { Download } from "lucide-react";
import witch from "@/assets/witch.webp";
import partyWumpus from "@/assets/party-wumpus.webp";

const FindYourFriends = () => {
  return (
    <section className="py-20 lg:py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blurple via-background to-background" />
      </div>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
              FIND YOUR FRIENDS ON N8
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground mb-8">
              Connect with friends, family, and communities who share your interests. Stay in touch no matter where you are.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 gradient-blurple text-white rounded-full font-medium hover:opacity-90 transition-opacity">
                <Download size={20} className="inline mr-2" />
                Download N8
              </button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/3] max-w-lg mx-auto">
              <motion.div
                initial={{ rotate: -5 }}
                whileInView={{ rotate: 0 }}
                transition={{ duration: 0.6 }}
              >
                <img 
                  src={witch} 
                  alt="Find your friends" 
                  className="w-full h-full object-contain"
                />
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="absolute -bottom-4 -right-4 w-32 h-32"
            >
              <img src={partyWumpus} alt="Party Wumpus" className="w-full h-full object-contain" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FindYourFriends;
