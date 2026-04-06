import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Gamepad2, BookOpen, Users, Sparkles, Link2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface ServerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onServerCreated?: (server?: { id: string; name: string; invite_code?: string | null }) => void;
  initialStep?: Step;
  initialInviteCode?: string;
}

const templates = [
  { id: "own", label: "Create My Own", icon: Sparkles, color: "text-n8-yellow" },
  { id: "gaming", label: "Gaming", icon: Gamepad2, color: "text-n8-green" },
  { id: "school", label: "School Club", icon: BookOpen, color: "text-blurple" },
  { id: "study", label: "Study Group", icon: Users, color: "text-n8-pink" },
];

type Step = "choose" | "template" | "customize" | "join";

const ServerModal = ({ isOpen, onClose, onServerCreated, initialStep, initialInviteCode }: ServerModalProps) => {
  const { user } = useAuth();
  const [step, setStep] = useState<Step>("choose");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [serverName, setServerName] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    if (initialStep) {
      setStep(initialStep);
    }
    if (initialInviteCode) {
      setInviteCode(initialInviteCode);
    }
  }, [isOpen, initialStep, initialInviteCode]);

  const handleTemplateSelect = (id: string) => {
    setSelectedTemplate(id);
    setStep("customize");
  };

  const handleCreate = async () => {
    if (!user || !serverName.trim()) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("servers")
        .insert({
          name: serverName.trim(),
          template: selectedTemplate || "own",
          owner_id: user.id,
        })
        .select("id, name, invite_code")
        .single();
      if (error) throw error;
      await supabase.from("server_members").upsert(
        {
          server_id: data.id,
          user_id: user.id,
          role: "owner",
        },
        { onConflict: "server_id,user_id" }
      );
      toast.success(`Server "${serverName}" created!`);
      onServerCreated?.(data || undefined);
      handleClose();
    } catch (err: Error) {
      toast.error(err.message || "Failed to create server");
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = async () => {
    if (!user || !inviteCode.trim()) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.rpc("join_server_by_invite", {
        p_invite_code: inviteCode.trim().toUpperCase(),
      });
      if (error) throw error;
      const server = Array.isArray(data) ? data[0] : data;
      if (!server) {
        toast.error("Invalid invite code");
        setLoading(false);
        return;
      }
      toast.success(`Joined "${server.server_name || server.name}"!`);
      onServerCreated?.(server || undefined);
      handleClose();
    } catch (err: Error) {
      toast.error(err.message || "Failed to join server");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setStep("choose");
    setSelectedTemplate(null);
    setServerName("");
    setInviteCode("");
    setLoading(false);
    onClose();
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
              {step === "choose" && (
                <motion.div key="choose" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-6">
                  <h2 className="text-2xl font-bold text-foreground text-center mb-2">Add a Server</h2>
                  <p className="text-muted-foreground text-center text-sm mb-6">Create your own or join an existing one</p>
                  <div className="space-y-3">
                    <button
                      onClick={() => setStep("template")}
                      className="w-full flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-secondary transition-colors"
                    >
                      <Sparkles className="text-n8-yellow" size={24} />
                      <div className="text-left">
                        <p className="text-foreground font-medium">Create My Own</p>
                        <p className="text-muted-foreground text-xs">Start fresh with a new server</p>
                      </div>
                    </button>
                    <button
                      onClick={() => setStep("join")}
                      className="w-full flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-secondary transition-colors"
                    >
                      <Link2 className="text-blurple" size={24} />
                      <div className="text-left">
                        <p className="text-foreground font-medium">Join a Server</p>
                        <p className="text-muted-foreground text-xs">Enter an invite code to join</p>
                      </div>
                    </button>
                  </div>
                </motion.div>
              )}

              {step === "template" && (
                <motion.div key="template" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-6">
                  <h2 className="text-2xl font-bold text-foreground text-center mb-2">Create a Server</h2>
                  <p className="text-muted-foreground text-center text-sm mb-6">Pick a template to get started</p>
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
                  <button onClick={() => setStep("choose")} className="mt-4 text-sm text-muted-foreground hover:text-foreground">Back</button>
                </motion.div>
              )}

              {step === "customize" && (
                <motion.div key="customize" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="p-6">
                  <h2 className="text-2xl font-bold text-foreground text-center mb-2">Customize your server</h2>
                  <p className="text-muted-foreground text-center text-sm mb-6">Give your server a name</p>
                  <div className="mb-6">
                    <label className="text-xs font-bold uppercase text-secondary-foreground mb-2 block">Server Name</label>
                    <input
                      type="text"
                      value={serverName}
                      onChange={(e) => setServerName(e.target.value)}
                      placeholder="My Awesome Server"
                      className="w-full px-3 py-2 rounded-md bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      maxLength={100}
                    />
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setStep("template")} className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground">Back</button>
                    <button
                      onClick={handleCreate}
                      disabled={!serverName.trim() || loading}
                      className="ml-auto px-6 py-2 rounded-md gradient-blurple text-primary-foreground text-sm font-medium disabled:opacity-50 hover:opacity-90 transition-opacity"
                    >
                      {loading ? "Creating..." : "Create"}
                    </button>
                  </div>
                </motion.div>
              )}

              {step === "join" && (
                <motion.div key="join" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="p-6">
                  <h2 className="text-2xl font-bold text-foreground text-center mb-2">Join a Server</h2>
                  <p className="text-muted-foreground text-center text-sm mb-6">Enter an invite code below</p>
                  <div className="mb-6">
                    <label className="text-xs font-bold uppercase text-secondary-foreground mb-2 block">Invite Code</label>
                    <input
                      type="text"
                      value={inviteCode}
                      onChange={(e) => setInviteCode(e.target.value)}
                      placeholder="e.g. a1b2c3d4"
                      className="w-full px-3 py-2 rounded-md bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setStep("choose")} className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground">Back</button>
                    <button
                      onClick={handleJoin}
                      disabled={!inviteCode.trim() || loading}
                      className="ml-auto px-6 py-2 rounded-md gradient-blurple text-primary-foreground text-sm font-medium disabled:opacity-50 hover:opacity-90 transition-opacity"
                    >
                      {loading ? "Joining..." : "Join Server"}
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

