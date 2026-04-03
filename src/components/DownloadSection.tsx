import { motion } from "framer-motion";
import { Download, Monitor, Smartphone, Apple, Chrome } from "lucide-react";

const platforms = [
  { icon: Monitor, name: "Windows", button: "Download", primary: true },
  { icon: Apple, name: "macOS", button: "Download", primary: false },
  { icon: Smartphone, name: "iOS", button: "App Store", primary: false },
  { icon: Smartphone, name: "Android", button: "Google Play", primary: false },
  { icon: Monitor, name: "Linux", button: "Download", primary: false },
  { icon: Chrome, name: "Web Browser", button: "Open N8", primary: false },
];

const DownloadSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
            DOWNLOAD N8 ON ANY DEVICE
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Available on Windows, macOS, Linux, iOS, Android, and your web browser. Always stay connected.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {platforms.map((p, i) => (
            <motion.a
              key={p.name}
              href={p.name === "Web Browser" ? "/app" : "#"}
              className={`flex flex-col items-center gap-3 p-6 rounded-xl border transition-all hover:scale-[1.03] ${
                p.primary
                  ? "gradient-blurple border-transparent glow-blurple text-primary-foreground"
                  : "bg-card border-border hover:border-primary/30 text-foreground"
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
            >
              <p.icon size={32} />
              <span className="font-bold text-sm">{p.name}</span>
              <span className="flex items-center gap-1 text-xs opacity-80">
                <Download size={12} />
                {p.button}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;
