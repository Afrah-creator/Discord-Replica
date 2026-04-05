import { AnimatePresence, motion } from "framer-motion";
import { X, Server } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface ServerListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenServer?: (serverId: string) => void;
}

const ServerListModal = ({ isOpen, onClose, onOpenServer }: ServerListModalProps) => {
  const { user } = useAuth();

  const { data: servers = [], isLoading, error } = useQuery({
    queryKey: ["servers", "list", user?.id],
    enabled: !!user && isOpen,
    queryFn: async () => {
      const { data: memberships, error: membershipsError } = await supabase
        .from("server_members")
        .select("server_id")
        .eq("user_id", user!.id);
      if (membershipsError) throw membershipsError;
      if (!memberships?.length) return [];
      const serverIds = memberships.map((m) => m.server_id);
      const { data, error: serversError } = await supabase
        .from("servers")
        .select("id, name, invite_code, created_at")
        .in("id", serverIds)
        .order("created_at", { ascending: false });
      if (serversError) throw serversError;
      return data || [];
    },
  });

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
            className="relative w-full max-w-lg rounded-xl bg-card p-6 shadow-2xl"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
                <Server size={18} className="text-foreground" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">Your Servers</h2>
                <p className="text-xs text-muted-foreground">Real servers saved in Supabase</p>
              </div>
            </div>

            {isLoading && (
              <div className="py-10 text-center text-muted-foreground text-sm">Loading servers...</div>
            )}

            {!isLoading && error && (
              <div className="py-6 text-center text-destructive text-sm">
                Failed to load servers. Please try again.
              </div>
            )}

            {!isLoading && !error && servers.length === 0 && (
              <div className="py-10 text-center text-muted-foreground text-sm">
                No servers yet. Create one to see it here.
              </div>
            )}

            {!isLoading && !error && servers.length > 0 && (
              <div className="max-h-80 overflow-y-auto space-y-2">
                {servers.map((s: { id: string; name: string; invite_code?: string | null }) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      onOpenServer?.(s.id);
                      onClose();
                    }}
                    className="w-full text-left p-3 rounded-lg border border-border hover:bg-secondary/60 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-foreground">{s.name}</p>
                        {s.invite_code && <p className="text-xs text-muted-foreground">Invite: {s.invite_code}</p>}
                      </div>
                      <span className="text-xs text-muted-foreground">Open</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ServerListModal;
