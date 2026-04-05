import { motion } from "framer-motion";
import { Smile, Sticker, Music, User } from "lucide-react";
import sectionEmojis from "@/assets/section-emojis.webp";
import egg from "@/assets/egg.webp";

const MakeGroupChatsFun = () => {
  return (
    <section className="py-20 lg:py-32 bg-background" id="emojis">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
              MAKE YOUR GROUP CHATS MORE FUN
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground mb-8">
              Use custom emoji, stickers, soundboard effects and more to add your personality to your voice, video, or text chat. Set your avatar and a custom status, and write your own profile to show up in chat your way.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-foreground">
                <Smile className="text-blurple" size={24} />
                <span>Custom Emoji</span>
              </div>
              <div className="flex items-center gap-2 text-foreground">
                <Sticker className="text-blurple" size={24} />
                <span>Stickers</span>
              </div>
              <div className="flex items-center gap-2 text-foreground">
                <Music className="text-blurple" size={24} />
                <span>Soundboard</span>
              </div>
              <div className="flex items-center gap-2 text-foreground">
                <User className="text-blurple" size={24} />
                <span>Custom Profile</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square max-w-lg mx-auto">
              <img 
                src={sectionEmojis} 
                alt="Emoji and Soundboard" 
                className="w-full h-full object-contain rounded-3xl"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
              className="absolute -bottom-8 -left-8 w-24 h-24"
            >
              <img src={egg} alt="Egg" className="w-full h-full object-contain" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MakeGroupChatsFun;
