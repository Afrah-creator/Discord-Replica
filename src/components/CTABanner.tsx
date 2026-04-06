import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import footerCta from "@/assets/footer-cta.webp";

const CTABanner = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const openApp = () => {
    if (!user) {
      toast.info("Please sign in to open N8.");
      navigate("/auth");
      return;
    }
    navigate("/app");
  };

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src={footerCta} 
          alt="Footer CTA" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-blurple/80" />
      </div>
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8">
            YOU CAN'T SCROLL ANYMORE.<br />
            <span className="text-blurple">BETTER GO CHAT.</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-blurple rounded-full font-medium text-lg hover:bg-white/90 transition-opacity">
              <Download size={24} />
              Download for Mac
            </button>
            <button
              onClick={openApp}
              className="px-8 py-4 bg-white/20 text-white rounded-full font-medium text-lg hover:bg-white/30 transition-colors backdrop-blur-sm"
            >
              Open N8 in your browser
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTABanner;
