import { useState } from "react";
import { Copy, RefreshCw, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface InviteManagerPanelProps {
  serverId: string;
  serverName: string;
  inviteCode: string | null;
  onInviteOpen: () => void;
  onInviteUpdated: (code: string) => void;
}

const InviteManagerPanel = ({
  serverId,
  serverName,
  inviteCode,
  onInviteOpen,
  onInviteUpdated,
}: InviteManagerPanelProps) => {
  const [regenerating, setRegenerating] = useState(false);

  const handleCopy = async () => {
    if (!inviteCode) {
      toast.error("No invite code found");
      return;
    }
    try {
      await navigator.clipboard.writeText(inviteCode);
      toast.success("Invite code copied");
    } catch {
      toast.error("Failed to copy invite code");
    }
  };

  const regenerateInvite = async () => {
    setRegenerating(true);
    try {
      const newCode = Math.random().toString(36).slice(2, 10).toUpperCase();
      const { data, error } = await supabase
        .from("servers")
        .update({ invite_code: newCode })
        .eq("id", serverId)
        .select("invite_code")
        .single();
      if (error) throw error;
      if (data?.invite_code) {
        onInviteUpdated(data.invite_code);
        toast.success("Invite regenerated");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to regenerate invite";
      toast.error(message);
    } finally {
      setRegenerating(false);
    }
  };

  return (
    <div className="px-3 py-3 border-b border-border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-foreground">Invites</p>
          <p className="text-[11px] text-muted-foreground">Send real invites for {serverName}</p>
        </div>
        <button
          onClick={onInviteOpen}
          className="p-1.5 rounded-md bg-secondary text-foreground hover:bg-secondary/80"
          title="Send invite"
        >
          <Send size={14} />
        </button>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <input
          value={inviteCode || ""}
          readOnly
          className="flex-1 px-2.5 py-2 rounded-md bg-background border border-border text-foreground text-xs"
        />
        <button onClick={handleCopy} className="p-2 rounded-md bg-secondary text-foreground hover:bg-secondary/80" title="Copy invite">
          <Copy size={14} />
        </button>
        <button
          onClick={regenerateInvite}
          disabled={regenerating}
          className="p-2 rounded-md bg-secondary text-foreground hover:bg-secondary/80 disabled:opacity-50"
          title="Regenerate invite"
        >
          <RefreshCw size={14} />
        </button>
      </div>
    </div>
  );
};

export default InviteManagerPanel;
