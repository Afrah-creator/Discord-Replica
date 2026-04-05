import { motion } from "framer-motion";
import { Phone, PhoneIncoming, MessageSquare } from "lucide-react";
import sectionHopin from "@/assets/section-hopin.webp";

const HopInWhenFree = () => {
  return (
    <section className="py-20 lg:py-32 bg-background" id="voice">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
              HOP IN WHEN YOU'RE FREE, NO NEED TO CALL
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground mb-8">
              Easily hop in and out of voice or text chats without having to call or invite anyone, so your party chat lasts before, during, and after your game session.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-foreground bg-secondary px-4 py-2 rounded-lg">
                <PhoneIncoming className="text-n8-green" size={20} />
                <span>Easy Join</span>
              </div>
              <div className="flex items-center gap-2 text-foreground bg-secondary px-4 py-2 rounded-lg">
                <Phone className="text-blurple" size={20} />
                <span>No Invites</span>
              </div>
              <div className="flex items-center gap-2 text-foreground bg-secondary px-4 py-2 rounded-lg">
                <MessageSquare className="text-n8-yellow" size={20} />
                <span>Text + Voice</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="aspect-video max-w-lg mx-auto rounded-2xl overflow-hidden">
              <img 
                src={sectionHopin} 
                alt="Hop in when free" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HopInWhenFree;
