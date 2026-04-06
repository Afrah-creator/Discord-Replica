import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Copy, X } from "lucide-react";
import { toast } from "sonner";
import { sendInvite } from "@/lib/backend";

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  serverId: string;
  serverName: string;
  inviteCode: string | null;
}

const InviteModal = ({ isOpen, onClose, serverId, serverName, inviteCode }: InviteModalProps) => {
  const [method, setMethod] = useState<"sms" | "whatsapp" | "email">("sms");
  const [to, setTo] = useState("");
  const [sending, setSending] = useState(false);

  const inviteLink = useMemo(() => {
    const base = import.meta.env.VITE_PUBLIC_APP_URL || window.location.origin;
    return inviteCode ? `${base}/auth?invite=${inviteCode}` : base;
  }, [inviteCode]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      toast.success("Invite link copied!");
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const handleSend = async () => {
    if (!inviteCode) {
      toast.error("Invite code missing for this server");
      return;
    }
    if (!to.trim()) {
      toast.error("Enter a destination");
      return;
    }
    setSending(true);
    try {
      await sendInvite({
        method,
        to: to.trim(),
        serverId,
        serverName,
        inviteCode,
      });
      toast.success("Invite sent!");
      setTo("");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to send invite";
      toast.error(message);
    } finally {
      setSending(false);
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
          <div className="absolute inset-0 bg-black/70" onClick={onClose} />
          <motion.div
            className="relative w-full max-w-md rounded-xl bg-card p-6 shadow-2xl"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <button onClick={onClose} className="absolute right-4 top-4 text-muted-foreground hover:text-foreground">
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold text-foreground mb-2">Invite to {serverName}</h2>
            <p className="text-sm text-muted-foreground mb-4">Send real invites via SMS, WhatsApp, or email.</p>

            <div className="space-y-3">
              <div className="flex gap-2">
                {(["sms", "whatsapp", "email"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMethod(m)}
                    className={`flex-1 px-3 py-2 rounded-md text-sm font-medium ${
                      method === m ? "gradient-blurple text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {m === "sms" ? "SMS" : m === "whatsapp" ? "WhatsApp" : "Email"}
                  </button>
                ))}
              </div>

              <input
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder={method === "email" ? "name@example.com" : "+1234567890"}
                className="w-full px-3 py-2 rounded-md bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />

              <button
                onClick={handleSend}
                disabled={sending}
                className="w-full px-4 py-2 rounded-md gradient-blurple text-primary-foreground text-sm font-medium disabled:opacity-50"
              >
                {sending ? "Sending..." : "Send Invite"}
              </button>

              <div className="border-t border-border pt-4">
                <p className="text-xs text-muted-foreground mb-2">Shareable link (works on any platform)</p>
                <div className="flex items-center gap-2">
                  <input
                    value={inviteLink}
                    readOnly
                    className="flex-1 px-3 py-2 rounded-md bg-background border border-border text-foreground text-xs"
                  />
                  <button onClick={handleCopy} className="px-3 py-2 rounded-md bg-secondary text-foreground hover:bg-secondary/80">
                    <Copy size={16} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InviteModal;
