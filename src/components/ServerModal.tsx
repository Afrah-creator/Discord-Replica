import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Gamepad2, BookOpen, Users, Sparkles } from "lucide-react";

interface ServerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const templates = [
  { id: "own", label: "Create My Own", icon: Sparkles, color: "text-n8-yellow" },
  { id: "gaming", label: "Gaming", icon: Gamepad2, color: "text-n8-green" },
  { id: "school", label: "School Club", icon: BookOpen, color: "text-blurple" },
  { id: "study", label: "Study Group", icon: Users, color: "text-n8-pink" },
];

type Step = "template" | "customize";

const ServerModal = ({ isOpen, onClose }: ServerModalProps) => {
  const [step, setStep] = useState<Step>("template");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [serverName, setServerName] = useState("");
  const [serverImage, setServerImage] = useState<string | null>(null);

  const handleTemplateSelect = (id: string) => {
    setSelectedTemplate(id);
    setStep("customize");
  };

  const handleCreate = () => {
    console.log("Creating server:", { template: selectedTemplate, name: serverName, image: serverImage });
    handleClose();
  };

  const handleClose = () => {
    setStep("template");
    setSelectedTemplate(null);
    setServerName("");
    setServerImage(null);
    onClose();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setServerImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/70" onClick={handleClose} />
          <motion.div
            className="relative w-full max-w-md rounded-xl bg-card p-0 shadow-2xl"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={20} />
            </button>

            <AnimatePresence mode="wait">
              {step === "template" ? (
                <motion.div
                  key="template"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-6"
                >
                  <h2 className="text-2xl font-bold text-foreground text-center mb-2">Create a Server</h2>
                  <p className="text-muted-foreground text-center text-sm mb-6">
                    Your server is where you and your friends hang out. Make yours and start talking.
                  </p>
                  <div className="space-y-2">
                    {templates.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => handleTemplateSelect(t.id)}
                        className="w-full flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-secondary transition-colors text-left"
                      >
                        <t.icon className={`h-5 w-5 ${t.color}`} />
                        <span className="text-foreground font-medium">{t.label}</span>
                        <svg className="ml-auto h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="customize"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="p-6"
                >
                  <h2 className="text-2xl font-bold text-foreground text-center mb-2">Customize your server</h2>
                  <p className="text-muted-foreground text-center text-sm mb-6">
                    Give your new server a personality with a name and an icon.
                  </p>

                  <div className="flex justify-center mb-6">
                    <label className="relative w-20 h-20 rounded-full border-2 border-dashed border-muted-foreground/50 flex items-center justify-center cursor-pointer hover:border-primary transition-colors overflow-hidden">
                      {serverImage ? (
                        <img src={serverImage} alt="Server icon" className="w-full h-full object-cover" />
                      ) : (
                        <div className="flex flex-col items-center text-muted-foreground">
                          <Upload size={20} />
                          <span className="text-[10px] mt-1">UPLOAD</span>
                        </div>
                      )}
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                    </label>
                  </div>

                  <div className="mb-6">
                    <label className="text-xs font-bold uppercase text-secondary-foreground mb-2 block">Server Name</label>
                    <input
                      type="text"
                      value={serverName}
                      onChange={(e) => setServerName(e.target.value)}
                      placeholder={`${selectedTemplate === "gaming" ? "My Gaming Server" : selectedTemplate === "school" ? "School Club" : selectedTemplate === "study" ? "Study Group" : "My Server"}`}
                      className="w-full px-3 py-2 rounded-md bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setStep("template")}
                      className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleCreate}
                      disabled={!serverName.trim()}
                      className="ml-auto px-6 py-2 rounded-md gradient-blurple text-primary-foreground text-sm font-medium disabled:opacity-50 hover:opacity-90 transition-opacity"
                    >
                      Create
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ServerModal;
